
import React from 'react';
import { NavigationProps, Page } from '../types';
import { UsersIcon, GlobeIcon, TrophyIcon, ArrowRightIcon } from './icons/FeatureIcons';

interface FocusArea {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    page: Page;
}

const focusAreas: FocusArea[] = [
    {
        icon: UsersIcon,
        title: 'Youth Empowerment & Discipline',
        description: 'We forge future leaders by instilling discipline, resilience, and teamwork through sports and educational programs.',
        page: 'programs-overview',
    },
    {
        icon: GlobeIcon,
        title: 'Social Awareness & Reform',
        description: 'Our initiatives tackle grassroots issues, from community health to environmental consciousness, driving tangible social change.',
        page: 'initiatives',
    },
    {
        icon: TrophyIcon,
        title: 'Real Hero Recognition',
        description: 'We celebrate the unsung heroes of our communities—the teachers, social workers, and everyday citizens making a difference.',
        page: 'awards',
    },
];

const CoreFocusSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-masa-charcoal">Our Core Focus Areas</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We channel our efforts into three key areas to create a holistic and sustainable impact on society.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {focusAreas.map((area) => (
                        <div 
                            key={area.title} 
                            className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                        >
                            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-masa-blue">
                                <area.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-masa-charcoal mb-3">{area.title}</h3>
                            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">{area.description}</p>
                            <button 
                                onClick={() => navigateTo(area.page)} 
                                className="text-masa-blue font-bold hover:text-masa-orange flex items-center mt-auto transition-colors text-sm"
                            >
                                Learn More <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreFocusSection;
