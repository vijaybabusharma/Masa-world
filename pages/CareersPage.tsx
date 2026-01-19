
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { BriefcaseIcon } from '../components/icons/FeatureIcons';
import CareersModal from '../components/CareersModal';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const CareersPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Social Work Internship');

    const handleApplyClick = (role: string) => {
        setSelectedRole(role);
        setIsCareersModalOpen(true);
    };

    const opportunities = [
        { 
            title: 'Social Work Internship', 
            desc: 'Gain hands-on experience in community projects, social impact assessment, and program management. A perfect role for students and recent graduates passionate about grassroots change.',
            tags: ['India', 'Hybrid', 'Field-based'] 
        },
        { 
            title: 'Project Coordinator', 
            desc: 'Manage and execute grassroots initiatives from planning to reporting. This role requires strong organizational skills and the ability to work with diverse teams.',
            tags: ['Remote', 'Hybrid', 'Global'] 
        },
        { 
            title: 'Research Fellowship', 
            desc: 'Conduct in-depth research on social issues to guide our strategic initiatives. Ideal for academics and professionals with a background in social sciences or public policy.',
            tags: ['Remote', 'Global'] 
        }
    ];

    return (
        <div className="bg-gray-50">
            {isCareersModalOpen && (
                <CareersModal 
                    initialRole={selectedRole}
                    onClose={() => setIsCareersModalOpen(false)}
                    navigateTo={navigateTo}
                />
            )}
            
            <PageHeader 
                title="Careers & Internships"
                subtitle="Join our team to drive social impact through learning, leadership, and hands-on experience."
            />
            
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16 max-w-3xl mx-auto">
                         <div className="inline-block p-4 bg-blue-50 text-masa-blue rounded-full mb-4">
                             <BriefcaseIcon className="h-10 w-10" />
                         </div>
                         <h2 className="text-3xl font-bold text-masa-charcoal">Grow With Us</h2>
                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            At MASA World Foundation, we offer learning-focused, impact-driven opportunities for students and professionals. Our internships and project-based roles are centered on leadership development, research, and creating real-world social impact at both national and international levels.
                         </p>
                     </div>
                     
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                         {opportunities.map((job) => (
                             <div key={job.title} className="border border-gray-200 p-8 rounded-2xl bg-white flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                                <h3 className="font-bold text-2xl text-gray-900 mb-3">{job.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{job.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                   {job.tags.map(tag => (
                                       <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">{tag}</span>
                                   ))}
                                </div>
                                <button className="w-full bg-masa-blue text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors" onClick={() => handleApplyClick(job.title)}>
                                   Apply Now
                                </button>
                             </div>
                         ))}
                     </div>

                     <div className="text-center mt-16 bg-gray-100 p-8 rounded-2xl max-w-3xl mx-auto">
                        <h3 className="font-bold text-xl text-masa-charcoal">Don't see a fit?</h3>
                        <p className="text-gray-600 my-4">We are always looking for passionate individuals. Submit your resume, and we'll contact you when a suitable role opens up.</p>
                        <button className="text-masa-orange font-bold hover:underline" onClick={() => handleApplyClick('General Application')}>
                            Submit Resume for Future Opportunities
                        </button>
                     </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;