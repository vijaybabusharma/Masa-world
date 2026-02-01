
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Testimonial, NavigationProps } from '../types';
import { QuoteIcon, ArrowRightIcon } from './icons/FeatureIcons';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/UiIcons';
import { ContentManager } from '../utils/contentManager';

const CommunityVoicesSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // FIX: Replaced fragile `ReturnType<typeof setTimeout>` with the explicit `number` type for robust browser compatibility, fixing the build error.
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const settings = ContentManager.getSettings();
        setTestimonials((settings.homepage.testimonials || []).slice(0, 6));
    }, []);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    }, [testimonials.length]);

    useEffect(() => {
        resetTimeout();
        if (testimonials.length > 0) {
            timeoutRef.current = window.setTimeout(nextSlide, 7000);
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, testimonials.length, resetTimeout, nextSlide]);

    const prevSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!testimonials.length) {
        return null;
    }

    return (
        <section className="py-24 bg-gray-50">
            <div 
                className="container mx-auto px-4 sm:px-6 lg:px-8"
                onMouseEnter={() => resetTimeout()}
                onMouseLeave={() => {
                    resetTimeout();
                    timeoutRef.current = window.setTimeout(nextSlide, 7000);
                }}
            >
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Voices from Our Community</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Real stories from the people who power our mission and benefit from our work.
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="overflow-hidden relative h-96">
                        {testimonials.map((t, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 h-full flex flex-col justify-center items-center text-center relative overflow-hidden border border-gray-100">
                                    <QuoteIcon className="absolute -top-4 -left-4 h-28 w-28 text-masa-blue/5" />
                                    <blockquote className="text-xl md:text-2xl font-serif italic text-gray-700 mb-6 flex-grow flex items-center leading-relaxed">
                                        "{t.quote}"
                                    </blockquote>
                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                        <img src={t.image} alt={t.author} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                                        <div>
                                            <p className="font-bold text-masa-charcoal">{t.author}</p>
                                            <p className="text-sm text-gray-500 font-medium">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors border border-gray-200">
                        <ChevronLeftIcon className="h-6 w-6 text-masa-blue" />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors border border-gray-200">
                        <ChevronRightIcon className="h-6 w-6 text-masa-blue" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-masa-orange w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <button 
                        onClick={() => navigateTo('community-voices')} 
                        className="text-masa-blue font-bold hover:underline flex items-center gap-1 mx-auto group"
                    >
                        Read More Stories
                        <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CommunityVoicesSection;
