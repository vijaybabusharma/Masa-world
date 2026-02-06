
import React, { useState, useEffect } from 'react';
import { NavigationProps, Event } from '../types';
import { ContentManager } from '../utils/contentManager';
import { CalendarDaysIcon, ArrowRightIcon, MapPinIcon } from './icons/FeatureIcons';

const LatestNewsAndEvents: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [sectionSettings, setSectionSettings] = useState(ContentManager.getSettings().homepage.sections.upcomingEvents);

    useEffect(() => {
        const loadContent = () => {
            const settings = ContentManager.getSettings();
            setSectionSettings(settings.homepage.sections.upcomingEvents);

            const allEvents = ContentManager.getEvents();
            const upcoming = allEvents
                .filter(e => e.status === 'Upcoming')
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3);
            
            setUpcomingEvents(upcoming);
        };

        loadContent();
        window.addEventListener('masa-settings-updated', loadContent);
        return () => window.removeEventListener('masa-settings-updated', loadContent);
    }, []);

    // If section is disabled in settings, or no events are found, don't render anything.
    if (!sectionSettings?.visible || upcomingEvents.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">{sectionSettings.title || "Upcoming Events"}</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {sectionSettings.subtitle || "Join our upcoming events and be part of the change."}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {upcomingEvents.map(event => (
                        <div 
                            key={event.id}
                            onClick={() => navigateTo('events')}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm font-bold text-masa-orange uppercase tracking-wide mb-2">{event.category}</p>
                                <h4 className="text-xl font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors leading-tight flex-grow min-h-[56px]">
                                    {event.title}
                                </h4>
                                <div className="flex flex-col gap-y-2 text-sm text-gray-500 my-4">
                                    <span className="flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-2" /> {event.displayDate}</span>
                                    <span className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2" /> {event.location}</span>
                                </div>
                                <div className="mt-auto">
                                    <span
                                        className="w-full text-center block py-3 px-6 bg-masa-blue text-white font-bold rounded-lg group-hover:bg-blue-900 transition-colors"
                                    >
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                     <button
                        onClick={() => navigateTo('events')}
                        className="bg-white border-2 border-masa-blue text-masa-blue font-bold py-3 px-8 rounded-full hover:bg-masa-blue hover:text-white transition-colors shadow-sm"
                    >
                        View All Events <ArrowRightIcon className="inline ml-2 h-4 w-4"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsAndEvents;
