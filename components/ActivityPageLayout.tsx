
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { ArrowRightIcon, CheckIcon, HeartIcon, GlobeIcon, UsersIcon, CalendarDaysIcon, MapPinIcon } from './icons/FeatureIcons';

// Sub-component for Icon Grid
const FocusAreaGrid: React.FC<{ areas: { icon: any; label: string }[] }> = ({ areas }) => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {areas.map((area, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-50 p-4 rounded-full mb-3 text-masa-blue">
                    <area.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">{area.label}</h4>
            </div>
        ))}
    </div>
);

// Sub-component for Process Flow
const ProcessFlow: React.FC<{ steps: { title: string; description: string }[] }> = ({ steps }) => (
    <div className="relative">
        <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-lg transform hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 mx-auto bg-masa-orange text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 ring-4 ring-white shadow-md">
                        {idx + 1}
                    </div>
                    <h3 className="font-bold text-masa-charcoal mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 text-justify">{step.description}</p>
                </div>
            ))}
        </div>
    </div>
);

// Sub-component for Activity Cards
const ActivityCard: React.FC<{ activity: any; onAction: (type: 'support' | 'volunteer', eventName: string) => void }> = ({ activity, onAction }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
        <div className="relative h-48 overflow-hidden">
            <img src={activity.image} alt={activity.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 left-4 bg-masa-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {activity.status || 'Active'}
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-xl text-masa-charcoal mb-2 line-clamp-2">{activity.title}</h3>
            <div className="text-sm text-gray-500 mb-4 space-y-1">
                <div className="flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-2"/> {activity.date}</div>
                <div className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2"/> {activity.location}</div>
            </div>
            
            <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
                <button 
                    onClick={() => onAction('support', activity.title)}
                    className="text-center py-2 rounded-lg bg-green-50 text-green-700 font-bold text-xs hover:bg-green-100 transition-colors"
                >
                    Support
                </button>
                <button 
                    onClick={() => onAction('volunteer', activity.title)}
                    className="text-center py-2 rounded-lg bg-blue-50 text-masa-blue font-bold text-xs hover:bg-blue-100 transition-colors"
                >
                    Volunteer
                </button>
            </div>
        </div>
    </div>
);

interface ActivityPageLayoutProps extends NavigationProps {
    heroData: { title: string; subtitle: string; bgImage?: string; primaryCtaLabel: string; primaryCtaAction?: () => void };
    overviewData: { title: string; description: string; relevance: string };
    focusAreas: { icon: any; label: string }[];
    processSteps: { title: string; description: string }[];
    activities: { title: string; date: string; location: string; image: string; status?: string }[];
    participants: string[];
    impactMetrics: { value: string; label: string }[];
    testimonial?: { quote: string; author: string; role: string };
    ctaData: { title: string; text: string; primaryLabel: string; primaryAction?: () => void; secondaryLabel: string; secondaryAction?: () => void };
}

const ActivityPageLayout: React.FC<ActivityPageLayoutProps> = ({
    navigateTo,
    heroData,
    overviewData,
    focusAreas,
    processSteps,
    activities,
    participants,
    impactMetrics,
    testimonial,
    ctaData
}) => {
    
    const handleEventAction = (type: 'support' | 'volunteer', eventName: string) => {
        if (type === 'support') {
            sessionStorage.setItem('target_event_support', eventName);
            navigateTo('donate');
        } else {
            sessionStorage.setItem('target_event_volunteer', eventName);
            navigateTo('volunteer');
        }
    };

    return (
        <div>
            {/* 1. Hero Introduction */}
            <section className="relative bg-masa-charcoal text-white py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-center bg-cover" style={{ backgroundImage: `url(${heroData.bgImage || 'https://picsum.photos/1600/900?grayscale&blur=2'})` }}></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">{heroData.title}</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed font-light">{heroData.subtitle}</p>
                    <button 
                        onClick={heroData.primaryCtaAction || (() => navigateTo('contact'))}
                        className="bg-masa-orange text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-orange-600 transition-all shadow-lg transform hover:-translate-y-1 active:scale-95"
                    >
                        {heroData.primaryCtaLabel}
                    </button>
                </div>
            </section>

            {/* 2. Initiative Overview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-masa-blue font-bold uppercase tracking-widest text-sm mb-3 block">About The Initiative</span>
                        <h2 className="text-3xl font-bold text-masa-charcoal mb-6">{overviewData.title}</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed text-justify">{overviewData.description}</p>
                        <div className="bg-blue-50 border-l-4 border-masa-blue p-6 text-left rounded-r-lg">
                            <h4 className="font-bold text-masa-blue uppercase text-xs mb-2">Impact Scope</h4>
                            <p className="text-gray-700 text-justify">{overviewData.relevance}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Focus Areas */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-center text-masa-charcoal mb-10">Core Focus Areas</h3>
                    <FocusAreaGrid areas={focusAreas} />
                </div>
            </section>

            {/* 4. Process Flow */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-center text-masa-charcoal mb-12">How We Work</h3>
                    <ProcessFlow steps={processSteps} />
                </div>
            </section>

            {/* 5. Recent/Ongoing Activities */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <h3 className="text-2xl font-bold text-masa-charcoal">Recent & Ongoing Activities</h3>
                        <button className="text-masa-orange font-bold hover:underline hidden md:block">View All Archive &rarr;</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activities.map((item, idx) => (
                            <ActivityCard key={idx} activity={item} onAction={handleEventAction} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Who Can Participate */}
            <section className="py-20 bg-masa-charcoal text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold mb-10">Who Can Participate?</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {participants.map((p, idx) => (
                            <span key={idx} className="bg-white/10 px-6 py-3 rounded-full text-lg font-medium border border-white/20 hover:bg-white/20 transition-colors">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Get Involved CTA Box */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-masa-blue to-blue-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
                            <p className="text-blue-100 mb-10 max-w-2xl mx-auto">Join us in our mission. Whether you want to participate, volunteer, or partner, there is a place for you here.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button onClick={() => navigateTo('get-involved')} className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-md active:scale-95">
                                    Register / Apply Now
                                </button>
                                <button onClick={() => navigateTo('contact')} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-masa-blue transition-all active:scale-95">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Impact Metrics */}
            <section className="py-16 bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {impactMetrics.map((metric, idx) => (
                            <div key={idx}>
                                <p className="text-3xl md:text-4xl font-extrabold text-masa-orange mb-2">{metric.value}</p>
                                <p className="text-gray-600 font-medium uppercase text-xs md:text-sm tracking-wider">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Testimonials (Optional) */}
            {testimonial && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                         <div className="mb-6"><HeartIcon className="h-12 w-12 text-gray-200 mx-auto" /></div>
                        <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed mb-6 text-justify">
                            "{testimonial.quote}"
                        </blockquote>
                        <div className="text-masa-charcoal font-bold text-lg">{testimonial.author}</div>
                        <div className="text-masa-orange text-sm">{testimonial.role}</div>
                    </div>
                </section>
            )}

            {/* 10. Final Call-to-Action */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6">{ctaData.title}</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">{ctaData.text}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            onClick={ctaData.primaryAction || (() => navigateTo('get-involved'))}
                            className="bg-white text-masa-charcoal px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md active:scale-95"
                        >
                            {ctaData.primaryLabel}
                        </button>
                        <button 
                            onClick={ctaData.secondaryAction || (() => navigateTo('contact'))}
                            className="text-white border-2 border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
                        >
                            {ctaData.secondaryLabel}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ActivityPageLayout;
