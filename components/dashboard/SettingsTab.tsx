
import React, { useState } from 'react';
import { AuthService } from '../../utils/authService';
import { ShieldCheck, Lock, User, Mail, Save } from 'lucide-react';

const SettingsTab: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        const result = await AuthService.changePassword(currentPassword, newPassword);
        if (result.success) {
            setMessage({ text: 'Password updated successfully!', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-2xl">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
                <p className="text-gray-500 font-medium tracking-tight">Manage your administrative credentials and security preferences.</p>
            </header>

            {message.text && (
                <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 border ${
                    message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                }`}>
                    {message.type === 'success' ? <ShieldCheck className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5 opacity-50" />}
                    <span className="font-bold text-sm uppercase tracking-wide">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 gap-10">
                {/* Security Section */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-masa-orange/10 rounded-2xl flex items-center justify-center text-masa-orange">
                            <Lock className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Security & Password</h2>
                            <p className="text-sm text-gray-500 font-medium">Update your login password regularly.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Current Password</label>
                            <input 
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-masa-orange transition-all outline-none"
                                placeholder="Enter current password"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">New Password</label>
                                <input 
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-masa-orange transition-all outline-none"
                                    placeholder="Min 8 characters"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-masa-orange transition-all outline-none"
                                    placeholder="Repeat new password"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-masa-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-masa-orange transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 group flex items-center justify-center gap-2"
                        >
                            <Save className={`h-4 w-4 ${isSubmitting ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
                            {isSubmitting ? 'Updating...' : 'Save Secure Password'}
                        </button>
                    </form>
                </section>

                {/* Profile Information (Read Only or Basic update) */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 opacity-60">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-masa-blue/10 rounded-2xl flex items-center justify-center text-masa-blue">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                            <p className="text-sm text-gray-500 font-medium">Public profile information.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                            <input 
                                type="text"
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-masa-blue outline-none cursor-not-allowed"
                                value="Aisha Sharma"
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email (System Login)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input 
                                    type="email"
                                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-4 text-sm font-medium outline-none cursor-not-allowed"
                                    value="vijaybabusharma0@gmail.com"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsTab;
