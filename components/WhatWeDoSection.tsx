
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
    const [sectionSettings, setSectionSettings] = useState(ContentManager.getSettings().homepage.sections.whatWeDo);
    
    useEffect(() => {
        const loadContent = () => {
            const settings = ContentManager.getSettings();
            setPillars(settings.homepage.pillars || []);
            setSectionSettings(settings.homepage.sections.whatWeDo);
        };
        loadContent();
        window.addEventListener('masa-settings-updated', loadContent);
        return () => window.removeEventListener('masa-settings-updated', loadContent);
    }, []);

    const colors = {
        red: { bg: 'bg-red-500/10', text: 'text-red-500', ring: 'ring-red-500/20' },
        blue: { bg: 'bg-blue-500/10', text: 'text-masa-blue', ring: 'ring-blue-500/20' },
        green: { bg: 'bg-green-500/10', text: 'text-green-500', ring: 'ring-green-500/20' },
    };

    if (!sectionSettings.visible) return null;

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-masa-orange opacity-80">OUR PILLARS</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-masa-charcoal mt-4 mb-6 leading-tight">{sectionSettings.title}</h2>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium opacity-90">
                        {sectionSettings.subtitle}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pillars.map((pillar) => {
                        const PillarIcon = iconMap[pillar.icon];
                        const pillarColors = colors[pillar.color as keyof typeof colors];
                        return (
                            <div key={pillar.id} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 flex flex-col group">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center relative ${pillarColors.bg} ring-8 ${pillarColors.ring} flex-shrink-0 transition-transform duration-500 group-hover:rotate-6`}>
                                        <PillarIcon className={`h-10 w-10 ${pillarColors.text}`} />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${pillarColors.bg} ${pillarColors.text}`}>{pillar.label}</span>
                                </div>
                                <h3 className="text-3xl font-extrabold text-masa-charcoal mb-4 tracking-tight group-hover:text-masa-orange transition-colors duration-300">{pillar.title}</h3>
                                <p className="text-lg text-gray-500 mb-8 flex-grow leading-relaxed font-normal">{pillar.description}</p>
                                <button 
                                    onClick={() => navigateTo(pillar.page)}
                                    className="font-black text-xs uppercase tracking-widest text-masa-blue hover:text-masa-orange flex items-center mt-auto transition-all group-hover:gap-2"
                                >
                                    EXPLORE {pillar.title} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2"/>
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
