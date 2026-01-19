
import React, { useState } from 'react';
import { NavigationProps, PartnershipType } from '../types';
import { 
    HeartIcon, 
    UsersIcon, 
    SparklesIcon, 
    HandshakeIcon, 
    ArrowRightIcon, 
    BriefcaseIcon,
    NewspaperIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    MicrophoneIcon,
    TrophyIcon,
    CheckIcon,
    ShieldCheckIcon,
    LightBulbIcon,
    GlobeIcon,
    PresentationChartBarIcon
} from '../components/icons/FeatureIcons';
import PartnershipModal from '../components/PartnershipModal';
import NominationModal from '../components/NominationModal';

// --- SECTIONS ---

const VolunteerSection: React.FC<{ navigateTo: NavigationProps['navigateTo'] }> = ({ navigateTo }) => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-masa-blue text-sm font-bold mb-4">
                        <HeartIcon className="h-4 w-4" />
                        <span>Become a Volunteer</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-masa-charcoal mb-6">
                        Lead Change on the Ground
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Volunteering with MASA is a transformative journey. It's not just about giving time; it's about building leadership skills, understanding grassroots realities, and becoming part of a family dedicated to social nation-building.
                    </p>
                    <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <p className="text-sm text-purple-800 font-semibold flex items-center">
                            <SparklesIcon className="h-4 w-4 mr-2" />
                            Coming Soon: AI-enabled skill matching to connect you with the perfect opportunity tailored to your profile.
                        </p>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start">
                            <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1" />
                            <div>
                                <strong className="block text-gray-900">Real-World Experience</strong>
                                <span className="text-gray-600 text-sm">Gain hands-on experience in project management and community work.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1" />
                            <div>
                                <strong className="block text-gray-900">Leadership Training</strong>
                                <span className="text-gray-600 text-sm">Access exclusive workshops on leadership and personal development.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1" />
                            <div>
                                <strong className="block text-gray-900">Recognition</strong>
                                <span className="text-gray-600 text-sm">Receive official certificates and letters of recommendation.</span>
                            </div>
                        </li>
                    </ul>
                    <button 
                        onClick={() => navigateTo('volunteer', 'volunteer-form')}
                        className="bg-masa-blue text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center gap-2"
                    >
                        Start Volunteer Registration <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-masa-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Join 1,200+ Volunteers
                    </div>
                    <h3 className="text-xl font-bold text-masa-charcoal mb-6">Volunteer Roles</h3>
                    <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="bg-blue-100 p-2 rounded-full text-masa-blue"><UsersIcon className="h-6 w-6"/></div>
                            <div>
                                <h4 className="font-bold text-gray-800">Community Leader</h4>
                                <p className="text-xs text-gray-500">Mobilize local groups for events.</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="bg-orange-100 p-2 rounded-full text-masa-orange"><TrophyIcon className="h-6 w-6"/></div>
                            <div>
                                <h4 className="font-bold text-gray-800">Sports Coach</h4>
                                <p className="text-xs text-gray-500">Train youth in local clubs.</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="bg-purple-100 p-2 rounded-full text-purple-600"><GlobeIcon className="h-6 w-6"/></div>
                            <div>
                                <h4 className="font-bold text-gray-800">Digital Advocate</h4>
                                <p className="text-xs text-gray-500">Amplify our message online.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const PartnershipSection: React.FC<{ onPartnerClick: (type: PartnershipType) => void }> = ({ onPartnerClick }) => (
    <section id="partnership-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-masa-orange text-sm font-bold mb-4">
                    <HandshakeIcon className="h-4 w-4" />
                    <span>Collaborate With Us</span>
                </div>
                <h2 className="text-3xl font-bold text-masa-charcoal">Partnership Opportunities</h2>
                <p className="mt-4 text-gray-600">
                    We collaborate with schools, universities, and corporations to scale impact. Together, we can build structured programs for sustainable development.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Institutional */}
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-masa-blue hover:shadow-xl transition-shadow flex flex-col">
                    <AcademicCapIcon className="h-12 w-12 text-masa-blue mb-4" />
                    <h3 className="text-2xl font-bold text-masa-charcoal mb-2">Institutional Member</h3>
                    <p className="text-gray-600 mb-6 text-sm h-12">
                        For schools, colleges, and academies. Integrate our leadership, sports, and value-based education modules into your curriculum.
                    </p>
                    <ul className="space-y-2 mb-8 text-sm text-gray-700 flex-grow">
                        <li className="flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-2"/> Student Leadership Workshops</li>
                        <li className="flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-2"/> Campus Events & hackathons</li>
                    </ul>
                    <button 
                        onClick={() => onPartnerClick('Institutional')}
                        className="w-full border-2 border-masa-blue text-masa-blue py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                    >
                        Partner with Us (Modal)
                    </button>
                </div>

                {/* Corporate */}
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-masa-orange hover:shadow-xl transition-shadow flex flex-col">
                    <BriefcaseIcon className="h-12 w-12 text-masa-orange mb-4" />
                    <h3 className="text-2xl font-bold text-masa-charcoal mb-2">Corporate / CSR Member</h3>
                    <p className="text-gray-600 mb-6 text-sm h-12">
                        Fulfill your CSR goals with measurable impact. Sponsor specific projects in education, health, or sports with full transparency.
                    </p>
                    <ul className="space-y-2 mb-8 text-sm text-gray-700 flex-grow">
                        <li className="flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-2"/> Tax Benefits (80G)</li>
                        <li className="flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-2"/> Detailed Impact Reporting</li>
                    </ul>
                    <button 
                        onClick={() => onPartnerClick('Corporate')}
                        className="w-full bg-masa-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md"
                    >
                        Corporate Partnership (Modal)
                    </button>
                </div>
            </div>
        </div>
    </section>
);

const DonationInfoSection: React.FC<{ navigateTo: NavigationProps['navigateTo'] }> = ({ navigateTo }) => (
    <section className="py-20 bg-masa-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Donation Information</h2>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        Your contribution is more than charity; it is an investment in the future of a child, a community, and a nation. We ensure that every rupee is utilized efficiently and ethically.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <ShieldCheckIcon className="h-8 w-8 text-masa-orange mb-2" />
                            <h4 className="font-bold">100% Secure</h4>
                            <p className="text-sm text-blue-200">Encrypted transactions via trusted gateways.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <PresentationChartBarIcon className="h-8 w-8 text-green-400 mb-2" />
                            <h4 className="font-bold">Transparency</h4>
                            <p className="text-sm text-blue-200">Regular financial reports sent to all donors.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigateTo('donate')}
                        className="bg-white text-masa-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Make a Donation
                    </button>
                </div>
                <div className="bg-white text-masa-charcoal p-8 rounded-2xl shadow-2xl">
                    <h3 className="text-xl font-bold mb-4">Where Your Money Goes</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-1">
                                <span>Program Execution (Sports, Camps, Events)</span>
                                <span>70%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-masa-orange h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-1">
                                <span>Community Aid & Scholarships</span>
                                <span>20%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-1">
                                <span>Admin & Operations</span>
                                <span>10%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500 italic mb-2">"Transparency is the currency of trust."</p>
                        <p className="text-xs text-masa-blue font-bold">Future Roadmap: AI-driven transparent impact tracking.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const AdditionalOpportunities: React.FC<{ navigateTo: NavigationProps['navigateTo'], onNominate: () => void }> = ({ navigateTo, onNominate }) => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-masa-charcoal text-center mb-12">More Ways to Engage</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl border border-gray-100 hover:border-masa-blue transition-colors group cursor-pointer flex flex-col" onClick={() => navigateTo('careers')}>
                    <BriefcaseIcon className="h-8 w-8 text-gray-400 group-hover:text-masa-blue mb-4" />
                    <h3 className="font-bold text-lg text-masa-charcoal">Careers & Internships</h3>
                    <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow">Join our professional team. View open positions and internship programs.</p>
                    <span className="text-masa-blue font-semibold text-sm">View Openings &rarr;</span>
                </div>
                <div className="p-6 rounded-xl border border-gray-100 hover:border-masa-orange transition-colors group cursor-pointer flex flex-col" onClick={() => navigateTo('membership')}>
                    <UsersIcon className="h-8 w-8 text-gray-400 group-hover:text-masa-orange mb-4" />
                    <h3 className="font-bold text-lg text-masa-charcoal">Global Membership</h3>
                    <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow">Become a member to stay connected and support our long-term vision.</p>
                    <span className="text-masa-orange font-semibold text-sm">Join Now &rarr;</span>
                </div>
                <div className="p-6 rounded-xl border border-gray-100 hover:border-purple-500 transition-colors group flex flex-col">
                    <TrophyIcon className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mb-4" />
                    <h3 className="font-bold text-lg text-masa-charcoal">Honorary / Advisory</h3>
                    <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow">Nominate impactful leaders and experts for honorary advisory roles.</p>
                    <button onClick={onNominate} className="text-left text-purple-600 font-semibold text-sm hover:underline">
                        Submit a Nomination (Modal) &rarr;
                    </button>
                </div>
            </div>
        </div>
    </section>
);

// --- MAIN PAGE COMPONENT ---

const GetInvolvedSection: React.FC<{ navigateTo: NavigationProps['navigateTo'] }> = ({ navigateTo }) => {
    const actions = [
        { icon: HeartIcon, title: "Volunteer With Us", desc: "Contribute your time, skills, and passion to create real impact on the ground.", page: 'volunteer', anchor: 'volunteer-form', buttonText: "Volunteer Registration" },
        { icon: UsersIcon, title: "Become a Member", desc: "Join our growing community and support our mission long-term.", page: 'membership', buttonText: "Explore Memberships" },
        { icon: HandshakeIcon, title: "Partner / Collaborate", desc: "Institutions, NGOs, corporates, and schools can collaborate with us on initiatives.", page: 'get-involved', anchor: 'partnership-section', buttonText: "Partner With Us" },
        { icon: SparklesIcon, title: "Donate & Support", desc: "Support our work financially and help scale impact across communities.", page: 'donate', buttonText: "Donate Now" }
    ];
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16"><h2 className="text-3xl font-bold text-masa-charcoal">Ways to Contribute</h2><p className="mt-4 text-gray-600 max-w-2xl mx-auto">Choose the path that suits you best.</p></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {actions.map((a, index) => (
                        <div key={a.title} className={`p-8 rounded-2xl shadow-lg flex flex-col text-center items-center group transition-all duration-300 ${index === 3 ? 'bg-masa-orange text-white' : 'bg-white border border-gray-200'}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${index === 3 ? 'bg-white/20' : 'bg-orange-50'}`}>
                                <a.icon className={`h-8 w-8 ${index === 3 ? 'text-white' : 'text-masa-orange'}`} />
                            </div>
                            <h3 className={`text-xl font-bold ${index === 3 ? 'text-white' : 'text-masa-charcoal'}`}>{a.title}</h3>
                            <p className={`my-4 flex-grow ${index === 3 ? 'text-orange-100' : 'text-gray-600'}`}>{a.desc}</p>
                            <button 
                                onClick={() => navigateTo(a.page as any, (a as any).anchor)} 
                                className={`mt-auto font-bold py-3 px-8 rounded-full transition-colors w-full ${index === 3 ? 'bg-white text-masa-orange hover:bg-orange-50' : (index === 1 ? 'bg-masa-orange text-white hover:bg-orange-600' : 'bg-white border-2 border-masa-blue text-masa-blue hover:bg-masa-blue hover:text-white')}`}
                            >
                                {a.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GetInvolvedPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [partnershipModal, setPartnershipModal] = useState<PartnershipType | null>(null);
    const [nominationModal, setNominationModal] = useState(false);

    return (
        <div className="bg-gray-50">
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            {nominationModal && <NominationModal onClose={() => setNominationModal(false)} />}

            {/* Hero Section */}
            <div className="bg-masa-charcoal py-20 text-white text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Join Our Community</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Whether you offer your time, skills, or support, there’s a place for you at MASA World Foundation.
                    </p>
                </div>
            </div>

            {/* Main Sections */}
            <GetInvolvedSection navigateTo={navigateTo} />

            <VolunteerSection navigateTo={navigateTo} />
            
            <PartnershipSection onPartnerClick={setPartnershipModal} />
            
            <DonationInfoSection navigateTo={navigateTo} />
            
            <AdditionalOpportunities navigateTo={navigateTo} onNominate={() => setNominationModal(true)} />

            {/* Final CTA */}
            <section className="py-12 bg-gray-900 text-center text-gray-400 text-sm">
                <div className="container mx-auto px-4">
                    <p>Have a different way to contribute? <button onClick={() => navigateTo('contact')} className="text-masa-orange hover:underline">Contact us directly</button>.</p>
                </div>
            </section>
        </div>
    );
};

export default GetInvolvedPage;
