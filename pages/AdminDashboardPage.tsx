import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AdminUser, AuthState, GlobalSettings, PageMetadata, Post, UserRole, MenuItem, SliderItem, Page, NavItem, MasaEvent, Course, Submission, GalleryItem, DeliveryAreaItem, Testimonial, ProcessStep } from '../types';
import { ContentManager } from '../utils/contentManager';
import { AuthService } from '../utils/authService';
import { getSubmissions, getStats } from '../utils/mockBackend';
import { RichTextEditor } from '../components/RichTextEditor';
import { 
    UsersIcon, HeartIcon, BriefcaseIcon, AcademicCapIcon, CameraIcon, NewspaperIcon, 
    CalendarDaysIcon, LockClosedIcon, ArrowRightIcon, CheckIcon, GlobeIcon, CreditCardIcon, 
    DocumentTextIcon, PresentationChartBarIcon, SearchIcon, EnvelopeIcon, BellIcon, 
    ShieldCheckIcon, ClockIcon, EyeIcon, SparklesIcon, PlusIcon, TrashIcon,
    DocumentCheckIcon, ChatBubbleLeftIcon
} from '../components/icons/FeatureIcons';
import { MenuIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '../components/icons/UiIcons';
import PageEditorModule from '@/components/admin/PageEditorModule';
import FormsManagerModule from '@/components/admin/FormsManagerModule';
import MediaManagerModule from '@/components/admin/MediaManagerModule';
import BlogManagerModule from '@/components/admin/BlogManagerModule';
import SettingsModule from '@/components/admin/SettingsModule';
import EventManagerModule from '@/components/admin/EventManagerModule';
import UserManagerModule from '@/components/admin/UserManagerModule';
import CourseManagerModule from '@/components/admin/CourseManagerModule';
import GalleryManagerModule from '@/components/admin/GalleryManagerModule';
import ButtonManagerModule from '@/components/admin/ButtonManagerModule';
import BackupRestoreModule from '@/components/admin/BackupRestoreModule';
import ProfileModule from '@/components/admin/ProfileModule';
import DonationPanel from '@/components/admin/DonationPanel';
import ActivityLogModule from '@/components/admin/ActivityLogModule';
import SliderManagerModule from '@/components/admin/SliderManagerModule';
import NavigationModule from '@/components/admin/NavigationModule';
import RedirectModule from '@/components/admin/RedirectModule';
import TrashModule from '@/components/admin/TrashModule';
import CommentModerationModule from '@/components/admin/CommentModerationModule';
import { SidebarItem, ToggleSwitch, InputField, TextareaField, SelectField, ModuleHeader } from '@/components/admin/AdminComponents';
import { getAssetUrl } from '../utils/assetHelper';

// --- Dashboard Modules ---
const DashboardHome: React.FC<{ user: AdminUser, setActiveView: (v: string) => void }> = ({ user, setActiveView }) => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) return <div>Loading stats...</div>;

    const statCards = [
        { label: 'Volunteers', value: stats.volunteers, icon: UsersIcon, color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
        { label: 'Donations', value: stats.donations, icon: HeartIcon, color: 'from-red-500 to-red-600', shadow: 'shadow-red-500/20' },
        { label: 'Members', value: stats.members, icon: SparklesIcon, color: 'from-amber-500 to-amber-600', shadow: 'shadow-amber-500/20' },
        { label: 'Queries', value: stats.queries, icon: EnvelopeIcon, color: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20' },
        { label: 'Careers', value: stats.careers, icon: BriefcaseIcon, color: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20' },
        { label: 'Enrollments', value: stats.enrollments, icon: AcademicCapIcon, color: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/20' },
    ];

    return (
        <div className="animate-fade-in-up space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-none mb-2">
                        Welcome, <span className="text-masa-orange">{user.name}</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-base">Here is what's happening on your website today.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-right">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Access Level</p>
                        <p className="text-sm font-bold text-gray-900">{user.role}</p>
                    </div>
                    <div className="w-12 h-12 bg-masa-orange/10 rounded-xl flex items-center justify-center">
                        <ShieldCheckIcon className="h-6 w-6 text-masa-orange" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-[3rem] transition-all duration-300 group-hover:scale-110`}></div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${stat.color} ${stat.shadow} transition-transform duration-300 group-hover:scale-105 shadow-md`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</p>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-masa-orange via-masa-blue to-purple-600 opacity-50"></div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Quick Actions</h3>
                            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Manage your content efficiently</p>
                        </div>
                        <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center">
                            <SparklesIcon className="h-5 w-5 text-masa-orange animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Events', icon: CalendarDaysIcon, view: 'events', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'Blog', icon: NewspaperIcon, view: 'blogs', color: 'text-purple-500', bg: 'bg-purple-50' },
                            { label: 'Inquiries', icon: EnvelopeIcon, view: 'forms', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { label: 'Settings', icon: LockClosedIcon, view: 'settings', color: 'text-orange-500', bg: 'bg-orange-50' },
                        ].map((action, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveView(action.view)} 
                                className="p-4 rounded-2xl text-center transition-all duration-300 group hover:-translate-y-1 border border-gray-100 hover:shadow-md bg-white"
                            >
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 ${action.bg}`}>
                                    <action.icon className={`h-6 w-6 ${action.color}`} />
                                </div>
                                <span className="font-semibold text-[10px] uppercase tracking-wider text-gray-600 group-hover:text-gray-900">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-masa-orange/20 rounded-full blur-[60px] group-hover:bg-masa-orange/30 transition-colors duration-500"></div>
                    
                    <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <span className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">System Online</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">System Health</h3>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Website</span>
                                <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <CheckIcon className="h-4 w-4" /> Operational
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Database</span>
                                <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <CheckIcon className="h-4 w-4" /> Connected
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Version</span>
                                <span className="text-white font-semibold text-xs uppercase tracking-wider bg-white/10 px-2 py-1 rounded-lg">v1.2.0</span>
                            </div>
                        </div>
                        
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border border-white/5 hover:border-white/20 shadow-md">
                            View Full System Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// BlogManagerModule removed (imported)

// CourseManagerModule removed (imported)

// FormsDataModule removed (imported)

// SettingsModule removed (imported)

// EventManagerModule removed (imported)

// UserManagerModule removed (imported)

// ButtonManagerModule removed (imported)

// BackupRestoreModule removed (imported)

// ProfileModule removed (imported)

// --- MAIN PAGE COMPONENT ---
const AdminDashboardPage: React.FC = () => {
    const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
    const [activeView, setActiveView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await AuthService.checkSession();
            if (user) setAuth({ isAuthenticated: true, user });
            setLoading(false);
        };
        checkAuth();
    }, []);

    const handleLogin = (user: AdminUser) => setAuth({ isAuthenticated: true, user });
    const handleLogout = async () => { 
        await AuthService.logout(); 
        setAuth({ isAuthenticated: false, user: null }); 
    };
    const handleSidebarClick = (view: string) => {
        setActiveView(view);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    const hasPermission = (allowedRoles: UserRole[]) => auth.user && allowedRoles.includes(auth.user.role);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-masa-blue"></div></div>;
    if (!auth.isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardHome user={auth.user!} setActiveView={setActiveView} />;
            case 'blogs': return hasPermission(['Super Admin', 'Admin / Manager', 'Editor', 'Content Creator']) ? <BlogManagerModule /> : <p>Permission Denied</p>;
            case 'comments': return hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) ? <CommentModerationModule /> : <p>Permission Denied</p>;
            case 'courses': return hasPermission(['Super Admin', 'Admin / Manager']) ? <CourseManagerModule /> : <p>Permission Denied</p>;
            case 'events': return hasPermission(['Super Admin', 'Admin / Manager']) ? <EventManagerModule /> : <p>Permission Denied</p>;
            case 'gallery': return hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) ? <GalleryManagerModule /> : <p>Permission Denied</p>;
            case 'forms': return hasPermission(['Super Admin', 'Admin / Manager', 'Volunteer Coordinator']) ? <FormsManagerModule /> : <p>Permission Denied</p>;
            case 'users': return hasPermission(['Super Admin']) ? <UserManagerModule /> : <p>Permission Denied</p>;
            case 'backup': return hasPermission(['Super Admin']) ? <BackupRestoreModule /> : <p>Permission Denied</p>;
            case 'settings': return hasPermission(['Super Admin']) ? <SettingsModule /> : <p>Permission Denied</p>;
            case 'buttons': return hasPermission(['Super Admin']) ? <ButtonManagerModule /> : <p>Permission Denied</p>;
            case 'pages': return hasPermission(['Super Admin', 'Admin / Manager']) ? <PageEditorModule /> : <p>Permission Denied</p>;
            case 'media': return hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) ? <MediaManagerModule /> : <p>Permission Denied</p>;
            case 'sliders': return hasPermission(['Super Admin', 'Admin / Manager']) ? <SliderManagerModule /> : <p>Permission Denied</p>;
            case 'navigation': return hasPermission(['Super Admin', 'Admin / Manager']) ? <NavigationModule /> : <p>Permission Denied</p>;
            case 'redirects': return hasPermission(['Super Admin', 'Admin / Manager']) ? <RedirectModule /> : <p>Permission Denied</p>;
            case 'donations': return hasPermission(['Super Admin', 'Accountant / Finance']) ? <DonationPanel /> : <p>Permission Denied</p>;
            case 'logs': return hasPermission(['Super Admin']) ? <ActivityLogModule /> : <p>Permission Denied</p>;
            case 'trash': return hasPermission(['Super Admin']) ? <TrashModule /> : <p>Permission Denied</p>;
            case 'profile': return <ProfileModule user={auth.user!} />;
            default: return <div>Select a module</div>;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-xl`}>
                <div className="h-20 flex items-center px-6 border-b border-white/5 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-masa-orange rounded-lg flex items-center justify-center font-bold text-white">M</div>
                        <span className="font-bold text-base tracking-tight uppercase">Masa<span className="text-masa-orange">Panel</span></span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><XIcon className="h-5 w-5"/></button>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-0.5 custom-scrollbar">
                    <SidebarItem id="dashboard" label="Dashboard" icon={PresentationChartBarIcon} isActive={activeView === 'dashboard'} onClick={() => handleSidebarClick('dashboard')} />
                    
                    <div className="px-4 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Content Engine</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor', 'Content Creator']) && <SidebarItem id="blogs" label="Blog Posts" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => handleSidebarClick('blogs')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="comments" label="Moderation" icon={ChatBubbleLeftIcon} isActive={activeView === 'comments'} onClick={() => handleSidebarClick('comments')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="pages" label="Site Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => handleSidebarClick('pages')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="events" label="Event Calendar" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => handleSidebarClick('events')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="gallery" label="Visual Gallery" icon={EyeIcon} isActive={activeView === 'gallery'} onClick={() => handleSidebarClick('gallery')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="media" label="Media Assets" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="navigation" label="Menu Config" icon={GlobeIcon} isActive={activeView === 'navigation'} onClick={() => handleSidebarClick('navigation')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="sliders" label="Slider Manager" icon={CameraIcon} isActive={activeView === 'sliders'} onClick={() => handleSidebarClick('sliders')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="redirects" label="Redirects" icon={ArrowRightIcon} isActive={activeView === 'redirects'} onClick={() => handleSidebarClick('redirects')} />}

                    <div className="px-4 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Data & CRM</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Volunteer Coordinator']) && <SidebarItem id="forms" label="Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />}
                    {hasPermission(['Super Admin', 'Accountant / Finance']) && <SidebarItem id="donations" label="Finance" icon={CreditCardIcon} isActive={activeView === 'donations'} onClick={() => handleSidebarClick('donations')} />}
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="Team Access" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">System</div>
                        <SidebarItem id="buttons" label="Payments" icon={CreditCardIcon} isActive={activeView === 'buttons'} onClick={() => handleSidebarClick('buttons')} />
                        <SidebarItem id="settings" label="Site Config" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
                        <SidebarItem id="logs" label="Audit Logs" icon={ClockIcon} isActive={activeView === 'logs'} onClick={() => handleSidebarClick('logs')} />
                        <SidebarItem id="trash" label="Trash Bin" icon={TrashIcon} isActive={activeView === 'trash'} onClick={() => handleSidebarClick('trash')} />
                        <SidebarItem id="backup" label="Infrastructure" icon={ShieldCheckIcon} isActive={activeView === 'backup'} onClick={() => handleSidebarClick('backup')} />
                    </>}
                </div>
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <button onClick={() => handleSidebarClick('profile')} className="flex items-center gap-3 group mb-4 w-full text-left">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-sm font-bold text-masa-orange border border-white/10 group-hover:border-masa-orange/50 transition-all duration-300">
                            {auth.user?.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-white truncate tracking-tight">{auth.user?.name}</div>
                            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Profile</div>
                        </div>
                    </button>
                    <button onClick={handleLogout} className="w-full py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-[10px] font-bold text-gray-400 uppercase tracking-wider rounded-xl transition-all duration-300 border border-white/5">Sign Out</button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-6 shadow-sm z-40">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500 hover:text-gray-900"><MenuIcon className="h-6 w-6"/></button>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Live</span>
                        </div>
                        <a href={getAssetUrl('')} target="_blank" className="text-[10px] font-bold text-white uppercase tracking-wider bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-masa-orange transition-all duration-300 shadow-sm">Visit Website</a>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-gray-50/50">{renderView()}</main>
            </div>
        </div>
    );
};

// --- Login Component ---
const AdminLogin: React.FC<{ onLogin: (user: AdminUser) => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'login' | 'forgot'>('login');
    const [resetSent, setResetSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await AuthService.login(email, password, remember);
            onLogin(user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await AuthService.forgotPassword(email);
            setResetSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (view === 'forgot') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-masa-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LockClosedIcon className="h-8 w-8 text-masa-orange" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Reset Password</h2>
                        <p className="text-gray-500 text-sm font-medium mt-2">Enter your email to receive a reset link.</p>
                    </div>
                    {resetSent ? (
                        <div className="text-center animate-fade-in-up">
                            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl mb-6 text-sm font-medium border border-emerald-100">
                                If an account exists with that email, we've sent password reset instructions.
                            </div>
                            <button onClick={() => { setView('login'); setResetSent(false); }} className="text-masa-blue font-black hover:underline uppercase tracking-wide text-xs">Back to Login</button>
                        </div>
                    ) : (
                        <form onSubmit={handleForgot} className="space-y-5">
                            {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2"><XIcon className="h-4 w-4"/>{error}</div>}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-masa-orange focus:border-transparent outline-none transition-all font-medium text-gray-900" value={email} onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <button disabled={loading} className="w-full bg-masa-charcoal text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95">{loading ? 'Sending...' : 'Send Reset Link'}</button>
                            <button type="button" onClick={() => setView('login')} className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-wider mt-4">Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-masa-orange to-masa-blue"></div>
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-2xl mb-6 shadow-xl shadow-gray-900/20 transform -rotate-3">
                        <span className="text-3xl font-black text-white">M</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Admin Panel</h2>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Secure Access Gateway</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6 flex items-center gap-3 animate-fade-in"><XIcon className="h-5 w-5 flex-shrink-0"/>{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-masa-orange focus:border-transparent outline-none transition-all font-medium text-gray-900" value={email} onChange={e=>{setEmail(e.target.value); setError('');}} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <input type="password" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-masa-orange focus:border-transparent outline-none transition-all font-medium text-gray-900" value={password} onChange={e=>{setPassword(e.target.value); setError('');}} />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={remember} onChange={e=>setRemember(e.target.checked)} />
                                <div className={`w-5 h-5 border-2 rounded transition-colors ${remember ? 'bg-masa-orange border-masa-orange' : 'border-gray-300 group-hover:border-masa-orange'}`}></div>
                                {remember && <CheckIcon className="absolute top-0.5 left-0.5 w-4 h-4 text-white" />}
                            </div>
                            <span className="ml-2 text-xs font-bold text-gray-500 group-hover:text-gray-700 uppercase tracking-wide">Remember Me</span>
                        </label>
                        <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-masa-blue hover:text-blue-700 uppercase tracking-wide">Forgot Password?</button>
                    </div>

                    <button disabled={loading} className="w-full bg-masa-charcoal text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95 mt-4">
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Protected Area • Authorized Personnel Only</p>
                </div>
            </div>
        </div>
    );
};

// GalleryManagerModule removed (imported)

// PagesModule removed (imported)

// MediaLibraryModule removed (imported)

export default AdminDashboardPage;
