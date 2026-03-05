import React, { useState, useEffect } from 'react';
import { AdminUser, UserRole } from '../../types';
import { AuthService } from '../../utils/authService';
import { ModuleHeader, InputField, SelectField } from './AdminComponents';

const UserManagerModule: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentUser, setCurrentUser] = useState<Partial<AdminUser> & { password?: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadUsers = async () => {
        try {
            const data = await AuthService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users', err);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleEdit = (user: AdminUser) => { setCurrentUser({ ...user }); setView('edit'); setError(''); };
    const handleNew = () => {
        setCurrentUser({ id: `new-${Date.now()}`, name: '', email: '', role: 'Editor', password: '' });
        setView('edit');
        setError('');
    };
    
    const handleSave = async () => {
        if (currentUser && currentUser.name && currentUser.email) {
            setLoading(true);
            setError('');
            try {
                await AuthService.saveUser(currentUser as AdminUser, currentUser.password);
                await loadUsers();
                setView('list');
                setCurrentUser(null);
            } catch (err: any) {
                setError(err.message || 'Failed to save user');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Name and Email are required.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await AuthService.deleteUser(id);
                await loadUsers();
            } catch (err: any) {
                alert(err.message || 'Failed to delete user');
            }
        }
    };

    if (view === 'edit' && currentUser) {
        return (
            <div className="animate-fade-in-up pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <button onClick={() => setView('list')} className="text-[10px] font-black text-masa-orange uppercase tracking-widest hover:underline mb-2 flex items-center gap-2">
                            &larr; Back to Users
                        </button>
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                            {currentUser.id && !currentUser.id.startsWith('new') ? `Editing: ${currentUser.name}` : 'Add New User'}
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setView('list')} className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest bg-gray-900 text-white hover:bg-masa-orange transition-all disabled:opacity-50 shadow-lg shadow-gray-900/10">
                            {loading ? 'Saving...' : 'Save User Profile'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4">Basic Information</h3>
                            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100">{error}</div>}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} />
                                <InputField label="Email Address" type="email" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField label="System Role" value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as UserRole })}>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin / Manager">Admin / Manager</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Content Creator">Content Creator</option>
                                    <option value="Volunteer Coordinator">Volunteer Coordinator</option>
                                    <option value="Accountant / Finance">Accountant / Finance</option>
                                </SelectField>
                                <SelectField label="Account Status" value={currentUser.status || 'Active'} onChange={e => setCurrentUser({ ...currentUser, status: e.target.value as any })}>
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                </SelectField>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4">Security</h3>
                            <InputField 
                                label={currentUser.id && !currentUser.id.startsWith('new') ? "Update Password (leave blank to keep current)" : "Initial Password"} 
                                type="password" 
                                value={currentUser.password || ''} 
                                onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} 
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4 mb-6">User Avatar</h3>
                            <div className="relative inline-block group">
                                <img 
                                    src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=random`} 
                                    alt={currentUser.name} 
                                    className="w-32 h-32 rounded-[2rem] border-4 border-gray-50 shadow-lg object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Change</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-medium text-gray-400 mt-4 italic">Avatars are currently auto-generated based on name if not provided.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Team Access" onAction={handleNew} actionLabel="Add New Team Member" />
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-400 uppercase font-black text-[10px] tracking-[0.2em] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6">Identity</th>
                                <th className="px-8 py-6">System Role</th>
                                <th className="px-8 py-6">Account Status</th>
                                <th className="px-8 py-6">Last Activity</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm" />
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                            </div>
                                            <div>
                                                <div className="font-black text-gray-900 uppercase tracking-tight text-base group-hover:text-masa-orange transition-colors">{user.name}</div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 text-[9px] rounded-lg font-black uppercase tracking-widest ${
                                            user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 
                                            user.role === 'Admin / Manager' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>{user.role}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 text-[9px] rounded-lg font-black uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{user.status || 'Active'}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never Active'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <div className="flex items-center justify-end gap-4">
                                            <button onClick={() => handleEdit(user)} className="text-[10px] font-black text-gray-900 uppercase tracking-widest hover:text-masa-orange transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(user.id)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors">Revoke</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagerModule;
