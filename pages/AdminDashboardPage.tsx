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
const DashboardHome: React.FC<{ user: AdminUser, setActiveView: (v: string) => void }> = ({ user, setActiveView }) => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        setStats(getStats());
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

const BlogManagerModule: React.FC<{ user: AdminUser }> = ({ user }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);

    useEffect(() => { setPosts(ContentManager.getPosts()); }, []);

    const handleEdit = (post: Post) => { setCurrentPost(post); setView('edit'); };
    const handleNew = () => {
        setCurrentPost({
            id: Date.now(), title: '', category: 'General', summary: '', content: '', 
            image: '', status: 'Draft', date: new Date().toISOString().split('T')[0], author: user.name
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentPost) ContentManager.savePost(currentPost as Post);
        setPosts(ContentManager.getPosts());
        setView('list');
        setCurrentPost(null);
    };
    const handleDelete = (id: number) => {
        if (window.confirm('Delete this post?')) {
            ContentManager.deletePost(id);
            setPosts(ContentManager.getPosts());
        }
    };

    if (view === 'edit' && currentPost) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Posts</button>
                <ModuleHeader title={currentPost.id ? 'Edit Post' : 'New Post'} />
                <div className="space-y-4 bg-white p-6 rounded-lg border">
                    <InputField label="Title" value={currentPost.title} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <SelectField label="Category" value={currentPost.category} onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}>
                            <option>General</option><option>Sports</option><option>Education</option><option>Culture</option><option>Impact</option>
                        </SelectField>
                        <SelectField label="Status" value={currentPost.status} onChange={e => setCurrentPost({ ...currentPost, status: e.target.value as any })}>
                            <option>Draft</option><option>Published</option>
                        </SelectField>
                    </div>
                    <InputField label="Image URL" value={currentPost.image} onChange={e => setCurrentPost({ ...currentPost, image: e.target.value })} />
                    <TextareaField label="Summary" value={currentPost.summary} onChange={e => setCurrentPost({ ...currentPost, summary: e.target.value })} rows={2} />
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Content</label>
                        <RichTextEditor value={currentPost.content || ''} onChange={val => setCurrentPost({ ...currentPost, content: val })} />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-6 bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Post</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Blog Manager" onAction={handleNew} actionLabel="New Post" />
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider"><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td className="p-3 font-bold">{post.title}</td><td className="p-3">{post.category}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{post.status}</span></td>
                                <td className="p-3">{post.date}</td>
                                <td className="p-3 space-x-2"><button onClick={() => handleEdit(post)} className="text-masa-blue font-bold">Edit</button><button onClick={() => handleDelete(post.id)} className="text-red-500 font-bold">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CourseManagerModule: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentCourse, setCurrentCourse] = useState<Partial<Course> | null>(null);

    useEffect(() => { setCourses(ContentManager.getCourses()); }, []);

    const handleEdit = (course: Course) => { setCurrentCourse(course); setView('edit'); };
    const handleNew = () => {
        setCurrentCourse({
            id: Date.now(), title: '', description: '', fullDescription: '', category: 'Education', 
            level: 'Beginner', duration: '', mode: 'Online', image: '', price: 'Free', highlights: []
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentCourse) ContentManager.saveCourse(currentCourse as Course);
        setCourses(ContentManager.getCourses());
        setView('list');
        setCurrentCourse(null);
    };
    const handleDelete = (id: number) => {
        if (window.confirm('Delete this course?')) {
            ContentManager.deleteCourse(id);
            setCourses(ContentManager.getCourses());
        }
    };

    if (view === 'edit' && currentCourse) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Courses</button>
                <ModuleHeader title={currentCourse.id ? 'Edit Course' : 'New Course'} />
                <div className="space-y-4 bg-white p-6 rounded-lg border">
                    <InputField label="Course Title" value={currentCourse.title} onChange={e => setCurrentCourse({ ...currentCourse, title: e.target.value })} />
                    <TextareaField label="Short Description" value={currentCourse.description} onChange={e => setCurrentCourse({ ...currentCourse, description: e.target.value })} rows={2} />
                    <div className="grid md:grid-cols-3 gap-4">
                        <SelectField label="Category" value={currentCourse.category} onChange={e => setCurrentCourse({ ...currentCourse, category: e.target.value as any })}>
                            <option>Sports</option><option>Education</option><option>Culture</option>
                        </SelectField>
                        <SelectField label="Level" value={currentCourse.level} onChange={e => setCurrentCourse({ ...currentCourse, level: e.target.value as any })}>
                            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                        </SelectField>
                        <SelectField label="Mode" value={currentCourse.mode} onChange={e => setCurrentCourse({ ...currentCourse, mode: e.target.value as any })}>
                            <option>Online</option><option>Offline</option><option>Hybrid</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Duration" value={currentCourse.duration} onChange={e => setCurrentCourse({ ...currentCourse, duration: e.target.value })} />
                        <InputField label="Price" value={currentCourse.price} onChange={e => setCurrentCourse({ ...currentCourse, price: e.target.value })} />
                    </div>
                    <InputField label="Image URL" value={currentCourse.image} onChange={e => setCurrentCourse({ ...currentCourse, image: e.target.value })} />
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Details</label>
                        <RichTextEditor value={currentCourse.fullDescription || ''} onChange={val => setCurrentCourse({ ...currentCourse, fullDescription: val })} />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-6 bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Course</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Course Manager" onAction={handleNew} actionLabel="New Course" />
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider"><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Level</th><th className="p-3">Mode</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td className="p-3 font-bold">{course.title}</td><td className="p-3">{course.category}</td>
                                <td className="p-3">{course.level}</td><td className="p-3">{course.mode}</td>
                                <td className="p-3 space-x-2"><button onClick={() => handleEdit(course)} className="text-masa-blue font-bold">Edit</button><button onClick={() => handleDelete(course.id)} className="text-red-500 font-bold">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FormsDataModule: React.FC = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        setSubmissions(getSubmissions(activeTab));
    }, [activeTab]);

    const tabs = [
        { id: 'contact', label: 'Contact Queries' },
        { id: 'volunteer', label: 'Volunteers' },
        { id: 'donation', label: 'Donations' },
        { id: 'membership', label: 'Memberships' },
        { id: 'career', label: 'Careers' },
        { id: 'enrollment', label: 'Enrollments' },
        { id: 'pledge', label: 'Pledges' },
    ];

    const renderTableHeaders = () => {
        switch (activeTab) {
            case 'contact': return <><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Subject</th><th className="p-3">Date</th></>;
            case 'volunteer': return <><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">City</th><th className="p-3">Date</th></>;
            case 'donation': return <><th className="p-3">Donor</th><th className="p-3">Amount</th><th className="p-3">Email</th><th className="p-3">Pan</th><th className="p-3">Date</th></>;
            case 'membership': return <><th className="p-3">Name</th><th className="p-3">Type</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Date</th></>;
            default: return <><th className="p-3">ID</th><th className="p-3">Data Summary</th><th className="p-3">Date</th></>;
        }
    };

    const renderRow = (sub: any) => {
        switch (activeTab) {
            case 'contact': return <><td className="p-3 font-bold">{sub.fullName}</td><td className="p-3">{sub.email}</td><td className="p-3">{sub.subject}</td><td className="p-3 text-xs text-gray-500">{sub.timestamp}</td></>;
            case 'volunteer': return <><td className="p-3 font-bold">{sub.fullName}</td><td className="p-3">{sub.email}</td><td className="p-3">{sub.roles?.join(', ')}</td><td className="p-3">{sub.city}</td><td className="p-3 text-xs text-gray-500">{sub.timestamp}</td></>;
            case 'donation': return <><td className="p-3 font-bold">{sub.fullName}</td><td className="p-3 font-mono text-green-600">{sub.amount} {sub.currency}</td><td className="p-3">{sub.email}</td><td className="p-3">{sub.pan}</td><td className="p-3 text-xs text-gray-500">{sub.timestamp}</td></>;
            case 'membership': return <><td className="p-3 font-bold">{sub.fullName}</td><td className="p-3"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{sub.membershipType}</span></td><td className="p-3">{sub.email}</td><td className="p-3">{sub.phone}</td><td className="p-3 text-xs text-gray-500">{sub.timestamp}</td></>;
            default: return <><td className="p-3">{sub.id}</td><td className="p-3 text-xs">{JSON.stringify(sub).slice(0, 50)}...</td><td className="p-3 text-xs text-gray-500">{sub.timestamp}</td></>;
        }
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Form Submissions" />
            
            <div className="flex overflow-x-auto mb-6 pb-2 border-b border-gray-200 gap-4">
                {tabs.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab.id ? 'bg-masa-charcoal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                {submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No submissions found for {activeTab}.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider">
                                {renderTableHeaders()}
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {submissions.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    {renderRow(sub)}
                                    <td className="p-3">
                                        <button onClick={() => alert(JSON.stringify(sub, null, 2))} className="text-masa-blue font-bold text-xs">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

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
        { id: 'general', label: 'General' },
        { id: 'social', label: 'Social Media' },
        { id: 'homepage', label: 'Homepage' },
        { id: 'navigation', label: 'Navigation' },
        { id: 'scripts', label: 'Scripts & Analytics' },
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
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === tab.id ? 'border-masa-orange text-masa-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'general' && (
                <div className="space-y-6 max-w-4xl">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField label="Site Name" name="general.siteName" value={settings.general.siteName} onChange={handleNestedChange} />
                            <InputField label="Contact Email" name="general.contactEmail" value={settings.general.contactEmail} onChange={handleNestedChange} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Features & Switches</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold">Enable User Registrations</label><p className="text-xs text-gray-500">Allow new users to sign up.</p></div>
                                <ToggleSwitch checked={settings.general.enableRegistrations} onChange={val => handleSettingsChange('general', 'enableRegistrations', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold text-red-600">Maintenance Mode</label><p className="text-xs text-gray-500">Show a maintenance page to visitors.</p></div>
                                <ToggleSwitch checked={settings.general.maintenanceMode} onChange={val => handleSettingsChange('general', 'maintenanceMode', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold">WhatsApp Integration</label><p className="text-xs text-gray-500">Show floating WhatsApp button.</p></div>
                                <ToggleSwitch checked={settings.features.whatsAppIntegrationEnabled} onChange={val => handleSettingsChange('features', 'whatsAppIntegrationEnabled', val)} />
                            </div>
                            {settings.features.whatsAppIntegrationEnabled && (
                                <InputField label="WhatsApp Number" name="features.whatsAppNumber" value={settings.features.whatsAppNumber} onChange={handleNestedChange} placeholder="e.g., 919876543210" />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'social' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-4xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media Links</h3>
                    <p className="text-sm text-gray-500 mb-6">Manage the social media links displayed in the header and footer.</p>
                    <div className="space-y-4">
                        {settings.social.map((link, index) => (
                            <div key={link.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold text-gray-600 uppercase text-xs">
                                    {link.platform.substring(0, 2)}
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1">{link.platform}</label>
                                    <input 
                                        type="text" 
                                        value={link.url} 
                                        onChange={(e) => {
                                            const newSocial = [...settings.social];
                                            newSocial[index].url = e.target.value;
                                            setSettings({ ...settings, social: newSocial });
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xs font-bold text-gray-400 mb-1">Visible</span>
                                    <ToggleSwitch 
                                        checked={link.enabled} 
                                        onChange={(val) => {
                                            const newSocial = [...settings.social];
                                            newSocial[index].enabled = val;
                                            setSettings({ ...settings, social: newSocial });
                                        }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'homepage' && (
                <div className="space-y-8 max-w-5xl">
                    {/* Hero Slider */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Hero Slider</h3>
                        <div className="space-y-6">
                            {settings.homepage.slider.slides.map((slide, index) => (
                                <div key={slide.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button 
                                        onClick={() => {
                                            const newSlides = settings.homepage.slider.slides.filter((_, i) => i !== index);
                                            setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                        }}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                                    >
                                        <TrashIcon className="h-4 w-4"/>
                                    </button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Headline" 
                                            value={slide.headline} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].headline = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                        <InputField 
                                            label="Image URL" 
                                            value={slide.image} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].image = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                    </div>
                                    <TextareaField 
                                        label="Subtext" 
                                        value={slide.subtext} 
                                        onChange={(e) => {
                                            const newSlides = [...settings.homepage.slider.slides];
                                            newSlides[index].subtext = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                        }} 
                                        rows={2}
                                    />
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <InputField 
                                            label="CTA Label" 
                                            value={slide.cta.label} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].cta.label = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Link To" 
                                            value={slide.cta.page} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].cta.page = e.target.value as any;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }}
                                        >
                                            <option value="get-involved">Get Involved</option>
                                            <option value="programs-overview">Programs</option>
                                            <option value="about">About</option>
                                            <option value="contact">Contact</option>
                                        </SelectField>
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newSlide: SliderItem = {
                                        id: `slide-${Date.now()}`,
                                        headline: 'New Headline',
                                        subtext: 'New Subtext',
                                        image: 'https://via.placeholder.com/1920x1080',
                                        cta: { label: 'Learn More', page: 'about' }
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: [...settings.homepage.slider.slides, newSlide] } } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Slide
                            </button>
                        </div>
                    </div>

                    {/* Founder Message */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Founder Message</h3>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField 
                                    label="Name" 
                                    value={settings.homepage.founderMessageContent.name} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, name: e.target.value } } })} 
                                />
                                <InputField 
                                    label="Title" 
                                    value={settings.homepage.founderMessageContent.title} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, title: e.target.value } } })} 
                                />
                            </div>
                            <InputField 
                                label="Image URL" 
                                value={settings.homepage.founderMessageContent.image} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, image: e.target.value } } })} 
                            />
                            <TextareaField 
                                label="Quote" 
                                value={settings.homepage.founderMessageContent.quote} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, quote: e.target.value } } })} 
                                rows={3}
                            />
                            <TextareaField 
                                label="Text" 
                                value={settings.homepage.founderMessageContent.text} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, text: e.target.value } } })} 
                                rows={5}
                            />
                        </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Impact Stats Override</h3>
                            <ToggleSwitch 
                                checked={settings.homepage.impactStats.enabled} 
                                onChange={(val) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, enabled: val } } })} 
                            />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Enable this to manually set the impact numbers instead of calculating them from data.</p>
                        
                        {settings.homepage.impactStats.enabled && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField 
                                    label="Youth Impacted" 
                                    type="number"
                                    value={settings.homepage.impactStats.youth} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, youth: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Programs Conducted" 
                                    type="number"
                                    value={settings.homepage.impactStats.programs} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, programs: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Global Reach (Countries)" 
                                    type="number"
                                    value={settings.homepage.impactStats.globalReach} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, globalReach: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Years of Impact" 
                                    type="number"
                                    value={settings.homepage.impactStats.years} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, years: parseInt(e.target.value) || 0 } } })} 
                                />
                            </div>
                        )}
                    </div>

                    {/* Pillars */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Core Pillars</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {settings.homepage.pillars.map((pillar, index) => (
                                <div key={pillar.id} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="mb-2 font-bold text-masa-blue uppercase text-xs tracking-wider">{pillar.label}</div>
                                    <div className="space-y-3">
                                        <InputField 
                                            label="Title" 
                                            value={pillar.title} 
                                            onChange={(e) => {
                                                const newPillars = [...settings.homepage.pillars];
                                                newPillars[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, pillars: newPillars } });
                                            }} 
                                        />
                                        <TextareaField 
                                            label="Description" 
                                            value={pillar.description} 
                                            onChange={(e) => {
                                                const newPillars = [...settings.homepage.pillars];
                                                newPillars[index].description = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, pillars: newPillars } });
                                            }} 
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process Steps (How We Work) */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Process Steps (How We Work)</h3>
                        <div className="space-y-6">
                            {settings.homepage.processSteps.map((step, index) => (
                                <div key={step.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Title" 
                                            value={step.title} 
                                            onChange={(e) => {
                                                const newSteps = [...settings.homepage.processSteps];
                                                newSteps[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Icon" 
                                            value={step.icon} 
                                            onChange={(e) => {
                                                const newSteps = [...settings.homepage.processSteps];
                                                newSteps[index].icon = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                            }}
                                        >
                                            <option value="SearchIcon">Search</option>
                                            <option value="UsersIcon">Users</option>
                                            <option value="SparklesIcon">Sparkles</option>
                                            <option value="PresentationChartBarIcon">Chart</option>
                                        </SelectField>
                                    </div>
                                    <TextareaField 
                                        label="Description" 
                                        value={step.description} 
                                        onChange={(e) => {
                                            const newSteps = [...settings.homepage.processSteps];
                                            newSteps[index].description = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                        }} 
                                        rows={2}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Items (Incredible Section) */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Incredible Section Items</h3>
                        <div className="space-y-6">
                            {settings.homepage.deliveryItems.map((item, index) => (
                                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button 
                                        onClick={() => {
                                            const newItems = settings.homepage.deliveryItems.filter((_, i) => i !== index);
                                            setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                        }}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                                    >
                                        <TrashIcon className="h-4 w-4"/>
                                    </button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Title" 
                                            value={item.title} 
                                            onChange={(e) => {
                                                const newItems = [...settings.homepage.deliveryItems];
                                                newItems[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Type (Icon)" 
                                            value={item.type} 
                                            onChange={(e) => {
                                                const newItems = [...settings.homepage.deliveryItems];
                                                newItems[index].type = e.target.value as any;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                            }}
                                        >
                                            <option value="Events">Events</option>
                                            <option value="Trainings">Trainings</option>
                                            <option value="Awards">Awards</option>
                                            <option value="Records">Records</option>
                                            <option value="Conferences">Conferences</option>
                                        </SelectField>
                                    </div>
                                    <TextareaField 
                                        label="Description" 
                                        value={item.description} 
                                        onChange={(e) => {
                                            const newItems = [...settings.homepage.deliveryItems];
                                            newItems[index].description = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                        }} 
                                        rows={2}
                                    />
                                </div>
                            ))}
                             <button 
                                onClick={() => {
                                    const newItem: DeliveryAreaItem = {
                                        id: `del-${Date.now()}`,
                                        type: 'Events',
                                        title: 'New Item',
                                        description: 'Description here.'
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: [...settings.homepage.deliveryItems, newItem] } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Item
                            </button>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Testimonials</h3>
                        <div className="space-y-6">
                            {settings.homepage.testimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button 
                                        onClick={() => {
                                            const newTestimonials = settings.homepage.testimonials.filter((_, i) => i !== index);
                                            setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                        }}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                                    >
                                        <TrashIcon className="h-4 w-4"/>
                                    </button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Name" 
                                            value={testimonial.author} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].author = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                        <InputField 
                                            label="Role" 
                                            value={testimonial.role} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].role = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                    </div>
                                    <TextareaField 
                                        label="Quote" 
                                        value={testimonial.quote} 
                                        onChange={(e) => {
                                            const newTestimonials = [...settings.homepage.testimonials];
                                            newTestimonials[index].quote = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                        }} 
                                        rows={3}
                                    />
                                    <div className="mt-4">
                                         <InputField 
                                            label="Image URL" 
                                            value={testimonial.image} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].image = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newTestimonial: Testimonial = {
                                        id: `test-${Date.now()}`,
                                        author: 'New Name',
                                        role: 'New Role',
                                        quote: 'New Quote',
                                        image: 'https://via.placeholder.com/150'
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: [...settings.homepage.testimonials, newTestimonial] } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Testimonial
                            </button>
                        </div>
                    </div>

                    {/* Sections Visibility */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Homepage Sections</h3>
                        <div className="space-y-4">
                            {Object.entries(settings.homepage.sections).map(([key, section]) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                    <div>
                                        <label className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                        {(section as any).title !== undefined && (
                                            <input 
                                                type="text" 
                                                value={(section as any).title} 
                                                onChange={(e) => {
                                                    const newSections = { ...settings.homepage.sections };
                                                    (newSections as any)[key].title = e.target.value;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                                }}
                                                className="block mt-1 text-xs w-64 px-2 py-1 border rounded"
                                                placeholder="Section Title"
                                            />
                                        )}
                                    </div>
                                    <ToggleSwitch 
                                        checked={(section as any).visible} 
                                        onChange={(val) => {
                                            const newSections = { ...settings.homepage.sections };
                                            (newSections as any)[key].visible = val;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                        }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'navigation' && (
                <div className="space-y-8 max-w-5xl">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 mb-6">
                        <strong>Note:</strong> To reorder items, please contact the developer. Currently, you can edit labels and destination pages.
                    </div>

                    {/* Header Menu */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Header Menu</h3>
                        <div className="space-y-4">
                            {settings.navigation.headerMenu.map((item, index) => (
                                <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex gap-4 mb-2">
                                        <InputField 
                                            label="Label" 
                                            value={item.label} 
                                            onChange={(e) => {
                                                const newMenu = [...settings.navigation.headerMenu];
                                                newMenu[index].label = e.target.value;
                                                setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                            }} 
                                        />
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link To</label>
                                            <select 
                                                value={item.page} 
                                                onChange={(e) => {
                                                    const newMenu = [...settings.navigation.headerMenu];
                                                    newMenu[index].page = e.target.value as any;
                                                    setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white"
                                            >
                                                <option value="home">Home</option><option value="about">About</option><option value="programs-overview">Programs</option><option value="initiatives">Initiatives</option><option value="gallery">Gallery</option><option value="media-reports">Media</option><option value="get-involved">Get Involved</option><option value="blog">Blog</option><option value="contact">Contact</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Submenu Items */}
                                    {'subItems' in item && item.subItems && (
                                        <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4 space-y-3">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Dropdown Items</p>
                                            {item.subItems.map((subItem, subIndex) => (
                                                <div key={subItem.id} className="flex gap-4">
                                                    <input 
                                                        type="text" 
                                                        value={subItem.label} 
                                                        onChange={(e) => {
                                                            const newMenu = [...settings.navigation.headerMenu];
                                                            (newMenu[index] as any).subItems[subIndex].label = e.target.value;
                                                            setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                        }}
                                                        className="flex-1 px-3 py-1 text-sm border rounded"
                                                    />
                                                    <select 
                                                        value={subItem.page} 
                                                        onChange={(e) => {
                                                            const newMenu = [...settings.navigation.headerMenu];
                                                            (newMenu[index] as any).subItems[subIndex].page = e.target.value as any;
                                                            setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                        }}
                                                        className="flex-1 px-3 py-1 text-sm border rounded bg-white"
                                                    >
                                                        <option value="about">About</option><option value="mission-vision">Mission</option><option value="core-values">Values</option><option value="founder-message">Founder</option><option value="governance">Governance</option><option value="sports">Sports</option><option value="education">Education</option><option value="culture">Culture</option><option value="impact-stories">Impact</option><option value="media-highlights">Media Highlights</option><option value="media-reports">Reports</option><option value="courses">Courses</option><option value="events">Events</option><option value="awards">Awards</option><option value="records">Records</option><option value="donate">Donate</option><option value="volunteer">Volunteer</option><option value="membership">Membership</option><option value="careers">Careers</option>
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Footer Links</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {['footerAboutLinks', 'footerWorkLinks', 'footerInvolvedLinks', 'footerResourceLinks', 'footerPolicyLinks'].map((sectionKey) => (
                                <div key={sectionKey} className="border rounded-lg p-4 bg-gray-50">
                                    <h4 className="font-bold text-gray-700 mb-3 capitalize">{sectionKey.replace('footer', '').replace('Links', '')} Section</h4>
                                    <div className="space-y-2">
                                        {(settings.navigation as any)[sectionKey].map((link: NavItem, i: number) => (
                                            <div key={link.id} className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    value={link.label} 
                                                    onChange={(e) => {
                                                        const newNav = { ...settings.navigation };
                                                        (newNav as any)[sectionKey][i].label = e.target.value;
                                                        setSettings({ ...settings, navigation: newNav });
                                                    }}
                                                    className="flex-1 px-2 py-1 text-sm border rounded"
                                                />
                                                <select 
                                                    value={link.page} 
                                                    onChange={(e) => {
                                                        const newNav = { ...settings.navigation };
                                                        (newNav as any)[sectionKey][i].page = e.target.value;
                                                        setSettings({ ...settings, navigation: newNav });
                                                    }}
                                                    className="flex-1 px-2 py-1 text-sm border rounded bg-white w-24"
                                                >
                                                    <option value="privacy-policy">Privacy</option><option value="terms-and-conditions">Terms</option><option value="disclaimer">Disclaimer</option><option value="copyright-policy">Copyright</option><option value="editorial-policy">Editorial</option><option value="fact-check-policy">Fact Check</option><option value="comment-policy">Comment</option><option value="ethical-use-policy">Ethical</option>
                                                    <option value="about">About</option><option value="contact">Contact</option><option value="blog">Blog</option><option value="gallery">Gallery</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
    const [events, setEvents] = useState<MasaEvent[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentEvent, setCurrentEvent] = useState<Partial<MasaEvent> | null>(null);

    useEffect(() => { setEvents(ContentManager.getEvents()); }, []);

    const handleEdit = (event: MasaEvent) => { setCurrentEvent(event); setView('edit'); };
    const handleNew = () => {
        setCurrentEvent({
            id: `evt-${Date.now()}`, title: '', category: 'Community', date: new Date().toISOString().split('T')[0],
            displayDate: '', location: '', description: '', image: '', status: 'Upcoming', price: 'Free'
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentEvent) ContentManager.saveEvent(currentEvent as MasaEvent);
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
                        <SelectField label="Category" value={currentEvent.category} onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value as MasaEvent['category'] })}>
                            <option>Conference</option><option>Training</option><option>Sports</option><option>Community</option><option>Award</option>
                        </SelectField>
                        <SelectField label="Status" value={currentEvent.status} onChange={e => setCurrentEvent({ ...currentEvent, status: e.target.value as MasaEvent['status'] })}>
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
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentUser, setCurrentUser] = useState<Partial<AdminUser> & { password?: string } | null>(null);

    const loadUsers = () => setUsers(AuthService.getUsers());

    useEffect(() => { loadUsers(); }, []);

    const handleEdit = (user: AdminUser) => { setCurrentUser({ ...user }); setView('edit'); };
    const handleNew = () => {
        setCurrentUser({ name: '', email: '', role: 'Editor', password: '' });
        setView('edit');
    };
    
    const handleSave = () => {
        if (currentUser && currentUser.name && currentUser.email) {
            AuthService.saveUser(currentUser as AdminUser, currentUser.password);
            loadUsers();
            setView('list');
            setCurrentUser(null);
        } else {
            alert('Name and Email are required.');
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            AuthService.deleteUser(id);
            loadUsers();
        }
    };

    if (view === 'edit' && currentUser) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Users</button>
                <ModuleHeader title={currentUser.id ? 'Edit User' : 'New User'} />
                <div className="bg-white p-6 rounded-lg border space-y-4 max-w-2xl">
                    <InputField label="Name" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} />
                    <InputField label="Email" type="email" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} />
                    <SelectField label="Role" value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as UserRole })}>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Event Manager">Event Manager</option>
                        <option value="Course Manager">Course Manager</option>
                    </SelectField>
                    <InputField 
                        label={currentUser.id ? "New Password (leave blank to keep current)" : "Password"} 
                        type="password" 
                        value={currentUser.password || ''} 
                        onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })} 
                    />
                    <button onClick={handleSave} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold mt-4">Save User</button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="User Management" onAction={handleNew} actionLabel="Add User" />
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                 <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold">
                        <tr>
                            <th className="p-4 text-left">User</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <div className="font-bold text-gray-800">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 
                                        user.role === 'Editor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(user)} className="text-masa-blue font-bold hover:underline">Edit</button>
                                    {user.role !== 'Super Admin' && (
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 font-bold hover:underline">Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

const ButtonManagerModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [activeTab, setActiveTab] = useState<'links' | 'zones'>('links');

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        alert('Button settings saved!');
    };

    const addPaymentLink = () => {
        const newLink: any = { id: `pl-${Date.now()}`, name: 'New Link', url: '', provider: 'Razorpay', active: true };
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: [...settings.buttons.paymentLinks, newLink] } });
    };

    const updatePaymentLink = (index: number, field: string, value: any) => {
        const newLinks = [...settings.buttons.paymentLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: newLinks } });
    };

    const removePaymentLink = (index: number) => {
        const newLinks = settings.buttons.paymentLinks.filter((_, i) => i !== index);
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: newLinks } });
    };

    const updateZone = (zoneId: string, field: string, value: any) => {
        setSettings({
            ...settings,
            buttons: {
                ...settings.buttons,
                zones: {
                    ...settings.buttons.zones,
                    [zoneId]: { ...settings.buttons.zones[zoneId], [field]: value }
                }
            }
        });
    };

    const updateFloatingButton = (field: string, value: any) => {
        setSettings({
            ...settings,
            buttons: {
                ...settings.buttons,
                floatingButton: { ...settings.buttons.floatingButton, [field]: value }
            }
        });
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Button & Payment Manager" />
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button onClick={() => setActiveTab('links')} className={`pb-2 font-bold ${activeTab === 'links' ? 'text-masa-blue border-b-2 border-masa-blue' : 'text-gray-500'}`}>Payment Links</button>
                <button onClick={() => setActiveTab('zones')} className={`pb-2 font-bold ${activeTab === 'zones' ? 'text-masa-blue border-b-2 border-masa-blue' : 'text-gray-500'}`}>Button Placement</button>
            </div>

            {activeTab === 'links' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Payment Links</h3>
                            <button onClick={addPaymentLink} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold hover:bg-green-200">+ Add Link</button>
                        </div>
                        <div className="space-y-4">
                            {settings.buttons.paymentLinks.map((link, index) => (
                                <div key={link.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button onClick={() => removePaymentLink(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><TrashIcon className="h-4 w-4"/></button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-2">
                                        <InputField label="Name (Internal)" value={link.name} onChange={e => updatePaymentLink(index, 'name', e.target.value)} />
                                        <SelectField label="Provider" value={link.provider} onChange={e => updatePaymentLink(index, 'provider', e.target.value)}>
                                            <option value="Razorpay">Razorpay</option>
                                            <option value="Stripe">Stripe</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Other">Other</option>
                                        </SelectField>
                                    </div>
                                    <InputField label="Payment URL" value={link.url} onChange={e => updatePaymentLink(index, 'url', e.target.value)} placeholder="https://..." />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'zones' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-4">Button Zones</h3>
                        <div className="space-y-6">
                            {Object.entries(settings.buttons.zones).map(([key, btn]) => (
                                <div key={key} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-sm uppercase text-gray-500">{key.replace('_', ' ')}</span>
                                        <ToggleSwitch checked={btn.visible} onChange={val => updateZone(key, 'visible', val)} />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <InputField label="Label" value={btn.label} onChange={e => updateZone(key, 'label', e.target.value)} />
                                        <SelectField label="Action Type" value={btn.actionType} onChange={e => updateZone(key, 'actionType', e.target.value)}>
                                            <option value="link">Page Link</option>
                                            <option value="payment">Payment Link</option>
                                        </SelectField>
                                        {btn.actionType === 'payment' ? (
                                            <SelectField label="Payment Link" value={btn.target} onChange={e => updateZone(key, 'target', e.target.value)}>
                                                <option value="">Select a link...</option>
                                                {settings.buttons.paymentLinks.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                            </SelectField>
                                        ) : (
                                            <InputField label="Target URL / Page" value={btn.target} onChange={e => updateZone(key, 'target', e.target.value)} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Floating Action Button</h3>
                            <ToggleSwitch checked={settings.buttons.floatingButton.visible} onChange={val => updateFloatingButton('visible', val)} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <InputField label="Label" value={settings.buttons.floatingButton.label} onChange={e => updateFloatingButton('label', e.target.value)} />
                            <SelectField label="Position" value={settings.buttons.floatingButton.position} onChange={e => updateFloatingButton('position', e.target.value)}>
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                            </SelectField>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <SelectField label="Action Type" value={settings.buttons.floatingButton.actionType} onChange={e => updateFloatingButton('actionType', e.target.value)}>
                                <option value="link">Page Link</option>
                                <option value="payment">Payment Link</option>
                            </SelectField>
                            {settings.buttons.floatingButton.actionType === 'payment' ? (
                                <SelectField label="Payment Link" value={settings.buttons.floatingButton.target} onChange={e => updateFloatingButton('target', e.target.value)}>
                                    <option value="">Select a link...</option>
                                    {settings.buttons.paymentLinks.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </SelectField>
                            ) : (
                                <InputField label="Target URL / Page" value={settings.buttons.floatingButton.target} onChange={e => updateFloatingButton('target', e.target.value)} />
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-6">
                <button onClick={handleSave} className="bg-masa-blue text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-900 transition-colors w-full md:w-auto">Save All Changes</button>
            </div>
        </div>
    );
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
            case 'gallery': return hasPermission(['Super Admin', 'Editor', 'Event Manager']) ? <GalleryManagerModule /> : <p>Permission Denied</p>;
            case 'forms': return hasPermission(['Super Admin', 'Editor']) ? <FormsDataModule /> : <p>Permission Denied</p>;
            case 'users': return hasPermission(['Super Admin']) ? <UserManagerModule /> : <p>Permission Denied</p>;
            case 'backup': return hasPermission(['Super Admin']) ? <BackupRestoreModule /> : <p>Permission Denied</p>;
            case 'settings': return hasPermission(['Super Admin']) ? <SettingsModule /> : <p>Permission Denied</p>;
            case 'buttons': return hasPermission(['Super Admin']) ? <ButtonManagerModule /> : <p>Permission Denied</p>;
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
                    {hasPermission(['Super Admin', 'Editor', 'Event Manager']) && <SidebarItem id="gallery" label="Gallery" icon={EyeIcon} isActive={activeView === 'gallery'} onClick={() => handleSidebarClick('gallery')} />}
                    {hasPermission(['Super Admin', 'Editor', 'Course Manager']) && <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => handleSidebarClick('courses')} />}
                    <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => handleSidebarClick('media')} />

                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                    {hasPermission(['Super Admin', 'Editor']) && <SidebarItem id="forms" label="Form Submissions" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => handleSidebarClick('forms')} />}
                    {hasPermission(['Super Admin']) && <SidebarItem id="users" label="User Management" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => handleSidebarClick('users')} />}

                    {hasPermission(['Super Admin']) && <>
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Configuration</div>
                        <SidebarItem id="buttons" label="Buttons & Payments" icon={CreditCardIcon} isActive={activeView === 'buttons'} onClick={() => handleSidebarClick('buttons')} />
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

const GalleryManagerModule: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        setItems(ContentManager.getGalleryItems());
    }, [isEditing]);

    const handleEdit = (item: GalleryItem) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleDelete = (id: number | string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            ContentManager.deleteGalleryItem(id);
            setItems(ContentManager.getGalleryItems());
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentItem) {
            ContentManager.saveGalleryItem(currentItem);
            setIsEditing(false);
            setCurrentItem(null);
        }
    };

    const handleAddNew = () => {
        setCurrentItem({
            id: Date.now(),
            category: 'Sports Events',
            title: '',
            location: '',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            imageUrl: '',
            description: '',
            tags: []
        });
        setIsEditing(true);
    };

    if (isEditing && currentItem) {
        return (
            <div className="animate-fade-in-up">
                <ModuleHeader title={currentItem.id ? 'Edit Gallery Item' : 'Add New Gallery Item'} />
                <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-sm border space-y-4 max-w-3xl">
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Title" value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} />
                        <SelectField label="Category" value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})}>
                            <option value="Sports Events">Sports Events</option>
                            <option value="Trainings & Workshops">Trainings & Workshops</option>
                            <option value="Awards & Recognition">Awards & Recognition</option>
                            <option value="Conferences & Seminars">Conferences & Seminars</option>
                            <option value="Community Outreach">Community Outreach</option>
                            <option value="International Programs">International Programs</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Location" value={currentItem.location} onChange={e => setCurrentItem({...currentItem, location: e.target.value})} />
                        <InputField label="Date" value={currentItem.date} onChange={e => setCurrentItem({...currentItem, date: e.target.value})} />
                    </div>
                    <InputField label="Image URL" value={currentItem.imageUrl} onChange={e => setCurrentItem({...currentItem, imageUrl: e.target.value})} />
                    <InputField label="Video URL (Optional)" value={currentItem.videoUrl || ''} onChange={e => setCurrentItem({...currentItem, videoUrl: e.target.value})} />
                    <TextareaField label="Description" value={currentItem.description} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} rows={4} />
                    <InputField label="Tags (comma separated)" value={currentItem.tags.join(', ')} onChange={e => setCurrentItem({...currentItem, tags: e.target.value.split(',').map(t => t.trim())})} />
                    
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-masa-blue text-white rounded-lg hover:bg-blue-900">Save Item</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Gallery Manager" onAction={handleAddNew} actionLabel="Add Item" />
            <div className="grid gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase text-masa-orange bg-orange-50 px-2 py-0.5 rounded">{item.category}</span>
                                <span className="text-xs text-gray-400">{item.date}</span>
                            </div>
                            <h3 className="font-bold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button onClick={() => handleEdit(item)} className="flex-1 md:flex-none px-3 py-1.5 text-sm border rounded hover:bg-gray-50">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="flex-1 md:flex-none px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PagesModule: React.FC = () => {
    const [pages, setPages] = useState<PageMetadata[]>([]);
    
    useEffect(() => { setPages(ContentManager.getPages()); }, []);

    const handleSave = (page: PageMetadata) => {
        ContentManager.savePage(page);
        setPages(ContentManager.getPages());
        alert('Page SEO updated!');
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Page SEO Manager" />
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-sm text-gray-500 mb-6">Manage meta titles and descriptions for search engine optimization.</p>
                <div className="space-y-6">
                    {pages.map((page, index) => (
                        <div key={page.id} className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 capitalize">{page.id.replace(/-/g, ' ')}</h4>
                                    <p className="text-xs text-gray-400">Last Modified: {new Date(page.lastModified).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => handleSave(page)} className="text-xs bg-masa-blue text-white px-3 py-1 rounded font-bold">Save</button>
                            </div>
                            <div className="space-y-3">
                                <InputField 
                                    label="Meta Title" 
                                    value={page.title} 
                                    onChange={(e) => {
                                        const newPages = [...pages];
                                        newPages[index].title = e.target.value;
                                        setPages(newPages);
                                    }} 
                                />
                                <TextareaField 
                                    label="Meta Description" 
                                    value={page.description} 
                                    onChange={(e) => {
                                        const newPages = [...pages];
                                        newPages[index].description = e.target.value;
                                        setPages(newPages);
                                    }} 
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MediaLibraryModule: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [newUrl, setNewUrl] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('masa_media_library');
        if (stored) setImages(JSON.parse(stored));
        else {
            // Default images
            setImages([
                'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
            ]);
        }
    }, []);

    const handleAdd = () => {
        if (!newUrl) return;
        const newImages = [newUrl, ...images];
        setImages(newImages);
        localStorage.setItem('masa_media_library', JSON.stringify(newImages));
        setNewUrl('');
    };

    const handleDelete = (index: number) => {
        if (window.confirm('Remove this image from library?')) {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
            localStorage.setItem('masa_media_library', JSON.stringify(newImages));
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Media Library" />
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Add New Image</h3>
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        value={newUrl} 
                        onChange={(e) => setNewUrl(e.target.value)} 
                        placeholder="Paste image URL here (e.g., from Unsplash, Imgur, or your CDN)"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none"
                    />
                    <button onClick={handleAdd} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Add to Library</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Note: Since there is no backend storage, please host images externally and paste the URL here.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((url, index) => (
                    <div key={index} className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                        <img src={url} alt="Library asset" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => copyToClipboard(url)} className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100" title="Copy URL">
                                <DocumentCheckIcon className="h-5 w-5"/>
                            </button>
                            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600" title="Delete">
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 truncate px-2">
                            {url}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
