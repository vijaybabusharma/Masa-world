
import React from 'react';
import { 
    CheckIcon, HeartIcon, AcademicCapIcon, SparklesIcon, ArrowRightIcon, 
    EyeIcon, ShieldCheckIcon, UsersIcon, LightBulbIcon, PresentationChartBarIcon, 
    GlobeIcon 
} from '../components/icons/FeatureIcons';
import { NavigationProps } from '../types';
import FounderMessageSection from '../components/FounderMessageSection';

const PageHeader: React.FC<{ title: string; subtitle: string, navigateTo: NavigationProps['navigateTo'] }> = ({ title, subtitle, navigateTo }) => (
    <div className="relative bg-masa-charcoal py-24 text-white text-center">
        <div className="absolute inset-0 opacity-20">
            <img src="https://picsum.photos/1600/900?grayscale&blur=2&random=25" className="w-full h-full object-cover" alt="Community gathering" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

// 1. Our Story Section
const OurStorySection: React.FC = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="prose prose-lg text-gray-600 max-w-full">
                    <span className="text-masa-blue font-bold uppercase tracking-widest text-sm mb-2 block">Our Origin</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-masa-charcoal mb-6 leading-tight">From a Sports Field to a Global Movement</h2>
                    <p>
                        MASA World Foundation began in 2013 with a simple observation: a playground is the best classroom. What started as a small initiative to organize local sports leagues for underprivileged youth quickly revealed a deeper need. We saw that discipline learned in sports could translate to leadership in life.
                    </p>
                    <p>
                        Over the years, our mission expanded. We realized that true empowerment requires a holistic ecosystem. We integrated education to sharpen minds and cultural programs to strengthen roots. Today, MASA is not just an NGO; it is a movement that bridges the gap between grassroots potential and global opportunity.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-masa-orange/10 rounded-2xl transform rotate-3"></div>
                    <img src="https://picsum.photos/800/600?random=5" alt="Founder with community members" className="relative rounded-xl shadow-2xl w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    </section>
);

// 2. Mission & Vision Section
const MissionVisionSection: React.FC = () => (
    <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Mission */}
                <div className="bg-white p-10 rounded-3xl border-t-4 border-masa-blue shadow-lg flex flex-col hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-50 rounded-full">
                            <HeartIcon className="h-8 w-8 text-masa-blue" />
                        </div>
                        <h2 className="text-3xl font-bold text-masa-charcoal">Our Mission</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6 flex-grow">
                        “To empower youth and communities by providing access to sports, education, and cultural opportunities that foster discipline, leadership, self-reliance, and social responsibility.”
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-white p-10 rounded-3xl border-t-4 border-masa-orange shadow-lg flex flex-col hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-orange-50 rounded-full">
                            <EyeIcon className="h-8 w-8 text-masa-orange" />
                        </div>
                        <h2 className="text-3xl font-bold text-masa-charcoal">Our Vision</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6 flex-grow">
                        “To build a world where every young individual has the opportunity, guidance, and confidence to lead positive change—locally and globally.”
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// 3. Core Values Section
const CoreValuesSection: React.FC = () => {
    const values = [
        { title: "Discipline & Integrity", icon: ShieldCheckIcon, text: "Upholding ethical standards in every action." },
        { title: "Inclusivity", icon: UsersIcon, text: "Creating equal opportunities for all backgrounds." },
        { title: "Transparency", icon: LightBulbIcon, text: "Accountability to our donors and community." },
        { title: "Sustainable Impact", icon: PresentationChartBarIcon, text: "Focusing on long-term, self-reliant change." },
        { title: "Global Unity", icon: GlobeIcon, text: "Connecting local actions to global progress." },
        { title: "Compassion", icon: HeartIcon, text: "Serving with empathy and understanding." }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-masa-blue font-bold uppercase tracking-widest text-sm mb-2 block">What Drives Us</span>
                    <h2 className="text-3xl font-bold text-masa-charcoal">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:border-masa-orange transition-colors group">
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-orange group-hover:text-white transition-colors text-masa-charcoal">
                                <v.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-bold text-lg text-masa-charcoal mb-2">{v.title}</h3>
                            <p className="text-gray-600 text-sm">{v.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 4. Timeline Section
const TimelineSection: React.FC = () => {
    const events = [
        { year: "2013", title: "Inception", description: "MASA World Foundation established with a focus on sports for development." },
        { year: "2015", title: "Educational Wing", description: "Launched leadership and skill development programs." },
        { year: "2018", title: "Real Hero Awards", description: "Started honoring unsung community heroes nationally." },
        { year: "2021", title: "Global Outreach", description: "Expanded memberships internationally." },
        { year: "Today", title: "Holistic Ecosystem", description: "Operating comprehensive programs across Sports, Education, and Culture." }
    ];

    return (
        <section className="py-24 bg-masa-charcoal text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Our Journey Through Time</h2>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 w-0.5 h-full bg-gray-700 -translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row items-center justify-between">
                                {/* Left Content (Right aligned on desktop for alternate) */}
                                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-last pl-8 text-left'}`}>
                                    <h3 className="text-3xl font-bold text-masa-orange">{event.year}</h3>
                                    <h4 className="text-xl font-bold mt-1">{event.title}</h4>
                                    <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
                                </div>
                                
                                {/* Dot */}
                                <div className="absolute left-1/2 w-4 h-4 bg-masa-orange rounded-full -translate-x-1/2 border-4 border-gray-800 top-1/2 -translate-y-1/2"></div>
                                
                                {/* Spacer for desktop balance */}
                                <div className="hidden md:block w-5/12"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <div>
            <PageHeader 
                title="About Us" 
                subtitle="Empowering Youth & Communities Through Sports, Education, and Culture"
                navigateTo={navigateTo}
            />
            
            <OurStorySection />
            <MissionVisionSection />
            <CoreValuesSection />
            <TimelineSection />
            
            <div className="bg-gray-50 border-t border-gray-200">
                <FounderMessageSection navigateTo={navigateTo} bgColor="bg-gray-50" />
            </div>
        </div>
    );
};

export default AboutPage;
