
import { AdminUser, UserRole } from '../types';

// Simulating a secure backend database using LocalStorage
const DB_KEY = 'masa_admin_db_v1';
const SESSION_KEY = 'masa_admin_session_token';
const REMEMBER_KEY = 'masa_admin_remember_token';

// Simple text encoder for basic obfuscation (Simulating password hashing)
// In a real production app, passwords would be hashed on the server (e.g., bcrypt).
const hash = (str: string) => btoa(str).split('').reverse().join('');

// Default Seed Users (Created only if DB doesn't exist)
const DEFAULT_USERS = [
    { 
        id: 'u1', 
        name: 'Super Admin', 
        email: 'vijaybabusharma0@gmail.com', 
        role: 'Super Admin', 
        passwordHash: hash('Masa@world@vijay123'), // Password: Masa@world@vijay123
        avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=1E3A8A&color=fff' 
    },
    { 
        id: 'u2', 
        name: 'Content Editor', 
        email: 'editor@masa.world', 
        role: 'Editor', 
        passwordHash: hash('editor@123'), // Password: editor@123
        avatar: 'https://ui-avatars.com/api/?name=Content+Editor&background=F97316&color=fff' 
    },
    { 
        id: 'u3', 
        name: 'Event Manager', 
        email: 'event@masa.world', 
        role: 'Event Manager', 
        passwordHash: hash('event@123'), // Password: event@123
        avatar: 'https://ui-avatars.com/api/?name=Event+Manager&background=10B981&color=fff'
    }
];

// Initialize DB if empty
const initDB = () => {
    if (typeof window !== 'undefined' && !localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_USERS));
    }
};

export const AuthService = {
    init: initDB,

    getUsers: (): AdminUser[] => {
        initDB();
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        return users.map((u: any) => {
            const { passwordHash, ...safeUser } = u;
            return safeUser;
        });
    },

    saveUser: (user: AdminUser, password?: string): AdminUser => {
        initDB();
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        const index = users.findIndex((u: any) => u.id === user.id);
        
        let userToSave: any;
        if (index > -1) { // Update
            userToSave = { ...users[index], ...user };
            if (password) {
                userToSave.passwordHash = hash(password);
            }
        } else { // Create
             userToSave = { 
                ...user, 
                id: `u${Date.now()}`,
                passwordHash: hash(password || 'password123'), // Default password for new users
                avatar: `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`
             };
        }
        
        if (index > -1) users[index] = userToSave;
        else users.push(userToSave);
        
        localStorage.setItem(DB_KEY, JSON.stringify(users));
        const { passwordHash, ...safeUser } = userToSave;
        return safeUser;
    },

    deleteUser: (userId: string): void => {
        initDB();
        let users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        users = users.filter((u: any) => u.id !== userId);
        localStorage.setItem(DB_KEY, JSON.stringify(users));
    },

    changePassword: (userId: string, newPassword: string): void => {
        initDB();
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        const index = users.findIndex((u: any) => u.id === userId);
        if (index > -1) {
            users[index].passwordHash = hash(newPassword);
            localStorage.setItem(DB_KEY, JSON.stringify(users));
        }
    },

    /**
     * Authenticate user against the local "database"
     */
    login: async (email: string, password: string, remember: boolean = false): Promise<AdminUser> => {
        initDB(); // Ensure DB exists
        return new Promise((resolve, reject) => {
            setTimeout(() => { // Simulate network latency
                const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash(password));
                
                if (user) {
                    const { passwordHash, ...safeUser } = user;
                    // Create session
                    const session = {
                        user: safeUser,
                        token: Math.random().toString(36).substring(2) + Date.now().toString(36),
                        expiry: Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000) // 30 days or 24 hours
                    };
                    
                    if (remember) {
                        localStorage.setItem(REMEMBER_KEY, JSON.stringify(session));
                    } else {
                        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
                    }
                    
                    resolve(safeUser as AdminUser);
                } else {
                    reject(new Error('Invalid email or password.'));
                }
            }, 1000);
        });
    },

    /**
     * Clear session and redirect
     */
    logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(REMEMBER_KEY);
        // Dispatch event to update UI immediately if needed
        window.dispatchEvent(new Event('auth-logout'));
    },

    /**
     * Get currently logged-in user if session is valid
     */
    getSession: (): AdminUser | null => {
        let sessionStr = sessionStorage.getItem(SESSION_KEY);
        let source = 'session';

        if (!sessionStr) {
            sessionStr = localStorage.getItem(REMEMBER_KEY);
            source = 'local';
        }

        if (!sessionStr) return null;
        
        try {
            const session = JSON.parse(sessionStr);
            if (session.expiry < Date.now()) {
                sessionStorage.removeItem(SESSION_KEY);
                localStorage.removeItem(REMEMBER_KEY);
                return null;
            }
            // Refresh session if using localStorage to keep it alive
            if (source === 'local') {
                 session.expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
                 localStorage.setItem(REMEMBER_KEY, JSON.stringify(session));
            }
            return session.user as AdminUser;
        } catch {
            return null;
        }
    },

    /**
     * Simulate password reset flow
     */
    resetPassword: async (email: string): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would call an API endpoint to send an email.
                console.log(`[AuthService] Password reset link sent to ${email}`);
                resolve(); 
            }, 1500);
        });
    }
};
