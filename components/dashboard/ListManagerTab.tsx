
import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Trash2, 
    CheckCircle2, 
    Clock, 
    AlertCircle,
    Eye,
    Download,
    Filter
} from 'lucide-react';
import { motion } from 'motion/react';

interface ListManagerTabProps {
    type: 'submissions' | 'donations' | 'comments';
    title: string;
}

const ListManagerTab: React.FC<ListManagerTabProps> = ({ type, title }) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchItems = async () => {
        setLoading(true);
        try {
            const endpoint = type === 'submissions' ? '/api/forms/submissions' : type === 'donations' ? '/api/donations' : '/api/comments';
            const res = await fetch(endpoint);
            const data = await res.json();
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
        if (!confirm('Are you sure you want to delete this?')) return;
        try {
            const endpoint = type === 'submissions' ? `/api/forms/submissions/${id}` : type === 'donations' ? `/api/donations/${id}` : `/api/comments/${id}`;
            await fetch(endpoint, { method: 'DELETE' });
            await fetchItems();
        } catch (err) {
            console.error(`Failed to delete ${type}`, err);
        }
    };

    const handleStatusUpdate = async (id: any, status: string) => {
        try {
            const endpoint = type === 'submissions' ? `/api/forms/submissions/${id}` : `/api/comments/${id}`;
            await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            await fetchItems();
        } catch (err) {
            console.error(`Failed to update status`, err);
        }
    };

    const filteredItems = items.filter(item => {
        const searchStr = JSON.stringify(item).toLowerCase();
        return searchStr.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                    <p className="text-gray-500 font-medium mt-1">Review and manage incoming {type}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search everything..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-6 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-masa-orange/20 focus:border-masa-orange transition-all w-64 shadow-sm"
                        />
                    </div>
                    <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 active:scale-95">
                        <Download className="h-4 w-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Details</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status / Amount</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">Loading...</td>
                                </tr>
                            ) : filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">No records found.</td>
                                </tr>
                            ) : filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                {type === 'donations' ? item.name : type === 'submissions' ? item.data?.name || item.data?.email || 'Anonymous' : item.authorName}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                                {type === 'donations' ? item.email : type === 'submissions' ? item.type : item.authorEmail}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        {type === 'donations' ? (
                                            <span className="text-sm font-bold text-emerald-600">₹{item.amount}</span>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Approved' || item.status === 'Read' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.status}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-xs font-medium">{new Date(item.timestamp || item.date).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-masa-orange hover:bg-masa-orange/5 rounded-lg transition-all">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            {type !== 'donations' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(item.id, item.status === 'New' ? 'Read' : 'Approved')}
                                                    className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                >
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                                                <Trash2 className="h-4 w-4" />
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

export default ListManagerTab;
