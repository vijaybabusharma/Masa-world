
import React from 'react';
import { NavigationProps } from '../types';
import { EyeIcon, HeartIcon, CheckIcon } from '../components/icons/FeatureIcons';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const MissionVisionPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const missionPoints = [
        "Provide access to sports, education, and culture.",
        "Foster discipline, leadership, and self-reliance.",
        "Promote social responsibility and community action."
    ];

    const visionPoints = [
        "Ensure opportunity for every young individual.",
        "Nurture confidence for positive local and global change.",
        "Build a future led by empowered, responsible citizens."
    ];

    return (
        <div className="bg-gray-50">
            <PageHeader title="Mission & Vision" subtitle="Our purpose and our promise for the future." />
            
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                        
                        {/* Mission */}
                        <div className="bg-gray-50 p-10 rounded-3xl border-t-4 border-masa-blue shadow-lg flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <HeartIcon className="h-8 w-8 text-masa-blue" />
                                </div>
                                <h2 className="text-3xl font-bold text-masa-charcoal">Our Mission</h2>
                            </div>
                            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8 flex-grow">
                                “To empower youth and communities by providing access to sports, education, and cultural opportunities that foster discipline, leadership, self-reliance, and social responsibility.”
                            </p>
                            <ul className="space-y-4">
                                {missionPoints.map((point, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="bg-gray-50 p-10 rounded-3xl border-t-4 border-masa-orange shadow-lg flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <EyeIcon className="h-8 w-8 text-masa-orange" />
                                </div>
                                <h2 className="text-3xl font-bold text-masa-charcoal">Our Vision</h2>
                            </div>
                            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8 flex-grow">
                                “To build a world where every young individual has the opportunity, guidance, and confidence to lead positive change—locally and globally.”
                            </p>
                            <ul className="space-y-4">
                                {visionPoints.map((point, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MissionVisionPage;
