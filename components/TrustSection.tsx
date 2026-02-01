
import React from 'react';
import { NavigationProps } from '../types';
import { ShieldCheckIcon, TargetIcon, CheckCircleIcon } from './icons/FeatureIcons';

const TrustSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const steps = [
        {
            icon: null,
            number: '1',
            title: "Contribution",
            description: "Donations are received via secure channels with instant receipts.",
            color: 'blue'
        },
        {
            icon: ShieldCheckIcon,
            title: "Allocation",
            description: "Funds are allocated to specific programs with strict oversight.",
            color: 'orange'
        },
        {
            icon: TargetIcon,
            title: "Action",
            description: "Volunteers execute programs on the ground for maximum impact.",
            color: 'blue'
        },
        {
            icon: CheckCircleIcon,
            title: "Reporting",
            description: "Impact reports and financial statements are shared with donors.",
            color: 'green'
        }
    ];
    
    const colors = {
        blue: { border: 'border-masa-blue' },
        orange: { border: 'border-masa-orange' },
        green: { border: 'border-green-500' }
    };

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-500">OUR ACCOUNTABILITY</span>
                    <h2 className="text-3xl font-bold text-masa-charcoal mt-2">The Cycle of Trust</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Transparency isn’t just a promise; it’s built into every step of our process.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {steps.map((step, index) => {
                             const stepColor = colors[step.color as keyof typeof colors];
                             return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white border-4 ${stepColor.border} shadow-lg mb-6 z-10`}>
                                        {step.icon ? <step.icon className={`h-10 w-10 ${step.color === 'green' ? 'text-green-500' : 'text-masa-charcoal'}`} /> : <span className="text-4xl font-bold text-masa-charcoal">{step.number}</span>}
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-charcoal">{step.title}</h3>
                                    <p className="text-gray-600 mt-2 text-sm max-w-xs">{step.description}</p>
                                </div>
                             )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
