
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps } from '../types';

const HeroSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const slides = [
        { headline: "Empowering Youth. Building Nations.", subtext: "We forge future leaders through sports, education, and culture.", cta: { label: "Our Mission", page: "mission-vision" as const }, image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1800&q=80" },
        { headline: "Action Today. Impact for Generations.", subtext: "Our model builds character, fosters social unity, and nurtures responsible citizens.", cta: { label: "Get Involved", page: "get-involved" as const }, image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1800&q=80" },
        { headline: "Knowledge is Power. We Make it Accessible.", subtext: "From digital literacy in rural villages to leadership bootcamps, we provide education that empowers.", cta: { label: "Explore Education", page: "education" as const }, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80" },
        { headline: "Culture Connects. Heritage Inspires.", subtext: "Celebrating diversity and preserving traditions to build stronger, more unified communities.", cta: { label: "Discover Culture", page: "culture" as const }, image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1800&q=80" },
        { headline: "Join a Global Community of Changemakers.", subtext: "Your support, time, and voice can make a world of difference.", cta: { label: "Become a Member", page: "membership" as const }, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80" },
    ];
    const [current, setCurrent] = useState(0);
    const next = useCallback(() => setCurrent(p => (p + 1) % slides.length), [slides.length]);
    useEffect(() => { const timer = setInterval(next, 7000); return () => clearInterval(timer); }, [next]);

    return (
        <section className="relative bg-masa-charcoal text-white h-[90vh] min-h-[600px] flex items-center overflow-hidden">
            {slides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover animate-ken-burns" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            ))}
            <div className="absolute top-8 left-8 z-10 text-white font-bold tracking-widest uppercase text-sm">
                Masa World Foundation
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-3xl text-left">
                    <div key={current} className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">{slides[current].headline}</h1>
                        <p className="mt-6 text-lg text-gray-200 max-w-2xl drop-shadow">{slides[current].subtext}</p>
                        <button onClick={() => navigateTo(slides[current].cta.page)} className="mt-10 bg-masa-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            {slides[current].cta.label}
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                {slides.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current ? 'bg-masa-orange scale-125' : 'bg-white/50 hover:bg-white/80'}`}></button>)}
            </div>
        </section>
    );
};

export default HeroSection;
