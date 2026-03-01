
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps, SliderItem, SmartButton, PaymentLink, Page } from '../types';
import { ContentManager } from '../utils/contentManager';
import { handleSmartButtonClick } from '../utils/buttonHelper';

const HeroSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [slides, setSlides] = useState<SliderItem[]>([]);
    const [current, setCurrent] = useState(0);
    const [heroCta, setHeroCta] = useState<SmartButton | null>(null);
    const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);

    useEffect(() => {
        const loadSlides = () => {
            const settings = ContentManager.getSettings();
            setSlides(settings.homepage.slider.slides || []);
            if (settings.buttons && settings.buttons.zones) {
                setHeroCta(settings.buttons.zones['hero_cta']);
                setPaymentLinks(settings.buttons.paymentLinks);
            }
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

    const onSmartBtnClick = (btn: SmartButton) => {
        handleSmartButtonClick(btn, paymentLinks, navigateTo);
    };

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
                <div className="max-w-4xl text-left">
                    <div key={current} className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg leading-tight">{slides[current].headline}</h1>
                        <p className="mt-8 text-xl md:text-2xl text-gray-100 max-w-3xl drop-shadow-md font-light leading-relaxed">{slides[current].subtext}</p>
                        
                        {heroCta && heroCta.visible ? (
                            <button onClick={() => onSmartBtnClick(heroCta)} className="mt-10 md:mt-12 bg-masa-orange text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                {heroCta.label}
                            </button>
                        ) : (
                            <button onClick={() => navigateTo(slides[current].cta.page)} className="mt-10 md:mt-12 bg-masa-orange text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                {slides[current].cta.label}
                            </button>
                        )}
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
