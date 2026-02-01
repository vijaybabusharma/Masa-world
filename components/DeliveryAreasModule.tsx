
import React from 'react';
import { CalendarDaysIcon, AcademicCapIcon, TrophyIcon, SparklesIcon, UsersIcon } from './icons/FeatureIcons';

export interface DeliveryAreaItem {
    type: 'Events' | 'Trainings' | 'Awards' | 'Records' | 'Conferences';
    title: string;
    description: string;
}

interface DeliveryAreasModuleProps {
    title: string;
    items: DeliveryAreaItem[];
}

const icons = {
    Events: CalendarDaysIcon,
    Trainings: AcademicCapIcon,
    Awards: TrophyIcon,
    Records: SparklesIcon,
    Conferences: UsersIcon,
};

const DeliveryAreasModule: React.FC<DeliveryAreasModuleProps> = ({ title, items }) => {
    return (
        <section className="relative bg-masa-charcoal text-white pt-24 pb-20 overflow-hidden">
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-32 bg-white rounded-[50%]"
            ></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{title}</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
                    {items.map((item) => {
                        const Icon = icons[item.type];
                        const isAwards = item.type === 'Awards';
                        return (
                            <div key={item.title} className="flex flex-col items-center text-center">
                                <div className={`flex items-center justify-center w-20 h-20 rounded-full border-2 mb-6 transition-colors duration-300 ${isAwards ? 'bg-masa-orange border-masa-orange' : 'border-white/30'}`}>
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${isAwards ? 'text-masa-orange' : 'text-white'}`}>{item.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default DeliveryAreasModule;
