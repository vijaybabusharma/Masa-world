import React, { useState } from 'react';
import { AdminUser } from '../../types';
import { AuthService } from '../../utils/authService';
import { ModuleHeader, InputField } from './AdminComponents';

const ProfileModule: React.FC<{ user: AdminUser }> = ({ user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        if (!currentPassword) {
            setError('Current password is required');
            return;
        }
        
        setLoading(true);
        try {
            await AuthService.changePassword(user.id, newPassword, currentPassword);
            setMessage('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="My Profile" />
            <div className="bg-white p-6 rounded-lg border max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-2 border-gray-200" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                        <p className="text-gray-500">{user.email}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2 font-bold">{user.role}</span>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h4 className="font-bold text-gray-800 mb-4">Change Password</h4>
                    {message && <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                    
                    <div className="space-y-4">
                        <InputField 
                            label="Current Password" 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                        />
                        <InputField 
                            label="New Password" 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                        <InputField 
                            label="Confirm New Password" 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        <button 
                            onClick={handleChangePassword} 
                            disabled={loading}
                            className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModule;
