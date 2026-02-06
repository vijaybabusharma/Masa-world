
import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../types';
import { ContentManager } from '../utils/contentManager';

const FinalCta: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const loadSettings = () => {
            const settings = ContentManager.getSettings();
            setIsVisible(settings.homepage.sections.finalCta.visible);
        };
        loadSettings();
        window.addEventListener('masa-settings-updated', loadSettings);
        return () => window.removeEventListener('masa-settings-updated', loadSettings);
    }, []);

    if (!isVisible) return null;

    return (
        <section className="bg-gradient-to-br from-gray-900 to-masa-charcoal py-24 relative overflow-hidden">
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-masa-orange/10 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
                    Join the Movement for a Better Tomorrow
                </h2>
                <button 
                    onClick={() => navigateTo('membership')} 
                    className="mt-10 bg-masa-orange text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/40 transform hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                >
                    Become a Member Today
                </button>
            </div>
        </section>
    );
};

export default FinalCta;
