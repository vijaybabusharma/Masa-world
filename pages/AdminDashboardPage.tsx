
import React, { useState, useEffect } from 'react';
import { AdminUser, AuthState, GlobalSettings, Post, PageMetadata, Submission } from '../types';
import { Event, Course } from '../utils/data';
import { ContentManager } from '../utils/contentManager';
import { AuthService } from '../utils/authService';
import { getSubmissions } from '../utils/mockBackend';
import { 
    UsersIcon, HeartIcon, SparklesIcon, BriefcaseIcon, ShieldCheckIcon, 
    AcademicCapIcon, CameraIcon, NewspaperIcon, CalendarDaysIcon, 
    TrophyIcon, LockClosedIcon, ArrowRightIcon, CheckIcon, GlobeIcon, 
    CreditCardIcon, DocumentTextIcon, LaptopIcon, BellIcon,
    PresentationChartBarIcon,
    SearchIcon,
    EnvelopeIcon,
    DocumentCheckIcon
} from '../components/icons/FeatureIcons';
import { XIcon, MenuIcon, ChevronDownIcon } from '../components/icons/UiIcons';

// --- STYLES ---
// Using Tailwind CSS for the WordPress-like UI

// --- SUB-COMPONENTS ---

const SidebarItem: React.FC<{ 
    id: string; 
    label: string; 
    icon: any; 
    isActive: boolean; 
    onClick: () => void;
    subItems?: { id: string; label: string }[];
}> = ({ id, label, icon: Icon, isActive, onClick, subItems }) => {
    return (
        <div className="mb-1 px-3">
            <button 
                onClick={onClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-masa-orange text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                {label}
            </button>
        </div>
    );
};

// --- MODULE: PAGES MANAGER ---
const PagesModule: React.FC = () => {
    const [pages, setPages] = useState<PageMetadata[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<PageMetadata | null>(null);

    useEffect(() => {
        setPages(ContentManager.getPages());
    }, []);

    const handleEdit = (page: PageMetadata) => {
        setEditingId(page.id);
        setEditData({ ...page });
    };

    const handleSave = () => {
        if (editData) {
            ContentManager.savePage(editData);
            setPages(ContentManager.getPages());
            setEditingId(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Pages (SEO & Meta)</h3>
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold">Add New</button> */}
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                    <tr>
                        <th className="p-4">Title</th>
                        <th className="p-4">Route / Slug</th>
                        <th className="p-4">Last Modified</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map(page => (
                        <tr key={page.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-800">
                                {editingId === page.id && editData ? (
                                    <input className="border p-1 rounded w-full" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} />
                                ) : page.title}
                            </td>
                            <td className="p-4 text-gray-500 font-mono text-xs">/{page.id}</td>
                            <td className="p-4 text-gray-500">{new Date(page.lastModified).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                {editingId === page.id ? (
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={handleSave} className="text-green-600 font-bold hover:underline">Save</button>
                                        <button onClick={() => setEditingId(null)} className="text-gray-500 hover:underline">Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEdit(page)} className="text-masa-blue font-bold hover:underline">Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- MODULE: FORMS & SUBMISSIONS ---
const FormsDataModule: React.FC = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Fetch from localStorage mock backend
        const raw = getSubmissions(activeTab);
        setData(raw);
    }, [activeTab]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Form Submissions</h2>
            <div className="flex gap-2 border-b border-gray-200 pb-1 overflow-x-auto">
                {['contact', 'volunteer', 'membership', 'partnership', 'pledge', 'career'].map(type => (
                    <button 
                        key={type}
                        onClick={() => setActiveTab(type)}
                        className={`px-4 py-2 text-sm font-bold capitalize whitespace-nowrap ${activeTab === type ? 'text-masa-blue border-b-2 border-masa-blue' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {type}s
                    </button>
                ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-400">No submissions found.</td></tr>
                            ) : (
                                data.map((item: any, idx: number) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-4 text-gray-500">{item.timestamp}</td>
                                        <td className="p-4 font-bold text-gray-800">{item.fullName || item.name || 'N/A'}</td>
                                        <td className="p-4 text-blue-600">{item.email}</td>
                                        <td className="p-4 text-gray-600 truncate max-w-xs" title={JSON.stringify(item)}>
                                            {item.subject || item.role || item.pledgeTitle || 'View Details'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- MODULE: SETTINGS (Previously SettingsModule) ---
// ... (Reusing the existing SettingsModule logic but refactored slightly for the new structure if needed, keeping it as is for now)
const SettingsModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [saved, setSaved] = useState(false);

    const handleChange = (section: keyof GlobalSettings, key: string, value: any) => {
        setSettings(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
        setSaved(false);
    };

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Global Settings</h2>
                <button onClick={handleSave} className="bg-masa-blue text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-900 shadow-md flex items-center gap-2">
                    {saved ? <CheckIcon className="h-5 w-5" /> : null} {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* General */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">General</h3>
                    <div className="space-y-4">
                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Name</label><input value={settings.general.siteName} onChange={(e) => handleChange('general', 'siteName', e.target.value)} className="w-full p-2 border rounded" /></div>
                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label><input value={settings.general.contactEmail} disabled className="w-full p-2 border rounded bg-gray-100 text-gray-500" /></div>
                        <div className="flex items-center justify-between"><span className="text-sm font-medium">Maintenance Mode</span><button onClick={() => handleChange('general', 'maintenanceMode', !settings.general.maintenanceMode)} className={`w-10 h-5 rounded-full p-0.5 ${settings.general.maintenanceMode ? 'bg-orange-500' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.general.maintenanceMode ? 'translate-x-5' : ''}`}></div></button></div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Features & Plugins</h3>
                    <div className="space-y-3">
                        {Object.entries(settings.features).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-sm font-medium capitalize">{key.replace('Enabled', '')}</span>
                                <button onClick={() => handleChange('features', key, !val)} className={`w-10 h-5 rounded-full p-0.5 ${val ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-5' : ''}`}></div></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scripts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Scripts & Verification</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Google Analytics ID</label><input placeholder="G-XXXXXXXX" value={settings.monetization.googleAnalyticsId} onChange={(e) => handleChange('monetization', 'googleAnalyticsId', e.target.value)} className="w-full p-2 border rounded font-mono text-sm" /></div>
                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Verification</label><input placeholder="<meta ...>" value={settings.monetization.metaVerification} onChange={(e) => handleChange('monetization', 'metaVerification', e.target.value)} className="w-full p-2 border rounded font-mono text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Custom CSS</label><textarea rows={4} value={settings.appearance.customCss} onChange={(e) => handleChange('appearance', 'customCss', e.target.value)} className="w-full p-2 border rounded font-mono text-sm bg-gray-50" placeholder="body { ... }" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MODULE: CONTENT EDITOR (Generic for Blog/Event/Course) ---
const ContentEditorModule: React.FC<{ type: 'blogs' | 'events' | 'courses' }> = ({ type }) => {
    const [items, setItems] = useState<any[]>([]);
    
    useEffect(() => {
        if (type === 'blogs') setItems(ContentManager.getPosts());
        if (type === 'events') setItems(ContentManager.getEvents());
        if (type === 'courses') setItems(ContentManager.getCourses());
    }, [type]);

    const handleDelete = (id: any) => {
        if (confirm('Are you sure you want to delete this item?')) {
            if (type === 'blogs') ContentManager.deletePost(id);
            if (type === 'events') ContentManager.deleteEvent(id);
            if (type === 'courses') ContentManager.deleteCourse(id);
            // Refresh
            if (type === 'blogs') setItems(ContentManager.getPosts());
            if (type === 'events') setItems(ContentManager.getEvents());
            if (type === 'courses') setItems(ContentManager.getCourses());
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{type} Manager</h2>
                <button className="bg-masa-orange text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-orange-600">+ Add New {type.slice(0, -1)}</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Status</th>
                            {type !== 'courses' && <th className="p-4">Date</th>}
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-bold text-gray-800">{item.title}</td>
                                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">{item.status || 'Published'}</span></td>
                                {type !== 'courses' && <td className="p-4 text-gray-500">{item.date || item.displayDate}</td>}
                                <td className="p-4 text-right space-x-3">
                                    <button className="text-blue-600 hover:underline font-medium">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Trash</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- MODULE: MEDIA LIBRARY ---
const MediaLibraryModule: React.FC = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Media Library</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700">Upload New</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border hover:border-blue-500 cursor-pointer relative group">
                    <img src={`https://picsum.photos/200?random=${i}`} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                        Select
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---

const AdminDashboardPage: React.FC = () => {
    const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
    const [activeView, setActiveView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Auth Check
    useEffect(() => {
        const user = AuthService.getSession();
        if (user) {
            setAuth({ isAuthenticated: true, user });
        }
    }, []);

    const handleLogin = (user: AdminUser) => setAuth({ isAuthenticated: true, user });
    const handleLogout = () => { AuthService.logout(); setAuth({ isAuthenticated: false, user: null }); };

    if (!auth.isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}>
                <div className="h-16 flex items-center px-5 border-b border-gray-800 font-bold text-xl tracking-wide">
                    MASA<span className="text-masa-orange">Panel</span>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    <SidebarItem id="dashboard" label="Dashboard" icon={PresentationChartBarIcon} isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Content</div>
                    <SidebarItem id="pages" label="Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => setActiveView('pages')} />
                    <SidebarItem id="blogs" label="Posts (Blog)" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => setActiveView('blogs')} />
                    <SidebarItem id="events" label="Events" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => setActiveView('events')} />
                    <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => setActiveView('courses')} />
                    <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => setActiveView('media')} />
                    
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                    <SidebarItem id="forms" label="Forms & Data" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => setActiveView('forms')} />
                    <SidebarItem id="donations" label="Donations" icon={HeartIcon} isActive={activeView === 'donations'} onClick={() => setActiveView('donations')} />
                    <SidebarItem id="users" label="Users" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => setActiveView('users')} />

                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">System</div>
                    <SidebarItem id="settings" label="Settings" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900">
                    <div className="flex items-center gap-3 mb-3">
                        <img src={auth.user?.avatar} className="w-8 h-8 rounded-full border border-gray-600" alt="" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{auth.user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{auth.user?.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full text-center text-xs text-gray-400 hover:text-white bg-gray-800 py-1.5 rounded transition-colors">Log Out</button>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-20">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500"><MenuIcon className="h-6 w-6"/></button>
                    <div className="flex items-center gap-4 ml-auto">
                        <a href="/" target="_blank" className="text-sm font-bold text-masa-blue flex items-center gap-1 hover:underline bg-blue-50 px-3 py-1.5 rounded-full">
                            Visit Site <ArrowRightIcon className="h-4 w-4"/>
                        </a>
                    </div>
                </header>

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        
                        {/* DASHBOARD VIEW */}
                        {activeView === 'dashboard' && (
                            <div className="animate-fade-in-up">
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {auth.user?.name}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    {[
                                        { l: 'Total Posts', v: ContentManager.getPosts().length, c: 'bg-blue-500' },
                                        { l: 'Events', v: ContentManager.getEvents().length, c: 'bg-green-500' },
                                        { l: 'Pending Forms', v: '12', c: 'bg-orange-500' },
                                        { l: 'Donations', v: '₹45k', c: 'bg-purple-500' }
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                            <div className={`w-3 h-12 rounded-full mr-4 ${s.c}`}></div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">{s.l}</p>
                                                <p className="text-2xl font-extrabold text-gray-800">{s.v}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Quick Actions</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => setActiveView('blogs')} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-center font-semibold text-sm">Write Blog Post</button>
                                            <button onClick={() => setActiveView('events')} className="p-4 bg-gray-50 rounded-lg hover:bg-green-50 hover:text-green-600 transition text-center font-semibold text-sm">Add Event</button>
                                            <button onClick={() => setActiveView('pages')} className="p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition text-center font-semibold text-sm">Manage Pages</button>
                                            <button onClick={() => setActiveView('settings')} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center font-semibold text-sm">System Settings</button>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Recent Activity</h3>
                                        <ul className="space-y-3 text-sm text-gray-600">
                                            <li className="flex justify-between"><span>New donation received</span> <span className="text-gray-400">2 mins ago</span></li>
                                            <li className="flex justify-between"><span>"Annual Day" event updated</span> <span className="text-gray-400">1 hour ago</span></li>
                                            <li className="flex justify-between"><span>New volunteer registration</span> <span className="text-gray-400">3 hours ago</span></li>
                                            <li className="flex justify-between"><span>System backup completed</span> <span className="text-gray-400">Yesterday</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* OTHER MODULES */}
                        {activeView === 'pages' && <PagesModule />}
                        {activeView === 'blogs' && <ContentEditorModule type="blogs" />}
                        {activeView === 'events' && <ContentEditorModule type="events" />}
                        {activeView === 'courses' && <ContentEditorModule type="courses" />}
                        {activeView === 'media' && <MediaLibraryModule />}
                        {activeView === 'forms' && <FormsDataModule />}
                        {activeView === 'settings' && <SettingsModule />}
                        {activeView === 'donations' && <FormsDataModule />} {/* Reusing forms for donation view mock */}
                        {activeView === 'users' && <div className="p-8 bg-white rounded-lg text-center text-gray-500">User Management Module (Placeholder)</div>}

                    </div>
                </main>
            </div>
        </div>
    );
};

// --- Login Component (Refined) ---
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
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required placeholder="Email" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={email} onChange={e=>setEmail(e.target.value)} />
                    <input type="password" required placeholder="Password" className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" value={password} onChange={e=>setPassword(e.target.value)} />
                    <div className="flex items-center">
                        <input type="checkbox" id="rem" checked={remember} onChange={e=>setRemember(e.target.checked)} className="mr-2" />
                        <label htmlFor="rem" className="text-sm text-gray-600">Remember Me</label>
                    </div>
                    <button disabled={loading} className="w-full bg-masa-charcoal text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors">
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>
                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Default Admin: masaworldfoundation@gmail.com</p>
                    <p>Password: admin123</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
