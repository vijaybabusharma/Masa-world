
import React from 'react';
import { ShieldCheckIcon, HeartIcon, PresentationChartBarIcon, GlobeIcon } from './icons/FeatureIcons';

const CredibilityBanner: React.FC = () => {
    const indicators = [
        { icon: ShieldCheckIcon, text: 'Registered NGO' },
        { icon: HeartIcon, text: 'Ethical Practices' },
        { icon: PresentationChartBarIcon, text: 'Transparent Communication' },
        { icon: GlobeIcon, text: 'Global Collaboration' }
    ];

    return (
        <section className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {indicators.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-3">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                                <item.icon className="h-7 w-7 md:h-8 md:w-8 text-masa-blue" />
                            </div>
                            <h4 className="font-semibold text-xs sm:text-sm text-masa-charcoal">{item.text}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CredibilityBanner;
