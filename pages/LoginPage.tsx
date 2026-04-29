
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { AuthService } from '../utils/authService';

const LoginPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await AuthService.login(email, password);
        if (result.user) {
            sessionStorage.setItem('masa_member_auth', 'true');
            navigateTo('admin/dashboard');
        } else {
            setError(result.message || 'Invalid credentials. Please try again.');
        }
        setIsSubmitting(false);
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        const result = await AuthService.forgotPassword(email);
        if (result.success) {
            setMessage('OTP has been sent to your email.');
            setMode('reset');
        } else {
            setError(result.message);
        }
        setIsSubmitting(false);
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await AuthService.resetPassword(email, otp, newPassword);
        if (result.success) {
            setMessage('Password reset successful. Please login.');
            setMode('login');
            setPassword('');
        } else {
            setError(result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4 py-20">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-center mb-1 text-masa-charcoal uppercase tracking-tight">
                        {mode === 'login' ? 'Secure Login' : mode === 'forgot' ? 'Reset Access' : 'Create New Password'}
                    </h2>
                    <p className="text-center text-gray-500 mb-8 font-medium">
                        {mode === 'login' ? 'Welcome back! Please enter your credentials.' : mode === 'forgot' ? 'Enter your email to receive a secure OTP.' : 'Verify your identity and choose a strong password.'}
                    </p>
                    
                    {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 font-medium">{error}</p>}
                    {message && <p className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm mb-6 border border-emerald-100 font-medium">{message}</p>}

                    {mode === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                            <div className="text-right">
                                <button 
                                    type="button"
                                    onClick={() => setMode('forgot')}
                                    className="text-sm font-bold text-masa-orange hover:underline focus:outline-none"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-masa-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-masa-orange transition-all duration-300 shadow-lg shadow-gray-200 disabled:bg-gray-300"
                            >
                                {isSubmitting ? 'Verifying...' : 'Sign In'}
                            </button>
                        </form>
                    )}

                    {mode === 'forgot' && (
                        <form onSubmit={handleForgot} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Registration Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange outline-none transition-all font-medium"
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-masa-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-masa-orange transition-all duration-300 disabled:bg-gray-300"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Secuity OTP'}
                            </button>
                            <div className="text-center">
                                <button 
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-sm font-bold text-gray-400 hover:text-masa-charcoal transition-colors"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'reset' && (
                        <form onSubmit={handleReset} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Verification Code (OTP)</label>
                                <input 
                                    type="text" 
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange outline-none font-mono text-center text-2xl tracking-[0.5em]"
                                    required
                                    maxLength={6}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Secure Password</label>
                                <input 
                                    type="password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange outline-none"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-masa-orange text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-masa-charcoal transition-all duration-300 shadow-lg shadow-orange-100 disabled:bg-gray-300"
                            >
                                {isSubmitting ? 'Processing...' : 'Confirm Reset'}
                            </button>
                            <div className="text-center">
                                <button 
                                    type="button"
                                    onClick={() => setMode('forgot')}
                                    className="text-sm font-bold text-gray-400 hover:text-masa-charcoal transition-colors"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}

                </div>
                 <p className="text-center text-gray-400 mt-8 font-medium">
                    Facing issues?{' '}
                    <button onClick={() => navigateTo('contact')} className="font-bold text-masa-orange hover:underline decoration-2 underline-offset-4">
                        Contact Support
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
