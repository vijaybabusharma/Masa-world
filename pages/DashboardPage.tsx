
import React, { useEffect, useState } from 'react';
import { NavigationProps } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from '../components/dashboard/Sidebar';
import OverviewTab from '../components/dashboard/OverviewTab';
import ManualEditorTab from '../components/dashboard/ManualEditorTab';
import ContentManagerTab from '../components/dashboard/ContentManagerTab';
import ListManagerTab from '../components/dashboard/ListManagerTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import { AuthService } from '../utils/authService';

const DashboardPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await AuthService.me();
            if (userData) {
                setUser(userData);
                setIsLoggedIn(true);
            } else {
                navigateTo('admin-login');
            }
        };
        checkAuth();
    }, [navigateTo]);

    const handleLogout = async () => {
        await AuthService.logout();
        sessionStorage.removeItem('masa_member_auth');
        navigateTo('home');
    };

    if (!isLoggedIn || !user) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-masa-orange border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Securing Dashboard...</p>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'pages': return <ContentManagerTab type="pages" title="Site Pages" />;
            case 'posts': return <ContentManagerTab type="posts" title="Blog Posts" />;
            case 'events': return <ContentManagerTab type="events" title="Events" />;
            case 'gallery': return <ContentManagerTab type="gallery" title="Gallery" />;
            case 'submissions': return <ListManagerTab type="submissions" title="Form Submissions" />;
            case 'donations': return <ListManagerTab type="donations" title="Donations" />;
            case 'comments': return <ListManagerTab type="comments" title="Comments" />;
            case 'manual': return <ManualEditorTab />;
            case 'account': return <SettingsTab />;
            default: return (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                        <span className="text-2xl font-bold">?</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Section Under Development</h3>
                        <p className="text-gray-500 max-w-xs mx-auto">We're building a polished UI for this section. Use the <span className="text-masa-orange font-bold">Manual Editor</span> to manage this data for now.</p>
                    </div>
                    <button 
                        onClick={() => setActiveTab('manual')}
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-masa-orange transition-all"
                    >
                        Go to Manual Editor
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
            
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-1 bg-masa-orange rounded-full"></div>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            {activeTab.replace('-', ' ')}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-gray-900 leading-none">{user.name || user.email.split('@')[0]}</span>
                            <span className="text-[10px] font-bold text-masa-orange uppercase tracking-widest mt-1">{user.role}</span>
                        </div>
                        <button 
                            onClick={() => setActiveTab('account')}
                            className="w-10 h-10 rounded-xl overflow-hidden border-2 border-gray-50 hover:border-masa-orange transition-all duration-300 shadow-sm bg-masa-charcoal flex items-center justify-center text-white"
                        >
                            {user.name ? user.name[0] : user.email[0].toUpperCase()}
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-7xl mx-auto h-full"
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
