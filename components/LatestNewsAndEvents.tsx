
import React, { useState, useEffect } from 'react';
import { NavigationProps, Post, Event } from '../types';
import { ContentManager } from '../utils/contentManager';
import { CalendarDaysIcon, ArrowRightIcon, MapPinIcon } from './icons/FeatureIcons';

const LatestNewsAndEvents: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const allPosts = ContentManager.getPosts();
        setPosts(allPosts.slice(0, 2));

        const upcomingEvents = ContentManager.getEvents().filter(e => e.status === 'Upcoming');
        if (upcomingEvents.length > 0) {
            setFeaturedEvent(upcomingEvents[0]);
        } else {
            // Fallback to the most recent completed event if no upcoming events
            setFeaturedEvent(ContentManager.getEvents()[0] || null);
        }
    }, []);

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Latest News & Events</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Stay connected with our latest stories, impact reports, and upcoming opportunities to get involved.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Featured Event */}
                    {featuredEvent && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
                            <div className="relative h-64">
                                <img 
                                    src={featuredEvent.image} 
                                    alt={featuredEvent.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border text-white ${featuredEvent.status === 'Upcoming' ? 'bg-green-600 border-green-700' : 'bg-gray-600 border-gray-700'}`}>
                                    {featuredEvent.status}
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-sm font-bold text-masa-orange uppercase tracking-wide mb-2">{featuredEvent.category}</p>
                                <h3 className="text-2xl font-bold text-masa-charcoal mb-4 h-16">{featuredEvent.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <CalendarDaysIcon className="h-4 w-4 mr-2" /> {featuredEvent.displayDate}
                                    <span className="mx-2">|</span>
                                    <MapPinIcon className="h-4 w-4 mr-2" /> {featuredEvent.location}
                                </div>
                                <button
                                    onClick={() => navigateTo('events')}
                                    className="w-full bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-sm"
                                >
                                    Event Details
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Latest News */}
                    <div className="space-y-6">
                        {posts.map(post => (
                            <div 
                                key={post.id} 
                                onClick={() => navigateTo('blog')} 
                                className="group cursor-pointer bg-white p-6 rounded-2xl border border-gray-100 hover:border-masa-blue transition-all hover:shadow-lg"
                            >
                                <p className="text-xs text-gray-500 font-medium mb-1">{post.date} • {post.category}</p>
                                <h4 className="font-bold text-lg text-masa-charcoal group-hover:text-masa-blue transition-colors leading-tight">
                                    {post.title}
                                </h4>
                            </div>
                        ))}

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                             <button
                                onClick={() => navigateTo('blog')}
                                className="flex-1 text-center py-3 px-6 bg-white border-2 border-masa-blue text-masa-blue font-bold rounded-full hover:bg-blue-50 transition-colors"
                            >
                                Read Our Blog
                            </button>
                             <button
                                onClick={() => navigateTo('events')}
                                className="flex-1 text-center py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors"
                            >
                                All Events
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsAndEvents;
