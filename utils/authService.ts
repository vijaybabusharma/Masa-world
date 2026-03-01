import { AdminUser } from '../types';

const API_URL = '/api/auth';

export const AuthService = {
    init: () => {
        // No-op for server-side auth
    },

    getUsers: async (): Promise<AdminUser[]> => {
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.error('Failed to fetch users', err);
            return [];
        }
    },

    saveUser: async (user: AdminUser, password?: string): Promise<AdminUser> => {
        const method = user.id.startsWith('u') && user.id.length > 5 ? 'PUT' : 'POST'; // Simple check, better to rely on ID existence
        // Actually, for create we use POST /api/users, for update PUT /api/users/:id
        // But the current UI might pass a partial user or new user.
        
        // Let's assume if it's a new user (created in UI with Date.now()), we POST.
        // If it's an existing user, we PUT.
        
        // However, the UI in AdminDashboardPage might need adjustment.
        // For now, let's implement a smart save.
        
        if (user.id && !user.id.startsWith('new')) {
             const res = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, password })
            });
            if (!res.ok) throw new Error('Failed to save user');
            return res.json();
        } else {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, password })
            });
            if (!res.ok) throw new Error('Failed to create user');
            return res.json();
        }
    },

    deleteUser: async (userId: string): Promise<void> => {
        const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to delete user');
        }
    },

    changePassword: async (userId: string, newPassword: string, currentPassword?: string): Promise<void> => {
        // The backend endpoint /api/auth/change-password expects currentPassword and newPassword
        // The UI needs to provide currentPassword.
        // If this is an admin changing another user's password, we use the saveUser (PUT) method.
        // If this is the user changing their own password, we use /api/auth/change-password.
        
        if (currentPassword) {
            const res = await fetch(`${API_URL}/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            if (!res.ok) {
                 const err = await res.json();
                 throw new Error(err.message || 'Failed to change password');
            }
        } else {
            // Admin resetting password for someone else
             await AuthService.saveUser({ id: userId } as AdminUser, newPassword);
        }
    },

    login: async (email: string, password: string, remember: boolean = false): Promise<AdminUser> => {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Invalid credentials');
        }

        const data = await res.json();
        return data.user;
    },

    logout: async () => {
        await fetch(`${API_URL}/logout`, { method: 'POST' });
        window.dispatchEvent(new Event('auth-logout'));
    },

    /**
     * Check if user is authenticated via API
     */
    checkSession: async (): Promise<AdminUser | null> => {
        try {
            const res = await fetch(`${API_URL}/me`);
            if (res.ok) {
                const data = await res.json();
                return data.user;
            }
            return null;
        } catch {
            return null;
        }
    },

    // Deprecated synchronous method, kept for compatibility but will return null initially
    getSession: (): AdminUser | null => {
        // This cannot be synchronous with a real backend.
        // We will return null and let the component use checkSession.
        return null;
    },

    forgotPassword: async (email: string): Promise<void> => {
        const res = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to send reset link');
        }
    },

    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        const res = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to reset password');
        }
    }
};
