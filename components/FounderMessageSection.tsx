
import React from 'react';
import { NavigationProps } from '../types';
import { ArrowRightIcon } from './icons/FeatureIcons';
import { FOUNDER_IMAGE_URL } from '../utils/data';

interface FounderMessageSectionProps extends NavigationProps {
    bgColor?: string;
}

const FounderMessageSection: React.FC<FounderMessageSectionProps> = ({ bgColor = 'bg-white', navigateTo }) => {
    return (
        <section className={`py-20 ${bgColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Founder Image */}
                    <div className="flex justify-center">
                        <img 
                            src={FOUNDER_IMAGE_URL}
                            alt="Vijay Babu Sharma, Founder of Masa World Foundation" 
                            className="rounded-lg shadow-soft w-full max-w-sm h-auto object-cover aspect-[4/5]"
                        />
                    </div>

                    {/* Founder Message Preview */}
                    <div className="max-w-prose mx-auto md:mx-0">
                        <h2 className="text-xl font-bold text-masa-orange">A Message from the Founder</h2>
                        <h3 className="text-3xl font-bold text-masa-charcoal mt-1">Our Core Belief</h3>
                        <blockquote className="mt-6 text-lg text-gray-700 leading-relaxed border-l-4 border-masa-orange pl-4 italic">
                            "At MASA World Foundation, we believe that sports, education, and culture together shape confident individuals and responsible communities. Our mission is to empower youth, recognize real heroes, and create lasting impact."
                        </blockquote>
                        <p className="mt-4 text-right font-semibold text-masa-charcoal">
                            — Vijay Babu Sharma, Founder
                        </p>
                        <div className="mt-8">
                            <button 
                                onClick={() => navigateTo('founder-message')} 
                                className="inline-flex items-center bg-masa-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Read Full Message
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
             <style>{`
                .shadow-soft {
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </section>
    );
};

export default FounderMessageSection;
