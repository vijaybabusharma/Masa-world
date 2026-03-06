
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from './icons/UiIcons';
import { ContentManager } from '../utils/contentManager';
import { motion, AnimatePresence } from 'motion/react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    navigateTo: (page: any) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, navigateTo }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults([]);
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setResults(await ContentManager.searchContent(query));
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleResultClick = (page: any) => {
        navigateTo(page);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex flex-col"
                >
                    <div className="container mx-auto px-6 py-8 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-bold text-gray-900">Search MASA</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <XIcon className="h-8 w-8 text-gray-500" />
                            </button>
                        </div>

                        <div className="relative max-w-4xl mx-auto w-full mb-12">
                            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-masa-blue" />
                            <input 
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for pages, events, initiatives..."
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-6 pl-16 pr-8 text-2xl focus:border-masa-blue focus:ring-0 transition-all outline-none"
                            />
                        </div>

                        <div className="flex-grow overflow-y-auto max-w-4xl mx-auto w-full pb-20">
                            {query.length >= 2 && results.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-gray-400 text-xl">No results found for "{query}"</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                {results.map((result, idx) => (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={`${result.type}-${result.id}`}
                                        onClick={() => handleResultClick(result.page)}
                                        className="w-full text-left p-6 bg-white border border-gray-100 rounded-2xl hover:border-masa-blue hover:shadow-md transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-masa-blue transition-colors">{result.title}</h3>
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 text-gray-500 rounded">{result.type}</span>
                                        </div>
                                        <p className="text-gray-500 line-clamp-2">{result.description}</p>
                                    </motion.button>
                                ))}
                            </div>

                            {query.length < 2 && (
                                <div className="grid md:grid-cols-2 gap-8 mt-12">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Popular Searches</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Initiatives', 'Volunteer', 'Events', 'Donate', 'Sports'].map(tag => (
                                                <button 
                                                    key={tag} 
                                                    onClick={() => setQuery(tag)}
                                                    className="px-4 py-2 bg-gray-100 hover:bg-masa-blue hover:text-white rounded-full text-sm font-medium transition-all"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Quick Links</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => handleResultClick('about')} className="text-left text-gray-600 hover:text-masa-blue font-medium">About Us</button>
                                            <button onClick={() => handleResultClick('contact')} className="text-left text-gray-600 hover:text-masa-blue font-medium">Contact</button>
                                            <button onClick={() => handleResultClick('membership')} className="text-left text-gray-600 hover:text-masa-blue font-medium">Membership</button>
                                            <button onClick={() => handleResultClick('blog')} className="text-left text-gray-600 hover:text-masa-blue font-medium">Latest News</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
