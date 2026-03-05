import React, { useState, useEffect } from 'react';
import { TrashItem } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader } from './AdminComponents';
import { TrashIcon, ArrowPathIcon, EyeIcon } from '../icons/FeatureIcons';

const TrashModule: React.FC = () => {
    const [trash, setTrash] = useState<TrashItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrash();
    }, []);

    const loadTrash = async () => {
        setLoading(true);
        const data = await ContentManager.getTrash();
        setTrash(data);
        setLoading(false);
    };

    const handleRestore = async (id: string) => {
        if (confirm('Restore this item to its original location?')) {
            await ContentManager.restoreFromTrash(id);
            loadTrash();
        }
    };

    const handlePermanentDelete = async (id: string) => {
        if (confirm('PERMANENTLY DELETE this item? This action cannot be undone.')) {
            await ContentManager.permanentDelete(id);
            loadTrash();
        }
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <ModuleHeader title="Trash Bin" />

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-700">Item</th>
                            <th className="p-4 font-bold text-gray-700">Type</th>
                            <th className="p-4 font-bold text-gray-700">Deleted By</th>
                            <th className="p-4 font-bold text-gray-700">Deleted At</th>
                            <th className="p-4 font-bold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {trash.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 group">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800">{item.data.title || item.data.name || 'Untitled Item'}</div>
                                    <div className="text-xs text-gray-500 font-mono">{item.originalId}</div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 capitalize">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{item.deletedBy}</td>
                                <td className="p-4 text-sm text-gray-600">{new Date(item.deletedAt).toLocaleString()}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button 
                                        onClick={() => alert(JSON.stringify(item.data, null, 2))}
                                        className="text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors"
                                        title="Preview Data"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleRestore(item.id)}
                                        className="text-masa-blue hover:bg-blue-50 p-2 rounded transition-colors"
                                        title="Restore"
                                    >
                                        <ArrowPathIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handlePermanentDelete(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                        title="Permanently Delete"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {trash.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">Trash is empty.</td>
                            </tr>
                        )}
                        {loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">Loading trash...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-sm text-orange-800">
                <p className="font-bold mb-1">⚠️ Warning:</p>
                <p>Items in the trash can be restored. Permanently deleting an item removes it from the database forever.</p>
            </div>
        </div>
    );
};

export default TrashModule;
