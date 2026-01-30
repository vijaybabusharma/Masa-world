
import React from 'react';
import { NavigationProps } from '../types';
import { ArrowRightIcon, QuoteIcon } from './icons/FeatureIcons';
import { FOUNDER_IMAGE_URL } from '../utils/data';

interface FounderMessageSectionProps extends NavigationProps {
    bgColor?: string;
}

const FounderMessageSection: React.FC<FounderMessageSectionProps> = ({ bgColor = 'bg-white', navigateTo }) => {
    return (
        <section className={`py-16 ${bgColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Image Column - Increased Size & Centered */}
                    <div className="flex justify-center md:justify-end">
                         <div className="relative w-full max-w-md group">
                            {/* Decorative Backdrop - Tightened */}
                            <div className="absolute top-3 -right-3 w-full h-full bg-masa-orange/10 rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></div>
                            
                            <img 
                                src={FOUNDER_IMAGE_URL}
                                alt="Vijay Babu Sharma, Founder of Masa World Foundation" 
                                className="rounded-2xl shadow-lg w-full h-auto object-cover aspect-[4/5] bg-gray-100"
                                loading="lazy"
                            />
                            
                            {/* Floating Badge for Professional Context */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-masa-blue shadow-sm hidden sm:block">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Visionary</p>
                                <p className="text-sm font-bold text-masa-charcoal">Vijay Babu Sharma</p>
                            </div>
                         </div>
                    </div>

                    {/* Content Column - Vertically Centered */}
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-masa-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <QuoteIcon className="h-3 w-3" /> Leadership
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-masa-charcoal mb-6 leading-tight">
                            A Message from the Founder
                        </h2>
                        
                        <blockquote className="text-xl text-gray-800 leading-relaxed font-serif italic border-l-4 border-masa-orange pl-6 mb-6 text-justify">
                            "At MASA World Foundation, we believe that sports, education, and culture together shape confident individuals and responsible communities."
                        </blockquote>
                        
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg text-justify">
                            Our mission is to empower youth, recognize real heroes, and create lasting impact through disciplined action. We invite you to join this movement of positive change.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-gray-200 pt-6">
                            <div>
                                <p className="text-lg font-bold text-masa-charcoal">Vijay Babu Sharma</p>
                                <p className="text-sm text-gray-500 font-medium">Founder & Chairman</p>
                            </div>
                            <button 
                                onClick={() => navigateTo('founder-message')} 
                                className="inline-flex items-center bg-masa-charcoal text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-md transform hover:-translate-y-0.5"
                            >
                                Read Full Message
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderMessageSection;
