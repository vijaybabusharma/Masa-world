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
    DocumentCheckIcon
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
import { SidebarItem, ToggleSwitch, InputField, TextareaField, SelectField, ModuleHeader } from '@/components/admin/AdminComponents';

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
        { label: 'Total Volunteers', value: stats.volunteers, icon: UsersIcon, color: 'bg-blue-500' },
        { label: 'Donations', value: stats.donations, icon: HeartIcon, color: 'bg-red-500' },
        { label: 'Members', value: stats.members, icon: SparklesIcon, color: 'bg-yellow-500' },
        { label: 'Queries', value: stats.queries, icon: EnvelopeIcon, color: 'bg-green-500' },
        { label: 'Careers', value: stats.careers, icon: BriefcaseIcon, color: 'bg-purple-500' },
        { label: 'Enrollments', value: stats.enrollments, icon: AcademicCapIcon, color: 'bg-indigo-500' },
    ];

    return (
        <div className="animate-fade-in-up space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
                    <p className="text-gray-500">Here is what's happening on your website today.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-500 uppercase">Current Role</p>
                    <span className="inline-block bg-masa-orange text-white px-3 py-1 rounded-full text-xs font-bold">{user.role}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveView('events')} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-masa-blue hover:text-white transition-colors group">
                            <CalendarDaysIcon className="h-6 w-6 mx-auto mb-2 text-masa-blue group-hover:text-white" />
                            <span className="font-bold text-sm">Manage Events</span>
                        </button>
                        <button onClick={() => setActiveView('blogs')} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-masa-blue hover:text-white transition-colors group">
                            <NewspaperIcon className="h-6 w-6 mx-auto mb-2 text-masa-blue group-hover:text-white" />
                            <span className="font-bold text-sm">Write Blog Post</span>
                        </button>
                        <button onClick={() => setActiveView('forms')} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-masa-blue hover:text-white transition-colors group">
                            <EnvelopeIcon className="h-6 w-6 mx-auto mb-2 text-masa-blue group-hover:text-white" />
                            <span className="font-bold text-sm">View Inquiries</span>
                        </button>
                        <button onClick={() => setActiveView('settings')} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-masa-blue hover:text-white transition-colors group">
                            <LockClosedIcon className="h-6 w-6 mx-auto mb-2 text-masa-blue group-hover:text-white" />
                            <span className="font-bold text-sm">Site Settings</span>
                        </button>
                    </div>
                </div>
                <div className="bg-masa-charcoal text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                <span className="text-gray-400 text-sm">Website Status</span>
                                <span className="text-green-400 font-bold text-sm flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                <span className="text-gray-400 text-sm">Last Backup</span>
                                <span className="text-white font-bold text-sm">Never</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                <span className="text-gray-400 text-sm">Database</span>
                                <span className="text-green-400 font-bold text-sm">Connected (Local)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Version</span>
                                <span className="text-white font-bold text-sm">v1.2.0</span>
                            </div>
                        </div>
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
            case 'donations': return hasPermission(['Super Admin', 'Accountant / Finance']) ? <DonationPanel /> : <p>Permission Denied</p>;
            case 'logs': return hasPermission(['Super Admin']) ? <ActivityLogModule /> : <p>Permission Denied</p>;
            case 'profile': return <ProfileModule user={auth.user!} />;
            default: return <div>Select a module</div>;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800">
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none`}>
                <div className="h-16 flex items-center px-5 border-b border-gray-800 font-bold text-xl tracking-wide justify-between">
                    <span>MASA<span className="text-masa-orange">Panel</span></span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><XIcon className="h-5 w-5"/></button>
                </div>
                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    <SidebarItem id="dashboard" label="Dashboard" icon={PresentationChartBarIcon} isActive={activeView === 'dashboard'} onClick={() => handleSidebarClick('dashboard')} />
                    
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Content</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor', 'Content Creator']) && <SidebarItem id="blogs" label="Posts (Blog)" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => handleSidebarClick('blogs')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="pages" label="Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => handleSidebarClick('pages')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="events" label="Events" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => handleSidebarClick('events')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="gallery" label="Gallery" icon={EyeIcon} isActive={activeView === 'gallery'} onClick={() => handleSidebarClick('gallery')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager']) && <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => handleSidebarClick('courses')} />}
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Editor']) && <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />}

                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                    {hasPermission(['Super Admin', 'Admin / Manager', 'Volunteer Coordinator']) && <SidebarItem id="forms" label="Form Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />}
                    {hasPermission(['Super Admin', 'Accountant / Finance']) && <SidebarItem id="donations" label="Donations" icon={CreditCardIcon} isActive={activeView === 'donations'} onClick={() => handleSidebarClick('donations')} />}
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="User Management" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Configuration</div>
                        <SidebarItem id="buttons" label="Buttons & Payments" icon={CreditCardIcon} isActive={activeView === 'buttons'} onClick={() => handleSidebarClick('buttons')} />
                        <SidebarItem id="settings" label="Site Settings" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
                        <SidebarItem id="logs" label="Activity Logs" icon={ClockIcon} isActive={activeView === 'logs'} onClick={() => handleSidebarClick('logs')} />
                        <SidebarItem id="backup" label="Backup / Restore" icon={ShieldCheckIcon} isActive={activeView === 'backup'} onClick={() => handleSidebarClick('backup')} />
                    </>}
                </div>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={() => handleSidebarClick('profile')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-3 px-2 w-full">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">{auth.user?.name.charAt(0)}</div>
                        <div className="flex-1 text-left">
                            <div className="font-bold text-white">{auth.user?.name}</div>
                            <div className="text-[10px]">My Profile</div>
                        </div>
                    </button>
                    <button onClick={handleLogout} className="w-full text-center text-xs text-gray-400 hover:text-white bg-gray-800 py-1.5 rounded transition-colors">Log Out</button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-20">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500 hover:text-gray-800"><MenuIcon className="h-6 w-6"/></button>
                    <div className="flex items-center gap-4 ml-auto"><a href="/" target="_blank" className="text-sm font-bold text-masa-blue flex items-center gap-1 hover:underline bg-blue-50 px-3 py-1.5 rounded-full">Visit Site <ArrowRightIcon className="h-4 w-4"/></a></div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">{renderView()}</main>
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
