
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
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-masa-orange opacity-80">OUR ACCOUNTABILITY</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-masa-charcoal mt-4 leading-tight">The Cycle of Trust</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-500 font-medium opacity-90">
                        Transparency isn’t just a promise; it’s built into every step of our process.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-100 hidden md:block"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {steps.map((step, index) => {
                             const stepColor = colors[step.color as keyof typeof colors];
                             return (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center bg-white border-4 ${stepColor.border} shadow-xl mb-8 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        {step.icon ? <step.icon className={`h-10 w-10 ${step.color === 'green' ? 'text-green-500' : 'text-masa-charcoal'}`} /> : <span className="text-4xl font-black text-masa-charcoal">{step.number}</span>}
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-masa-charcoal tracking-tight group-hover:text-masa-orange transition-colors duration-300">{step.title}</h3>
                                    <p className="text-gray-500 mt-4 text-sm max-w-xs leading-relaxed font-medium">{step.description}</p>
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
