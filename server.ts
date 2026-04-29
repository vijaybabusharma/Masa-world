import express from 'express';
// import { createServer as createViteServer } from 'vite'; // Dynamic import used instead
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { defaultSettings, defaultPages } from './utils/defaultData';
import { AdminUser, UserRole } from './types';

dotenv.config();

console.log('Environment variables loaded:', {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '***' : 'undefined',
    JWT_SECRET: process.env.JWT_SECRET ? '***' : 'undefined'
});

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'masa-super-secret-key-change-in-prod';
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json');
const ACTIVITY_LOGS_FILE = path.join(DATA_DIR, 'activity_logs.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serve uploads statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Ensure users file exists
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
}

// Ensure content files exist with defaults
const initContentFiles = () => {
    const files = [
        { name: 'content_settings.json', data: defaultSettings },
        { name: 'content_pages.json', data: defaultPages },
        { name: 'content_events.json', data: [] },
        { name: 'content_posts.json', data: [] },
        { name: 'content_courses.json', data: [] },
        { name: 'content_gallery.json', data: [] },
        { name: 'content_redirects.json', data: [] },
        { name: 'content_trash.json', data: [] },
        { name: 'content_revisions.json', data: [] },
        { name: 'content_comments.json', data: [] },
        { name: 'submissions.json', data: [] },
        { name: 'donations.json', data: [] },
        { name: 'activity_logs.json', data: [] }
    ];

    files.forEach(f => {
        const filePath = path.join(DATA_DIR, f.name);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(f.data, null, 2));
        }
    });
};

initContentFiles();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// --- Auth Middleware ---
const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = decoded;
        next();
    });
};

const requirePermission = (roles: UserRole[]) => (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
};

const superAdminOnly = requirePermission(['Super Admin']);

// --- Auth Utils ---
// Helper to read/write JSON files
const readJsonFile = (filePath: string, defaultValue: any = []) => {
    try {
        if (!fs.existsSync(filePath)) return defaultValue;
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content) return defaultValue;
        return JSON.parse(content);
    } catch (e) {
        console.error(`Error reading file ${filePath}`, e);
        return defaultValue;
    }
};

const getUsers = (): AdminUser[] => readJsonFile(USERS_FILE, []);
const saveUsers = (users: AdminUser[]) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

const getContentFile = (type: string) => path.join(DATA_DIR, `content_${type}.json`);

const readContent = (type: string) => {
    const file = getContentFile(type);
    return readJsonFile(file, []);
};

const saveContent = (type: string, data: any) => {
    const file = getContentFile(type);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const saveJsonFile = (file: string, data: any) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Revisions helper
const REVISIONS_FILE = path.join(DATA_DIR, 'content_revisions.json');
const saveRevision = (contentId: string | number, contentType: 'post' | 'page', data: any, author: string) => {
    const revisions = readJsonFile(REVISIONS_FILE, []);
    const newRevision = {
        id: `rev-${Date.now()}`,
        contentId,
        contentType,
        data,
        timestamp: new Date().toISOString(),
        author
    };
    revisions.unshift(newRevision);
    // Keep only last 20 revisions per content item
    const filtered = revisions.filter((r: any) => r.contentId === contentId && r.contentType === contentType).slice(0, 20);
    const others = revisions.filter((r: any) => !(r.contentId === contentId && r.contentType === contentType));
    fs.writeFileSync(REVISIONS_FILE, JSON.stringify([...filtered, ...others], null, 2));
};

// Trash helper
const TRASH_FILE = path.join(DATA_DIR, 'content_trash.json');
const moveToTrash = (originalId: string | number, type: string, data: any, deletedBy: string) => {
    const trash = readJsonFile(TRASH_FILE, []);
    trash.unshift({
        id: `trash-${Date.now()}`,
        originalId,
        type,
        data,
        deletedAt: new Date().toISOString(),
        deletedBy
    });
    fs.writeFileSync(TRASH_FILE, JSON.stringify(trash, null, 2));
};

const initDefaultAdmin = async () => {
    const users = getUsers();
    if (users.length === 0) {
        console.log('No admin users found. Initializing default admin...');
        const email = process.env.ADMIN_EMAIL || 'admin@masa.org';
        const password = process.env.ADMIN_PASSWORD || 'masa@admin2024';
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        users.push({
            id: 'admin-1',
            email,
            passwordHash,
            name: 'Super Admin',
            role: 'Super Admin'
        });
        saveUsers(users);
        console.log(`Default admin created: ${email}`);
    }
};

initDefaultAdmin();

// --- Email Notification Helper ---
const sendEmailNotification = (to: string, subject: string, body: string) => {
    console.log(`[EMAIL NOTIFICATION]
To: ${to}
Subject: ${subject}
Body: ${body}
---------------------------`);
    // In a real self-hosted environment, you would use nodemailer here.
    // For this CMS conversion, we log it to demonstrate server-side handling.
};

// --- Health Check ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
    console.log(`Login attempt for: ${req.body?.email}`);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`User found, comparing password for: ${email}`);
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.log(`Password mismatch for: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 8 * 60 * 60 * 1000 // 8 hours
        });

        user.lastLogin = new Date().toISOString();
        saveUsers(users);

        console.log(`Login successful for: ${email}`);
        res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    const users = getUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ message: 'Logged out' });
});

app.post('/api/auth/change-password', authenticateToken, async (req: any, res) => {
    const { currentPassword, newPassword } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    const user = users[userIndex];

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    saveUsers(users);

    res.json({ message: 'Password changed successfully' });
});

app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 mins
    };
    saveUsers(users);

    sendEmailNotification(email, 'Your OTP for Password Reset', `Your OTP is: ${otp}. It expires in 10 minutes.`);
    res.json({ message: 'OTP sent to your email' });
});

app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user || !user.otp) return res.status(400).json({ message: 'Invalid request' });
    if (user.otp.code !== otp || new Date() > new Date(user.otp.expiresAt)) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified' });
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user || !user.otp) return res.status(400).json({ message: 'Invalid request' });
    if (user.otp.code !== otp || new Date() > new Date(user.otp.expiresAt)) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    delete user.otp;
    saveUsers(users);

    res.json({ message: 'Password reset successfully' });
});

// --- Content Management Routes (Secured) ---
app.get('/api/donations', authenticateToken, (req, res) => {
    const donations = readJsonFile(DONATIONS_FILE, []);
    res.json(donations);
});

app.post('/api/donations', (req, res) => {
    const donation = { id: `don-${Date.now()}`, ...req.body, date: new Date().toISOString() };
    let donations = readJsonFile(DONATIONS_FILE, []);
    donations.unshift(donation);
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2));
    res.json(donation);
});

// --- Content Management (Secured for writing) ---
app.post('/api/content/:type', authenticateToken, (req: any, res) => {
    const { type } = req.params;
    const data = req.body;
    
    // Create revision if it's a single post or page being saved
    if (type === 'posts' && !Array.isArray(data)) {
        saveRevision(data.id, 'post', data, 'admin');
    } else if (type === 'pages' && !Array.isArray(data)) {
        saveRevision(data.id, 'page', data, 'admin');
    }

    saveContent(type, data);
    res.json({ message: 'Content saved successfully' });
});

// --- Redirects (Secured) ---
app.get('/api/redirects', authenticateToken, (req, res) => {
    res.json(readContent('redirects'));
});

app.post('/api/redirects', authenticateToken, (req: any, res) => {
    const redirects = readContent('redirects');
    const newRedirect = { id: `red-${Date.now()}`, ...req.body, active: true };
    redirects.unshift(newRedirect);
    saveContent('redirects', redirects);
    res.json(newRedirect);
});

app.delete('/api/redirects/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    let redirects = readContent('redirects');
    redirects = redirects.filter((r: any) => r.id !== id);
    saveContent('redirects', redirects);
    res.json({ message: 'Redirect deleted' });
});

// --- Trash (Secured) ---
app.get('/api/trash', authenticateToken, (req, res) => {
    res.json(readJsonFile(TRASH_FILE, []));
});

app.post('/api/trash/move', authenticateToken, (req: any, res) => {
    const { originalId, type, data } = req.body;
    moveToTrash(originalId, type, data, 'admin');
    res.json({ message: 'Moved to trash' });
});

app.post('/api/trash/restore/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    let trash = readJsonFile(TRASH_FILE, []);
    const item = trash.find((t: any) => t.id === id);
    if (!item) return res.status(404).json({ message: 'Item not found in trash' });

    // Restore to original content file
    const contentFile = item.type === 'post' ? 'posts' : item.type === 'page' ? 'pages' : item.type === 'event' ? 'events' : 'gallery';
    const content = readContent(contentFile);
    content.push(item.data);
    saveContent(contentFile, content);

    // Remove from trash
    trash = trash.filter((t: any) => t.id !== id);
    fs.writeFileSync(TRASH_FILE, JSON.stringify(trash, null, 2));

    res.json({ message: 'Item restored' });
});

app.delete('/api/trash/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    let trash = readJsonFile(TRASH_FILE, []);
    trash = trash.filter((t: any) => t.id !== id);
    fs.writeFileSync(TRASH_FILE, JSON.stringify(trash, null, 2));
    res.json({ message: 'Item permanently deleted' });
});

// --- Revisions (Secured) ---
app.get('/api/revisions/:type/:id', authenticateToken, (req, res) => {
    const { type, id } = req.params;
    const revisions = readJsonFile(REVISIONS_FILE, []);
    const filtered = revisions.filter((r: any) => r.contentType === type && String(r.contentId) === String(id));
    res.json(filtered);
});

// --- Comments (Secured) ---
app.get('/api/comments', authenticateToken, (req, res) => {
    res.json(readContent('comments'));
});

app.put('/api/comments/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const comments = readContent('comments');
    const index = comments.findIndex((c: any) => c.id === id);
    if (index !== -1) {
        comments[index].status = status;
        saveContent('comments', comments);
        res.json(comments[index]);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.delete('/api/comments/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    let comments = readContent('comments');
    comments = comments.filter((c: any) => c.id !== id);
    saveContent('comments', comments);
    res.json({ message: 'Comment deleted' });
});

// --- Media Upload (Secured) ---
app.post('/api/media/upload', authenticateToken, upload.single('file'), (req: any, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ 
        url: fileUrl,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
    });
});

app.get('/api/media', (req, res) => {
    const files = fs.readdirSync(UPLOADS_DIR).map(file => {
        const stats = fs.statSync(path.join(UPLOADS_DIR, file));
        return {
            id: file,
            name: file,
            url: `/uploads/${file}`,
            size: stats.size,
            date: stats.mtime.toISOString(),
            type: path.extname(file).slice(1)
        };
    });
    res.json(files);
});

app.delete('/api/media/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted' });
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

// --- Form Submissions (Secured) ---
app.get('/api/forms/submissions', authenticateToken, (req, res) => {
    const submissions = readJsonFile(SUBMISSIONS_FILE, []);
    res.json(submissions);
});

app.put('/api/forms/submissions/:id', authenticateToken, (req: any, res) => {
    const { id } = req.params;
    const { status } = req.body;
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    const index = submissions.findIndex((s: any) => s.id === id);
    if (index !== -1) {
        submissions[index].status = status;
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        res.json(submissions[index]);
    } else {
        res.status(404).json({ message: 'Submission not found' });
    }
});

app.delete('/api/forms/submissions/:id', (req: any, res) => {
    const { id } = req.params;
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    submissions = submissions.filter((s: any) => s.id !== id);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    res.json({ message: 'Submission deleted' });
});

app.post('/api/forms/submit', (req, res) => {
    const submission = {
        id: `sub-${Date.now()}`,
        ...req.body,
        timestamp: new Date().toISOString(),
        status: 'New'
    };
    
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    submissions.unshift(submission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    
    // Send Email Notification
    sendEmailNotification(
        'masaworldfoundation@gmail.com',
        `New Form Submission: ${req.body.formType || 'General'}`,
        `A new form has been submitted.\n\nDetails:\n${JSON.stringify(req.body, null, 2)}`
    );

    res.json({ message: 'Submission received', id: submission.id });
});

// --- Stats (Secured) ---
app.get('/api/stats', authenticateToken, (req, res) => {
    const submissions = readJsonFile(SUBMISSIONS_FILE, []);
    const donations = readJsonFile(DONATIONS_FILE, []);
    
    const stats = {
        volunteers: submissions.filter((s: any) => s.formType === 'volunteer').length,
        donations: donations.length,
        members: submissions.filter((s: any) => s.formType === 'membership').length,
        queries: submissions.filter((s: any) => s.formType === 'contact').length,
        careers: submissions.filter((s: any) => s.formType === 'career').length,
        gallery: submissions.filter((s: any) => s.formType === 'gallery').length,
        enrollments: submissions.filter((s: any) => s.formType === 'enrollment').length,
        pledges: submissions.filter((s: any) => s.formType === 'pledge').length,
        countries: 12, // Still mock for now
    };
    res.json(stats);
});

// --- Vite Middleware ---

async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        try {
            const { createServer: createViteServer } = await import('vite');
            const vite = await createViteServer({
                server: { middlewareMode: true },
                appType: 'spa',
            });
            app.use(vite.middlewares);
        } catch (e) {
            console.error('Failed to load Vite middleware:', e);
        }
    } else {
        // Serve static files in production
        app.use(express.static(path.join(process.cwd(), 'dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
}

startServer();
