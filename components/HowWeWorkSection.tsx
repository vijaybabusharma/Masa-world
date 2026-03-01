
import React, { useState, useEffect } from 'react';
import { SearchIcon, UsersIcon, SparklesIcon, PresentationChartBarIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';
import { ProcessStep } from '../types';

const HowWeWorkSection: React.FC = () => {
    const [steps, setSteps] = useState<ProcessStep[]>([]);
    
    useEffect(() => {
        const loadContent = () => {
            const settings = ContentManager.getSettings();
            setSteps(settings.homepage.processSteps || []);
        };
        loadContent();
        window.addEventListener('masa-settings-updated', loadContent);
        return () => window.removeEventListener('masa-settings-updated', loadContent);
    }, []);

    const iconMap: Record<string, React.FC<any>> = {
        SearchIcon,
        UsersIcon,
        SparklesIcon,
        PresentationChartBarIcon
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-sm font-bold uppercase tracking-widest text-masa-orange">Our Process</span>
                    <h2 className="text-3xl font-bold text-masa-charcoal mt-2">How We Work</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Our approach is a systematic cycle designed for sustainable, long-term impact at the grassroots level.
                    </p>
                </div>

                <div className="relative">
                    {/* Dashed line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px">
                          <svg width="100%" height="2" className="overflow-visible">
                              <line x1="0" y1="1" x2="100%" y2="1" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="8, 8" />
                          </svg>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {steps.map((step, index) => {
                            const Icon = iconMap[step.icon] || SearchIcon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-white border-4 border-masa-blue shadow-lg mb-6">
                                         <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 text-masa-blue">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-charcoal mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeWorkSection;
