
import React from 'react';
import { ShieldCheckIcon, HeartIcon, PresentationChartBarIcon, GlobeIcon } from './icons/FeatureIcons';

const CredibilityBanner: React.FC = () => {
    const indicators = [
        { icon: ShieldCheckIcon, text: 'Registered NGO' },
        { icon: HeartIcon, text: 'Ethical Fund Usage' },
        { icon: PresentationChartBarIcon, text: 'Impact Reporting' },
        { icon: GlobeIcon, text: 'Global Reach' }
    ];

    return (
        <section className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {indicators.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3 transition-transform hover:scale-110">
                                <item.icon className="h-8 w-8 text-masa-blue" />
                            </div>
                            <h4 className="font-semibold text-sm text-masa-charcoal">{item.text}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CredibilityBanner;
