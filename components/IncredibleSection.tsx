
import React from 'react';
import { NavigationProps } from '../types';
import { CalendarDaysIcon, AcademicCapIcon, TrophyIcon, SparklesIcon, UsersIcon, ArrowRightIcon } from './icons/FeatureIcons';

const IncredibleSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const items = [
        {
            type: 'Events',
            title: 'Events',
            description: 'Bringing communities together for action, celebration, and change through impactful events.'
        },
        {
            type: 'Trainings',
            title: 'Trainings',
            description: 'Building the leaders of tomorrow with discipline, life skills, and vocational knowledge.'
        },
        {
            type: 'Awards',
            title: 'Awards',
            description: 'Celebrating the unsung heroes who build our communities with selfless dedication.'
        },
        {
            type: 'Records',
            title: 'Records',
            description: 'Showcasing extraordinary feats of discipline, dedication, and human spirit to inspire.'
        },
        {
            type: 'Conferences',
            title: 'Conferences',
            description: 'Engaging in dialogue to enlighten minds and find solutions to national issues.'
        }
    ];

    const icons = {
        Events: CalendarDaysIcon,
        Trainings: AcademicCapIcon,
        Awards: TrophyIcon,
        Records: SparklesIcon,
        Conferences: UsersIcon,
    };

    const routes = {
        Events: 'events',
        Trainings: 'trainings',
        Awards: 'awards',
        Records: 'records',
        Conferences: 'conferences',
    } as const;

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-masa-charcoal">Key Delivery & Impact</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        We turn our vision into action through five key delivery mechanisms, creating measurable impact on the ground.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.slice(0, 3).map((item) => {
                        const Icon = icons[item.type];
                        const route = routes[item.type];
                        return (
                             <div key={item.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-masa-orange group-hover:bg-masa-orange group-hover:text-white transition-colors">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-masa-charcoal mb-4">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{item.description}</p>
                                <button 
                                    onClick={() => navigateTo(route)} 
                                    className="text-masa-blue font-bold hover:text-masa-orange flex items-center mt-auto transition-colors text-sm"
                                >
                                    Explore {item.type} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:max-w-4xl lg:mx-auto">
                     {items.slice(3).map((item) => {
                        const Icon = icons[item.type];
                        const route = routes[item.type];
                        return (
                             <div key={item.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-masa-orange group-hover:bg-masa-orange group-hover:text-white transition-colors">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-masa-charcoal mb-4">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{item.description}</p>
                                <button 
                                    onClick={() => navigateTo(route)} 
                                    className="text-masa-blue font-bold hover:text-masa-orange flex items-center mt-auto transition-colors text-sm"
                                >
                                    Explore {item.type} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default IncredibleSection;
