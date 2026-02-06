import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AdminUser, AuthState, GlobalSettings, PageMetadata, Post, UserRole, MenuItem, SliderItem, Page, NavItem, Event, Course, Submission } from '../types';
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

// --- Reusable UI Components ---
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
        type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`${checked ? 'bg-masa-blue' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-masa-orange focus:ring-offset-2`}
    >
        <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
    </button>
);

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <input {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" />
    </div>
);

const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, helpText?: string }> = ({ label, helpText, ...props }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <textarea {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none font-mono text-sm" />
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, children, ...props }) => (
     <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <select {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
            {children}
        </select>
    </div>
);

const ModuleHeader: React.FC<{ title: string, onAction?: () => void, actionLabel?: string }> = ({ title, onAction, actionLabel }) => (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {onAction && actionLabel && (
            <button onClick={onAction} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-green-700 transition-colors"><PlusIcon className="h-4 w-4"/> {actionLabel}</button>
        )}
    </div>
);

// --- Dashboard Modules ---
const DashboardHome: React.FC<{ user: AdminUser, setActiveView: (v: string) => void }> = ({ user, setActiveView }) => { return <div>Dashboard Home - Placeholder</div> };
const BlogManagerModule: React.FC<{ user: AdminUser }> = ({ user }) => { return <div>Blog Manager - Placeholder</div> };
const CourseManagerModule: React.FC = () => { return <div>Course Manager - Placeholder</div> };
const FormsDataModule: React.FC = () => { return <div>Forms Data - Placeholder</div> };

const SettingsModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [activeTab, setActiveTab] = useState('scripts');
    
    const handleSettingsChange = (section: keyof GlobalSettings, key: any, value: any) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            (newSettings[section] as any)[key] = value;
            return newSettings;
        });
    };
    
    const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const [section, key] = name.split('.');
        const checked = (e.target as HTMLInputElement).checked;

        setSettings(prev => {
            const newSettings = { ...prev,
                [section]: {
                    ...(prev as any)[section],
                    [key]: type === 'checkbox' ? checked : value
                }
            };
            return newSettings;
        });
    };

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        alert('Settings saved successfully!');
    };

    const handlePreview = () => {
        sessionStorage.setItem('masa_preview_settings', JSON.stringify(settings));
        window.open('/?masa_preview=true', '_blank');
    };

    const tabs = [
        { id: 'scripts', label: 'Scripts & Analytics' },
        { id: 'general', label: 'General' },
        { id: 'homepage', label: 'Homepage' },
        { id: 'navigation', label: 'Navigation' },
    ];

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
                 <div className="flex gap-2">
                    <button onClick={handlePreview} className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <EyeIcon className="h-4 w-4"/> Preview Changes
                    </button>
                    <button onClick={handleSave} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-900 transition-colors">Save All Settings</button>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === tab.id ? 'border-masa-orange text-masa-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'scripts' && (
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Verification & Analytics</h3>
                        <p className="text-sm text-gray-500 mb-6">Connect your site to third-party services. Enter IDs or verification codes below.</p>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google Analytics</label>
                                    <InputField label="" name="scripts.googleAnalyticsId" value={settings.scripts.googleAnalyticsId} onChange={handleNestedChange} placeholder="G-XXXXXXXXXX" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableAnalytics} onChange={val => handleSettingsChange('scripts', 'enableAnalytics', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google Search Console</label>
                                    <InputField label="" name="scripts.googleSearchConsole" value={settings.scripts.googleSearchConsole} onChange={handleNestedChange} placeholder="Enter verification code from meta tag" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableGoogleSearchConsole} onChange={val => handleSettingsChange('scripts', 'enableGoogleSearchConsole', val)} />
                            </div>
                             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Meta (Facebook) Pixel</label>
                                    <InputField label="" name="scripts.facebookPixelId" value={settings.scripts.facebookPixelId} onChange={handleNestedChange} placeholder="Enter your Pixel ID" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enablePixel} onChange={val => handleSettingsChange('scripts', 'enablePixel', val)} />
                            </div>
                             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google AdSense</label>
                                    <InputField label="" name="scripts.googleAdsenseCode" value={settings.scripts.googleAdsenseCode} onChange={handleNestedChange} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableAdsense} onChange={val => handleSettingsChange('scripts', 'enableAdsense', val)} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Custom Code Injection</h3>
                        <p className="text-sm text-gray-500 mb-6">Advanced: Add custom scripts, styles, or meta tags. Use with caution.</p>
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Global Header (`&lt;head&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomHead} onChange={val => handleSettingsChange('scripts', 'enableCustomHead', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customHead" value={settings.scripts.customHead} onChange={handleNestedChange} rows={5} helpText="For meta tags, verification codes, analytics, or custom CSS."/>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Body Start (`&lt;body&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomBodyStart} onChange={val => handleSettingsChange('scripts', 'enableCustomBodyStart', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customBodyStart" value={settings.scripts.customBodyStart} onChange={handleNestedChange} rows={5} helpText="For tracking pixels or widgets that need to load immediately."/>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Footer (end of `&lt;body&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomBodyEnd} onChange={val => handleSettingsChange('scripts', 'enableCustomBodyEnd', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customBodyEnd" value={settings.scripts.customBodyEnd} onChange={handleNestedChange} rows={5} helpText="For deferred scripts, live chat widgets, or other integrations."/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab !== 'scripts' && <div>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be managed here.</div>}
        </div>
    );
};

const EventManagerModule: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);

    useEffect(() => { setEvents(ContentManager.getEvents()); }, []);

    const handleEdit = (event: Event) => { setCurrentEvent(event); setView('edit'); };
    const handleNew = () => {
        setCurrentEvent({
            id: `evt-${Date.now()}`, title: '', category: 'Community', date: new Date().toISOString().split('T')[0],
            displayDate: '', location: '', description: '', image: '', status: 'Upcoming', price: 'Free'
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentEvent) ContentManager.saveEvent(currentEvent as Event);
        setEvents(ContentManager.getEvents());
        setView('list');
        setCurrentEvent(null);
    };
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure?')) {
            ContentManager.deleteEvent(id);
            setEvents(ContentManager.getEvents());
        }
    };

    if (view === 'edit' && currentEvent) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Events</button>
                <ModuleHeader title={currentEvent.id.startsWith('evt-') ? 'New Event' : 'Edit Event'} />
                <div className="space-y-4 bg-white p-6 rounded-lg border">
                    <InputField label="Title" value={currentEvent.title} onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} />
                    <TextareaField label="Description" value={currentEvent.description} onChange={e => setCurrentEvent({ ...currentEvent, description: e.target.value })} rows={3} />
                    <InputField label="Image URL" value={currentEvent.image} onChange={e => setCurrentEvent({ ...currentEvent, image: e.target.value })} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <SelectField label="Category" value={currentEvent.category} onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value as Event['category'] })}>
                            <option>Conference</option><option>Training</option><option>Sports</option><option>Community</option><option>Award</option>
                        </SelectField>
                        <SelectField label="Status" value={currentEvent.status} onChange={e => setCurrentEvent({ ...currentEvent, status: e.target.value as Event['status'] })}>
                            <option>Upcoming</option><option>Completed</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <InputField label="Date (YYYY-MM-DD)" type="date" value={currentEvent.date} onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })} />
                        <InputField label="Display Date (e.g., Jan 15, 2025)" value={currentEvent.displayDate} onChange={e => setCurrentEvent({ ...currentEvent, displayDate: e.target.value })} />
                        <InputField label="Price (e.g., Free, ₹500)" value={currentEvent.price} onChange={e => setCurrentEvent({ ...currentEvent, price: e.target.value })} />
                    </div>
                    <InputField label="Location" value={currentEvent.location} onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })} />
                </div>
                <button onClick={handleSave} className="mt-6 bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Event</button>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Event Manager" onAction={handleNew} actionLabel="New Event" />
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider"><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.map(event => (
                            <tr key={event.id}>
                                <td className="p-3 font-bold">{event.title}</td><td className="p-3">{event.category}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${event.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{event.status}</span></td>
                                <td className="p-3">{event.displayDate}</td>
                                <td className="p-3 space-x-2"><button onClick={() => handleEdit(event)} className="text-masa-blue font-bold">Edit</button><button onClick={() => handleDelete(event.id)} className="text-red-500 font-bold">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserManagerModule: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    useEffect(() => { setUsers(AuthService.getUsers()); }, []);
    // Mock UI - In a real app, this would have edit/delete functionality
    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="User Management" />
            <div className="bg-white rounded-xl shadow-sm border p-4">
                 {users.map(user => (
                    <div key={user.id} className="p-3 border-b flex justify-between items-center">
                        <div>
                            <p className="font-bold">{user.name} <span className="text-xs text-gray-500">({user.email})</span></p>
                            <p className="text-sm text-masa-orange font-semibold">{user.role}</p>
                        </div>
                        <div>
                            <button className="text-sm text-masa-blue font-bold mr-4">Edit</button>
                            <button className="text-sm text-red-500 font-bold">Delete</button>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    )
};

const BackupRestoreModule: React.FC = () => {
    const handleBackup = () => {
        const data = JSON.stringify(localStorage);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `masa_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (!window.confirm("Are you sure? This will overwrite all current website data.")) return;
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
                    alert('Restore successful! The page will now reload.');
                    window.location.reload();
                } catch (err) {
                    alert('Invalid backup file.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Backup & Restore" />
            <div className="bg-white p-6 rounded-lg border space-y-6">
                <div>
                    <h3 className="font-bold">Backup</h3>
                    <p className="text-sm text-gray-600 mb-2">Download a JSON file of all website content and settings.</p>
                    <button onClick={handleBackup} className="bg-masa-blue text-white font-bold py-2 px-4 rounded">Download Backup</button>
                </div>
                <div>
                    <h3 className="font-bold text-red-600">Restore</h3>
                    <p className="text-sm text-gray-600 mb-2">Upload a backup file. This will overwrite all existing data.</p>
                    <input type="file" accept=".json" onChange={handleRestore} />
                </div>
            </div>
        </div>
    );
}

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
            case 'blogs': return hasPermission(['Super Admin', 'Editor']) ? <BlogManagerModule user={auth.user!} /> : <p>Permission Denied</p>;
            case 'courses': return hasPermission(['Super Admin', 'Editor', 'Course Manager']) ? <CourseManagerModule /> : <p>Permission Denied</p>;
            case 'events': return hasPermission(['Super Admin', 'Editor', 'Event Manager']) ? <EventManagerModule /> : <p>Permission Denied</p>;
            case 'forms': return hasPermission(['Super Admin', 'Editor']) ? <FormsDataModule /> : <p>Permission Denied</p>;
            case 'users': return hasPermission(['Super Admin']) ? <UserManagerModule /> : <p>Permission Denied</p>;
            case 'backup': return hasPermission(['Super Admin']) ? <BackupRestoreModule /> : <p>Permission Denied</p>;
            case 'settings': return hasPermission(['Super Admin']) ? <SettingsModule /> : <p>Permission Denied</p>;
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
                    {hasPermission(['Super Admin', 'Editor']) && <SidebarItem id="blogs" label="Posts (Blog)" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => handleSidebarClick('blogs')} />}
                    {hasPermission(['Super Admin', 'Editor']) && <SidebarItem id="pages" label="Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => handleSidebarClick('pages')} />}
                    {hasPermission(['Super Admin', 'Editor', 'Event Manager']) && <SidebarItem id="events" label="Events" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => handleSidebarClick('events')} />}
                    {hasPermission(['Super Admin', 'Editor', 'Course Manager']) && <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => handleSidebarClick('courses')} />}
                    <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />

                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                    {hasPermission(['Super Admin', 'Editor']) && <SidebarItem id="forms" label="Form Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />}
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="User Management" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Configuration</div>
                        <SidebarItem id="settings" label="Site Settings" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
                        <SidebarItem id="backup" label="Backup / Restore" icon={ShieldCheckIcon} isActive={activeView === 'backup'} onClick={() => handleSidebarClick('backup')} />
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
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">{error}</div>}
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
const PagesModule: React.FC = () => <div>Pages Module - In Development</div>;
const MediaLibraryModule: React.FC = () => <div>Media Library Module - In Development</div>;

export default AdminDashboardPage;
