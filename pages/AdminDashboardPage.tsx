
import React, { useState, useEffect, useMemo } from 'react';
import { AdminUser, AuthState, GlobalSettings, PageMetadata, Post, UserRole, MenuItem, SliderItem, Page, NavItem } from '../types';
import { ContentManager } from '../utils/contentManager';
import { AuthService } from '../utils/authService';
import { getSubmissions, getStats } from '../utils/mockBackend';
import { RichTextEditor } from '../components/RichTextEditor';
import { 
    UsersIcon, HeartIcon, BriefcaseIcon, 
    AcademicCapIcon, CameraIcon, NewspaperIcon, CalendarDaysIcon, 
    LockClosedIcon, ArrowRightIcon, CheckIcon, GlobeIcon, 
    CreditCardIcon, DocumentTextIcon,
    PresentationChartBarIcon,
    SearchIcon,
    EnvelopeIcon,
    BellIcon,
    ShieldCheckIcon,
    ClockIcon,
    EyeIcon,
    SparklesIcon,
    PlusIcon,
    TrashIcon
} from '../components/icons/FeatureIcons';
import { MenuIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '../components/icons/UiIcons';

// --- Reusable Components ---
const SidebarItem: React.FC<{ id: string; label: string; icon: any; isActive: boolean; onClick: () => void; }> = ({ label, icon: Icon, isActive, onClick }) => (
    <div className="mb-1 px-3">
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-masa-orange text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
            <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            {label}
        </button>
    </div>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
            checked ? 'bg-masa-blue' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-masa-orange focus:ring-offset-2`}
    >
        <span
            className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
    </button>
);


// --- Dashboard Modules ---

const DashboardHome: React.FC<{ user: AdminUser, setActiveView: (v: string) => void }> = ({ user, setActiveView }) => {
    const stats = getStats();
    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                    { l: 'Volunteers', v: stats.volunteers, c: 'bg-green-500' },
                    { l: 'New Submissions', v: stats.queries, c: 'bg-orange-500' },
                    { l: 'Published Posts', v: ContentManager.getPosts().filter(p => p.status === 'Published').length, c: 'bg-purple-500' },
                    { l: 'Total Members', v: stats.members, c: 'bg-blue-500' }
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                        <div className={`w-3 h-12 rounded-full mr-4 ${s.c}`}></div>
                        <div><p className="text-xs text-gray-500 uppercase font-bold">{s.l}</p><p className="text-2xl font-extrabold text-gray-800">{s.v}</p></div>
                    </div>
                ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveView('blogs')} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-center font-semibold text-sm">Write Blog Post</button>
                        <button onClick={() => setActiveView('events')} className="p-4 bg-gray-50 rounded-lg hover:bg-green-50 hover:text-green-600 transition text-center font-semibold text-sm">Add Event</button>
                        <button onClick={() => setActiveView('settings')} className="p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition text-center font-semibold text-sm">Homepage Settings</button>
                        <button onClick={() => setActiveView('settings')} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center font-semibold text-sm">Code Injection</button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Recent Activity</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex justify-between"><span>New donation received</span><span className="text-gray-400">2 mins ago</span></li>
                        <li className="flex justify-between"><span>"Annual Day" event updated</span><span className="text-gray-400">1 hour ago</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SettingsModule: React.FC = () => {
    // This is a large, comprehensive settings management component
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleSave = () => {
        setSaveStatus('saving');
        ContentManager.saveSettings(settings);
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);
    };

    const handleSliderChange = (index: number, field: keyof SliderItem, value: any) => {
        const newSlides = [...settings.homepage.slider.slides];
        (newSlides[index] as any)[field] = value;
        setSettings(prev => ({...prev, homepage: {...prev.homepage, slider: {...prev.homepage.slider, slides: newSlides}}}));
    };
    
    const handleAddSlide = () => {
        const newSlide: SliderItem = { id: `slide${Date.now()}`, headline: 'New Slide Headline', subtext: 'Subtext for new slide.', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', ctas: [{label: 'Learn More', page: 'about', primary: true }] };
        setSettings(prev => ({...prev, homepage: {...prev.homepage, slider: {...prev.homepage.slider, slides: [...prev.homepage.slider.slides, newSlide]}}}));
    };
    
    const handleRemoveSlide = (id: string) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            const newSlides = settings.homepage.slider.slides.filter(s => s.id !== id);
            setSettings(prev => ({...prev, homepage: {...prev.homepage, slider: {...prev.homepage.slider, slides: newSlides}}}));
        }
    };
    
    const handleSectionChange = (key: string, field: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            homepage: {
                ...prev.homepage,
                sections: {
                    ...prev.homepage.sections,
                    [key]: { ...prev.homepage.sections[key as keyof typeof prev.homepage.sections], [field]: value }
                }
            }
        }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
                <button onClick={handleSave} disabled={saveStatus !== 'idle'} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-sm disabled:bg-gray-400">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Homepage Content</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Hero Slider</h3>
                        <div className="space-y-4">
                            {settings.homepage.slider.slides.map((slide, index) => (
                                <div key={slide.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <input value={slide.headline} onChange={e => handleSliderChange(index, 'headline', e.target.value)} className="w-full p-2 border rounded font-bold mb-2" placeholder="Headline" />
                                    <textarea value={slide.subtext} onChange={e => handleSliderChange(index, 'subtext', e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Subtext" rows={2}></textarea>
                                    <input value={slide.image} onChange={e => handleSliderChange(index, 'image', e.target.value)} className="w-full p-2 border rounded mb-2 text-sm" placeholder="Image URL" />
                                    <button onClick={() => handleRemoveSlide(slide.id)} className="text-red-500 text-xs font-bold hover:underline">Delete Slide</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddSlide} className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-200">Add New Slide</button>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">Section Visibility & Titles</h3>
                        <div className="space-y-3">
                        {/* FIX: Use Object.keys with type assertion to correctly type the 'section' variable, resolving multiple 'property does not exist on type unknown' errors. */}
                        {Object.keys(settings.homepage.sections).map((key) => {
                            const sectionKey = key as keyof typeof settings.homepage.sections;
                            const section = settings.homepage.sections[sectionKey];
                            return (
                                <div key={key} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <ToggleSwitch checked={section.visible} onChange={(v) => handleSectionChange(key, 'visible', v)} />
                                    </div>
                                    {section.title !== undefined && section.visible && (
                                         <input value={section.title} onChange={e => handleSectionChange(key, 'title', e.target.value)} className="w-full p-1 border rounded mt-2 text-sm" placeholder="Section Title" />
                                    )}
                                     {section.subtitle !== undefined && section.visible && (
                                         <input value={section.subtitle} onChange={e => handleSectionChange(key, 'subtitle', e.target.value)} className="w-full p-1 border rounded mt-1 text-xs" placeholder="Section Subtitle" />
                                    )}
                                </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const AdminDashboardPage: React.FC = () => {
    const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
    const [activeView, setActiveView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const user = AuthService.getSession();
        if (user) setAuth({ isAuthenticated: true, user });
    }, []);

    const handleLogin = (user: AdminUser) => setAuth({ isAuthenticated: true, user });
    const handleLogout = () => { AuthService.logout(); setAuth({ isAuthenticated: false, user: null }); };
    const handleSidebarClick = (view: string) => {
        setActiveView(view);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    const hasPermission = (allowedRoles: UserRole[]) => auth.user && allowedRoles.includes(auth.user.role);

    if (!auth.isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardHome user={auth.user!} setActiveView={setActiveView} />;
            case 'blogs': return hasPermission(['Super Admin', 'Editor']) ? <BlogManagerModule user={auth.user!} /> : null;
            case 'pages': return hasPermission(['Super Admin', 'Editor']) ? <PagesModule /> : null;
            case 'events': return hasPermission(['Super Admin', 'Editor', 'Event Manager']) ? <ContentEditorModule type="events" /> : null;
            case 'courses': return hasPermission(['Super Admin', 'Editor', 'Course Manager']) ? <ContentEditorModule type="courses" /> : null;
            case 'media': return <MediaLibraryModule />;
            case 'forms': return hasPermission(['Super Admin', 'Editor']) ? <FormsDataModule /> : null;
            case 'settings': return hasPermission(['Super Admin']) ? <SettingsModule /> : null;
            case 'users': return hasPermission(['Super Admin']) ? <UsersModule /> : null;
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
                    <SidebarItem id="blogs" label="Posts (Blog)" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => handleSidebarClick('blogs')} />
                    <SidebarItem id="pages" label="Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => handleSidebarClick('pages')} />
                    <SidebarItem id="events" label="Events" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => handleSidebarClick('events')} />
                    <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => handleSidebarClick('courses')} />
                    <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />

                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                    <SidebarItem id="forms" label="Form Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="User Management" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Configuration</div>
                        <SidebarItem id="settings" label="Site Settings" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
                    </>}
                </div>
                <div className="p-4 border-t border-gray-800"><button onClick={handleLogout} className="w-full text-center text-xs text-gray-400 hover:text-white bg-gray-800 py-1.5 rounded transition-colors">Log Out</button></div>
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

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                    <p className="text-gray-500 text-sm">Enter your credentials to access the panel.</p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required placeholder="Email" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={email} onChange={e=>{setEmail(e.target.value); setError('');}} />
                    <input type="password" required placeholder="Password" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={password} onChange={e=>{setPassword(e.target.value); setError('');}} />
                    <div className="flex items-center"><input type="checkbox" id="rem" checked={remember} onChange={e=>setRemember(e.target.checked)} className="mr-2" /><label htmlFor="rem" className="text-sm text-gray-600">Remember Me</label></div>
                    <button disabled={loading} className="w-full bg-masa-charcoal text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400">{loading ? 'Authenticating...' : 'Login'}</button>
                </form>
                <div className="mt-6 text-center text-xs text-gray-400"><p>Default Admin: vijaybabusharma0@gmail.com</p><p>Password: Masa@world@vijay123</p></div>
            </div>
        </div>
    );
};

// --- MODULES (Placeholder for brevity, full implementations would be extensive) ---
const BlogManagerModule: React.FC<{ user: AdminUser }> = ({ user }) => <div>Blog Manager Module</div>;
const PagesModule: React.FC = () => <div>Pages Module</div>;
const ContentEditorModule: React.FC<{ type: string }> = ({ type }) => <div>{type.charAt(0).toUpperCase() + type.slice(1)} Editor Module</div>;
const MediaLibraryModule: React.FC = () => <div>Media Library Module</div>;
const FormsDataModule: React.FC = () => <div>Forms Data Module</div>;
const UsersModule: React.FC = () => <div>User Management Module</div>;


export default AdminDashboardPage;
