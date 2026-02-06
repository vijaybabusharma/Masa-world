
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, UsersIcon } from '../components/icons/FeatureIcons';
import CareersModal from '../components/CareersModal';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-gradient-to-br from-masa-charcoal to-blue-900 py-20 text-white text-center">
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
            tags: ['India', 'Hybrid', 'Field-based'],
            category: 'Fellowships & Internships',
            icon: AcademicCapIcon,
            buttonText: 'Apply Now'
        },
        { 
            title: 'Research Fellowship', 
            desc: 'Conduct in-depth research on social issues to guide our strategic initiatives. Ideal for academics and professionals with a background in social sciences or public policy.',
            tags: ['Remote', 'Global', 'Research'],
            category: 'Fellowships & Internships',
            icon: AcademicCapIcon,
            buttonText: 'Apply Now'
        },
        {
            title: 'Youth Leadership Fellowship',
            desc: 'For youth (18–25 years). A fixed-duration (4–8 weeks) program on leadership, teamwork, ethics, and civic responsibility. Leads to a Fellowship Certificate.',
            tags: ['18-25 Years', 'Youth', 'Fellowship'],
            category: 'Fellowships & Internships',
            icon: AcademicCapIcon,
            buttonText: 'Apply Now'
        },
        {
            title: 'Young Changemakers Program',
            desc: 'For children (10–15 years). Focuses on value education, awareness, and creativity. A participation-based program with a Certificate of Participation.',
            tags: ['10-15 Years', 'Children', 'Learning'],
            category: 'Youth Ambassador Programs',
            icon: SparklesIcon,
            buttonText: 'Join Program'
        },
        {
            title: 'Student Social Action Program',
            desc: 'For teens (16–18 years). Involves social awareness and community activities with online and local participation. Includes a Certificate of Participation.',
            tags: ['16-18 Years', 'Teens', 'Community Action'],
            category: 'Youth Ambassador Programs',
            icon: SparklesIcon,
            buttonText: 'Join Program'
        },
        {
            title: 'Youth Ambassador – Junior',
            desc: 'For teens (16–18 years). Focuses on awareness campaigns and digital participation. Awarded a Certificate and Digital Badge.',
            tags: ['16-18 Years', 'Teens', 'Digital Advocacy'],
            category: 'Youth Ambassador Programs',
            icon: SparklesIcon,
            buttonText: 'Apply Now'
        },
        {
            title: 'MASA Youth Ambassador Program',
            desc: 'For youth (18–25 years). Involves campaign representation, outreach, and social media awareness with national/global exposure. Includes an Ambassador Certificate.',
            tags: ['18-25 Years', 'Youth', 'Ambassador'],
            category: 'Youth Ambassador Programs',
            icon: SparklesIcon,
            buttonText: 'Apply Now'
        },
        {
            title: 'Community Engagement Volunteer',
            desc: 'For all age groups. Flexible participation in events, awareness drives, and local initiatives. A Volunteer Service Certificate is provided.',
            tags: ['All Ages', 'Volunteering', 'On-Ground'],
            category: 'Volunteering Opportunities',
            icon: UsersIcon,
            buttonText: 'Apply Now'
        },
        {
            title: 'Digital Volunteering Program',
            desc: 'For all age groups. Remote participation in content, design, outreach, and documentation. Includes a Digital Volunteering Certificate.',
            tags: ['All Ages', 'Volunteering', 'Remote'],
            category: 'Volunteering Opportunities',
            icon: UsersIcon,
            buttonText: 'Apply Now'
        },
    ];

    const groupedOpportunities = opportunities.reduce((acc, opp) => {
        (acc[opp.category] = acc[opp.category] || []).push(opp);
        return acc;
    }, {} as Record<string, typeof opportunities>);

    const categoryStyles: { [key: string]: { bg: string, border: string, iconBg: string, iconText: string, button: string } } = {
        'Fellowships & Internships': { bg: 'bg-blue-50/50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconText: 'text-masa-blue', button: 'bg-masa-blue hover:bg-blue-900' },
        'Youth Ambassador Programs': { bg: 'bg-orange-50/50', border: 'border-orange-200', iconBg: 'bg-orange-100', iconText: 'text-masa-orange', button: 'bg-masa-orange hover:bg-orange-600' },
        'Volunteering Opportunities': { bg: 'bg-emerald-50/50', border: 'border-emerald-200', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', button: 'bg-emerald-600 hover:bg-emerald-700' }
    };

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
                         <div className="inline-block p-4 bg-white text-masa-blue rounded-full mb-4 shadow-md border border-gray-100">
                             <BriefcaseIcon className="h-10 w-10" />
                         </div>
                         <h2 className="text-3xl font-bold text-masa-charcoal">Become a Catalyst for Change</h2>
                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            At MASA World Foundation, we offer a journey of growth. Our programs are centered on leadership development, volunteering, and creating real-world social impact at both national and international levels. Find the opportunity that ignites your passion.
                         </p>
                     </div>
                     
                     <div className="space-y-16">
                        {Object.entries(groupedOpportunities).map(([category, jobs]) => {
                            const styles = categoryStyles[category] || categoryStyles['Volunteering Opportunities'];
                            return (
                                <div key={category}>
                                    <div className="text-center mb-10">
                                        <h2 className="text-2xl font-bold text-masa-charcoal inline-block px-6 py-2 bg-white rounded-full shadow-sm">{category}</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                        {jobs.map((job) => (
                                            <div key={job.title} className={`${styles.bg} p-8 rounded-2xl flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1.5 border ${styles.border} group`}>
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-colors ${styles.iconBg}`}>
                                                    <job.icon className={`h-7 w-7 transition-colors ${styles.iconText}`} />
                                                </div>
                                                <h3 className="font-bold text-xl text-gray-900 mb-3">{job.title}</h3>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                   {job.tags.map(tag => (
                                                       <span key={tag} className="px-3 py-1 bg-white text-gray-600 text-xs rounded-full font-semibold border border-gray-200">{tag}</span>
                                                   ))}
                                                </div>
                                                <p className="text-gray-600 text-sm flex-grow leading-relaxed">{job.desc}</p>
                                                
                                                <button className={`w-full text-white font-bold py-3.5 rounded-lg transition-colors mt-8 ${styles.button}`} onClick={() => handleApplyClick(job.title)}>
                                                   {job.buttonText}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                     </div>

                     <div className="text-center mt-20 bg-gradient-to-tr from-masa-charcoal to-masa-blue text-white p-10 rounded-2xl max-w-3xl mx-auto shadow-2xl">
                        <h3 className="font-bold text-2xl">Don't see a perfect fit?</h3>
                        <p className="text-blue-100 my-4">We are always looking for passionate individuals. Submit a general application, and we'll contact you when a suitable role opens up.</p>
                        <button className="bg-white text-masa-blue font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-md" onClick={() => handleApplyClick('General Application')}>
                            Submit a General Application
                        </button>
                     </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
