
import React, { useState, useEffect } from 'react';
import { NavigationProps, PillarItem } from '../types';
import { AcademicCapIcon, UsersIcon, TargetIcon, ArrowRightIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';

// Map string icon names from settings to actual components
const iconMap = {
    UsersIcon: UsersIcon,
    AcademicCapIcon: AcademicCapIcon,
    TargetIcon: TargetIcon,
};

const WhatWeDoSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [pillars, setPillars] = useState<PillarItem[]>([]);
    
    useEffect(() => {
        const settings = ContentManager.getSettings();
        setPillars(settings.homepage.pillars || []);
    }, []);

    const colors = {
        red: { bg: 'bg-red-500/10', text: 'text-red-500', ring: 'ring-red-500/20' },
        blue: { bg: 'bg-blue-500/10', text: 'text-masa-blue', ring: 'ring-blue-500/20' },
        green: { bg: 'bg-green-500/10', text: 'text-green-500', ring: 'ring-green-500/20' },
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <span className="text-sm font-bold uppercase tracking-widest text-masa-orange">OUR PILLARS</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-masa-charcoal mt-4 mb-6">Holistic Development Ecosystem</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We don’t just focus on one aspect. We build a connected ecosystem where sports, education, and culture reinforce each other.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pillars.map((pillar) => {
                        const PillarIcon = iconMap[pillar.icon];
                        const pillarColors = colors[pillar.color as keyof typeof colors];
                        return (
                            <div key={pillar.id} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center relative ${pillarColors.bg} ring-8 ${pillarColors.ring} flex-shrink-0`}>
                                        <PillarIcon className={`h-10 w-10 ${pillarColors.text}`} />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full ${pillarColors.bg} ${pillarColors.text}`}>{pillar.label}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-masa-charcoal mb-4">{pillar.title}</h3>
                                <p className="text-lg text-gray-600 mb-8 flex-grow leading-relaxed">{pillar.description}</p>
                                <button 
                                    onClick={() => navigateTo(pillar.page)}
                                    className="font-bold text-lg text-masa-blue hover:text-masa-orange flex items-center mt-auto transition-colors group-hover:text-masa-orange"
                                >
                                    EXPLORE {pillar.title.toUpperCase()} <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhatWeDoSection;
