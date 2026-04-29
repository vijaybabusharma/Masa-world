
import React from 'react';
import { 
    LayoutDashboard, 
    FileText, 
    Newspaper, 
    Calendar, 
    Image as ImageIcon, 
    MessageSquare, 
    Inbox, 
    IndianRupee, 
    Settings, 
    Navigation, 
    Database, 
    Trash2, 
    History,
    LogOut,
    ChevronRight
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'Main' },
        { id: 'pages', label: 'Pages', icon: FileText, group: 'Content' },
        { id: 'posts', label: 'Blog Posts', icon: Newspaper, group: 'Content' },
        { id: 'events', label: 'Events', icon: Calendar, group: 'Content' },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, group: 'Content' },
        { id: 'comments', label: 'Comments', icon: MessageSquare, group: 'Interactions' },
        { id: 'submissions', label: 'Submissions', icon: Inbox, group: 'Interactions' },
        { id: 'donations', label: 'Donations', icon: IndianRupee, group: 'Finance' },
        { id: 'settings', label: 'Site Settings', icon: Settings, group: 'System' },
        { id: 'account', label: 'Account Settings', icon: LogOut, group: 'System' },
        { id: 'navigation', label: 'Navigation', icon: Navigation, group: 'System' },
        { id: 'manual', label: 'Manual Editor', icon: Database, group: 'Advanced' },
        { id: 'trash', label: 'Trash Bin', icon: Trash2, group: 'Advanced' },
        { id: 'revisions', label: 'Revisions', icon: History, group: 'Advanced' },
    ];

    const groups = ['Main', 'Content', 'Interactions', 'Finance', 'System', 'Advanced'];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-y-auto scrollbar-hide">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 bg-masa-orange rounded-lg flex items-center justify-center font-bold text-white shadow-sm">M</div>
                <h1 className="text-lg font-bold tracking-tight uppercase">Control<span className="text-masa-orange">Hub</span></h1>
            </div>

            <nav className="flex-1 p-4 space-y-8">
                {groups.map(group => (
                    <div key={group}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">{group}</p>
                        <div className="space-y-1">
                            {menuItems.filter(item => item.group === group).map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                                        activeTab === item.id 
                                            ? 'bg-masa-orange/10 text-masa-orange shadow-sm' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-masa-orange' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                                    </div>
                                    {activeTab === item.id && <ChevronRight className="h-3 w-3" />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-50">
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 rounded-xl"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
