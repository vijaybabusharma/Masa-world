
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
        // --- EXISTING PROGRAMS ---
        { 
            title: 'Social Work Internship', 
            desc: 'Gain hands-on experience in community projects, social impact assessment, and program management. A perfect role for students and recent graduates passionate about grassroots change.',
            tags: ['India', 'Hybrid', 'Field-based'],
            buttonText: 'Apply Now'
        },
        { 
            title: 'Research Fellowship', 
            desc: 'Conduct in-depth research on social issues to guide our strategic initiatives. Ideal for academics and professionals with a background in social sciences or public policy.',
            tags: ['Remote', 'Global'],
            buttonText: 'Apply Now'
        },
        // --- NEW PROGRAMS ---
        {
            title: 'Young Changemakers Program',
            desc: 'For children (10–15 years). Focuses on value education, awareness, and creativity. A participation-based program with a Certificate of Participation.',
            tags: ['10-15 Years', 'Children', 'Learning'],
            buttonText: 'Join Program'
        },
        {
            title: 'Student Social Action Program',
            desc: 'For teens (16–18 years). Involves social awareness and community activities with online and local participation. Includes a Certificate of Participation.',
            tags: ['16-18 Years', 'Teens', 'Community Action'],
            buttonText: 'Join Program'
        },
        {
            title: 'Youth Ambassador – Junior',
            desc: 'For teens (16–18 years). Focuses on awareness campaigns and digital participation. Awarded a Certificate and Digital Badge.',
            tags: ['16-18 Years', 'Teens', 'Digital Advocacy'],
            buttonText: 'Apply Now'
        },
        {
            title: 'Youth Leadership Fellowship',
            desc: 'For youth (18–25 years). A fixed-duration (4–8 weeks) program on leadership, teamwork, ethics, and civic responsibility. Leads to a Fellowship Certificate.',
            tags: ['18-25 Years', 'Youth', 'Fellowship'],
            buttonText: 'Apply Now'
        },
        {
            title: 'MASA Youth Ambassador Program',
            desc: 'For youth (18–25 years). Involves campaign representation, outreach, and social media awareness with national/global exposure. Includes an Ambassador Certificate.',
            tags: ['18-25 Years', 'Youth', 'Ambassador'],
            buttonText: 'Apply Now'
        },
        {
            title: 'Community Engagement Volunteer',
            desc: 'For all age groups. Flexible participation in events, awareness drives, and local initiatives. A Volunteer Service Certificate is provided.',
            tags: ['All Ages', 'Volunteering', 'On-Ground'],
            buttonText: 'Apply Now'
        },
        {
            title: 'Digital Volunteering Program',
            desc: 'For all age groups. Remote participation in content, design, outreach, and documentation. Includes a Digital Volunteering Certificate.',
            tags: ['All Ages', 'Volunteering', 'Remote'],
            buttonText: 'Apply Now'
        },
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
                title="Opportunities"
                subtitle="Join our mission to drive social impact through learning, leadership, and hands-on experience."
            />
            
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16 max-w-3xl mx-auto">
                         <div className="inline-block p-4 bg-blue-50 text-masa-blue rounded-full mb-4">
                             <BriefcaseIcon className="h-10 w-10" />
                         </div>
                         <h2 className="text-3xl font-bold text-masa-charcoal">Grow With Us</h2>
                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            At MASA World Foundation, we offer learning-focused, impact-driven opportunities for children, youth, students, and professionals. Our programs are centered on leadership development, volunteering, and creating real-world social impact at both national and international levels.
                         </p>
                     </div>
                     
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                         {opportunities.map((job) => (
                             <div key={job.title} className="border border-gray-200 p-8 rounded-2xl bg-white flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                                <h3 className="font-bold text-2xl text-gray-900 mb-3">{job.title}</h3>
                                <p className="text-gray-600">{job.desc}</p>
                                
                                <div className="flex-grow"></div> 

                                <p className="text-xs text-gray-500 italic mt-6 pt-4 border-t border-gray-100">
                                    This is a learning / volunteering / fellowship-based opportunity. MASA World Foundation does NOT offer salaried employment under these programs.
                                </p>
                                
                                <div className="flex flex-wrap gap-2 my-6">
                                   {job.tags.map(tag => (
                                       <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">{tag}</span>
                                   ))}
                                </div>
                                
                                <button className="w-full bg-masa-blue text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors mt-auto" onClick={() => handleApplyClick(job.title)}>
                                   {job.buttonText}
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
