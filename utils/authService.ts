
import { AdminUser, AuthState } from '../types';

const API_BASE = '/api/auth';

export const AuthService = {
    login: async (email: string, password: string): Promise<{ user: Partial<AdminUser> | null; message?: string }> => {
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                if (res.ok) {
                    return { user: data.user };
                }
                return { user: null, message: data.message || 'Login failed' };
            } else {
                const text = await res.text();
                console.error('Non-JSON response:', text);
                return { user: null, message: `Server error: Received non-JSON response from server.` };
            }
        } catch (err) {
            console.error('Fetch error:', err);
            return { user: null, message: `Connection error: ${err instanceof Error ? err.message : 'Unknown error'}` };
        }
    },

    me: async (): Promise<Partial<AdminUser> | null> => {
        try {
            const res = await fetch(`${API_BASE}/me`);
            if (res.ok) {
                return await res.json();
            }
            return null;
        } catch (err) {
            return null;
        }
    },

    logout: async () => {
        await fetch(`${API_BASE}/logout`, { method: 'POST' });
    },

    changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            const data = await res.json();
            return { success: res.ok, message: data.message };
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    },

    forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                return { success: res.ok, message: data.message };
            } else {
                const text = await res.text();
                console.error('Non-JSON response (forgotPassword):', text);
                return { success: false, message: 'Server error: Received non-JSON response' };
            }
        } catch (err) {
            console.error('Fetch error (forgotPassword):', err);
            return { success: false, message: `Connection error: ${err instanceof Error ? err.message : 'Unknown error'}` };
        }
    },

    verifyOtp: async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                return { success: res.ok, message: data.message };
            } else {
                const text = await res.text();
                console.error('Non-JSON response (verifyOtp):', text);
                return { success: false, message: 'Server error: Received non-JSON response' };
            }
        } catch (err) {
            console.error('Fetch error (verifyOtp):', err);
            return { success: false, message: `Connection error: ${err instanceof Error ? err.message : 'Unknown error'}` };
        }
    },

    resetPassword: async (email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                return { success: res.ok, message: data.message };
            } else {
                const text = await res.text();
                console.error('Non-JSON response (resetPassword):', text);
                return { success: false, message: 'Server error: Received non-JSON response' };
            }
        } catch (err) {
            console.error('Fetch error (resetPassword):', err);
            return { success: false, message: `Connection error: ${err instanceof Error ? err.message : 'Unknown error'}` };
        }
    }
};
