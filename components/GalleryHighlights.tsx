
import React, { useState, useEffect } from 'react';
import { NavigationProps, GalleryItem } from '../types';
import { ContentManager } from '../utils/contentManager';
import { ArrowRightIcon, CameraIcon } from './icons/FeatureIcons';

const GalleryHighlights: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [highlights, setHighlights] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const loadContent = () => {
            const allItems = ContentManager.getGalleryItems();
            // Take 8 items for a nice grid
            setHighlights(allItems.slice(0, 8));
        };
        loadContent();
        window.addEventListener('masa-settings-updated', loadContent);
        return () => window.removeEventListener('masa-settings-updated', loadContent);
    }, []);

    if (highlights.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-sm font-bold uppercase tracking-widest text-masa-orange">Visual Journey</span>
                        <h2 className="text-3xl font-bold text-masa-charcoal mt-2">Gallery Highlights</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Capturing moments of change, empowerment, and community impact across our various initiatives.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigateTo('gallery')}
                        className="flex items-center gap-2 text-masa-blue font-bold hover:underline group"
                    >
                        View Full Gallery
                        <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {highlights.map((item, index) => (
                        <div 
                            key={item.id || index}
                            onClick={() => navigateTo('gallery')}
                            className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <img 
                                src={(item as any).imageUrl || 'https://images.unsplash.com/photo-1585844264776-b871c4eb5b53?auto=format&fit=crop&w=800&q=80'} 
                                alt={item.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h4 className="text-white font-bold text-sm leading-tight">{item.title}</h4>
                                <p className="text-white/70 text-[10px] mt-1 uppercase tracking-wider">{item.category}</p>
                            </div>
                            {(item as any).videoUrl && (
                                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full">
                                    <CameraIcon className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryHighlights;
