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
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Users</button>
                <ModuleHeader title={currentUser.id && !currentUser.id.startsWith('new') ? 'Edit User' : 'New User'} />
                <div className="bg-white p-6 rounded-lg border space-y-4 max-w-2xl">
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
                    <InputField label="Name" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} />
                    <InputField label="Email" type="email" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} />
                    <SelectField label="Role" value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as UserRole })}>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin / Manager">Admin / Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Volunteer Coordinator">Volunteer Coordinator</option>
                        <option value="Accountant / Finance">Accountant / Finance</option>
                    </SelectField>
                    <SelectField label="Status" value={currentUser.status || 'Active'} onChange={e => setCurrentUser({ ...currentUser, status: e.target.value as any })}>
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                    </SelectField>
                    <InputField 
                        label={currentUser.id && !currentUser.id.startsWith('new') ? "New Password (leave blank to keep current)" : "Password"} 
                        type="password" 
                        value={currentUser.password || ''} 
                        onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} 
                    />
                    <button onClick={handleSave} disabled={loading} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold mt-4 disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save User'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="User Management" onAction={handleNew} actionLabel="Add User" />
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                 <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold">
                        <tr>
                            <th className="p-4 text-left">User</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Last Login</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <div className="font-bold text-gray-800">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                                        user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 
                                        user.role === 'Admin / Manager' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>{user.role}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status || 'Active'}</span>
                                </td>
                                <td className="p-4 text-xs text-gray-500">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleEdit(user)} className="text-masa-blue font-bold mr-3">Edit</button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagerModule;
