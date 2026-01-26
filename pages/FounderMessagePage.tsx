
import React from 'react';
import { FOUNDER_IMAGE_URL } from '../utils/data';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto font-light">{subtitle}</p>
        </div>
    </div>
);

const FounderMessagePage: React.FC = () => {
    return (
        <div className="bg-white">
            <PageHeader title="Message from the Founder" subtitle="Our Vision for a Stronger, More Inclusive Future" />
            
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
                        
                        {/* Left Column: Founder Image (Sticky on Desktop) - Enhanced */}
                        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start lg:sticky lg:top-32 order-1 lg:order-1">
                            <div className="relative w-full max-w-md group">
                                {/* Solid Shadow Block */}
                                <div className="absolute top-5 left-5 w-full h-full bg-masa-charcoal rounded-2xl -z-10 transition-transform duration-300 group-hover:top-6 group-hover:left-6"></div>
                                {/* Outline Offset */}
                                <div className="absolute -top-3 -left-3 w-full h-full border-2 border-masa-orange rounded-2xl -z-10"></div>
                                
                                <img 
                                    src={FOUNDER_IMAGE_URL}
                                    alt="Vijay Babu Sharma, Founder of Masa World Foundation" 
                                    className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/5] bg-gray-100 border-4 border-white"
                                />
                                
                                {/* Quote Overlay */}
                                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-[200px] border-l-4 border-masa-orange">
                                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Motto</p>
                                     <p className="text-sm font-bold text-masa-charcoal italic">"Discipline defines destiny."</p>
                                </div>
                            </div>
                            <div className="mt-12 text-center lg:text-left w-full pl-4">
                                <h3 className="text-3xl font-extrabold text-masa-charcoal">Vijay Babu Sharma</h3>
                                <p className="text-masa-blue font-bold text-lg mt-1">Founder & Chairman</p>
                                <div className="h-1.5 w-20 bg-masa-orange mt-4 mx-auto lg:mx-0 rounded-full"></div>
                            </div>
                        </div>

                        {/* Right Column: Message Content */}
                        <div className="w-full lg:w-7/12 order-2 lg:order-2">
                            <div className="text-lg text-gray-700 leading-relaxed space-y-6 text-left">
                                <p className="text-xl font-bold text-masa-charcoal mb-8">
                                    Dear Friends and Supporters,
                                </p>

                                <p>
                                    Welcome to MASA World Foundation.
                                </p>

                                <p>
                                    MASA World Foundation was established with a clear belief—that sports, education, and culture are among the strongest tools for building disciplined individuals, empowered youth, and responsible communities. Our journey began with a simple vision: to create opportunities where talent, dedication, and values matter more than background or circumstance.
                                </p>

                                <p>
                                    Sports teach discipline, teamwork, resilience, and confidence. Education builds knowledge, leadership, and critical thinking. Culture connects us to our roots while opening doors to global understanding. At MASA, we integrate all three to help individuals grow—not just as athletes or students, but as strong, ethical, and confident human beings.
                                </p>

                                <p>
                                    We are a team of coaches, educators, trainers, mentors, and social leaders who believe in personal attention over a one-size-fits-all approach. Every individual is unique, and our programs are designed to nurture that uniqueness while encouraging collaboration, leadership, and mutual respect.
                                </p>

                                <p>
                                    Our mission goes beyond training sessions or events. We aim to recognize and celebrate ordinary people achieving extraordinary things, inspire youth to dream bigger, and support communities through meaningful action at grassroots, national, and international levels.
                                </p>

                                <p>
                                    Transparency, integrity, and real impact guide everything we do. With the support of volunteers, members, partners, and well-wishers across the world, MASA World Foundation continues to grow as a platform for positive and responsible change.
                                </p>

                                <p>
                                    I warmly invite you to join us—as a participant, volunteer, member, partner, or supporter—and become part of a global community working together for a stronger, more inclusive future.
                                </p>

                                <p className="font-medium text-masa-charcoal">
                                    Thank you for your time, trust, and belief in our mission.
                                </p>
                            </div>

                            {/* Signature Block */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png" alt="MASA World Foundation" className="h-10 mb-6 opacity-90" onError={(e) => { e.currentTarget.src = '/logo.svg'; }} />
                                <p className="text-xl font-bold text-masa-charcoal font-serif italic">
                                    — Vijay Babu Sharma
                                </p>
                                <p className="text-gray-500 text-sm mt-1 uppercase tracking-wide font-semibold">
                                    Founder, MASA World Foundation
                                </p>
                                <p className="text-masa-blue text-sm mt-2 font-medium">
                                    Global Community • Local Connections
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default FounderMessagePage;
