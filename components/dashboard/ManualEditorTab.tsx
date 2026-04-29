
import React, { useState, useEffect } from 'react';
import { Database, Save, RefreshCw, AlertTriangle, FileJson, Search } from 'lucide-react';
import { motion } from 'motion/react';

const ManualEditorTab: React.FC = () => {
    const [collections] = useState([
        { id: 'settings', label: 'Global Settings', endpoint: '/api/content/settings' },
        { id: 'pages', label: 'Pages Metadata', endpoint: '/api/content/pages' },
        { id: 'posts', label: 'Blog Posts', endpoint: '/api/content/posts' },
        { id: 'events', label: 'Events', endpoint: '/api/content/events' },
        { id: 'gallery', label: 'Gallery Items', endpoint: '/api/content/gallery' },
        { id: 'redirects', label: 'Redirects', endpoint: '/api/redirects' },
        { id: 'submissions', label: 'Form Submissions', endpoint: '/api/forms/submissions' },
        { id: 'donations', label: 'Donations', endpoint: '/api/donations' },
    ]);

    const [activeCollection, setActiveCollection] = useState(collections[0]);
    const [jsonData, setJsonData] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const fetchData = async (collection: typeof collections[0]) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(collection.endpoint);
            const data = await res.json();
            setJsonData(JSON.stringify(data, null, 4));
        } catch (err) {
            setError('Failed to fetch data from server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeCollection);
    }, [activeCollection]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(false);
        try {
            const parsed = JSON.parse(jsonData);
            const res = await fetch(activeCollection.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsed)
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError('Server rejected the update.');
            }
        } catch (err) {
            setError('Invalid JSON format. Please check your syntax.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Manual Data Editor</h2>
                    <p className="text-gray-500 font-medium mt-1">Directly manipulate the site's core JSON data structures.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => fetchData(activeCollection)}
                        className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-600 uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-gray-900/20 text-xs font-bold uppercase tracking-wider hover:bg-masa-orange transition-all active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-8 min-h-[600px]">
                {/* Sidebar */}
                <div className="col-span-3 space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Collections</p>
                    {collections.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCollection(c)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                activeCollection.id === c.id 
                                    ? 'bg-masa-orange text-white shadow-md' 
                                    : 'bg-white text-gray-600 border border-gray-100 hover:border-masa-orange/30'
                            }`}
                        >
                            <FileJson className="h-4 w-4" />
                            <span className="text-sm font-bold tracking-tight">{c.label}</span>
                        </button>
                    ))}
                    
                    <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                        <div className="flex items-center gap-2 text-amber-700 mb-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Warning</span>
                        </div>
                        <p className="text-[11px] text-amber-600 font-medium leading-relaxed">
                            Directly editing JSON data can break the site if the structure is incorrect. Always keep a backup of the data before saving.
                        </p>
                    </div>
                </div>

                {/* Editor */}
                <div className="col-span-9 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-masa-orange rounded-full"></div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{activeCollection.endpoint}</span>
                        </div>
                        {success && (
                            <motion.span 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest"
                            >
                                Changes saved successfully!
                            </motion.span>
                        )}
                        {error && (
                            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{error}</span>
                        )}
                    </div>
                    <textarea
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        spellCheck={false}
                        className="flex-1 p-8 font-mono text-sm text-gray-800 focus:outline-none resize-none bg-gray-50/30 selection:bg-masa-orange/20"
                        placeholder="Loading data..."
                    />
                </div>
            </div>
        </div>
    );
};

export default ManualEditorTab;
