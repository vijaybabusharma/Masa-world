
import React, { useState, useMemo } from 'react';
import SocialShareButtons from '../components/SocialShareButtons';
import { Post } from '../types';
import { 
    CalendarDaysIcon, 
    ArrowRightIcon, 
    SearchIcon, 
    TagIcon, 
    UserCircleIcon,
    ClockIcon
} from '../components/icons/FeatureIcons';
import { ChevronDownIcon, ChevronUpIcon } from '../components/icons/UiIcons';
import { postsData, calculateReadingTime } from '../utils/data';

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
                "url": "https://masaworld.org/logo.png"
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
    "All",
    "Sports",
    "Education",
    "Culture",
    "Events",
    "Awards",
    "NGO Updates"
];

const Sidebar: React.FC<{
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    tagsList: string[];
    selectedTag: string;
    setSelectedTag: (t: string) => void;
    recentPosts: Post[];
    onPostClick: (post: Post) => void;
}> = ({ 
    searchQuery, setSearchQuery, 
    selectedCategory, setSelectedCategory, 
    tagsList, selectedTag, setSelectedTag,
    recentPosts, onPostClick 
}) => {
    return (
        <aside className="space-y-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-masa-orange focus:bg-white transition-all"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Categories</h3>
                <ul className="space-y-2">
                    {categoriesList.map(cat => (
                        <li key={cat}>
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                                    selectedCategory === cat 
                                    ? 'bg-orange-50 text-masa-orange' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-masa-charcoal'
                                }`}
                            >
                                {cat}
                                {selectedCategory === cat && <div className="h-2 w-2 rounded-full bg-masa-orange"></div>}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tagsList.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                                selectedTag === tag
                                ? 'bg-masa-orange text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tag === 'All' ? 'All Tags' : `#${tag}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-masa-charcoal mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {recentPosts.map(post => (
                        <div key={post.id} onClick={() => onPostClick(post)} className="group cursor-pointer">
                            <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-masa-blue transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <CalendarDaysIcon className="h-3 w-3 mr-1" /> {post.date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Box */}
            <div className="bg-masa-blue text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <h3 className="text-lg font-bold mb-2 relative z-10">Join Our Mission</h3>
                <p className="text-sm text-blue-100 mb-4 relative z-10">
                    Stay updated with our latest initiatives and impact stories.
                </p>
                <div className="relative z-10">
                    <button className="w-full bg-masa-orange text-white py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
                        Subscribe to Newsletter
                    </button>
                </div>
            </div>
        </aside>
    );
};

const BlogPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const tagsList = useMemo(() => {
        const allTags = postsData.flatMap(post => post.tags || []);
        return ['All', ...Array.from(new Set(allTags)).sort()];
    }, []);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        return postsData.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  post.summary.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            
            const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag));

            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [selectedCategory, selectedTag, searchQuery]);

    // Derived Data
    const featuredPost = filteredPosts.length > 0 && selectedCategory === 'All' && selectedTag === 'All' && !searchQuery ? filteredPosts[0] : null;
    
    // Grid posts logic
    const gridPosts = featuredPost 
        ? filteredPosts.filter(p => p.id !== featuredPost.id).slice(0, visibleCount) 
        : filteredPosts.slice(0, visibleCount);
        
    const hasMore = featuredPost 
        ? filteredPosts.length > visibleCount + 1 
        : filteredPosts.length > visibleCount;

    // Recent posts for sidebar (exclude current viewed post if any, else just top 4)
    const recentPosts = useMemo(() => {
        return postsData.slice(0, 5);
    }, []);

    // Handlers
    const handleLoadMore = () => setVisibleCount(prev => prev + 6);
    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        window.scrollTo(0, 0);
    };
    const handleBack = () => {
        setSelectedPost(null);
        window.scrollTo(0, 0);
    };

    // Helper to render text with formatting including H2 and H3
    const renderContent = (content: string) => {
        return content.split('\n\n').map((block, index) => {
            const trimmedBlock = block.trim();
            if (trimmedBlock.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-masa-charcoal mt-10 mb-6 border-b pb-2 border-gray-100">{trimmedBlock.replace('## ', '')}</h2>;
            }
            if (trimmedBlock.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-masa-charcoal mt-8 mb-4">{trimmedBlock.replace('### ', '')}</h3>;
            }
            
            // Highlight the first paragraph if it's the start of the body text (and not a header)
            if (index === 0 && !trimmedBlock.startsWith('#')) {
                 return <p key={index} className="mb-8 text-xl leading-relaxed text-gray-600 font-light first-letter:text-5xl first-letter:font-bold first-letter:text-masa-blue first-letter:mr-3 first-letter:float-left">{trimmedBlock}</p>;
            }

            return <p key={index} className="mb-6 leading-relaxed text-lg text-gray-700">{trimmedBlock}</p>;
        });
    };

    // --- Single Post View ---
    if (selectedPost) {
        return (
            <div className="bg-white min-h-screen">
                <BlogPostSchema post={selectedPost} />
                <div className="bg-gray-50 border-b border-gray-200 sticky top-20 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <button onClick={handleBack} className="flex items-center text-masa-charcoal hover:text-masa-orange font-bold transition-colors">
                            <SimpleArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Blog
                        </button>
                    </div>
                </div>

                <article className="pb-24">
                    {/* Article Hero */}
                    <div className="relative h-[400px] md:h-[500px]">
                        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-white">
                                <div className="flex items-center gap-4 mb-4 text-sm font-semibold uppercase tracking-wider">
                                    <span className="bg-masa-orange px-3 py-1 rounded-full">{selectedPost.category}</span>
                                    <span>{selectedPost.date}</span>
                                    <span className="flex items-center gap-1 opacity-90"><ClockIcon className="h-4 w-4"/> {calculateReadingTime(selectedPost.content)}</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl shadow-sm">{selectedPost.title}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Main Content */}
                            <div className="lg:w-3/4">
                                <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                                    {/* Summary as a Lead Intro */}
                                    <p className="lead text-2xl font-medium text-gray-900 mb-10 border-l-4 border-masa-orange pl-6 py-2 bg-gray-50 rounded-r-lg italic">
                                        {selectedPost.summary}
                                    </p>
                                    
                                    {/* Main Body Content */}
                                    {renderContent(selectedPost.content)}
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPost.tags?.map(tag => (
                                            <span key={tag} className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                <TagIcon className="h-3 w-3 mr-1" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-bold text-masa-charcoal">{selectedPost.author || "MASA Team"}</p>
                                            <p className="text-xs text-gray-500">Author</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8">
                                     <SocialShareButtons post={selectedPost} />
                                </div>
                            </div>

                            {/* Sidebar CTA */}
                            <div className="lg:w-1/4 space-y-8">
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 sticky top-32">
                                    <h3 className="text-xl font-bold text-masa-blue mb-4">Be the Change</h3>
                                    <p className="text-gray-600 mb-6 text-sm">
                                        Inspired by this story? Join us in making a difference.
                                    </p>
                                    <div className="space-y-3">
                                        <button className="w-full bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors text-sm">
                                            Volunteer Now
                                        </button>
                                        <button className="w-full bg-white border border-masa-orange text-masa-orange py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors text-sm">
                                            Make a Donation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    // --- List View ---
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="bg-masa-charcoal pt-24 pb-20 text-white text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Blog & News</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Insights, stories, and updates from the ground.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Mobile Sidebar Toggle */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-masa-charcoal font-bold"
                        >
                            <span>Filters & Search</span>
                            {isSidebarOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Sidebar (Desktop: Right Side, Mobile: Collapsible) */}
                    <div className={`lg:w-1/3 lg:order-2 space-y-8 ${isSidebarOpen ? 'block mt-8' : 'hidden lg:block'}`}>
                        <div className="sticky top-24">
                            <Sidebar 
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                tagsList={tagsList}
                                selectedTag={selectedTag}
                                setSelectedTag={setSelectedTag}
                                recentPosts={recentPosts}
                                onPostClick={handlePostClick}
                            />
                        </div>
                    </div>

                    {/* Main Content (Left Side) */}
                    <div className="lg:w-2/3 lg:order-1">
                        
                        {/* Featured Post */}
                        {featuredPost && (
                            <div 
                                onClick={() => handlePostClick(featuredPost)}
                                className="group mb-12 relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                            >
                                <div className="h-64 md:h-80 overflow-hidden relative">
                                    <img 
                                        src={featuredPost.image} 
                                        alt={featuredPost.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-4 left-4 bg-masa-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        Featured
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                                        <div className="flex items-center gap-3 mb-2 text-sm opacity-90">
                                            <span>{featuredPost.category}</span>
                                            <span>•</span>
                                            <span>{featuredPost.date}</span>
                                            <span className="flex items-center gap-1"><ClockIcon className="h-4 w-4"/> {calculateReadingTime(featuredPost.content)}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-orange-200 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-gray-200 line-clamp-2 md:line-clamp-none">
                                            {featuredPost.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Post Grid */}
                        {gridPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {gridPosts.map(post => (
                                    <div 
                                        key={post.id} 
                                        onClick={() => handlePostClick(post)}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col h-full"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <img 
                                                src={post.image} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-masa-charcoal shadow-sm">
                                                {post.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                                                <CalendarDaysIcon className="h-3 w-3" />
                                                <span>{post.date}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                                {post.summary}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-masa-orange font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                                                    Read More <ArrowRightIcon className="ml-1 h-4 w-4" />
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium flex items-center">
                                                    <ClockIcon className="h-3 w-3 mr-1" /> {calculateReadingTime(post.content)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-400">No posts found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p>
                                <button 
                                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedTag('All'); }}
                                    className="mt-6 text-masa-orange font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {hasMore && (
                            <div className="text-center mt-12">
                                <button 
                                    onClick={handleLoadMore}
                                    className="bg-white border-2 border-masa-blue text-masa-blue px-8 py-3 rounded-full font-bold hover:bg-masa-blue hover:text-white transition-colors shadow-sm"
                                >
                                    Load More Stories
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default BlogPage;
