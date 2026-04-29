
import React, { useEffect, useState } from 'react';
import { 
    Users, 
    Heart, 
    Calendar, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const OverviewTab: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-400 font-medium">Loading analytics...</div>;

    const cards = [
        { label: 'Total Donations', value: stats?.donations || 0, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', trend: '+12%', up: true },
        { label: 'New Volunteers', value: stats?.volunteers || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+5%', up: true },
        { label: 'Member Requests', value: stats?.members || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '-2%', up: false },
        { label: 'Upcoming Events', value: 4, icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50', trend: 'Stable', up: true },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-500 font-medium mt-1">Real-time impact and engagement metrics.</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Last updated: Just now</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div 
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${card.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {card.trend} {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</h3>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-xl tracking-tight">Recent Activity</h3>
                        <button className="text-xs font-bold text-masa-orange uppercase tracking-wider hover:underline">View All Logs</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { user: 'Admin', action: 'Updated Homepage Slider', time: '2 hours ago', icon: TrendingUp, color: 'bg-masa-orange' },
                            { user: 'System', action: 'New Donation Received (₹5,000)', time: '5 hours ago', icon: Heart, color: 'bg-rose-500' },
                            { user: 'Editor', action: 'Published Blog Post: "Youth Impact"', time: '1 day ago', icon: Newspaper, iconType: true },
                            { user: 'Admin', action: 'Modified Site Settings', time: '2 days ago', icon: Settings, iconType: true },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${item.color || 'bg-gray-900'}`}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0">
                                    <p className="text-sm font-bold text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">By {item.user} • {item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-masa-orange/20 rounded-full blur-[60px] group-hover:bg-masa-orange/30 transition-colors duration-500"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-8">
                            <div className="w-12 h-12 bg-masa-orange rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-masa-orange/20">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight mb-3">System Health</h3>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">All systems are operational. Manual data synchronization is active.</p>
                        </div>
                        <div className="mt-auto space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Database</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Connected
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Storage</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> 12% Used
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mock icons for the list
const Newspaper = (props: any) => <Calendar {...props} />;
const Settings = (props: any) => <TrendingUp {...props} />;

export default OverviewTab;
