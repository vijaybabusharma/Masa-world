
import React from 'react';
import { NavigationProps } from '../types';
import { CalendarDaysIcon, AcademicCapIcon, TrophyIcon, SparklesIcon, UsersIcon, ArrowRightIcon } from './icons/FeatureIcons';

export interface DeliveryAreaItem {
    type: 'Events' | 'Trainings' | 'Awards' | 'Records' | 'Conferences';
    title: string;
    description: string;
}

interface DeliveryAreasModuleProps extends NavigationProps {
    title: string;
    description: string;
    items: DeliveryAreaItem[];
}

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

const DeliveryAreasModule: React.FC<DeliveryAreasModuleProps> = ({ navigateTo, title, description, items }) => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-masa-charcoal">{title}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {items.map((item) => {
                        const Icon = icons[item.type];
                        const route = routes[item.type];
                        return (
                            <div key={item.title} className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 text-masa-orange group-hover:bg-masa-orange group-hover:text-white transition-colors">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-masa-charcoal mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{item.description}</p>
                                <button 
                                    onClick={() => navigateTo(route)} 
                                    className="text-masa-blue font-bold hover:text-masa-orange flex items-center mt-auto transition-colors"
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

export default DeliveryAreasModule;
