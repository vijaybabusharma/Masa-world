
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
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-sm font-bold uppercase tracking-widest text-masa-orange">OUR PILLARS</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-masa-charcoal mt-2">Holistic Development Ecosystem</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We don’t just focus on one aspect. We build a connected ecosystem where sports, education, and culture reinforce each other.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillars.map((pillar) => {
                        const PillarIcon = iconMap[pillar.icon];
                        const pillarColors = colors[pillar.color as keyof typeof colors];
                        return (
                            <div key={pillar.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${pillarColors.bg} ring-8 ${pillarColors.ring}`}>
                                        <PillarIcon className={`h-8 w-8 ${pillarColors.text}`} />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${pillarColors.bg} ${pillarColors.text}`}>{pillar.label}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-masa-charcoal mt-8 mb-4">{pillar.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{pillar.description}</p>
                                <button 
                                    onClick={() => navigateTo(pillar.page)}
                                    className="font-bold text-masa-blue hover:text-masa-orange flex items-center mt-auto transition-colors group-hover:text-masa-orange"
                                >
                                    EXPLORE {pillar.title.toUpperCase()} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
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
