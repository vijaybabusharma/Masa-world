import React, { useState, useEffect, useRef } from 'react';
import { Post, UserRole } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { AuthService } from '../../utils/authService';
import { ModuleHeader, InputField, TextareaField, SelectField } from './AdminComponents';
import RichTextEditor from '../RichTextEditor';

const BlogManagerModule: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
    const [user, setUser] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPosts(ContentManager.getPosts());
        AuthService.checkSession().then(setUser);
    }, []);

    const canPublish = (role: UserRole) => ['Super Admin', 'Admin / Manager', 'Editor'].includes(role);

    const handleEdit = (post: Post) => {
        setCurrentPost({ ...post });
        setView('edit');
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
        const duplicatedPost = {
            ...post,
            id: Date.now(),
            title: `${post.title} (Copy)`,
            status: 'Draft',
            slug: `${post.slug}-copy`
        };
        ContentManager.savePost(duplicatedPost);
        setPosts(ContentManager.getPosts());
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
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setView('list')} className="text-sm font-bold text-masa-blue hover:underline">&larr; Back to All Posts</button>
                    <div className="flex gap-3">
                        <button onClick={() => handleSave('Draft')} className="px-6 py-2 rounded-lg font-bold border border-gray-300 text-gray-700 hover:bg-gray-50">Save Draft</button>
                        <button onClick={() => handleSave('Published')} disabled={!canPublish(user?.role)} className="px-6 py-2 rounded-lg font-bold bg-masa-blue text-white hover:bg-opacity-90 disabled:opacity-50">Publish</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
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
                                rows={2} 
                                placeholder="A brief summary of the article..."
                            />
                        </div>

                        <div className="bg-white rounded-xl border shadow-sm flex flex-col" style={{ minHeight: '600px' }}>
                            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                                <h3 className="font-bold text-gray-800">Article Content</h3>
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
                    <div className="space-y-6">
                        {/* Featured Image */}
                        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-800 border-b pb-2">Featured Image</h3>
                            {currentPost.image ? (
                                <div className="relative group">
                                    <img src={currentPost.image} alt="Featured" className="w-full h-48 object-cover rounded-lg border" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <button onClick={() => fileInputRef.current?.click()} className="bg-white text-gray-800 px-4 py-2 rounded font-bold text-sm mx-1">Change</button>
                                        <button onClick={() => setCurrentPost({ ...currentPost, image: '' })} className="bg-red-500 text-white px-4 py-2 rounded font-bold text-sm mx-1">Remove</button>
                                    </div>
                                </div>
                            ) : (
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-masa-blue cursor-pointer transition-colors"
                                >
                                    <span className="text-3xl mb-2">🖼️</span>
                                    <span className="font-bold text-sm">Click to upload image</span>
                                    <span className="text-xs mt-1">Auto-resized for mobile & desktop</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>

                        {/* Post Settings */}
                        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-800 border-b pb-2">Post Settings</h3>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                <input 
                                    type="text" 
                                    list="categories" 
                                    value={currentPost.category} 
                                    onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-masa-blue outline-none"
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
                        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-800 border-b pb-2">SEO & URL</h3>
                            
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
                                rows={3}
                                placeholder="Brief description for search results..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="All Posts" onAction={handleNew} actionLabel="Add New Blog Post" />
            
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
                        <tr>
                            <th className="p-4">Post Title</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map(post => (
                            <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800 text-base">{post.title}</div>
                                    <div className="text-xs text-gray-400 mt-1">{post.slug}</div>
                                </td>
                                <td className="p-4 text-gray-600 font-medium">{post.author}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">{post.category}</span>
                                </td>
                                <td className="p-4 text-gray-500">{new Date(post.date).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(post)} className="text-masa-blue font-bold hover:underline">Edit</button>
                                    <button onClick={() => handleDuplicate(post)} className="text-gray-500 font-bold hover:text-gray-800">Duplicate</button>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-500 font-bold hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-500 italic">No blog posts found. Click "Add New Blog Post" to create one.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogManagerModule;