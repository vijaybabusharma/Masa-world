
import React from 'react';
import { NavigationProps } from '../types';
import { TrophyIcon, AcademicCapIcon, GlobeIcon, ArrowRightIcon } from './icons/FeatureIcons';

// Sub-component for a single pillar card
const PillarCard: React.FC<{
    icon: React.FC<any>;
    title: string;
    description: string;
    imageUrl: string;
    page: 'sports' | 'education' | 'culture';
    navigateTo: NavigationProps['navigateTo'];
}> = ({ icon: Icon, title, description, imageUrl, page, navigateTo }) => {
    return (
        <div 
            onClick={() => navigateTo(page)}
            className="relative rounded-2xl shadow-lg overflow-hidden group aspect-[3/4] cursor-pointer"
        >
            {/* Background Image */}
            <img 
                src={imageUrl} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 mb-6">
                    <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-grow">
                    <h3 className="text-3xl font-bold leading-tight">{title}</h3>
                    <p className="mt-4 text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-48">
                        {description}
                    </p>
                </div>
                <div className="mt-6 flex items-center font-bold text-lg group-hover:text-masa-orange transition-colors">
                    Learn More
                    <ArrowRightIcon className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
            </div>
        </div>
    );
};


const WhatWeDoSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const pillarsData = [
        {
            icon: TrophyIcon,
            title: 'Sports',
            description: 'Building character, discipline, and leadership on the field through grassroots leagues and national competitions.',
            imageUrl: 'https://picsum.photos/600/800?random=11',
            page: 'sports' as 'sports',
        },
        {
            icon: AcademicCapIcon,
            title: 'Education',
            description: 'Empowering minds for tomorrow with practical leadership skills, vocational training, and value-based learning.',
            imageUrl: 'https://picsum.photos/600/800?random=12',
            page: 'education' as 'education',
        },
        {
            icon: GlobeIcon,
            title: 'Culture',
            description: 'Connecting communities through heritage preservation, artisan support, and vibrant cultural exchange programs.',
            imageUrl: 'https://picsum.photos/600/800?random=13',
            page: 'culture' as 'culture',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-masa-charcoal">Our Holistic Approach</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We build a connected ecosystem where our three core pillars—Sports, Education, and Culture—reinforce each other to create sustainable, positive change.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillarsData.map((pillar) => (
                        <PillarCard key={pillar.title} {...pillar} navigateTo={navigateTo} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeDoSection;
