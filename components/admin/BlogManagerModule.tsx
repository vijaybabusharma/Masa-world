import React, { useState, useEffect, useRef } from 'react';
import { Post, UserRole, Revision, Comment } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { AuthService } from '../../utils/authService';
import { ModuleHeader, InputField, TextareaField, SelectField } from './AdminComponents';
import RichTextEditor from '../RichTextEditor';
import { ClockIcon, ChatBubbleLeftIcon, ArrowPathIcon, TrashIcon } from '../icons/FeatureIcons';

const BlogManagerModule: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
    const [revisions, setRevisions] = useState<Revision[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeTab, setActiveTab] = useState<'content' | 'revisions' | 'comments'>('content');
    const [user, setUser] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPosts(ContentManager.getPosts());
        AuthService.checkSession().then(setUser);
    }, []);

    const canPublish = (role: UserRole) => ['Super Admin', 'Admin / Manager', 'Editor'].includes(role);

    const handleEdit = async (post: Post) => {
        setCurrentPost({ ...post });
        setView('edit');
        setActiveTab('content');
        
        // Fetch revisions and comments
        try {
            const revs = await ContentManager.getRevisions('post', String(post.id));
            setRevisions(revs);
            const comms = await ContentManager.getComments();
            setComments(comms.filter(c => String(c.postId) === String(post.id)));
        } catch (err) {
            console.error('Failed to fetch post details', err);
        }
    };

    const handleNew = () => {
        setCurrentPost({
            id: Date.now(),
            title: '',
            category: 'General',
            summary: '',
            content: '',
            status: 'Draft',
            author: user?.name || 'Admin',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            slug: '',
            seoTitle: '',
            metaDescription: ''
        });
        setView('edit');
    };

    const handleSave = (statusOverride?: 'Draft' | 'Published') => {
        if (currentPost) {
            const finalStatus = statusOverride || currentPost.status;
            let finalSlug = currentPost.slug || currentPost.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            
            // Ensure unique slug
            const existingSlugs = posts.filter(p => p.id !== currentPost.id).map(p => p.slug);
            let originalSlug = finalSlug;
            let counter = 1;
            while (existingSlugs.includes(finalSlug)) {
                finalSlug = `${originalSlug}-${counter}`;
                counter++;
            }

            const postToSave = {
                ...currentPost,
                status: finalStatus,
                slug: finalSlug,
                url: `/blog/${finalSlug}`
            } as Post;
            
            ContentManager.savePost(postToSave);
            setPosts(ContentManager.getPosts());
            setView('list');
            setCurrentPost(null);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            ContentManager.deletePost(id);
            setPosts(ContentManager.getPosts());
        }
    };

    const handleDuplicate = (post: Post) => {
        const duplicatedPost: Post = {
            ...post,
            id: Date.now(),
            title: `${post.title} (Copy)`,
            status: 'Draft',
            slug: `${post.slug}-copy-${Date.now()}`
        };
        ContentManager.savePost(duplicatedPost);
        setPosts(ContentManager.getPosts());
    };

    const handleRestoreRevision = (revision: Revision) => {
        if (confirm('Restore this revision? Current unsaved changes will be lost.')) {
            setCurrentPost({
                ...currentPost!,
                ...revision.data
            });
            setActiveTab('content');
        }
    };

    const handleCommentStatus = async (commentId: string, status: 'Approved' | 'Spam') => {
        await ContentManager.updateCommentStatus(commentId, status);
        const allComments = await ContentManager.getComments();
        setComments(allComments.filter(c => String(c.postId) === String(currentPost!.id)));
    };

    const handleDeleteComment = async (commentId: string) => {
        if (confirm('Delete this comment?')) {
            await ContentManager.deleteComment(commentId);
            const allComments = await ContentManager.getComments();
            setComments(allComments.filter(c => String(c.postId) === String(currentPost!.id)));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentPost(prev => prev ? { ...prev, image: data.url } : null);
            }
        } catch (err) {
            console.error('Image upload failed', err);
            alert('Failed to upload image');
        }
        
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

    if (view === 'edit' && currentPost) {
        return (
            <div className="animate-fade-in-up pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <button onClick={() => setView('list')} className="text-[10px] font-black text-masa-orange uppercase tracking-widest hover:underline mb-2 flex items-center gap-2">
                            &larr; Back to All Posts
                        </button>
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                            {currentPost.title ? `Editing: ${currentPost.title}` : 'Create New Post'}
                        </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                            <button onClick={() => setActiveTab('content')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'content' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Content</button>
                            <button onClick={() => setActiveTab('revisions')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'revisions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Revisions ({revisions.length})</button>
                            <button onClick={() => setActiveTab('comments')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'comments' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Comments ({comments.length})</button>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => handleSave('Draft')} className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">Save Draft</button>
                            <button onClick={() => handleSave('Published')} disabled={!canPublish(user?.role)} className="px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest bg-gray-900 text-white hover:bg-masa-orange transition-all disabled:opacity-50 shadow-lg shadow-gray-900/10">Publish Now</button>
                        </div>
                    </div>
                </div>

                {activeTab === 'content' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <InputField 
                                    label="Post Title" 
                                    value={currentPost.title} 
                                    onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} 
                                    placeholder="Enter an engaging title..."
                                />
                                <TextareaField 
                                    label="Subtitle / Short Tagline" 
                                    value={currentPost.summary} 
                                    onChange={e => setCurrentPost({ ...currentPost, summary: e.target.value })} 
                                    placeholder="A brief summary of the article..."
                                />
                            </div>

                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden" style={{ minHeight: '700px' }}>
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Article Content</h3>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <RichTextEditor 
                                        value={currentPost.content || ''} 
                                        onChange={val => setCurrentPost({ ...currentPost, content: val })} 
                                        placeholder="Start writing your amazing article here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Settings Panel */}
                        <div className="space-y-8">
                            {/* Featured Image */}
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4">Featured Image</h3>
                                {currentPost.image ? (
                                    <div className="relative group overflow-hidden rounded-2xl border border-gray-100">
                                        <img src={currentPost.image} alt="Featured" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button onClick={() => fileInputRef.current?.click()} className="bg-white text-gray-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest mx-1 hover:bg-masa-orange hover:text-white transition-all">Change</button>
                                            <button onClick={() => setCurrentPost({ ...currentPost, image: '' })} className="bg-red-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest mx-1 hover:bg-red-600 transition-all">Remove</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-200 rounded-2xl h-56 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-masa-orange hover:text-masa-orange cursor-pointer transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <span className="text-2xl">🖼️</span>
                                        </div>
                                        <span className="font-black text-[10px] uppercase tracking-widest">Upload Image</span>
                                        <span className="text-[10px] mt-1 font-medium italic">Recommended: 1200x630px</span>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                            </div>

                            {/* Post Settings */}
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4">Post Settings</h3>
                                
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                    <input 
                                        type="text" 
                                        list="categories" 
                                        value={currentPost.category} 
                                        onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-masa-orange focus:ring-4 focus:ring-masa-orange/10 outline-none transition-all duration-300 bg-white text-sm font-medium"
                                        placeholder="Select or type new..."
                                    />
                                    <datalist id="categories">
                                        {categories.map(c => <option key={c} value={c} />)}
                                    </datalist>
                                </div>

                                <InputField 
                                    label="Tags (comma separated)" 
                                    value={currentPost.tags?.join(', ') || ''} 
                                    onChange={e => setCurrentPost({ ...currentPost, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
                                    placeholder="ngo, charity, event"
                                />

                                <InputField 
                                    label="Author Name" 
                                    value={currentPost.author} 
                                    onChange={e => setCurrentPost({ ...currentPost, author: e.target.value })} 
                                />

                                <InputField 
                                    label="Publish Date" 
                                    type="date"
                                    value={currentPost.date} 
                                    onChange={e => setCurrentPost({ ...currentPost, date: e.target.value })} 
                                />
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4">SEO & URL</h3>
                                
                                <InputField 
                                    label="URL Slug" 
                                    value={currentPost.slug || ''} 
                                    onChange={e => setCurrentPost({ ...currentPost, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') })} 
                                    placeholder="auto-generated-if-empty"
                                />
                                
                                <InputField 
                                    label="SEO Meta Title" 
                                    value={currentPost.seoTitle || ''} 
                                    onChange={e => setCurrentPost({ ...currentPost, seoTitle: e.target.value })} 
                                    placeholder="Title for search engines"
                                />

                                <TextareaField 
                                    label="SEO Meta Description" 
                                    value={currentPost.metaDescription || ''} 
                                    onChange={e => setCurrentPost({ ...currentPost, metaDescription: e.target.value })} 
                                    placeholder="Brief description for search results..."
                                />
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'revisions' ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Revision History</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {revisions.map(rev => (
                                <div key={rev.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-50 p-3 rounded-xl text-masa-blue shadow-sm"><ClockIcon className="h-5 w-5" /></div>
                                        <div>
                                            <div className="font-black text-gray-900 uppercase tracking-tight">{new Date(rev.timestamp).toLocaleString()}</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">by {rev.author}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRestoreRevision(rev)} className="flex items-center gap-2 text-[10px] font-black text-masa-orange uppercase tracking-widest hover:underline">
                                        <ArrowPathIcon className="h-4 w-4" /> Restore
                                    </button>
                                </div>
                            ))}
                            {revisions.length === 0 && (
                                <div className="p-16 text-center text-gray-400 font-medium italic">No revisions found for this post.</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Comments</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {comments.map(comment => (
                                <div key={comment.id} className="p-8 space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400">{comment.author.charAt(0)}</div>
                                            <div>
                                                <div className="font-black text-gray-900 uppercase tracking-tight">{comment.author}</div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(comment.timestamp).toLocaleDateString()}</div>
                                            </div>
                                            <span className={`text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest ml-2 ${comment.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : comment.status === 'Spam' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {comment.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            {comment.status !== 'Approved' && (
                                                <button onClick={() => handleCommentStatus(comment.id, 'Approved')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Approve</button>
                                            )}
                                            {comment.status !== 'Spam' && (
                                                <button onClick={() => handleCommentStatus(comment.id, 'Spam')} className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">Mark Spam</button>
                                            )}
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Delete</button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                                        <div className="absolute -top-2 left-6 w-4 h-4 bg-gray-50 border-t border-l border-gray-100 rotate-45"></div>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{comment.content}"</p>
                                    </div>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <div className="p-16 text-center text-gray-400 font-medium italic">No comments yet.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Content Engine" onAction={handleNew} actionLabel="Create New Post" />
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-400 uppercase font-black text-[10px] tracking-[0.2em] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6">Post Details</th>
                                <th className="px-8 py-6">Author</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                    <td className="px-8 py-6">
                                        <div className="font-black text-gray-900 uppercase tracking-tight text-base group-hover:text-masa-orange transition-colors">{post.title}</div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                            {post.slug}
                                            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-black text-gray-400 text-[10px]">{post.author.charAt(0)}</div>
                                            <span className="text-gray-900 font-black text-[10px] uppercase tracking-widest">{post.author}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 text-[9px] rounded-lg font-black uppercase tracking-widest ${post.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <div className="flex items-center justify-end gap-4">
                                            <button onClick={() => handleEdit(post)} className="text-[10px] font-black text-gray-900 uppercase tracking-widest hover:text-masa-orange transition-colors">Edit</button>
                                            <button onClick={() => handleDuplicate(post)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Copy</button>
                                            <button onClick={() => handleDelete(post.id)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-medium italic">No blog posts found. Click "Create New Post" to start writing.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlogManagerModule;