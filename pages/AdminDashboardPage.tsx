
import React, { useState, useEffect, useMemo } from 'react';
import { AdminUser, AuthState, GlobalSettings, PageMetadata, Post, UserRole } from '../types';
import { ContentManager } from '../utils/contentManager';
import { AuthService } from '../utils/authService';
import { getSubmissions } from '../utils/mockBackend';
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
    EyeIcon
} from '../components/icons/FeatureIcons';
import { MenuIcon, ChevronDownIcon } from '../components/icons/UiIcons';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from '../components/icons/SocialIcons';

// --- SUB-COMPONENTS ---

const SidebarItem: React.FC<{ 
    id: string; 
    label: string; 
    icon: any; 
    isActive: boolean; 
    onClick: () => void;
}> = ({ label, icon: Icon, isActive, onClick }) => {
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

// --- BLOG MANAGER MODULE ---
const BlogManagerModule: React.FC<{ user: AdminUser }> = ({ user }) => {
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    
    // List View States
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    
    useEffect(() => {
        setPosts(ContentManager.getPosts());
    }, [view]);

    // Derived Lists
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [posts, search, filterStatus]);

    const handleCreateNew = () => {
        const newPost: Post = {
            id: Date.now(),
            title: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Uncategorized',
            summary: '',
            content: '',
            url: '',
            status: 'Draft',
            author: user.name,
            views: 0,
            allowComments: true
        };
        setCurrentPost(newPost);
        setView('edit');
    };

    const handleEdit = (post: Post) => {
        setCurrentPost({ ...post });
        setView('edit');
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to move this post to trash?")) {
            ContentManager.deletePost(id);
            setPosts(ContentManager.getPosts());
        }
    };

    const handleSavePost = (isPublish: boolean = false) => {
        if (!currentPost) return;
        
        const slug = currentPost.slug || currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const postToSave: Post = {
            ...currentPost,
            slug,
            url: `/blog/${slug}`,
            status: isPublish ? 'Published' : 'Draft',
            date: currentPost.date || new Date().toISOString().split('T')[0]
        };

        ContentManager.savePost(postToSave);
        // Toast or feedback could go here
        if(isPublish) alert("Post Published!");
        else alert("Draft Saved.");
        setView('list');
    };

    if (view === 'list') {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
                    <button onClick={handleCreateNew} className="bg-masa-orange text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-orange-600 active:scale-95 transition-transform">
                        Add New Post
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
                        <div className="flex gap-2">
                            <button onClick={() => setFilterStatus('All')} className={`px-3 py-1 rounded text-sm font-medium ${filterStatus === 'All' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>All</button>
                            <button onClick={() => setFilterStatus('Published')} className={`px-3 py-1 rounded text-sm font-medium ${filterStatus === 'Published' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>Published</button>
                            <button onClick={() => setFilterStatus('Draft')} className={`px-3 py-1 rounded text-sm font-medium ${filterStatus === 'Draft' ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>Drafts</button>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search posts..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-masa-blue outline-none"
                            />
                            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Author</th>
                                    <th className="p-4">Categories</th>
                                    <th className="p-4">Tags</th>
                                    <th className="p-4"><div className="flex items-center gap-1"><EyeIcon className="h-4 w-4"/> Views</div></th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map(post => (
                                    <tr key={post.id} className="border-b hover:bg-gray-50 group">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800 line-clamp-1 max-w-[200px] truncate">{post.title || '(No Title)'}</p>
                                            <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                                                <button onClick={() => handleEdit(post)} className="text-masa-blue hover:underline">Edit</button>
                                                <span className="text-gray-300">|</span>
                                                {user.role === 'Super Admin' && (
                                                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Trash</button>
                                                )}
                                                {post.status === 'Published' && (
                                                    <>
                                                        <span className="text-gray-300">|</span>
                                                        <button className="text-gray-600 hover:underline">View</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">{post.author || user.name}</td>
                                        <td className="p-4 text-gray-600">{post.category}</td>
                                        <td className="p-4 text-gray-500">{post.tags?.slice(0, 2).join(', ')}</td>
                                        <td className="p-4 text-gray-600">{post.views || 0}</td>
                                        <td className="p-4 text-gray-500">
                                            <span className={`block text-xs font-bold uppercase mb-1 ${post.status === 'Published' ? 'text-green-600' : 'text-gray-400'}`}>{post.status}</span>
                                            {post.date}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleEdit(post)} className="bg-white border border-gray-300 p-2 rounded hover:bg-gray-50">
                                                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // EDITOR VIEW
    if (view === 'edit' && currentPost) {
        return (
            <div className="flex flex-col h-full bg-gray-100">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20">
                    <h2 className="text-lg font-bold text-gray-800">{currentPost.id ? 'Edit Post' : 'Add New Post'}</h2>
                    <div className="flex gap-3">
                        <button onClick={() => setView('list')} className="text-gray-600 hover:text-red-600 text-sm font-bold px-3 py-2">Cancel</button>
                        <button onClick={() => handleSavePost(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm font-bold hover:bg-gray-300 transition-colors">Save Draft</button>
                        <button onClick={() => alert("Preview functionality would open the post in a new tab.")} className="text-masa-blue hover:underline text-sm font-bold px-3 py-2 hidden sm:block">Preview</button>
                        <button onClick={() => handleSavePost(true)} className="bg-masa-blue text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-900 shadow-md transition-all">
                            {currentPost.status === 'Published' ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </div>

                {/* Main Editor Layout */}
                <div className="flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto">
                    
                    {/* Left Column: Content */}
                    <div className="flex-1 space-y-6">
                        <input 
                            type="text" 
                            placeholder="Add title" 
                            value={currentPost.title}
                            onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                            className="w-full text-3xl font-bold p-4 rounded-lg border border-gray-300 focus:border-masa-blue outline-none shadow-sm"
                        />
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[600px]">
                            <RichTextEditor 
                                value={currentPost.content} 
                                onChange={(val) => setCurrentPost({...currentPost, content: val})} 
                                placeholder="Start writing your story..."
                            />
                        </div>
                        
                        {/* SEO Box */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><GlobeIcon className="h-5 w-5 text-gray-400"/> SEO Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SEO Title</label>
                                    <input className="w-full p-2 border rounded" value={currentPost.seoTitle || currentPost.title} onChange={e => setCurrentPost({...currentPost, seoTitle: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Description</label>
                                    <textarea className="w-full p-2 border rounded" rows={2} value={currentPost.metaDescription || ''} onChange={e => setCurrentPost({...currentPost, metaDescription: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug / URL</label>
                                    <div className="flex items-center bg-gray-50 border rounded p-2 text-sm text-gray-600">
                                        <span>https://masaworld.org/blog/</span>
                                        <input className="bg-transparent outline-none flex-grow ml-1 font-bold text-gray-800" value={currentPost.slug || ''} onChange={e => setCurrentPost({...currentPost, slug: e.target.value})} placeholder="post-url-slug" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        
                        {/* Publish Box */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Publish</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${currentPost.status === 'Published' ? 'bg-green-500' : 'bg-gray-400'}`}></div> Status:</span>
                                    <span className="font-bold">{currentPost.status}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Visibility:</span>
                                    <span className="font-bold text-masa-blue">Public</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Author:</span>
                                    <span className="font-bold">{currentPost.author}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block mb-1">Publish Date:</span>
                                    <input type="date" className="w-full border rounded p-1" value={currentPost.date} onChange={e => setCurrentPost({...currentPost, date: e.target.value})} />
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                {user.role === 'Super Admin' && currentPost.id && (
                                    <button onClick={() => handleDelete(currentPost.id)} className="text-red-500 text-xs hover:underline">Move to Trash</button>
                                )}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3">Categories</h3>
                            <div className="max-h-40 overflow-y-auto space-y-2 border border-gray-100 p-2 rounded bg-gray-50">
                                {['NGO Updates', 'Sports', 'Education', 'Culture', 'Awards', 'Events'].map(cat => (
                                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="category" 
                                            checked={currentPost.category === cat} 
                                            onChange={() => setCurrentPost({...currentPost, category: cat})} 
                                            className="text-masa-orange focus:ring-masa-orange"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                            <button className="text-masa-blue text-xs mt-2 hover:underline">+ Add New Category</button>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3">Tags</h3>
                            <input 
                                type="text" 
                                className="w-full border rounded p-2 text-sm" 
                                placeholder="Separate with commas" 
                                value={currentPost.tags?.join(', ') || ''} 
                                onChange={e => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(t => t.trim())})}
                            />
                            <p className="text-xs text-gray-400 mt-1">e.g. youth, sports, delhi</p>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3">Featured Image</h3>
                            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group cursor-pointer" onClick={() => {
                                const url = prompt("Enter Image URL");
                                if(url) setCurrentPost({...currentPost, image: url});
                            }}>
                                {currentPost.image ? (
                                    <img src={currentPost.image} className="w-full h-full object-cover" alt="Featured" />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <CameraIcon className="h-8 w-8 mx-auto mb-1" />
                                        <span className="text-xs">Click to set image</span>
                                    </div>
                                )}
                                {currentPost.image && <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">Change Image</div>}
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3">Excerpt</h3>
                            <textarea 
                                className="w-full border rounded p-2 text-sm" 
                                rows={4} 
                                value={currentPost.summary} 
                                onChange={e => setCurrentPost({...currentPost, summary: e.target.value})}
                                placeholder="Write a short summary..."
                            />
                        </div>

                        {/* Discussion */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-700 mb-3">Discussion</h3>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input 
                                    type="checkbox" 
                                    checked={currentPost.allowComments ?? true} 
                                    onChange={e => setCurrentPost({...currentPost, allowComments: e.target.checked})}
                                />
                                Allow comments
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return null;
};

// ... (Other modules remain unchanged)

const PagesModule: React.FC = () => {
    const [pages, setPages] = useState<PageMetadata[]>([]);
    
    useEffect(() => {
        setPages(ContentManager.getPages());
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Pages Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                        <tr>
                            <th className="p-4">Page Title</th>
                            <th className="p-4">Last Modified</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{page.title}</td>
                                <td className="p-4 text-gray-500">{new Date(page.lastModified).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <button className="text-masa-blue hover:underline">Edit SEO</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ContentEditorModule: React.FC<{ type: 'events' | 'courses' }> = ({ type }) => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (type === 'events') setItems(ContentManager.getEvents());
        else if (type === 'courses') setItems(ContentManager.getCourses());
    }, [type]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{type} Manager</h2>
                <button className="bg-masa-orange text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors">Add New</button>
            </div>
            <div className="grid gap-4">
                {items.map((item: any) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <img src={item.image} className="w-16 h-16 rounded object-cover bg-gray-100" alt="" />
                            <div>
                                <h3 className="font-bold text-gray-800">{item.title}</h3>
                                <div className="text-xs text-gray-500 mt-1 flex gap-2">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                                    <span>{item.date || item.duration}</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-500 hover:text-masa-blue px-3 py-1 border rounded hover:bg-gray-50 text-sm">Edit</button>
                    </div>
                ))}
                {items.length === 0 && <p className="text-gray-500 italic">No {type} found.</p>}
            </div>
        </div>
    );
};

const MediaLibraryModule: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Media Library</h2>
                <button className="bg-masa-charcoal text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <CameraIcon className="h-4 w-4" /> Upload
                </button>
            </div>
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-500 border-dashed border-2">
                <CameraIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Drag and drop files here or click to upload.</p>
                <p className="text-xs mt-2 text-gray-400">Supported: JPG, PNG, MP4 (Max 50MB)</p>
            </div>
        </div>
    );
};

const FormsDataModule: React.FC = () => {
    const [activeTab, setActiveTab] = useState('volunteer');
    const [submissions, setSubmissions] = useState<any[]>([]);

    useEffect(() => {
        setSubmissions(getSubmissions(activeTab));
    }, [activeTab]);

    const tabs = ['volunteer', 'contact', 'membership', 'donation', 'career', 'pledge', 'enrollment', 'partnership'];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Form Submissions</h2>
            
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {tabs.map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap capitalize transition-colors ${activeTab === tab ? 'bg-masa-blue text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {submissions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <EnvelopeIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        No submissions found for {activeTab}.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-gray-500 font-semibold">Date</th>
                                    <th className="p-4 text-gray-500 font-semibold">Name</th>
                                    <th className="p-4 text-gray-500 font-semibold">Contact</th>
                                    <th className="p-4 text-gray-500 font-semibold">Summary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {submissions.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-gray-500">{sub.timestamp.split(',')[0]}</td>
                                        <td className="p-4 font-medium text-gray-800">{sub.fullName || 'Anonymous'}</td>
                                        <td className="p-4 text-gray-600">
                                            <div className="flex flex-col text-xs">
                                                <span>{sub.email}</span>
                                                <span>{sub.mobile || sub.phone}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-500 max-w-xs truncate" title={JSON.stringify(sub)}>
                                            {sub.message || sub.role || sub.pledgeTitle || sub.courseName || 'View Details'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const SocialMonetizationModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        alert('Settings Saved!');
    };

    const handleChange = (section: keyof GlobalSettings, key: string, value: any) => {
        // Simple deep merge for specific sections
        setSettings(prev => ({
            ...prev,
            [section]: { ...prev[section], [key]: value }
        }));
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Social & Marketing Settings</h2>
                <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-sm transition-colors">Save Changes</button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Scripts & Tracking */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-masa-charcoal"><GlobeIcon className="h-5 w-5 text-blue-500"/> Tracking & Analytics</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Google Analytics ID (G-XXXX)</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-masa-blue outline-none transition-all" 
                                value={settings.scripts.googleAnalyticsId}
                                onChange={e => handleChange('scripts', 'googleAnalyticsId', e.target.value)}
                                placeholder="G-XXXXXXXXXX"
                            />
                            <label className="flex items-center gap-2 mt-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" checked={settings.scripts.enableAnalytics} onChange={e => handleChange('scripts', 'enableAnalytics', e.target.checked)} className="rounded text-masa-blue focus:ring-masa-blue" /> Enable Analytics
                            </label>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Facebook Pixel ID</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-masa-blue outline-none transition-all" 
                                value={settings.scripts.facebookPixelId}
                                onChange={e => handleChange('scripts', 'facebookPixelId', e.target.value)}
                                placeholder="1234567890"
                            />
                            <label className="flex items-center gap-2 mt-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" checked={settings.scripts.enablePixel} onChange={e => handleChange('scripts', 'enablePixel', e.target.checked)} className="rounded text-masa-blue focus:ring-masa-blue" /> Enable Pixel
                            </label>
                        </div>
                    </div>
                </div>

                {/* Adsense */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-masa-charcoal"><CreditCardIcon className="h-5 w-5 text-green-500"/> Monetization (Adsense)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Google Adsense Client ID / Code</label>
                            <textarea 
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-masa-blue outline-none transition-all" 
                                rows={4}
                                value={settings.scripts.googleAdsenseCode}
                                onChange={e => handleChange('scripts', 'googleAdsenseCode', e.target.value)}
                                placeholder="ca-pub-XXXXXXXXXXXXXXXX or full <script> tag"
                            ></textarea>
                            <label className="flex items-center gap-2 mt-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" checked={settings.scripts.enableAdsense} onChange={e => handleChange('scripts', 'enableAdsense', e.target.checked)} className="rounded text-masa-blue focus:ring-masa-blue" /> Enable Adsense
                            </label>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 border border-yellow-200">
                            <strong>Note:</strong> Ensure your domain is approved in Google Adsense before enabling.
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
    const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to closed on mobile

    // Auth Check
    useEffect(() => {
        const user = AuthService.getSession();
        if (user) {
            setAuth({ isAuthenticated: true, user });
        }
    }, []);

    const handleLogin = (user: AdminUser) => setAuth({ isAuthenticated: true, user });
    const handleLogout = () => { AuthService.logout(); setAuth({ isAuthenticated: false, user: null }); };

    // Function to close sidebar when clicking a link on mobile
    const handleSidebarClick = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    // Role Checker
    const hasPermission = (allowedRoles: UserRole[]) => {
        return auth.user && allowedRoles.includes(auth.user.role);
    };

    if (!auth.isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none`}>
                <div className="h-16 flex items-center px-5 border-b border-gray-800 font-bold text-xl tracking-wide justify-between">
                    <span>MASA<span className="text-masa-orange">Panel</span></span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><ArrowRightIcon className="h-5 w-5 rotate-180"/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    <SidebarItem id="dashboard" label="Dashboard" icon={PresentationChartBarIcon} isActive={activeView === 'dashboard'} onClick={() => { setActiveView('dashboard'); handleSidebarClick(); }} />
                    
                    {hasPermission(['Super Admin', 'Editor', 'Event Manager', 'Course Manager']) && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Content</div>
                            {hasPermission(['Super Admin', 'Editor']) && (
                                <>
                                    <SidebarItem id="pages" label="Pages" icon={DocumentTextIcon} isActive={activeView === 'pages'} onClick={() => { setActiveView('pages'); handleSidebarClick(); }} />
                                    <SidebarItem id="blogs" label="Posts (Blog)" icon={NewspaperIcon} isActive={activeView === 'blogs'} onClick={() => { setActiveView('blogs'); handleSidebarClick(); }} />
                                </>
                            )}
                            {hasPermission(['Super Admin', 'Editor', 'Event Manager']) && (
                                <SidebarItem id="events" label="Events" icon={CalendarDaysIcon} isActive={activeView === 'events'} onClick={() => { setActiveView('events'); handleSidebarClick(); }} />
                            )}
                            {hasPermission(['Super Admin', 'Editor', 'Course Manager']) && (
                                <SidebarItem id="courses" label="Courses" icon={AcademicCapIcon} isActive={activeView === 'courses'} onClick={() => { setActiveView('courses'); handleSidebarClick(); }} />
                            )}
                            <SidebarItem id="media" label="Media Library" icon={CameraIcon} isActive={activeView === 'media'} onClick={() => { setActiveView('media'); handleSidebarClick(); }} />
                        </>
                    )}
                    
                    {hasPermission(['Super Admin', 'Editor']) && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">Data & CRM</div>
                            <SidebarItem id="forms" label="Forms & Data" icon={EnvelopeIcon} isActive={activeView === 'forms'} onClick={() => { setActiveView('forms'); handleSidebarClick(); }} />
                            {hasPermission(['Super Admin']) && (
                                <>
                                    <SidebarItem id="donations" label="Donations" icon={HeartIcon} isActive={activeView === 'donations'} onClick={() => { setActiveView('donations'); handleSidebarClick(); }} />
                                    <SidebarItem id="users" label="Users" icon={UsersIcon} isActive={activeView === 'users'} onClick={() => { setActiveView('users'); handleSidebarClick(); }} />
                                </>
                            )}
                        </>
                    )}

                    {hasPermission(['Super Admin']) && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase mt-2">System</div>
                            <SidebarItem id="social" label="Social & Ads" icon={GlobeIcon} isActive={activeView === 'social'} onClick={() => { setActiveView('social'); handleSidebarClick(); }} />
                            <SidebarItem id="settings" label="Settings" icon={LockClosedIcon} isActive={activeView === 'settings'} onClick={() => { setActiveView('settings'); handleSidebarClick(); }} />
                        </>
                    )}
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
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500 hover:text-gray-800"><MenuIcon className="h-6 w-6"/></button>
                    <div className="flex items-center gap-4 ml-auto">
                        <a href="/" target="_blank" className="text-sm font-bold text-masa-blue flex items-center gap-1 hover:underline bg-blue-50 px-3 py-1.5 rounded-full">
                            Visit Site <ArrowRightIcon className="h-4 w-4"/>
                        </a>
                    </div>
                </header>

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto h-full">
                        
                        {/* DASHBOARD VIEW */}
                        {activeView === 'dashboard' && (
                            <div className="animate-fade-in-up">
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {auth.user?.name}</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
                                            {hasPermission(['Super Admin', 'Editor']) && (
                                                <button onClick={() => setActiveView('blogs')} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-center font-semibold text-sm">Write Blog Post</button>
                                            )}
                                            {hasPermission(['Super Admin', 'Editor', 'Event Manager']) && (
                                                <button onClick={() => setActiveView('events')} className="p-4 bg-gray-50 rounded-lg hover:bg-green-50 hover:text-green-600 transition text-center font-semibold text-sm">Add Event</button>
                                            )}
                                            {hasPermission(['Super Admin']) && (
                                                <>
                                                    <button onClick={() => setActiveView('pages')} className="p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition text-center font-semibold text-sm">Manage Pages</button>
                                                    <button onClick={() => setActiveView('social')} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center font-semibold text-sm">Social & Ads</button>
                                                </>
                                            )}
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

                        {/* OTHER MODULES - Conditional Rendering based on Role */}
                        {activeView === 'pages' && hasPermission(['Super Admin', 'Editor']) && <PagesModule />}
                        {activeView === 'blogs' && hasPermission(['Super Admin', 'Editor']) && <BlogManagerModule user={auth.user!} />}
                        {activeView === 'events' && hasPermission(['Super Admin', 'Editor', 'Event Manager']) && <ContentEditorModule type="events" />}
                        {activeView === 'courses' && hasPermission(['Super Admin', 'Editor', 'Course Manager']) && <ContentEditorModule type="courses" />}
                        {activeView === 'media' && <MediaLibraryModule />}
                        {activeView === 'forms' && hasPermission(['Super Admin', 'Editor']) && <FormsDataModule />}
                        {activeView === 'social' && hasPermission(['Super Admin']) && <SocialMonetizationModule />}
                        {activeView === 'settings' && hasPermission(['Super Admin']) && <div className="p-8 bg-white rounded-lg text-center text-gray-500">Global settings moved to specific modules. Use "Social & Ads" for marketing scripts.</div>}
                        {activeView === 'donations' && hasPermission(['Super Admin']) && <FormsDataModule />}
                        {activeView === 'users' && hasPermission(['Super Admin']) && <div className="p-8 bg-white rounded-lg text-center text-gray-500">User Management Module (Placeholder)</div>}

                    </div>
                </main>
            </div>
        </div>
    );
};

// ... (Rest of AdminLogin component remains unchanged)
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
                    <input 
                        type="email" 
                        required 
                        placeholder="Email" 
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" 
                        value={email} 
                        onChange={e=>{setEmail(e.target.value); setError('');}} 
                    />
                    <input 
                        type="password" 
                        required 
                        placeholder="Password" 
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-masa-blue outline-none" 
                        value={password} 
                        onChange={e=>{setPassword(e.target.value); setError('');}} 
                    />
                    <div className="flex items-center">
                        <input type="checkbox" id="rem" checked={remember} onChange={e=>setRemember(e.target.checked)} className="mr-2" />
                        <label htmlFor="rem" className="text-sm text-gray-600">Remember Me</label>
                    </div>
                    <button disabled={loading} className="w-full bg-masa-charcoal text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400">
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
