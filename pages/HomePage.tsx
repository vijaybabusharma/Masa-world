
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavigationProps } from '../types';
import { 
    ArrowRightIcon, UsersIcon, SparklesIcon, ShieldCheckIcon, GlobeIcon, HeartIcon, 
    AcademicCapIcon, TrophyIcon, CalendarDaysIcon, HandshakeIcon, CheckIcon, HandRaisedIcon,
    DocumentTextIcon, MicrophoneIcon, QuoteIcon,
    EyeIcon,
    PresentationChartBarIcon,
    MapPinIcon,
    ClockIcon,
    LaptopIcon
} from '../components/icons/FeatureIcons';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons/UiIcons';
import { FOUNDER_IMAGE_URL, calculateReadingTime } from '../utils/data';
import { ContentManager } from '../utils/contentManager';
import { getStats } from '../utils/mockBackend';
import ImpactSnapshot from '../components/ImpactSnapshot';

// --- SEO SCHEMA COMPONENT ---
const SchemaMarkup = () => {
    // Fetch dynamic events for schema
    const eventsData = ContentManager.getEvents();
    
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "MASA World Foundation",
        "url": "https://masaworld.org",
        "logo": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png",
        "sameAs": [
            "https://www.facebook.com/masaworldfoundation",
            "https://twitter.com/masaworldfoundation",
            "https://www.instagram.com/masaworldfoundation/",
            "https://www.youtube.com/MASAWORLDFoundation"
        ],
        "description": "MASA World Foundation empowers youth and communities through Sports, Education, and Culture."
    };

    const eventsSchema = eventsData.slice(0, 3).map(event => ({
        "@type": "Event",
        "name": event.title,
        "startDate": event.date,
        "location": {
            "@type": "Place",
            "name": event.location,
            "address": { "@type": "PostalAddress", "addressLocality": event.location }
        },
        "image": event.image,
        "description": event.description
    }));

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, ...eventsSchema]) }} />
    );
};

// --- 1. HERO SECTION (4 SLIDES) ---
const HeroSlider: React.FC<NavigationProps> = ({ navigateTo }) => {
    const slides = [
        {
            headline: "Connecting Global Support with Real, On-the-Ground Local Impact",
            subtext: "MASA World Foundation empowers youth and communities through Sports, Education, and Culture—creating sustainable change across India and beyond.",
            image: "https://picsum.photos/1800/1200?grayscale&random=1",
            ctas: [
                { label: "Get Involved", page: "get-involved", primary: true },
                { label: "Donate Now", page: "donate", primary: false }
            ]
        },
        {
            headline: "Building Strong Youth Through Discipline, Sports & Leadership",
            subtext: "From grassroots training to national-level programs, we shape confident, disciplined, and purpose-driven young leaders.",
            image: "https://picsum.photos/1800/1200?grayscale&random=2",
            ctas: [
                { label: "Explore Programs", page: "sports", primary: true },
                { label: "Join as Volunteer", page: "volunteer", primary: false }
            ]
        },
        {
            headline: "Education That Builds Skills, Values, and Future Leaders",
            subtext: "We deliver skill-based education, leadership development, and value-driven learning for real-world impact.",
            image: "https://picsum.photos/1800/1200?grayscale&random=3",
            ctas: [
                { label: "View Trainings", page: "trainings", primary: true },
                { label: "Become a Member", page: "membership", primary: false }
            ]
        },
        {
            headline: "Preserving Culture, Empowering Communities, Inspiring Unity",
            subtext: "Celebrating heritage, creativity, and community participation to strengthen social harmony and identity.",
            image: "https://picsum.photos/1800/1200?grayscale&random=4",
            ctas: [
                { label: "Explore Initiatives", "page": "initiatives", primary: true },
                { label: "Support Our Mission", "page": "donate", primary: false }
            ]
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % slides.length), [slides.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative bg-masa-charcoal text-white h-[85vh] min-h-[600px] flex items-center overflow-hidden">
            {slides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
                    {/* Premium Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                </div>
            ))}
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl text-left">
                     {/* Key is used to trigger animation on slide change */}
                     <h1 key={`head-${currentSlide}`} className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in-up drop-shadow-lg">
                        {slides[currentSlide].headline}
                    </h1>
                    <p key={`sub-${currentSlide}`} className="mt-4 md:mt-6 text-lg md:text-2xl text-gray-100 font-light max-w-3xl leading-relaxed animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>
                        {slides[currentSlide].subtext}
                    </p>
                    <div key={`cta-${currentSlide}`} className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {slides[currentSlide].ctas.map((cta, idx) => (
                            <button 
                                key={idx}
                                onClick={() => navigateTo(cta.page as any)} 
                                className={`${cta.primary 
                                    ? 'bg-masa-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/40 border-2 border-transparent' 
                                    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-masa-charcoal'} 
                                    px-8 py-3.5 rounded-full text-base md:text-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95`}
                            >
                                {cta.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                {slides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentSlide(index)} 
                        className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-masa-orange w-10' : 'bg-white/50 hover:bg-white w-3'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

// --- FEATURED EVENT OF THE MONTH ---
const FeaturedEventSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    // Logic: Find the first Upcoming event, else fallback to latest Completed
    const featuredEvent = useMemo(() => {
        const eventsData = ContentManager.getEvents();
        const upcoming = eventsData.filter(e => e.status === 'Upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        if (upcoming.length > 0) return upcoming[0];
        const completed = eventsData.filter(e => e.status === 'Completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return completed[0];
    }, []);

    if (!featuredEvent) return null;

    return (
        <section className="bg-gray-50 py-10 border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <span className="inline-block bg-masa-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Featured Event</span>
                        <div className="aspect-video rounded-lg overflow-hidden relative shadow-inner">
                            <img src={featuredEvent.image} alt={featuredEvent.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl md:text-2xl font-bold text-masa-charcoal leading-tight">{featuredEvent.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3 mb-3">
                            <span className="flex items-center gap-1.5 font-medium"><CalendarDaysIcon className="h-4 w-4 text-masa-blue"/> {featuredEvent.displayDate}</span>
                            <span className="flex items-center gap-1.5 font-medium"><MapPinIcon className="h-4 w-4 text-masa-orange"/> {featuredEvent.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{featuredEvent.description}</p>
                    </div>
                    <div className="w-full md:w-auto md:ml-auto text-center md:text-right">
                        <button 
                            onClick={() => navigateTo('events')} 
                            className="w-full md:w-auto bg-white border-2 border-masa-blue text-masa-blue px-6 py-2.5 rounded-lg font-bold hover:bg-masa-blue hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- UPCOMING & RECENT EVENTS HIGHLIGHT ---
const EventsHighlightSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    // Logic: Get top 3 events (Prioritize Upcoming, then latest Completed)
    const highlightEvents = useMemo(() => {
        const eventsData = ContentManager.getEvents();
        const upcoming = eventsData.filter(e => e.status === 'Upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const completed = eventsData.filter(e => e.status === 'Completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return [...upcoming, ...completed].slice(0, 3);
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-masa-charcoal tracking-tight">Upcoming & Recent Events</h2>
                        <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                            National and international programs, trainings, conferences, and community initiatives.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigateTo('events')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors flex items-center group text-sm md:text-base hidden md:flex"
                    >
                        View All Events <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlightEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer" onClick={() => navigateTo('events')}>
                            <div className="h-48 overflow-hidden relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${event.status === 'Upcoming' ? 'bg-green-600' : 'bg-gray-600'}`}>
                                    {event.status}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-xs font-bold text-masa-orange uppercase tracking-wide mb-2 block">{event.category}</span>
                                <h3 className="text-lg font-bold text-masa-charcoal mb-3 line-clamp-2 leading-snug group-hover:text-masa-blue transition-colors">{event.title}</h3>
                                <div className="text-sm text-gray-500 mb-4 space-y-1.5">
                                    <div className="flex items-center gap-2"><CalendarDaysIcon className="h-4 w-4 text-gray-400"/> {event.displayDate}</div>
                                    <div className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-gray-400"/> {event.location}</div>
                                </div>
                                <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow leading-relaxed">{event.description}</p>
                                
                                <button 
                                    className="mt-auto w-full bg-gray-50 text-masa-charcoal py-2.5 rounded-lg font-bold text-sm hover:bg-masa-charcoal hover:text-white transition-colors border border-gray-200"
                                >
                                    View Event Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                     <button 
                        onClick={() => navigateTo('events')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors inline-flex items-center group"
                    >
                        View All Events <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- FEATURED COURSES SECTION (NEW) ---
const FeaturedCoursesSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    // Logic: Get top 3 courses
    const featuredCourses = useMemo(() => {
        return ContentManager.getCourses().slice(0, 3);
    }, []);

    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-masa-charcoal tracking-tight">Featured Courses & Programs</h2>
                        <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                            Unlock your potential with our expert-led trainings, leadership bootcamps, and skill development workshops.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigateTo('courses')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors flex items-center group text-sm md:text-base hidden md:flex"
                    >
                        View All Courses <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer" onClick={() => navigateTo('courses')}>
                            <div className="h-48 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-masa-charcoal uppercase tracking-wider shadow-sm border border-gray-200">
                                    {course.category}
                                </div>
                                <div className="absolute top-4 right-4 bg-masa-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                    {course.price || 'Free'}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-masa-charcoal mb-3 line-clamp-2 leading-snug group-hover:text-masa-blue transition-colors">{course.title}</h3>
                                
                                <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-500">
                                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        <ClockIcon className="h-3 w-3 mr-1 text-masa-orange" /> {course.duration}
                                    </div>
                                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        <LaptopIcon className="h-3 w-3 mr-1 text-masa-blue" /> {course.mode}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow leading-relaxed">{course.description}</p>
                                
                                <button 
                                    className="mt-auto w-full bg-blue-50 text-masa-blue py-2.5 rounded-lg font-bold text-sm hover:bg-masa-blue hover:text-white transition-colors"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 text-center md:hidden">
                     <button 
                        onClick={() => navigateTo('courses')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors inline-flex items-center group"
                    >
                        View All Courses <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- NEW: LATEST BLOGS SECTION ---
const LatestBlogsSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    // Dynamic blogs
    const latestPosts = ContentManager.getPosts().slice(0, 3);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-masa-charcoal tracking-tight">Latest Blogs & Updates</h2>
                        <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                            Stories of change, impact reports, and updates from the ground.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigateTo('blog')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors flex items-center group text-sm md:text-base hidden md:flex"
                    >
                        Read More Stories <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col h-full cursor-pointer" onClick={() => navigateTo('blog')}>
                            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <span className="bg-blue-50 text-masa-blue px-2 py-1 rounded">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors line-clamp-2 leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">{post.summary}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <span className="text-masa-orange font-bold text-sm flex items-center transition-transform group-hover:translate-x-1">
                                    Read Full Story <ArrowRightIcon className="ml-2 h-3 w-3" />
                                </span>
                                <span className="text-xs text-gray-400 font-medium flex items-center">
                                    <ClockIcon className="h-3 w-3 mr-1" /> {calculateReadingTime(post.content)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                     <button 
                        onClick={() => navigateTo('blog')} 
                        className="text-masa-blue font-bold hover:text-masa-orange transition-colors inline-flex items-center group"
                    >
                        Read More Stories <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- NEW "WHY MASA?" SECTION ---
const WhyMasaSection: React.FC = () => {
    const reasons = [
        {
            icon: UsersIcon,
            title: "Grassroots Work",
            desc: "We work directly with communities to identify and solve real problems from the ground up."
        },
        {
            icon: ShieldCheckIcon,
            title: "Discipline-Based",
            desc: "Every program is designed to instill discipline, integrity, and leadership in participants."
        },
        {
            icon: EyeIcon,
            title: "Full Transparency",
            desc: "We maintain complete financial and operational openness with our donors and partners."
        },
        {
            icon: SparklesIcon,
            title: "Real Impact",
            desc: "Our focus is on measurable outcomes that create lasting change in society."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-masa-charcoal tracking-tight">Why Masa World Foundation?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We are driven by a commitment to genuine social transformation through actionable values.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-masa-blue group-hover:bg-masa-orange group-hover:text-white transition-colors duration-300">
                                <reason.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-masa-charcoal mb-3">{reason.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 2. PROGRAM ICON STRIP (NEW DESIGN) ---
const ProgramIconStrip: React.FC<NavigationProps> = ({ navigateTo }) => {
    const programs = [
        { icon: CalendarDaysIcon, title: 'Events', page: 'events', color: 'bg-blue-500' },
        { icon: AcademicCapIcon, title: 'Trainings', page: 'trainings', color: 'bg-green-500' },
        { icon: TrophyIcon, title: 'Awards', page: 'awards', color: 'bg-yellow-500' },
        { icon: DocumentTextIcon, title: 'Records', page: 'records', color: 'bg-purple-500' },
        { icon: MicrophoneIcon, title: 'Conferences', page: 'conferences', color: 'bg-red-500' }
    ];
    return (
        <section className="bg-masa-charcoal pt-24 pb-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Let’s Create Incredible!</h2>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                        We organise, manage, and host impactful activities across sports, education, and culture to engage communities and drive our mission forward—locally and globally.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16 max-w-6xl mx-auto">
                    {programs.map(p => (
                        <div key={p.title} className="text-center group cursor-pointer bg-blue-900/20 hover:bg-blue-900/40 p-6 rounded-2xl transition-all transform hover:-translate-y-2 active:scale-95" onClick={() => navigateTo(p.page as any)}>
                            <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto ${p.color} rounded-full flex items-center justify-center mb-5 shadow-lg`}>
                                <p.icon className="h-8 w-8 md:h-9 md:w-9 text-white" />
                            </div>
                            <h3 className="font-bold text-base md:text-lg text-white">{p.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 3. OUR PILLARS SECTION ---
const PillarsSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const pillars = [
        { icon: TrophyIcon, title: 'Sports', subtitle: 'Action', desc: 'Promoting physical fitness, discipline, and team spirit through structured sports programs and competitive tournaments.', page: 'sports' },
        { icon: AcademicCapIcon, title: 'Education', subtitle: 'Knowledge', desc: 'Empowering minds through leadership workshops, skill development trainings, and value-based learning initiatives.', page: 'education' },
        { icon: GlobeIcon, title: 'Culture', subtitle: 'Heritage', desc: 'Preserving heritage and fostering social harmony through vibrant cultural events, arts, and community celebrations.', page: 'culture' }
    ];
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16"><span className="text-masa-blue font-bold uppercase tracking-widest text-sm">Our Pillars</span><h2 className="text-3xl font-bold text-masa-charcoal mt-2">Holistic Development Ecosystem</h2><p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">We don’t focus on just one aspect. We build a connected ecosystem where sports, education, and culture reinforce each other.</p></div>
                <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
                    <div className="hidden md:block absolute top-12 left-1/3 w-1/3 h-1 bg-gray-200"></div>
                    {pillars.map(pillar => (
                        <div key={pillar.title} className="relative flex flex-col text-center items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-masa-blue shadow-lg z-10 mb-4">
                                <pillar.icon className="h-10 w-10 text-masa-blue" />
                            </div>
                            <p className="mt-3 text-xs font-bold text-gray-500 uppercase tracking-widest">{pillar.subtitle}</p>
                            <h3 className="text-2xl font-bold mt-1 text-masa-charcoal">{pillar.title}</h3>
                            <p className="text-gray-600 my-4 flex-grow max-w-xs leading-relaxed text-sm">{pillar.desc}</p>
                            <button onClick={() => navigateTo(pillar.page as any)} className="mt-auto font-bold text-masa-blue hover:text-masa-orange transition-colors flex items-center group text-sm uppercase tracking-wide">
                                Explore {pillar.title} <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- NEW KEY INITIATIVES SECTION ---
const KeyInitiativesSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const initiatives = [
        { 
            icon: TrophyIcon, 
            title: "Youth Empowerment & Discipline", 
            description: "Building character, leadership, and resilience in youth through structured sports, physical training, and mentorship programs.",
            page: 'sports' 
        },
        { 
            icon: HeartIcon, 
            title: "Social Awareness & Reform", 
            description: "Driving positive social change through impactful awareness campaigns on health, civic duties, and community well-being.",
            page: 'initiatives' 
        },
        { 
            icon: SparklesIcon, 
            title: "Real Hero Recognition", 
            description: "Identifying and honoring the unsung heroes of our society to inspire the next generation through our prestigious awards.",
            page: 'awards' 
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Our Key Initiatives</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We focus on three core areas to create a well-rounded impact on society.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {initiatives.map((item) => (
                        <div key={item.title} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group h-full">
                            <div className="w-16 h-16 bg-masa-blue text-white rounded-full flex items-center justify-center mb-6 shadow-md group-hover:bg-masa-orange transition-colors duration-300">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-masa-charcoal mb-4 flex-grow">{item.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{item.description}</p>
                            <button 
                                onClick={() => navigateTo(item.page as any)}
                                className="mt-auto font-bold text-masa-blue hover:text-masa-orange transition-colors flex items-center text-sm"
                            >
                                Learn More <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 4. FOUNDER'S MESSAGE ---
const FounderMessageSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Image Column - Enhanced Design */}
                    <div className="flex justify-center md:justify-end order-1 relative">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-10 right-10 w-full h-full bg-gray-100 rounded-3xl -z-20 transform rotate-3"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="relative group">
                            {/* The 'Sado' (Shadow) Effect */}
                            <div className="absolute top-4 left-4 w-full h-full border-2 border-masa-orange rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            
                            <img 
                                src={FOUNDER_IMAGE_URL} 
                                alt="Vijay Babu Sharma" 
                                className="relative rounded-2xl shadow-2xl w-full max-w-sm h-auto object-cover aspect-[4/5] border-8 border-white transform transition-transform duration-500 group-hover:-translate-y-1"
                            />
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border-l-4 border-masa-blue max-w-[200px] hidden sm:block animate-fade-in-up">
                                <div className="flex items-center gap-3">
                                    <div className="bg-masa-blue/10 p-2 rounded-full text-masa-blue">
                                        <QuoteIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Leadership</p>
                                        <p className="text-sm font-bold text-masa-charcoal">Visionary & Mentor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="max-w-prose mx-auto md:mx-0 order-2 text-left">
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-masa-blue rounded-full text-xs font-bold uppercase tracking-widest">
                            <QuoteIcon className="h-3 w-3" /> Founder's Vision
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-masa-charcoal mb-6">A Message from the Founder</h2>
                        <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-masa-orange pl-6 mb-6 relative">
                            <span className="absolute top-0 left-2 text-6xl text-gray-100 -z-10 font-serif">"</span>
                            "MASA World Foundation was established with a clear belief—that sports, education, and culture are among the strongest tools for building disciplined individuals, empowered youth, and responsible communities."
                        </blockquote>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Sports teach discipline, teamwork, resilience, and confidence. Education builds knowledge, leadership, and critical thinking. Culture connects us to our roots while opening doors to global understanding. At MASA, we integrate all three to help individuals grow—not just as athletes or students, but as strong, ethical, and confident human beings.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
                            <div>
                                <p className="font-bold text-masa-charcoal text-lg">Vijay Babu Sharma</p>
                                <p className="text-gray-500 text-sm">Founder, MASA World Foundation</p>
                            </div>
                            <button 
                                onClick={() => navigateTo('founder-message')} 
                                className="inline-flex items-center text-white bg-masa-blue px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition-all shadow-md transform hover:-translate-y-0.5 active:scale-95"
                            >
                                Read Full Message <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- NEW CREDIBILITY STRIP ---
const CredibilityStrip: React.FC<NavigationProps> = ({ navigateTo }) => {
    const trustPoints = [
        { icon: ShieldCheckIcon, text: "Registered Non-Profit Organisation" },
        { icon: EyeIcon, text: "Transparent Operations" },
        { icon: PresentationChartBarIcon, text: "Impact-Oriented Programs" },
        { icon: GlobeIcon, text: "National & Global Participation" }
    ];

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-center">
                        {trustPoints.map((point) => (
                            <div key={point.text} className="flex flex-col sm:flex-row items-center justify-center text-sm font-medium text-gray-700">
                                <point.icon className="h-5 w-5 mb-2 sm:mb-0 sm:mr-3 text-masa-blue flex-shrink-0" />
                                <span>{point.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button 
                            onClick={() => navigateTo('media-reports')}
                            className="text-masa-blue font-semibold hover:text-masa-orange transition-colors group text-sm inline-flex items-center"
                        >
                            View Reports & Transparency
                            <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- 5. GET INVOLVED SECTION ---
const GetInvolvedSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const actions = [
        { icon: HeartIcon, title: "Volunteer With Us", desc: "Contribute your time, skills, and passion to create real impact on the ground.", page: 'volunteer', buttonText: "Volunteer Registration" },
        { icon: UsersIcon, title: "Become a Member", desc: "Join our growing community and support our mission long-term.", page: 'membership', buttonText: "Explore Memberships" },
        { icon: HandshakeIcon, title: "Partner / Collaborate", desc: "Institutions, NGOs, corporates, and schools can collaborate with us on initiatives.", page: 'contact', buttonText: "Partner With Us" },
        { icon: SparklesIcon, title: "Donate & Support", desc: "Support our work financially and help scale impact across communities.", page: 'donate', buttonText: "Donate Now" }
    ];
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16"><h2 className="text-3xl font-bold text-masa-charcoal">Join Our Community!</h2><p className="mt-4 text-gray-600 max-w-2xl mx-auto">Whether you offer your time, skills, or support, there’s a place for you at MASA World Foundation.</p></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {actions.map((a, index) => (
                        <div key={a.title} className={`p-8 rounded-2xl shadow-lg flex flex-col text-center items-center group transition-all duration-300 ${index === 3 ? 'bg-masa-orange text-white' : 'bg-white border border-gray-200'}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${index === 3 ? 'bg-white/20' : 'bg-orange-50'}`}>
                                <a.icon className={`h-8 w-8 ${index === 3 ? 'text-white' : 'text-masa-orange'}`} />
                            </div>
                            <h3 className={`text-xl font-bold ${index === 3 ? 'text-white' : 'text-masa-charcoal'}`}>{a.title}</h3>
                            <p className={`my-4 flex-grow text-sm leading-relaxed ${index === 3 ? 'text-orange-100' : 'text-gray-600'}`}>{a.desc}</p>
                            <button onClick={() => navigateTo(a.page as any)} className={`mt-auto font-bold py-3 px-6 rounded-full transition-colors w-full text-sm active:scale-95 ${index === 3 ? 'bg-white text-masa-orange hover:bg-orange-50' : (index === 1 ? 'bg-masa-orange text-white hover:bg-orange-600' : 'bg-white border-2 border-masa-blue text-masa-blue hover:bg-masa-blue hover:text-white')}`}>
                                {a.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- 6. ACCOUNTABILITY INFOGRAPHIC ---
const AccountabilityInfographic: React.FC = () => {
    const steps = [
        { title: "Contribution", desc: "Donations are received via secure channels with instant receipts.", icon: null },
        { title: "Allocation", desc: "Funds are allocated to specific programs with strict oversight.", icon: ShieldCheckIcon },
        { title: "Action", desc: "Volunteers execute programs on the ground for maximum impact.", icon: SparklesIcon },
        { title: "Reporting", desc: "Impact reports and financial statements are shared publicly.", icon: CheckIcon }
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16"><span className="text-masa-blue font-bold uppercase tracking-widest text-sm">Our Accountability</span><h2 className="text-3xl font-bold text-masa-charcoal mt-2">The Cycle of Trust</h2><p className="mt-4 text-lg text-gray-600">Transparency isn’t just a promise; it’s built into every step of our process.</p></div>
                <div className="relative max-w-5xl mx-auto">
                    <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className={`relative w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 ${i === 1 ? 'border-masa-orange' : i > 2 ? 'border-green-500' : 'border-masa-blue'} shadow-lg mb-6`}>
                                        {Icon ? <Icon className={`h-8 w-8 ${i === 1 ? 'text-masa-orange' : i > 2 ? 'text-green-500' : 'text-masa-blue'}`} /> : <span className="font-bold text-2xl text-masa-blue">{i + 1}</span>}
                                    </div>
                                    <h3 className="text-lg font-bold text-masa-charcoal mb-3">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- 7. TESTIMONIAL SLIDER SECTION ---
const TestimonialSlider: React.FC = () => {
    const testimonials = [
        {
            quote: "Volunteering with MASA has been a life-changing experience. It’s more than just service; it’s about becoming part of a family that genuinely cares for the community.",
            name: "Priya Sharma",
            role: "Volunteer, Delhi",
            image: "https://i.pravatar.cc/150?u=priya"
        },
        {
            quote: "As a Life Member, I’ve seen firsthand how my contributions are creating sustainable impact. The transparency and dedication of the team are truly commendable.",
            name: "Rajesh Kumar",
            role: "Life Member, Mumbai",
            image: "https://i.pravatar.cc/150?u=rajesh"
        },
        {
            quote: "The leadership bootcamp changed my perspective on what I can achieve. I feel more confident and equipped to make a difference in my village.",
            name: "Anjali Singh",
            role: "Beneficiary, Youth Program",
            image: "https://i.pravatar.cc/150?u=anjali"
        }
    ];

    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));
    }, [testimonials.length]);

    const prev = () => {
        setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
    };

    useEffect(() => {
        const timer = setTimeout(next, 7000);
        return () => clearTimeout(timer);
    }, [current, next]);

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Voices of Our Community</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Real stories from the people who make our mission possible.</p>
                </div>

                <div className="relative max-w-3xl mx-auto min-h-[22rem] flex items-center justify-center">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <div className="flex flex-col items-center text-center p-4">
                                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full shadow-lg mb-6 border-4 border-white" />
                                <QuoteIcon className="h-16 w-16 text-gray-200 absolute top-12 left-1/2 transform -translate-x-1/2 -z-10" />
                                <blockquote className="text-xl italic text-gray-700 leading-relaxed max-w-2xl relative z-10">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="mt-6">
                                    <p className="font-bold text-masa-charcoal text-lg">{testimonial.name}</p>
                                    <p className="text-masa-orange font-semibold">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button onClick={prev} aria-label="Previous testimonial" className="absolute top-1/2 -left-2 md:-left-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-masa-orange z-20">
                        <ChevronLeftIcon className="h-6 w-6 text-masa-charcoal" />
                    </button>
                    <button onClick={next} aria-label="Next testimonial" className="absolute top-1/2 -right-2 md:-right-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-masa-orange z-20">
                        <ChevronRightIcon className="h-6 w-6 text-masa-charcoal" />
                    </button>
                </div>
                
                <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrent(index)} aria-label={`Go to testimonial ${index + 1}`} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-masa-orange scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- 8. FINAL CTA SECTION ---
const FinalCTA: React.FC<NavigationProps> = ({ navigateTo }) => (
    <section className="bg-masa-blue"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"><h2 className="text-3xl md:text-4xl font-bold text-white">Be the Change You Want to See</h2><div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"><button onClick={() => navigateTo('volunteer')} className="w-full sm:w-auto bg-masa-orange text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-orange-600 active:scale-95 transition-all">Volunteer</button><button onClick={() => navigateTo('membership')} className="w-full sm:w-auto bg-white text-masa-charcoal px-8 py-3.5 rounded-full text-lg font-bold hover:bg-gray-100 active:scale-95 transition-all">Become a Member</button><button onClick={() => navigateTo('donate')} className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-white hover:text-masa-blue active:scale-95 transition-all">Donate Now</button></div></div></section>
);

// --- MAIN HOMEPAGE COMPONENT ---
const HomePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <>
            <SchemaMarkup />
            <HeroSlider navigateTo={navigateTo} />
            <ImpactSnapshot />
            <FeaturedEventSection navigateTo={navigateTo} />
            <WhyMasaSection />
            <ProgramIconStrip navigateTo={navigateTo} />
            <EventsHighlightSection navigateTo={navigateTo} />
            <FeaturedCoursesSection navigateTo={navigateTo} />
            <LatestBlogsSection navigateTo={navigateTo} />
            <PillarsSection navigateTo={navigateTo} />
            <KeyInitiativesSection navigateTo={navigateTo} />
            <FounderMessageSection navigateTo={navigateTo} />
            <CredibilityStrip navigateTo={navigateTo} />
            <GetInvolvedSection navigateTo={navigateTo} />
            <AccountabilityInfographic />
            <TestimonialSlider />
            <FinalCTA navigateTo={navigateTo} />
             <style>{`
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
             `}</style>
        </>
    );
};

export default HomePage;
