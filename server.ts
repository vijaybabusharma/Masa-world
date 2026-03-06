import express from 'express';
// import { createServer as createViteServer } from 'vite'; // Dynamic import used instead
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { defaultSettings, defaultPages } from './utils/defaultData';

dotenv.config();

console.log('Environment variables loaded:', {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '***' : 'undefined',
    JWT_SECRET: process.env.JWT_SECRET ? '***' : 'undefined'
});

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'masa-super-secret-key-change-in-prod';
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
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

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Helper to read/write users
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

const getUsers = () => readJsonFile(USERS_FILE, []);
const saveUsers = (users: any[]) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// Initialize default admin if no users exist or force update specific admin
const initDefaultAdmin = () => {
    const users = getUsers();
    const targetEmail = process.env.ADMIN_EMAIL || 'vijaybabusharma0@gmail.com';
    const targetPassword = process.env.ADMIN_PASSWORD || 'Masa@world@vijay123';
    
    const existingAdminIndex = users.findIndex((u: any) => u.email === targetEmail);
    const hashedPassword = bcrypt.hashSync(targetPassword, 10);

    if (existingAdminIndex !== -1) {
        // Update existing admin
        users[existingAdminIndex].passwordHash = hashedPassword;
        users[existingAdminIndex].role = 'Super Admin'; // Ensure role is Super Admin
        users[existingAdminIndex].active = true;
        saveUsers(users);
        console.log('Admin credentials updated.');
    } else {
        // Create new admin
        const adminUser = {
            id: 'u1',
            name: 'Super Admin',
            email: targetEmail,
            role: 'Super Admin',
            passwordHash: hashedPassword,
            avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=1E3A8A&color=fff',
            active: true,
            createdAt: new Date().toISOString()
        };
        users.push(adminUser);
        saveUsers(users);
        console.log('Default admin user created.', adminUser);
    }
};

initDefaultAdmin();

// Middleware to verify JWT and Role
const requirePermission = (allowedRoles: string[]) => (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        req.user = decoded;
        next();
    });
};

const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
};

const requireAdmin = requirePermission(['Super Admin']);
const requireEditor = requirePermission(['Super Admin', 'Admin / Manager', 'Editor']);
const requireFinance = requirePermission(['Super Admin', 'Accountant / Finance']);
const requireVolunteerCoord = requirePermission(['Super Admin', 'Admin / Manager', 'Volunteer Coordinator']);

// --- Activity Logs ---
const LOGS_FILE = path.join(DATA_DIR, 'activity_logs.json');
const logAction = (userId: string, userName: string, action: string, target: string, details?: string) => {
    let logs = readJsonFile(LOGS_FILE, []);
    logs.unshift({
        id: `log-${Date.now()}`,
        userId,
        userName,
        action,
        target,
        timestamp: new Date().toISOString(),
        details
    });
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs.slice(0, 1000), null, 2));
};

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

app.get('/api/logs', requireAdmin, (req, res) => {
    const logs = readJsonFile(LOGS_FILE, []);
    res.json(logs);
});

// --- Donations ---
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json');
app.get('/api/donations', requireFinance, (req, res) => {
    const donations = readJsonFile(DONATIONS_FILE, []);
    res.json(donations);
});

app.post('/api/donations', requireFinance, (req, res) => {
    const donation = { id: `don-${Date.now()}`, ...req.body, date: new Date().toISOString() };
    let donations = readJsonFile(DONATIONS_FILE, []);
    donations.unshift(donation);
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2));
    res.json(donation);
});

// --- Auth Routes ---

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, remember } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const users = getUsers();
        const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (!user || user.status === 'Disabled') {
            return res.status(401).json({ message: 'Invalid credentials or account disabled.' });
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: remember ? '30d' : '24h' });
        
        user.lastLogin = new Date().toISOString();
        saveUsers(users);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Required for SameSite=None
            sameSite: 'none', // Required for cross-origin iframe
            maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        });

        const { passwordHash, ...safeUser } = user;
        res.json({ user: safeUser });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login.', error: error.message });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', (req: any, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        const users = getUsers();
        const user = users.find((u: any) => u.id === decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { passwordHash, ...safeUser } = user;
        res.json({ user: safeUser });
    });
});

app.post('/api/auth/change-password', async (req: any, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        const { currentPassword, newPassword } = req.body;
        const users = getUsers();
        const userIndex = users.findIndex((u: any) => u.id === decoded.id);

        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        const user = users[userIndex];
        const validPassword = await bcrypt.compare(currentPassword, user.passwordHash);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users[userIndex].passwordHash = hashedPassword;
        saveUsers(users);

        logAction(user.id, user.name, 'Change Password', 'Self');
        res.json({ message: 'Password updated successfully' });
    });
});

app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex !== -1) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes
        
        users[userIndex].otp = otp;
        users[userIndex].otpExpires = otpExpires;
        saveUsers(users);

        sendEmailNotification(
            users[userIndex].email,
            'Password Reset OTP - MASA World',
            `Hello ${users[userIndex].name},\n\nYou requested a password reset. Your OTP is: ${otp}\n\nThis OTP will expire in 15 minutes.`
        );
    }

    res.json({ message: 'If an account exists with that email, an OTP has been sent.' });
});

app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    const user = users[userIndex];
    if (user.otp !== otp || new Date(user.otpExpires) < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].passwordHash = hashedPassword;
    delete users[userIndex].otp;
    delete users[userIndex].otpExpires;
    saveUsers(users);

    logAction(user.id, user.name, 'Reset Password', 'Self');
    res.json({ message: 'Password reset successfully' });
});

// --- User Management Routes (Admin Only) ---

app.get('/api/users', requireAdmin, (req, res) => {
    const users = getUsers();
    const safeUsers = users.map(({ passwordHash, ...u }: any) => u);
    res.json(safeUsers);
});

app.post('/api/users', requireAdmin, async (req: any, res) => {
    const { name, email, role, password } = req.body;
    const users = getUsers();

    if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const newUser = {
        id: `u${Date.now()}`,
        name,
        email,
        role,
        passwordHash: hashedPassword,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`,
        status: 'Active',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    logAction(req.user.id, req.user.name, 'Create User', email);
    const { passwordHash, ...safeUser } = newUser;
    res.json(safeUser);
});

app.put('/api/users/:id', requireAdmin, async (req: any, res) => {
    const { id } = req.params;
    const { name, email, role, status, password } = req.body;
    const users = getUsers();
    const index = users.findIndex((u: any) => u.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users[index] = { ...users[index], name, email, role, status };

    if (password) {
        users[index].passwordHash = await bcrypt.hash(password, 10);
    }

    saveUsers(users);
    logAction(req.user.id, req.user.name, 'Update User', email);
    const { passwordHash, ...safeUser } = users[index];
    res.json(safeUser);
});

app.delete('/api/users/:id', requireAdmin, (req: any, res) => {
    const { id } = req.params;
    let users = getUsers();
    
    const user = users.find((u: any) => u.id === id);
    if (user && user.role === 'Super Admin') {
        const superAdmins = users.filter((u: any) => u.role === 'Super Admin');
        if (superAdmins.length <= 1) {
            return res.status(400).json({ message: 'Cannot delete the last Super Admin' });
        }
    }

    users = users.filter((u: any) => u.id !== id);
    saveUsers(users);
    logAction(req.user.id, req.user.name, 'Delete User', user?.email || id);
    res.json({ message: 'User deleted' });
});

// --- Content Management Routes ---

const getContentFile = (type: string) => path.join(DATA_DIR, `content_${type}.json`);

const readContent = (type: string) => {
    const file = getContentFile(type);
    return readJsonFile(file, []);
};

const saveContent = (type: string, data: any) => {
    const file = getContentFile(type);
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

// Generic Get
app.get('/api/content/:type', (req, res) => {
    const { type } = req.params;
    const data = readContent(type);
    res.json(data);
});

// Generic Save (Full overwrite for settings/lists)
app.post('/api/content/:type', authenticateToken, requireAdmin, (req: any, res) => {
    const { type } = req.params;
    const data = req.body;
    
    // Create revision if it's a single post or page being saved
    if (type === 'posts' && !Array.isArray(data)) {
        saveRevision(data.id, 'post', data, req.user.name);
    } else if (type === 'pages' && !Array.isArray(data)) {
        saveRevision(data.id, 'page', data, req.user.name);
    }

    saveContent(type, data);
    logAction(req.user.id, req.user.name, 'Update Content', type);
    res.json({ message: 'Content saved successfully' });
});

// --- Redirects ---
app.get('/api/redirects', authenticateToken, requireAdmin, (req, res) => {
    res.json(readContent('redirects'));
});

app.post('/api/redirects', authenticateToken, requireAdmin, (req: any, res) => {
    const redirects = readContent('redirects');
    const newRedirect = { id: `red-${Date.now()}`, ...req.body, active: true };
    redirects.unshift(newRedirect);
    saveContent('redirects', redirects);
    logAction(req.user.id, req.user.name, 'Create Redirect', req.body.oldUrl);
    res.json(newRedirect);
});

app.delete('/api/redirects/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    let redirects = readContent('redirects');
    redirects = redirects.filter((r: any) => r.id !== id);
    saveContent('redirects', redirects);
    logAction(req.user.id, req.user.name, 'Delete Redirect', id);
    res.json({ message: 'Redirect deleted' });
});

// --- Trash ---
app.get('/api/trash', authenticateToken, requireAdmin, (req, res) => {
    res.json(readJsonFile(TRASH_FILE, []));
});

app.post('/api/trash/move', authenticateToken, requireAdmin, (req: any, res) => {
    const { originalId, type, data } = req.body;
    moveToTrash(originalId, type, data, req.user.name);
    res.json({ message: 'Moved to trash' });
});

app.post('/api/trash/restore/:id', authenticateToken, requireAdmin, (req: any, res) => {
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

    logAction(req.user.id, req.user.name, 'Restore from Trash', item.originalId);
    res.json({ message: 'Item restored' });
});

app.delete('/api/trash/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    let trash = readJsonFile(TRASH_FILE, []);
    trash = trash.filter((t: any) => t.id !== id);
    fs.writeFileSync(TRASH_FILE, JSON.stringify(trash, null, 2));
    logAction(req.user.id, req.user.name, 'Permanently Delete', id);
    res.json({ message: 'Item permanently deleted' });
});

// --- Revisions ---
app.get('/api/revisions/:type/:id', authenticateToken, requireAdmin, (req, res) => {
    const { type, id } = req.params;
    const revisions = readJsonFile(REVISIONS_FILE, []);
    const filtered = revisions.filter((r: any) => r.contentType === type && String(r.contentId) === String(id));
    res.json(filtered);
});

// --- Comments ---
app.get('/api/comments', authenticateToken, requireAdmin, (req, res) => {
    res.json(readContent('comments'));
});

app.post('/api/comments', (req, res) => {
    const comments = readContent('comments');
    const newComment = {
        id: `com-${Date.now()}`,
        ...req.body,
        timestamp: new Date().toISOString(),
        status: 'Pending'
    };
    comments.unshift(newComment);
    saveContent('comments', comments);
    res.json(newComment);
});

app.put('/api/comments/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const comments = readContent('comments');
    const index = comments.findIndex((c: any) => c.id === id);
    if (index !== -1) {
        comments[index].status = status;
        saveContent('comments', comments);
        logAction(req.user.id, req.user.name, 'Update Comment Status', id);
        res.json(comments[index]);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.delete('/api/comments/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    let comments = readContent('comments');
    comments = comments.filter((c: any) => c.id !== id);
    saveContent('comments', comments);
    logAction(req.user.id, req.user.name, 'Delete Comment', id);
    res.json({ message: 'Comment deleted' });
});

// --- Media Upload ---
app.post('/api/media/upload', authenticateToken, requireAdmin, upload.single('file'), (req: any, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ 
        url: fileUrl,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
    });
});

app.get('/api/media', authenticateToken, requireAdmin, (req, res) => {
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

app.delete('/api/media/:filename', authenticateToken, requireAdmin, (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted' });
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

// --- Form Submissions ---
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

app.get('/api/forms/submissions', authenticateToken, requireAdmin, (req, res) => {
    const submissions = readJsonFile(SUBMISSIONS_FILE, []);
    res.json(submissions);
});

app.put('/api/forms/submissions/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    const { status } = req.body;
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    const index = submissions.findIndex((s: any) => s.id === id);
    if (index !== -1) {
        submissions[index].status = status;
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        logAction(req.user.id, req.user.name, 'Update Submission Status', id);
        res.json(submissions[index]);
    } else {
        res.status(404).json({ message: 'Submission not found' });
    }
});

app.delete('/api/forms/submissions/:id', authenticateToken, requireAdmin, (req: any, res) => {
    const { id } = req.params;
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    submissions = submissions.filter((s: any) => s.id !== id);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    logAction(req.user.id, req.user.name, 'Delete Submission', id);
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

// --- Stats ---
app.get('/api/stats', (req, res) => {
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

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
