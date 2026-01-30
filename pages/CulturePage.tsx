
import React from 'react';
import { NavigationProps } from '../types';
import { 
    GlobeIcon, 
    SparklesIcon, 
    HeartIcon, 
    UsersIcon, 
    CheckIcon 
} from '../components/icons/FeatureIcons';

const CulturePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <section className="relative bg-gray-900 text-white min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                     <img 
                        src="https://images.unsplash.com/photo-1582556362337-975d0b433433?auto=format&fit=crop&w=1600&q=80" 
                        alt="Cultural Event" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-masa-orange/60"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <span className="uppercase tracking-widest text-sm font-bold text-yellow-300 mb-4 block">Pillar of Heritage</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Culture that<br/> Connects Communities
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Preserving traditions, supporting artisans, and fostering global social harmony.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigateTo('get-involved')} className="bg-masa-orange text-white px-8 py-3 rounded-full text-base font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                            Get Involved
                        </button>
                        <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-base font-bold hover:bg-white hover:text-masa-charcoal transition-colors duration-300">
                            View Programs
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Overview Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-masa-charcoal mb-6">Roots & Wings</h2>
                        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                            Culture is the soul of a community. At MASA World Foundation, we work tirelessly to preserve the rich heritage of India while fostering a spirit of global exchange. We believe that understanding one's roots gives the wings to fly confidently in the modern world.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-justify">
                            Our initiatives range from supporting struggling traditional artisans to organizing large-scale cultural festivals that bring people together across caste, creed, and borders. We aim for social harmony through the universal language of art and tradition.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Infographic: What We Do (Icon Grid) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Cultural Ecosystem</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: UsersIcon, label: "Cultural Events" },
                            { icon: SparklesIcon, label: "Arts & Heritage" },
                            { icon: GlobeIcon, label: "Global Exchange" },
                            { icon: HeartIcon, label: "Social Harmony" },
                            { icon: SparklesIcon, label: "Cultural Recognition" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-100">
                                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-orange transition-colors duration-300">
                                    <item.icon className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-base">{item.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Flow Infographic */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-purple-600 font-bold uppercase tracking-widest text-sm mb-2 block">Our Model</span>
                        <h2 className="text-3xl font-bold text-masa-charcoal">Sustaining Heritage</h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "1", title: "Preserve", desc: "Identify & document traditions." },
                                { step: "2", title: "Celebrate", desc: "Festivals & showcases." },
                                { step: "3", title: "Unite", desc: "Cross-cultural dialogue." },
                                { step: "4", title: "Inspire", desc: "Pride in identity." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                    <div className="w-12 h-12 mx-auto bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md ring-4 ring-white">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-charcoal mb-2">{item.title}</h3>
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
                            <h2 className="text-3xl font-bold mb-6">Initiatives & Events</h2>
                            <ul className="space-y-4">
                                {[
                                    "Cultural Utsavs celebrating regional diversity.",
                                    "Support programs for traditional artisans & craftsmen.",
                                    "International cultural exchange forums.",
                                    "Heritage walks and preservation workshops.",
                                    "Community harmony dinners and dialogues."
                                ].map((program, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                                        <span className="text-gray-300 text-base md:text-lg leading-relaxed">{program}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <img src="https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80" alt="Cultural Program" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Impact Stats */}
            <section className="py-20 bg-purple-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                        {[
                            { val: "Pan-India", label: "Programs Conducted" },
                            { val: "Hundreds", label: "Artisans Supported" },
                            { val: "Global", label: "Participation Reach" },
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <p className="text-4xl md:text-5xl font-extrabold mb-2 text-yellow-400">{stat.val}</p>
                                <p className="text-base font-medium opacity-90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Get Involved CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold text-masa-charcoal mb-6">Help Us Keep Traditions Alive</h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        Join us in celebrating diversity and supporting the artists who carry our heritage forward.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button onClick={() => navigateTo('get-involved', 'volunteer-section')} className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg text-base">
                            Volunteer for Events
                        </button>
                        <button onClick={() => navigateTo('membership')} className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-all text-base">
                            Become a Member
                        </button>
                        <button onClick={() => navigateTo('contact')} className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all text-base">
                            Sponsor an Artist
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CulturePage;
