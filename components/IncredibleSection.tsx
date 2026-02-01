
import React from 'react';
import { NavigationProps } from '../types';
import { CalendarDaysIcon, AcademicCapIcon, TrophyIcon, DocumentCheckIcon, MicrophoneIcon } from './icons/FeatureIcons';

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
    Records: DocumentCheckIcon,
    Conferences: MicrophoneIcon,
};

const routes = {
    Events: 'events',
    Trainings: 'trainings',
    Awards: 'awards',
    Records: 'records',
    Conferences: 'conferences',
} as const;

const IncredibleSection: React.FC<DeliveryAreasModuleProps> = ({ navigateTo, title, description, items }) => {
    return (
        <section className="py-24 bg-masa-charcoal text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        {description}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
                    {items.map((item, index) => {
                        const Icon = icons[item.type];
                        const route = routes[item.type];
                        const colors = ['#1E3A8A', '#F97316', '#10B981', '#6366F1', '#EC4899'];
                        
                        return (
                            <div 
                                key={item.title} 
                                onClick={() => navigateTo(route)}
                                className="flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-2 border-white/20 mb-6 transition-all duration-300 group-hover:border-white/50 group-hover:scale-105">
                                    <div className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" style={{backgroundColor: colors[index % colors.length], filter: 'blur(15px)'}}></div>
                                    <Icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default IncredibleSection;
