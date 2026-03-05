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
        <div className="animate-fade-in-up space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase leading-none mb-2">
                        Welcome, <span className="text-masa-orange">{user.name}</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">Here is what's happening on your website today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Level</p>
                        <p className="text-xs font-bold text-gray-900">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 bg-masa-orange/10 rounded-xl flex items-center justify-center">
                        <ShieldCheckIcon className="h-5 w-5 text-masa-orange" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${stat.color} ${stat.shadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            <stat.icon className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-4xl font-black text-gray-900 tracking-tighter mb-1">{stat.value}</p>
                            <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Quick Actions</h3>
                        <div className="h-1 w-12 bg-masa-orange rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Events', icon: CalendarDaysIcon, view: 'events' },
                            { label: 'Blog', icon: NewspaperIcon, view: 'blogs' },
                            { label: 'Inquiries', icon: EnvelopeIcon, view: 'forms' },
                            { label: 'Settings', icon: LockClosedIcon, view: 'settings' },
                        ].map((action, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveView(action.view)} 
                                className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-masa-orange hover:text-white transition-all duration-300 group"
                            >
                                <action.icon className="h-8 w-8 mx-auto mb-3 text-masa-orange group-hover:text-white transition-transform duration-300 group-hover:scale-110" />
                                <span className="font-black text-[10px] uppercase tracking-widest">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-masa-orange/20 rounded-full blur-[80px] group-hover:bg-masa-orange/30 transition-colors duration-500"></div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-1">System Health</h3>
                            <p className="text-gray-500 text-xs font-medium">Real-time status monitoring</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Website</span>
                                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 
                                    Online
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Database</span>
                                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Active</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Version</span>
                                <span className="text-white font-black text-[10px] uppercase tracking-widest">v1.2.0</span>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                            View Full Logs
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
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-2xl`}>
                <div className="h-20 flex items-center px-8 border-b border-white/5 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-masa-orange rounded-lg flex items-center justify-center font-black text-white">M</div>
                        <span className="font-black text-lg tracking-tighter uppercase">Masa<span className="text-masa-orange">Panel</span></span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><XIcon className="h-5 w-5"/></button>
                </div>
                <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
                    <SidebarItem id="dashboard" label="Dashboard" icon={PresentationChartBarIcon} isActive={activeView === 'dashboard'} onClick={() => handleSidebarClick('dashboard')} />
                    
                    <div className="px-4 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Content Engine</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor', 'Content Creator']) && <SidebarItem id="blogs" label="Blog Posts" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => handleSidebarClick('blogs')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="comments" label="Moderation" icon={ChatBubbleLeftIcon} isActive={activeView === 'comments'} onClick={() => handleSidebarClick('comments')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="pages" label="Site Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => handleSidebarClick('pages')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="events" label="Event Calendar" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => handleSidebarClick('events')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="gallery" label="Visual Gallery" icon={EyeIcon} isActive={activeView === 'gallery'} onClick={() => handleSidebarClick('gallery')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="courses" label="Academy" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => handleSidebarClick('courses')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="media" label="Media Assets" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="navigation" label="Menu Config" icon={GlobeIcon} isActive={activeView === 'navigation'} onClick={() => handleSidebarClick('navigation')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="redirects" label="Redirects" icon={ArrowRightIcon} isActive={activeView === 'redirects'} onClick={() => handleSidebarClick('redirects')} />}

                    <div className="px-4 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Data & CRM</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Volunteer Coordinator']) && <SidebarItem id="forms" label="Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />}
                    {hasPermission(['Super Admin', 'Accountant / Finance']) && <SidebarItem id="donations" label="Finance" icon={CreditCardIcon} isActive={activeView === 'donations'} onClick={() => handleSidebarClick('donations')} />}
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="Team Access" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">System</div>
                        <SidebarItem id="buttons" label="Payments" icon={CreditCardIcon} isActive={activeView === 'buttons'} onClick={() => handleSidebarClick('buttons')} />
                        <SidebarItem id="settings" label="Site Config" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
                        <SidebarItem id="logs" label="Audit Logs" icon={ClockIcon} isActive={activeView === 'logs'} onClick={() => handleSidebarClick('logs')} />
                        <SidebarItem id="trash" label="Trash Bin" icon={TrashIcon} isActive={activeView === 'trash'} onClick={() => handleSidebarClick('trash')} />
                        <SidebarItem id="backup" label="Infrastructure" icon={ShieldCheckIcon} isActive={activeView === 'backup'} onClick={() => handleSidebarClick('backup')} />
                    </>}
                </div>
                <div className="p-6 border-t border-white/5 bg-black/20">
                    <button onClick={() => handleSidebarClick('profile')} className="flex items-center gap-4 group mb-6 w-full text-left">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-lg font-black text-masa-orange border border-white/10 group-hover:border-masa-orange/50 transition-all duration-300">
                            {auth.user?.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-black text-sm text-white truncate uppercase tracking-tight">{auth.user?.name}</div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Profile Settings</div>
                        </div>
                    </button>
                    <button onClick={handleLogout} className="w-full py-4 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 border border-white/5">Sign Out</button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8 shadow-sm z-40">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500 hover:text-gray-900"><MenuIcon className="h-6 w-6"/></button>
                    <div className="flex items-center gap-6 ml-auto">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live Server</span>
                        </div>
                        <a href={getAssetUrl('')} target="_blank" className="text-[10px] font-black text-white uppercase tracking-widest bg-gray-900 px-6 py-3 rounded-2xl hover:bg-masa-orange transition-all duration-300 shadow-lg shadow-gray-900/10">Visit Website</a>
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
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                        <p className="text-gray-500 text-sm">Enter your email to receive a reset link.</p>
                    </div>
                    {resetSent ? (
                        <div className="text-center">
                            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 text-sm">
                                If an account exists with that email, we've sent password reset instructions.
                            </div>
                            <button onClick={() => { setView('login'); setResetSent(false); }} className="text-masa-blue font-bold hover:underline">Back to Login</button>
                        </div>
                    ) : (
                        <form onSubmit={handleForgot} className="space-y-4">
                            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">{error}</div>}
                            <input type="email" required placeholder="Email Address" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={email} onChange={e=>setEmail(e.target.value)} />
                            <button disabled={loading} className="w-full bg-masa-charcoal text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400">{loading ? 'Sending...' : 'Send Reset Link'}</button>
                            <button type="button" onClick={() => setView('login')} className="w-full text-center text-sm text-gray-500 hover:text-gray-800">Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                    <p className="text-gray-500 text-sm">Enter your credentials to access the panel.</p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required placeholder="Email" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={email} onChange={e=>{setEmail(e.target.value); setError('');}} />
                    <input type="password" required placeholder="Password" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={password} onChange={e=>{setPassword(e.target.value); setError('');}} />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center"><input type="checkbox" id="rem" checked={remember} onChange={e=>setRemember(e.target.checked)} className="mr-2" /><label htmlFor="rem" className="text-sm text-gray-600">Remember Me</label></div>
                        <button type="button" onClick={() => setView('forgot')} className="text-sm text-masa-blue hover:underline">Forgot Password?</button>
                    </div>
                    <button disabled={loading} className="w-full bg-masa-charcoal text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400">{loading ? 'Authenticating...' : 'Login'}</button>
                </form>
                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Protected Area. Authorized Personnel Only.</p>
                </div>
            </div>
        </div>
    );
};

// GalleryManagerModule removed (imported)

// PagesModule removed (imported)

// MediaLibraryModule removed (imported)

export default AdminDashboardPage;
