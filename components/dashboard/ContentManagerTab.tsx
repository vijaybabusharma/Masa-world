
import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Edit3, 
    Trash2, 
    ExternalLink,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { ContentManager } from '../../utils/contentManager';

interface ContentManagerTabProps {
    type: 'pages' | 'posts' | 'events' | 'gallery';
    title: string;
}

const ContentManagerTab: React.FC<ContentManagerTabProps> = ({ type, title }) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchItems = async () => {
        setLoading(true);
        try {
            let data: any[] = [];
            if (type === 'pages') data = await ContentManager.getPages();
            else if (type === 'posts') data = ContentManager.getPosts();
            else if (type === 'events') data = ContentManager.getEvents();
            else if (type === 'gallery') data = ContentManager.getGalleryItems();
            setItems(data);
        } catch (err) {
            console.error(`Failed to fetch ${type}`, err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [type]);

    const handleDelete = async (id: any) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            if (type === 'pages') await ContentManager.deletePage(id);
            else if (type === 'posts') await ContentManager.deletePost(id);
            else if (type === 'events') await ContentManager.deleteEvent(id);
            else if (type === 'gallery') await ContentManager.deleteGalleryItem(id);
            await fetchItems();
        } catch (err) {
            console.error(`Failed to delete ${type}`, err);
        }
    };

    const filteredItems = items.filter(item => 
        (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || item.summary || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage your site's {type} and their visibility.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-6 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-masa-orange/20 focus:border-masa-orange transition-all w-64 shadow-sm"
                        />
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-masa-orange transition-all shadow-lg shadow-gray-900/10 flex items-center gap-2 active:scale-95">
                        <Plus className="h-4 w-4" /> Create New
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title / Name</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Modified</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">Loading items...</td>
                                </tr>
                            ) : filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">No items found matching your search.</td>
                                </tr>
                            ) : filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            {item.image || item.imageUrl ? (
                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                                                    <img src={item.image || item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                    <FileJson className="h-5 w-5" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title || item.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{item.category || 'General'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.status || 'Draft'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-xs font-medium">{new Date(item.lastModified || item.date || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-masa-orange hover:bg-masa-orange/5 rounded-lg transition-all">
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
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

const FileJson = (props: any) => <AlertCircle {...props} />;

export default ContentManagerTab;
