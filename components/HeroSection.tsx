
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
            const allSlides = settings.homepage.slider.slides || [];
            setSlides(allSlides.filter(s => s.enabled !== false));
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
                    <picture className="w-full h-full">
                        {slide.mobileImage && <source media="(max-width: 767px)" srcSet={slide.mobileImage} />}
                        <img 
                            src={slide.image} 
                            alt={slide.headline} 
                            className="w-full h-full object-cover animate-ken-burns" 
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                </div>
            ))}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 text-white font-bold tracking-widest uppercase text-sm">
                Masa World Foundation
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-5xl text-left">
                    <div key={current} className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] text-balance">
                            {slides[current].headline}
                        </h1>
                        <p className="mt-8 text-xl md:text-2xl text-gray-100 max-w-3xl drop-shadow-lg font-medium leading-relaxed opacity-90">
                            {slides[current].subtext}
                        </p>
                        {slides[current].description && (
                            <p className="mt-4 text-lg text-gray-200 max-w-2xl drop-shadow-md font-normal opacity-80">
                                {slides[current].description}
                            </p>
                        )}
                        
                        <div className="mt-10 md:mt-12 flex flex-wrap gap-4">
                            {heroCta && heroCta.visible ? (
                                <button 
                                    onClick={() => onSmartBtnClick(heroCta)} 
                                    className="bg-masa-orange text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:bg-orange-600 transition-all shadow-2xl hover:shadow-orange-500/40 transform hover:-translate-y-1 active:scale-95"
                                >
                                    {heroCta.label}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => {
                                        if (slides[current].cta.url) {
                                            window.open(slides[current].cta.url, '_blank');
                                        } else {
                                            navigateTo(slides[current].cta.page);
                                        }
                                    }} 
                                    className="bg-masa-orange text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold hover:bg-orange-600 transition-all shadow-2xl hover:shadow-orange-500/40 transform hover:-translate-y-1 active:scale-95"
                                >
                                    {slides[current].cta.label}
                                </button>
                            )}
                        </div>
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
