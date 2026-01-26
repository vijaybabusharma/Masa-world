
import React from 'react';
import { NavigationProps } from '../types';
import { 
    UsersIcon, 
    ShieldCheckIcon, 
    TrophyIcon, 
    SparklesIcon, 
    HandshakeIcon, 
    ArrowRightIcon, 
    CheckIcon 
} from '../components/icons/FeatureIcons';

const SportsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <section className="relative bg-gray-900 text-white min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                     <img 
                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80" 
                        alt="Sports Activity" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                     <div className="absolute inset-0 bg-gradient-to-b from-masa-blue/90 to-gray-900/90"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <span className="uppercase tracking-widest text-sm font-bold text-masa-orange mb-4 block">Pillar of Action</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Sports for Discipline,<br/> Leadership & Excellence
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Building character, national pride, and resilience through the power of play.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigateTo('get-involved')} className="bg-masa-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                            Get Involved
                        </button>
                        <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-masa-charcoal transition-colors duration-300">
                            View Programs
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Overview Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-masa-charcoal mb-6">Why Sports Matter</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At MASA World Foundation, we believe sports are more than just games; they are a fundamental training ground for life. In India and across the globe, sports bridge gaps between communities, fostering a language of unity that transcends barriers.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our focus is not only on creating champions on the field but on nurturing disciplined citizens off it. By channeling youth energy into constructive physical activity, we steer them away from social evils and towards a path of self-improvement, health, and national duty.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Infographic: What We Do (Icon Grid) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Our Core Focus</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: UsersIcon, label: "Youth Development" },
                            { icon: ShieldCheckIcon, label: "Martial Arts & Self-Defense" },
                            { icon: TrophyIcon, label: "Competitive Events" },
                            { icon: SparklesIcon, label: "Mental Strength" },
                            { icon: HandshakeIcon, label: "Teamwork & Leadership" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-100">
                                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-orange transition-colors duration-300">
                                    <item.icon className="h-8 w-8 text-masa-blue group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-gray-800">{item.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Flow Infographic */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-masa-blue font-bold uppercase tracking-widest text-sm mb-2 block">The MASA Method</span>
                        <h2 className="text-3xl font-bold text-masa-charcoal">The Cycle of Excellence</h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "1", title: "Train", desc: "Structured coaching & discipline." },
                                { step: "2", title: "Compete", desc: "Local & National tournaments." },
                                { step: "3", title: "Lead", desc: "Captaincy & mentorship roles." },
                                { step: "4", title: "Inspire", desc: "Becoming community role models." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                    <div className="w-12 h-12 mx-auto bg-masa-charcoal text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md ring-4 ring-white">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-orange mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Key Programs (Bullets) */}
            <section id="programs" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Key Programs</h2>
                            <ul className="space-y-4">
                                {[
                                    "Grassroots football and cricket leagues for rural youth.",
                                    "Self-defense workshops focusing on women's safety.",
                                    "District-level athletics meets to identify raw talent.",
                                    "Yoga and meditation camps for mental well-being.",
                                    "Sports scholarship programs for underprivileged athletes."
                                ].map((program, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-masa-orange mr-3 flex-shrink-0" />
                                        <span className="text-gray-300 text-lg">{program}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <img src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80" alt="Sports Program" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Impact Stats */}
            <section className="py-20 bg-masa-orange text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        {[
                            { val: "10,000+", label: "Youth Impacted" },
                            { val: "500+", label: "Sports Programs" },
                            { val: "50+", label: "Communities Reached" },
                            { val: "Global", label: "Events Hosted" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <p className="text-4xl md:text-5xl font-extrabold mb-2">{stat.val}</p>
                                <p className="text-sm md:text-lg font-medium opacity-90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Get Involved CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-4xl font-bold text-masa-charcoal mb-6">Ready to Get in the Game?</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Your support can provide the equipment, coaching, and opportunity a young athlete needs to succeed.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button onClick={() => navigateTo('get-involved', 'volunteer-section')} className="bg-masa-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg">
                            Join as Volunteer
                        </button>
                        <button onClick={() => navigateTo('membership')} className="bg-white border-2 border-masa-orange text-masa-orange px-8 py-4 rounded-full font-bold hover:bg-orange-50 transition-all">
                            Become a Member
                        </button>
                        <button onClick={() => navigateTo('contact')} className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SportsPage;
