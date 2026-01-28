
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
    NewspaperIcon, 
    DocumentTextIcon, 
    CameraIcon, 
    PresentationChartBarIcon, 
    ArrowRightIcon,
    UsersIcon,
    HeartIcon,
    ShieldCheckIcon,
    EyeIcon,
    GlobeIcon
} from '../components/icons/FeatureIcons';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="relative bg-masa-charcoal py-24 text-white text-center">
        <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover" alt="Person writing in a notebook, symbolizing reports and documentation" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ImpactSnapshot: React.FC = () => {
    const metrics = [
        { value: "10,000+", label: "Youth Impacted" },
        { value: "500+", label: "Programs Conducted" },
        { value: "1,200+", label: "Volunteers Engaged" },
        { value: "50+", label: "Communities Reached" },
    ];
    return (
        <section className="py-16 bg-masa-blue text-white -mt-10 relative z-10 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {metrics.map((metric) => (
                        <div key={metric.label}>
                            <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-masa-orange">{metric.value}</p>
                            <p className="mt-2 text-lg text-gray-300 font-medium">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MediaReportsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('Events');
    const tabs = ['Events', 'Trainings', 'Awards', 'Conferences', 'Community Outreach'];

    return (
        <div className="bg-gray-50">
            <PageHeader title="Media, Reports & Transparency" subtitle="Documenting impact, sharing progress, and maintaining full transparency with our community and supporters." />
            
            <ImpactSnapshot />
            
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    
                    {/* Media Coverage */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-masa-charcoal">Media Coverage & Press Mentions</h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Explore how MASA World Foundation’s initiatives, events, and impact are featured across print, digital, and social media platforms.</p>
                        </div>
                        {/* Mock Media Cards - In a real app, this would be mapped from data */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100"><h3 className="font-bold">City-wide cleanliness drive by MASA...</h3><p className="text-sm text-gray-500">The Times of India - July 05, 2024</p><a href="#" className="text-masa-blue font-semibold mt-4 inline-block">Read Full Coverage &rarr;</a></div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100"><h3 className="font-bold">Youth leadership workshop concludes...</h3><p className="text-sm text-gray-500">Dainik Bhaskar - June 28, 2024</p><a href="#" className="text-masa-blue font-semibold mt-4 inline-block">Read Full Coverage &rarr;</a></div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100"><h3 className="font-bold">How MASA is recognizing the 'Real Heroes'...</h3><p className="text-sm text-gray-500">YourStory - May 15, 2024</p><a href="#" className="text-masa-blue font-semibold mt-4 inline-block">Read Full Coverage &rarr;</a></div>
                        </div>
                        <div className="text-center mt-8 flex flex-wrap gap-2 justify-center">
                            {['#Sports', '#Education', '#Culture', '#YouthEmpowerment', '#SocialImpact'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{tag}</span>
                            ))}
                        </div>
                    </section>
                    
                    {/* Reports & Publications */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-masa-charcoal">Reports & Publications</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {['Annual Reports', 'Impact Reports', 'Event Reports', 'Training Reports'].map(title => (
                                <div key={title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                                    <DocumentTextIcon className="h-10 w-10 mx-auto text-masa-blue mb-4"/>
                                    <h3 className="font-bold text-lg">{title}</h3>
                                    <p className="text-sm text-gray-500 mt-2">Year: 2023</p>
                                    <button onClick={() => navigateTo('governance')} className="mt-4 w-full bg-blue-50 text-masa-blue py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">Download PDF</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Program Documentation */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-masa-charcoal">Program Documentation</h2>
                        </div>
                        <div className="flex justify-center flex-wrap gap-2 mb-8 border-b">
                            {tabs.map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-masa-orange text-masa-orange' : 'border-transparent text-gray-500 hover:text-masa-charcoal'}`}>{tab}</button>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-200 aspect-video rounded-lg flex flex-col items-center justify-center p-4">
                                    <CameraIcon className="h-8 w-8 text-gray-400 mb-2"/>
                                    <p className="text-gray-500 text-sm font-semibold">{activeTab} - Media {i}</p>
                                    <p className="text-xs text-gray-400">Date & Location</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Transparency & Governance */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-masa-charcoal">Our Commitment to Transparency</h2>
                        </div>
                        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: ShieldCheckIcon, title: "Registered NGO" },
                                { icon: HeartIcon, title: "Ethical Fund Usage" },
                                { icon: PresentationChartBarIcon, title: "Impact Reporting" },
                                { icon: EyeIcon, title: "Compliance & Governance" }
                            ].map(item => (
                                <div key={item.title} className="text-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner border border-gray-200 mb-4">
                                        <item.icon className="h-8 w-8 text-masa-blue" />
                                    </div>
                                    <h3 className="font-bold text-masa-charcoal">{item.title}</h3>
                                </div>
                            ))}
                        </div>
                        <p className="text-center mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
                            MASA World Foundation follows strict transparency, ethical governance, and impact reporting standards to ensure donor and community trust.
                        </p>
                    </section>
                    
                    {/* Media Contact */}
                    <section>
                        <div className="bg-masa-charcoal text-white rounded-2xl p-12 text-center">
                            <h2 className="text-3xl font-bold">Media & Information Requests</h2>
                            <p className="mt-4 text-gray-300 max-w-xl mx-auto">For press inquiries, official documents, or collaboration requests, contact us at:</p>
                            <a href="mailto:masaworldfoundation@gmail.com" className="my-6 block text-xl font-semibold text-masa-orange hover:underline">masaworldfoundation@gmail.com</a>
                            <button onClick={() => navigateTo('contact')} className="bg-white text-masa-charcoal px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                Request Information
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default MediaReportsPage;
