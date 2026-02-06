
import React from 'react';
import { NavigationProps } from '../types';
import { AcademicCapIcon, PresentationChartBarIcon, HeartIcon, ShieldCheckIcon, TrophyIcon, GlobeIcon, UsersIcon, EyeIcon } from '../components/icons/FeatureIcons';
import WorldMap from '../components/WorldMap';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const TrustSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const trustPoints = [
        { icon: ShieldCheckIcon, title: "Registered NGO" },
        { icon: EyeIcon, title: "Full Transparency" },
        { icon: HeartIcon, title: "Ethical Fund Usage" },
        { icon: PresentationChartBarIcon, title: "Impact Reporting" },
        { icon: GlobeIcon, title: "Global & Local Reach" },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Our Impact & Your Trust</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        We are committed to the highest standards of accountability, transparency, and measurable social impact. Your trust is the foundation of our work.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {trustPoints.map(point => (
                        <div key={point.title} className="text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-md border border-gray-100 mb-4">
                                <point.icon className="h-8 w-8 text-masa-blue" />
                            </div>
                            <h3 className="font-bold text-masa-charcoal">{point.title}</h3>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-16">
                     <button 
                        onClick={() => navigateTo('governance')}
                        className="bg-white border-2 border-masa-blue text-masa-blue px-8 py-3 rounded-full font-bold hover:bg-masa-blue hover:text-white transition-colors shadow-sm"
                    >
                        Learn About Our Governance
                    </button>
                </div>
            </div>
        </section>
    );
};

const GlobalPresenceSection: React.FC = () => {
    const countryMissions = [
        { country: "India (Headquarters)", mission: "Implementing large-scale programs in sports, education, and social reform across 20+ states." },
        { country: "Nepal & Bangladesh", mission: "Adapting our youth leadership and community health models in collaboration with local NGOs." },
        { country: "UAE & Singapore", mission: "Building corporate partnerships and engaging the diaspora community in our mission." },
        { country: "USA & UK", mission: "Fostering university collaborations and running digital advocacy campaigns for global awareness." },
    ];

    const internationalAchievements = [
        "Recognized by the 'Global Youth Development Forum' for innovation in sports-based education.",
        "Launched international digital volunteering program with participants from 15+ countries.",
        "Established partnerships with 5 international universities for cross-cultural exchange programs.",
    ];
    
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Our Global Footprint</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        From grassroots action in India to strategic partnerships across the globe, our impact is both local and international.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Map Visualization */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <WorldMap />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="prose prose-lg max-w-none text-justify">
                            <h3 className="text-2xl font-bold text-masa-charcoal !mb-4">Global Reach</h3>
                            <p className="text-base">
                                MASA World Foundation's impact extends beyond India's borders. Through strategic partnerships, digital volunteering programs, and international chapters, we are building a global community dedicated to our core mission. Our model focuses on adapting our successful grassroots initiatives to local contexts worldwide, fostering a network of change-makers.
                            </p>
                            
                            <h4 className="font-bold text-masa-charcoal !mt-8 !mb-4">Country Missions</h4>
                            <ul className="text-base !my-0">
                                {countryMissions.map(item => (
                                    <li key={item.country}><strong>{item.country}:</strong> {item.mission}</li>
                                ))}
                            </ul>

                             <h4 className="font-bold text-masa-charcoal !mt-8 !mb-4">International Achievements</h4>
                            <ul className="text-base !my-0">
                                {internationalAchievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const GlobalImpactPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const impactMetrics = [
        { icon: AcademicCapIcon, val: "10,000+", label: "Youth Impacted" },
        { icon: PresentationChartBarIcon, val: "500+", label: "Programs Conducted" },
        { icon: HeartIcon, val: "1,200+", label: "Volunteers Engaged" },
        { icon: UsersIcon, val: "50+", label: "Communities Reached" }
    ];

    const flowSteps = [
        { icon: TrophyIcon, title: "Sports", description: "Builds discipline and character." },
        { icon: AcademicCapIcon, title: "Education", description: "Develops skills and leadership." },
        { icon: GlobeIcon, title: "Culture", description: "Fosters unity and identity." },
        { icon: UsersIcon, title: "Community", description: "Creates self-reliant societies." }
    ];

    return (
        <div className="bg-gray-50">
            <PageHeader title="Our Global Impact" subtitle="Measuring our success in lives changed and communities strengthened." />
            
            <section className="py-20 bg-masa-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {impactMetrics.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
                                    <item.icon className="h-8 w-8 text-masa-orange"/>
                                </div>
                                <p className="text-4xl lg:text-5xl font-extrabold tracking-tight">{item.val}</p>
                                <p className="mt-2 text-lg text-gray-300 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <GlobalPresenceSection />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Our Model for Change</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Our initiatives are interconnected, creating a virtuous cycle of development that leads to empowered individuals and resilient communities.</p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {flowSteps.map((step, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                        <step.icon className="h-8 w-8 text-masa-charcoal"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-charcoal mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <TrustSection navigateTo={navigateTo} />
            
        </div>
    );
};

export default GlobalImpactPage;
