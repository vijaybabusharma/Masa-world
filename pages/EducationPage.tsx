
import React from 'react';
import { NavigationProps } from '../types';
import { 
    AcademicCapIcon, 
    GlobeIcon, 
    HeartIcon, 
    BriefcaseIcon, 
    SparklesIcon, 
    ArrowRightIcon,
    CheckIcon
} from '../components/icons/FeatureIcons';

const EducationPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <section className="relative bg-gray-900 text-white min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                     <img 
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80" 
                        alt="Education Activity" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                     <div className="absolute inset-0 bg-gradient-to-br from-masa-blue/90 to-black/80"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <span className="uppercase tracking-widest text-sm font-bold text-blue-200 mb-4 block">Pillar of Knowledge</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Education Beyond<br/> Classrooms
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Empowering minds with leadership skills, vocational training, and values for a global future.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigateTo('get-involved')} className="bg-white text-masa-blue px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                            Get Involved
                        </button>
                        <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className="bg-transparent border-2 border-masa-orange text-masa-orange px-8 py-4 rounded-full text-lg font-bold hover:bg-masa-orange hover:text-white transition-colors duration-300">
                            View Programs
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Overview Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-masa-charcoal mb-6">Holistic Learning for Real Life</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Education is not just about literacy; it is about employability, ethics, and empowerment. While we support academic excellence, MASA World Foundation focuses heavily on the "soft skills" often missing from traditional curriculums—leadership, public speaking, and civic responsibility.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We identify gaps in the current system and fill them with practical workshops. From teaching a rural student how to use a computer to mentoring a young leader on social reform, we ensure our youth are ready for both the Indian economy and the global stage.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Infographic: What We Do (Icon Grid) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Core Educational Pillars</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: AcademicCapIcon, label: "Leadership Skills" },
                            { icon: BriefcaseIcon, label: "Skill Development" },
                            { icon: ArrowRightIcon, label: "Mentorship" },
                            { icon: HeartIcon, label: "Value-Based Learning" },
                            { icon: GlobeIcon, label: "Global Readiness" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-100">
                                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-blue transition-colors duration-300">
                                    <item.icon className="h-8 w-8 text-masa-orange group-hover:text-white transition-colors" />
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
                        <span className="text-masa-orange font-bold uppercase tracking-widest text-sm mb-2 block">The Pathway</span>
                        <h2 className="text-3xl font-bold text-masa-charcoal">Education in Action</h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "1", title: "Learn", desc: "Acquire new skills & knowledge." },
                                { step: "2", title: "Apply", desc: "Practical workshops & projects." },
                                { step: "3", title: "Lead", desc: "Take initiative in community." },
                                { step: "4", title: "Impact", desc: "Create measurable social change." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                    <div className="w-12 h-12 mx-auto bg-masa-blue text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md ring-4 ring-white">
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
            <section id="programs" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                             <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" alt="Education Program" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl font-bold text-masa-charcoal mb-6">Signature Programs</h2>
                            <ul className="space-y-4">
                                {[
                                    "Vocational training centers for digital literacy.",
                                    "Public speaking and personality development workshops.",
                                    "Scholarship distribution for meritorious students.",
                                    "Civic awareness drives on rights and duties.",
                                    "Mentorship programs connecting youth with industry experts."
                                ].map((program, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-masa-blue mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg">{program}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Impact Stats */}
            <section className="py-20 bg-masa-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                        {[
                            { val: "Across India", label: "Youth Mentored" },
                            { val: "100+", label: "Leadership Workshops" },
                            { val: "Ongoing", label: "Skill Webinars" },
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <p className="text-4xl md:text-5xl font-extrabold mb-2 text-masa-orange">{stat.val}</p>
                                <p className="text-lg font-medium opacity-90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Get Involved CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-4xl font-bold text-masa-charcoal mb-6">Knowledge is Power. Share Yours.</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Whether you are a teacher, professional, or organization, your expertise can light up a mind.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button onClick={() => navigateTo('get-involved', 'volunteer-section')} className="bg-masa-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg">
                            Volunteer as Mentor
                        </button>
                        <button onClick={() => navigateTo('membership')} className="bg-white border-2 border-masa-blue text-masa-blue px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all">
                            Institutional Member
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

export default EducationPage;
