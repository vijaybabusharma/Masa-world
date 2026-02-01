
import React from 'react';
import { NavigationProps } from '../types';
import { BriefcaseIcon, ArrowRightIcon } from './icons/FeatureIcons';

const CareersSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const opportunities = [
        { 
            title: 'Social Work Internship', 
            desc: 'Gain hands-on experience in community projects, social impact assessment, and program management for aspiring social workers.',
            tags: ['India', 'Hybrid', 'Field-based'] 
        },
        { 
            title: 'Youth Leadership Fellowship', 
            desc: 'A fixed-duration program on leadership, teamwork, and civic responsibility for ages 18-25, creating future changemakers.',
            tags: ['Youth', 'Fellowship', 'Leadership'] 
        },
        { 
            title: 'Research Fellowship', 
            desc: 'Conduct in-depth research on social issues to guide our strategic initiatives and policy advocacy for a better tomorrow.',
            tags: ['Remote', 'Global', 'Research'] 
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-block p-4 bg-blue-50 text-masa-blue rounded-full mb-4">
                        <BriefcaseIcon className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-masa-charcoal">Careers & Internships</h2>
                    <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                        Join our team to drive social impact through learning, leadership, and hands-on experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {opportunities.map((job) => (
                        <div key={job.title} className="border border-gray-200 p-8 rounded-2xl bg-white flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow transform hover:-translate-y-1 group">
                            <h3 className="font-bold text-xl text-gray-900 mb-3">{job.title}</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-grow">{job.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                               {job.tags.map(tag => (
                                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">{tag}</span>
                               ))}
                            </div>
                            <button 
                                className="w-full bg-white border-2 border-masa-blue text-masa-blue font-bold py-3 rounded-lg hover:bg-masa-blue hover:text-white transition-colors mt-auto"
                                onClick={() => navigateTo('careers')}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button 
                        onClick={() => navigateTo('careers')}
                        className="bg-masa-charcoal text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2 mx-auto"
                    >
                        View All Openings <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CareersSection;
