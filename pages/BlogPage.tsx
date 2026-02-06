
import React, { useState, useMemo, useEffect } from 'react';
import SocialShareButtons from '../components/SocialShareButtons';
import { Post, NavigationProps } from '../types';
import TableOfContents from '../components/TableOfContents';
import { 
    CalendarDaysIcon, 
    ArrowRightIcon, 
    SearchIcon, 
    TagIcon, 
    UserCircleIcon,
    ClockIcon,
    TrophyIcon,
    AcademicCapIcon,
    GlobeIcon,
    NewspaperIcon
} from '../components/icons/FeatureIcons';
import { ChevronDownIcon, ChevronUpIcon } from '../components/icons/UiIcons';
import { calculateReadingTime } from '../utils/data';
import { ContentManager } from '../utils/contentManager';

// Reusing ArrowLeft from FeatureIcons if available, or just defining a simple one here for the back button
const SimpleArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const BlogPostSchema: React.FC<{ post: Post }> = ({ post }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://masaworld.org${post.url}`
        },
        "headline": post.title,
        "image": post.image,
        "author": {
            "@type": "Organization",
            "name": post.author || "MASA World Foundation"
        },
        "publisher": {
            "@type": "Organization",
            "name": "MASA World Foundation",
            "logo": {
                "@type": "ImageObject",
                "url": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png"
            }
        },
        "datePublished": new Date(post.date).toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        "description": post.summary
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
};

const categoriesList = [
    "All", "Sports", "Education", "Culture", "Events", "Awards", "NGO Updates"
];

const getCategoryInfo = (category: string) => {
    switch (category) {
        case 'Sports': return { Icon: TrophyIcon, color: 'text-orange-600', bg: 'bg-orange-50' };
        case 'Education': return { Icon: AcademicCapIcon, color: 'text-blue-600', bg: 'bg-blue-50' };
        case 'Culture': return { Icon: GlobeIcon, color: 'text-purple-600', bg: 'bg-purple-50' };
        case 'Events': return { Icon: CalendarDaysIcon, color: 'text-red-600', bg: 'bg-red-50' };
        case 'Awards': return { Icon: TrophyIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' };
        case 'NGO Updates': return { Icon: NewspaperIcon, color: 'text-green-600', bg: 'bg-green-50' };
        default: return { Icon: TagIcon, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
};

const Sidebar: React.FC<{
    searchQuery: string; setSearchQuery: (q: string) => void; selectedCategory: string;
    setSelectedCategory: (c: string) => void; tagsList: string[]; selectedTag: string;
    setSelectedTag: (t: string) => void; recentPosts: Post[]; onPostClick: (post: Post) => void;
    navigateTo: NavigationProps['navigateTo'];
}> = ({ 
    searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, 
    tagsList, selectedTag, setSelectedTag, recentPosts, onPostClick, navigateTo
}) => {
    return (
        <aside className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Search</h3>
                <div className="relative">
                    <input type="text" placeholder="Search topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-masa-orange focus:bg-white transition-all" />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Categories</h3>
                <ul className="space-y-2">
                    {categoriesList.map(cat => (
                        <li key={cat}>
                            <button onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${selectedCategory === cat ? 'bg-orange-50 text-masa-orange' : 'text-gray-600 hover:bg-gray-50 hover:text-masa-charcoal'}`}>
                                {cat}
                                {selectedCategory === cat && <div className="h-2 w-2 rounded-full bg-masa-orange"></div>}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tagsList.map(tag => (
                        <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${selectedTag === tag ? 'bg-masa-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {tag === 'All' ? 'All Tags' : `#${tag}`}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {recentPosts.map(post => (
                        <div key={post.id} onClick={() => onPostClick(post)} className="group cursor-pointer">
                            <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-masa-blue transition-colors line-clamp-2">{post.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 flex items-center"><CalendarDaysIcon className="h-3 w-3 mr-1" /> {post.date}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-masa-blue text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <h3 className="text-lg font-bold mb-2 relative z-10">Join Our Mission</h3>
                <p className="text-sm text-blue-100 mb-4 relative z-10">Stay updated with our latest initiatives and impact stories.</p>
                <div className="relative z-10"><button onClick={() => navigateTo('contact')} className="w-full bg-masa-orange text-white py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">Subscribe to Newsletter</button></div>
            </div>
        </aside>
    );
};

const BlogPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // State for Table of Contents
    const [headings, setHeadings] = useState<{id: string, text: string, level: number, index: number}[]>([]);
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
    const [isTocCollapsed, setIsTocCollapsed] = useState(false);

    useEffect(() => { setPosts(ContentManager.getPosts()); }, []);
    const tagsList = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap(post => post.tags || []))).sort()], [posts]);
    const filteredPosts = useMemo(() => posts.filter(post => (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.summary.toLowerCase().includes(searchQuery.toLowerCase())) && (selectedCategory === 'All' || post.category === selectedCategory) && (selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag)))), [selectedCategory, selectedTag, searchQuery, posts]);
    const featuredPost = filteredPosts.length > 0 && selectedCategory === 'All' && selectedTag === 'All' && !searchQuery ? filteredPosts[0] : null;
    const gridPosts = featuredPost ? filteredPosts.filter(p => p.id !== featuredPost.id).slice(0, visibleCount) : filteredPosts.slice(0, visibleCount);
    const hasMore = featuredPost ? filteredPosts.length > visibleCount + 1 : filteredPosts.length > visibleCount;
    const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);
    const handleLoadMore = () => setVisibleCount(prev => prev + 6);
    const handlePostClick = (post: Post) => { setSelectedPost(post); window.scrollTo(0, 0); };
    const handleBack = () => { setSelectedPost(null); window.scrollTo(0, 0); };

    // Effect to parse headings for TOC
    useEffect(() => {
        if (selectedPost) {
            const newHeadings: {id: string, text: string, level: number, index: number}[] = [];
            const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            
            selectedPost.content.split('\n\n').forEach((block, index) => {
                const trimmedBlock = block.trim();
                if (trimmedBlock.startsWith('## ')) {
                    const text = trimmedBlock.replace('## ', '');
                    newHeadings.push({ id: `${slugify(text)}-${index}`, text, level: 2, index });
                } else if (trimmedBlock.startsWith('### ')) {
                    const text = trimmedBlock.replace('### ', '');
                    newHeadings.push({ id: `${slugify(text)}-${index}`, text, level: 3, index });
                }
            });
            setHeadings(newHeadings);
            setActiveHeadingId(newHeadings.length > 0 ? newHeadings[0].id : null);
        } else {
            setHeadings([]);
            setActiveHeadingId(null);
        }
    }, [selectedPost]);

    // Effect for scroll spying
    useEffect(() => {
        if (headings.length === 0) return;

        let throttleTimeout: number | null = null;
        
        const handleScroll = () => {
            if (throttleTimeout) return;
            throttleTimeout = window.setTimeout(() => {
                let currentActiveId: string | null = headings[0]?.id || null;
                const fromTop = 150;

                for (let i = headings.length - 1; i >= 0; i--) {
                    const heading = headings[i];
                    const element = document.getElementById(heading.id);
                    if (element && element.getBoundingClientRect().top <= fromTop) {
                        currentActiveId = heading.id;
                        break;
                    }
                }
                setActiveHeadingId(currentActiveId);
                throttleTimeout = null;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (throttleTimeout) clearTimeout(throttleTimeout);
        };
    }, [headings]);

    const renderContent = (content: string) => content.split('\n\n').map((block, index) => {
        const trimmedBlock = block.trim();
        const heading = headings.find(h => h.index === index);

        if (heading) {
            if (trimmedBlock.startsWith('## ')) {
                return <h2 key={index} id={heading.id} className="text-3xl font-bold text-masa-charcoal mt-10 mb-6 border-b pb-2 border-gray-100 scroll-mt-24">{heading.text}</h2>;
            }
            if (trimmedBlock.startsWith('### ')) {
                return <h3 key={index} id={heading.id} className="text-2xl font-bold text-masa-charcoal mt-8 mb-4 scroll-mt-24">{heading.text}</h3>;
            }
        }
        
        if (index === 0 && !trimmedBlock.startsWith('#')) return <p key={index} className="mb-8 text-xl leading-relaxed text-gray-600 font-light first-letter:text-5xl first-letter:font-bold first-letter:text-masa-blue first-letter:mr-3 first-letter:float-left">{trimmedBlock}</p>;
        if (trimmedBlock.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold text-masa-charcoal mt-10 mb-6 border-b pb-2 border-gray-100 scroll-mt-24">{trimmedBlock.replace('## ', '')}</h2>;
        if (trimmedBlock.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold text-masa-charcoal mt-8 mb-4 scroll-mt-24">{trimmedBlock.replace('### ', '')}</h3>;
        return <p key={index} className="mb-6 leading-relaxed text-lg text-gray-700">{trimmedBlock}</p>;
    });

    if (selectedPost) {
        return (
            <div className="bg-white min-h-screen">
                <BlogPostSchema post={selectedPost} />
                <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-10"><div className="container mx-auto px-4 py-4"><button onClick={handleBack} className="flex items-center text-masa-charcoal hover:text-masa-orange font-bold transition-colors"><SimpleArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Blog</button></div></div>
                <article className="pb-24">
                    <div className="relative h-[400px] md:h-[500px]"><img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end"><div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-white"><div className="flex items-center gap-4 mb-4 text-sm font-semibold uppercase tracking-wider"><span className="bg-masa-orange px-3 py-1 rounded-full">{selectedPost.category}</span><span>{selectedPost.date}</span><span className="flex items-center gap-1 opacity-90"><ClockIcon className="h-4 w-4"/> {calculateReadingTime(selectedPost.content)}</span></div><h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl drop-shadow-lg">{selectedPost.title}</h1></div></div></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12"><div className="flex flex-col lg:flex-row gap-16"><div className="lg:w-3/4"><div className="prose lg:prose-lg max-w-none text-gray-700"><p className="lead text-xl font-medium text-gray-900 mb-10 border-l-4 border-masa-orange pl-6 py-2 bg-gray-50 rounded-r-lg italic leading-relaxed text-left">{selectedPost.summary}</p><div className="text-left">{renderContent(selectedPost.content)}</div></div><div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between"><div className="flex flex-wrap gap-2">{selectedPost.tags?.map(tag => <span key={tag} className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"><TagIcon className="h-3 w-3 mr-1" /> {tag}</span>)}</div><div className="flex items-center gap-2"><UserCircleIcon className="h-10 w-10 text-gray-400" /><div><p className="text-sm font-bold text-masa-charcoal">{selectedPost.author || "MASA Team"}</p><p className="text-xs text-gray-500">Author</p></div></div></div><div className="mt-8"><SocialShareButtons post={selectedPost} /></div></div>
                    <div className="lg:w-1/4">
                        <div className="lg:sticky top-32 space-y-8">
                            {headings.length > 1 && (
                                <TableOfContents 
                                    headings={headings}
                                    activeId={activeHeadingId}
                                    isCollapsed={isTocCollapsed}
                                    onToggleCollapse={() => setIsTocCollapsed(!isTocCollapsed)}
                                />
                            )}
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100"><h3 className="text-xl font-bold text-masa-blue mb-4">Be the Change</h3><p className="text-gray-600 mb-6 text-sm leading-relaxed text-left">Inspired by this story? Join us in making a difference.</p><div className="space-y-3"><button onClick={() => navigateTo('volunteer')} className="w-full bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors text-sm">Volunteer Now</button><button onClick={() => navigateTo('donate')} className="w-full bg-white border border-masa-orange text-masa-orange py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors text-sm">Make a Donation</button></div></div>
                        </div>
                    </div>
                </div></div>
                </article>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-gradient-to-br from-gray-800 to-masa-charcoal pt-24 pb-20 text-white text-center relative overflow-hidden"><div className="absolute inset-0 opacity-[.03]"><svg width="100%" height="100%"><defs><pattern id="p" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="100" height="100" fill="transparent"/><path d="M50 0V100" stroke="white" strokeWidth="1"/><path d="M0 50H100" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg></div><div className="container mx-auto px-4 sm:px-6 lg:px-8 relative"><h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Blog & News</h1><p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Insights, stories, and updates from the ground.</p></div></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="flex flex-col lg:flex-row gap-16"><div className="lg:hidden"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-masa-charcoal font-bold"><span>Filters & Search</span>{isSidebarOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}</button></div><div className={`lg:w-1/3 lg:order-2 space-y-8 ${isSidebarOpen ? 'block mt-8' : 'hidden lg:block'}`}><div className="sticky top-24"><Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} tagsList={tagsList} selectedTag={selectedTag} setSelectedTag={setSelectedTag} recentPosts={recentPosts} onPostClick={handlePostClick} navigateTo={navigateTo}/></div></div>
                <div className="lg:w-2/3 lg:order-1">
                    {featuredPost && (
                        <div onClick={() => handlePostClick(featuredPost)} className="group mb-16 bg-masa-charcoal rounded-3xl overflow-hidden shadow-2xl hover:shadow-masa-orange/20 transition-all duration-500 cursor-pointer relative aspect-video">
                            <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
                                <div className="flex items-center gap-4 mb-4"><span className="bg-masa-orange text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Featured Post</span><span className="text-sm text-gray-300">{featuredPost.category}</span></div>
                                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-md group-hover:text-orange-100 transition-colors">{featuredPost.title}</h2>
                                <p className="mt-3 text-base text-gray-200 max-w-xl line-clamp-2 leading-relaxed">{featuredPost.summary}</p>
                                <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3"><UserCircleIcon className="h-8 w-8 text-gray-300" /><div><p className="text-sm font-bold">{featuredPost.author}</p><p className="text-xs text-gray-400">{featuredPost.date}</p></div></div>
                                    <span className="text-white font-bold text-sm flex items-center group-hover:text-masa-orange transition-colors">Read Full Story <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" /></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {gridPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {gridPosts.map(post => {
                                const { Icon, color, bg } = getCategoryInfo(post.category);
                                return (
                                    <div key={post.id} onClick={() => handlePostClick(post)} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col h-full transform hover:-translate-y-1.5">
                                        <div className="h-48 overflow-hidden relative"><img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" /></div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between mb-3 text-xs text-gray-500"><span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold ${bg} ${color}`}><Icon className="h-3 w-3" />{post.category}</span><span>{post.date}</span></div>
                                            <h3 className="text-lg font-bold text-masa-charcoal mb-2 group-hover:text-masa-blue transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                                            <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow leading-relaxed">{post.summary}</p>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2"><UserCircleIcon className="h-6 w-6 text-gray-400"/><span className="text-xs font-bold text-gray-600">{post.author}</span></div>
                                                <span className="text-masa-orange font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">Read <ArrowRightIcon className="ml-1 h-3 w-3" /></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100"><h3 className="text-2xl font-bold text-gray-400">No posts found</h3><p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p><button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedTag('All'); }} className="mt-6 text-masa-orange font-bold hover:underline">Clear all filters</button></div>
                    )}
                    {hasMore && (<div className="text-center mt-12"><button onClick={handleLoadMore} className="bg-white border-2 border-masa-blue text-masa-blue px-8 py-3 rounded-full font-bold hover:bg-masa-blue hover:text-white transition-colors shadow-sm">Load More Stories</button></div>)}
                </div>
            </div></div>
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

export default BlogPage;