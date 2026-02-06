
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps, SliderItem } from '../types';
import { ContentManager } from '../utils/contentManager';

const HeroSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [slides, setSlides] = useState<SliderItem[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const loadSlides = () => {
            const settings = ContentManager.getSettings();
            setSlides(settings.homepage.slider.slides || []);
        };
        loadSlides();
        window.addEventListener('masa-settings-updated', loadSlides);
        return () => window.removeEventListener('masa-settings-updated', loadSlides);
    }, []);

    const next = useCallback(() => setCurrent(p => (p + 1) % (slides.length || 1)), [slides.length]);
    
    useEffect(() => { 
        if (slides.length > 1) {
            const timer = setInterval(next, 7000); 
            return () => clearInterval(timer); 
        }
    }, [next, slides.length]);

    if (slides.length === 0) {
        return <section className="h-[90vh] min-h-[600px] bg-gray-200 flex items-center justify-center text-gray-500">Loading Hero...</section>;
    }

    return (
        <section className="relative bg-masa-charcoal text-white h-[90vh] min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
            {slides.map((slide, index) => (
                <div key={slide.id || index} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover animate-ken-burns" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            ))}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 text-white font-bold tracking-widest uppercase text-sm">
                Masa World Foundation
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-3xl text-left">
                    <div key={current} className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">{slides[current].headline}</h1>
                        <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl drop-shadow">{slides[current].subtext}</p>
                        <button onClick={() => navigateTo(slides[current].cta.page)} className="mt-8 md:mt-10 bg-masa-orange text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            {slides[current].cta.label}
                        </button>
                    </div>
                </div>
            </div>
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                    {slides.map((_, i) => <button key={i} aria-label={`Go to slide ${i+1}`} onClick={() => setCurrent(i)} className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 ${i === current ? 'bg-masa-orange w-6 md:w-8' : 'bg-white/50 hover:bg-white/80'}`}></button>)}
                </div>
            )}
        </section>
    );
};

export default HeroSection;
