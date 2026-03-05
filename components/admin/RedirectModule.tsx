import React, { useState, useEffect } from 'react';
import { Redirect } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, SelectField } from './AdminComponents';
import { PlusIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '../icons/FeatureIcons';

const RedirectModule: React.FC = () => {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [newRedirect, setNewRedirect] = useState<Partial<Redirect>>({ oldUrl: '', newUrl: '', type: 301 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRedirects();
    }, []);

    const loadRedirects = async () => {
        setLoading(true);
        const data = await ContentManager.getRedirects();
        setRedirects(data);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!newRedirect.oldUrl || !newRedirect.newUrl) return;
        await ContentManager.saveRedirect(newRedirect as Redirect);
        setNewRedirect({ oldUrl: '', newUrl: '', type: 301 });
        loadRedirects();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this redirect?')) {
            await ContentManager.deleteRedirect(id);
            loadRedirects();
        }
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <ModuleHeader title="URL & Redirection Manager" />

            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <h3 className="font-bold text-gray-800">Add New Redirect</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1">
                        <InputField 
                            label="Old URL (e.g., /old-page)" 
                            value={newRedirect.oldUrl} 
                            onChange={e => setNewRedirect({ ...newRedirect, oldUrl: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <InputField 
                            label="New URL (e.g., /new-page)" 
                            value={newRedirect.newUrl} 
                            onChange={e => setNewRedirect({ ...newRedirect, newUrl: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <SelectField 
                            label="Redirect Type" 
                            value={String(newRedirect.type)} 
                            onChange={e => setNewRedirect({ ...newRedirect, type: Number(e.target.value) as 301 | 302 })}
                        >
                            <option value="301">301 (Permanent)</option>
                            <option value="302">302 (Temporary)</option>
                        </SelectField>
                    </div>
                    <button 
                        onClick={handleAdd}
                        className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 h-[42px]"
                    >
                        Add Redirect
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-700">Old URL</th>
                            <th className="p-4 font-bold text-gray-700">New URL</th>
                            <th className="p-4 font-bold text-gray-700">Type</th>
                            <th className="p-4 font-bold text-gray-700">Status</th>
                            <th className="p-4 font-bold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {redirects.map(r => (
                            <tr key={r.id} className="hover:bg-gray-50 group">
                                <td className="p-4 font-mono text-sm text-gray-600">{r.oldUrl}</td>
                                <td className="p-4 font-mono text-sm text-gray-600">{r.newUrl}</td>
                                <td className="p-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${r.type === 301 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {r.type}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {r.active ? (
                                        <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                                            <CheckCircleIcon className="h-4 w-4" /> Active
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-gray-400 text-sm font-bold">
                                            <XCircleIcon className="h-4 w-4" /> Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {redirects.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">No redirects found.</td>
                            </tr>
                        )}
                        {loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">Loading redirects...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                <p className="font-bold mb-1">💡 Pro Tip:</p>
                <p>301 redirects are best for SEO when you've permanently moved a page. 302 redirects are for temporary changes.</p>
            </div>
        </div>
    );
};

export default RedirectModule;
