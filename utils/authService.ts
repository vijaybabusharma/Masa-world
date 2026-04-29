
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
            const data = await res.json();
            if (res.ok) {
                return { user: data.user };
            }
            return { user: null, message: data.message || 'Login failed' };
        } catch (err) {
            return { user: null, message: 'Server error' };
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
            const data = await res.json();
            return { success: res.ok, message: data.message };
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    },

    verifyOtp: async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            return { success: res.ok, message: data.message };
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    },

    resetPassword: async (email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch(`${API_BASE}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await res.json();
            return { success: res.ok, message: data.message };
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    }
};
