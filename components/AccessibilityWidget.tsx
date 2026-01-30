
import React, { useState, useEffect } from 'react';
import { AccessibilityIcon, CheckIcon } from './icons/FeatureIcons';
import { XIcon } from './icons/UiIcons';

const AccessibilityWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [textSize, setTextSize] = useState(100);
    const [contrast, setContrast] = useState(false);
    const [grayscale, setGrayscale] = useState(false);

    useEffect(() => {
        // Apply changes
        const html = document.documentElement;
        html.style.fontSize = `${textSize}%`;
        
        if (contrast) document.body.classList.add('high-contrast');
        else document.body.classList.remove('high-contrast');

        if (grayscale) document.body.classList.add('grayscale-mode');
        else document.body.classList.remove('grayscale-mode');

    }, [textSize, contrast, grayscale]);

    return (
        <div className="fixed bottom-8 left-8 z-50">
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl p-6 mb-4 w-64 border border-gray-200 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-masa-charcoal">Accessibility</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700">
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Text Size</p>
                            <div className="flex gap-2">
                                <button onClick={() => setTextSize(100)} className={`flex-1 py-1 rounded border text-sm ${textSize === 100 ? 'bg-masa-blue text-white border-masa-blue' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>A</button>
                                <button onClick={() => setTextSize(110)} className={`flex-1 py-1 rounded border text-base font-bold ${textSize === 110 ? 'bg-masa-blue text-white border-masa-blue' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>A+</button>
                                <button onClick={() => setTextSize(125)} className={`flex-1 py-1 rounded border text-lg font-extrabold ${textSize === 125 ? 'bg-masa-blue text-white border-masa-blue' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>A++</button>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Display</p>
                            <button 
                                onClick={() => setContrast(!contrast)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border mb-2 transition-colors ${contrast ? 'bg-yellow-100 border-yellow-300 text-yellow-900' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                            >
                                <span className="text-sm font-medium">High Contrast</span>
                                {contrast && <CheckIcon className="h-4 w-4" />}
                            </button>
                            <button 
                                onClick={() => setGrayscale(!grayscale)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${grayscale ? 'bg-gray-200 border-gray-400 text-gray-900' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                            >
                                <span className="text-sm font-medium">Grayscale</span>
                                {grayscale && <CheckIcon className="h-4 w-4" />}
                            </button>
                        </div>
                        
                        <button onClick={() => { setTextSize(100); setContrast(false); setGrayscale(false); }} className="w-full text-xs text-masa-orange hover:underline text-center mt-2">
                            Reset Settings
                        </button>
                    </div>
                </div>
            )}
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-masa-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-masa-blue"
                aria-label="Open Accessibility Tools"
            >
                <AccessibilityIcon className="h-6 w-6" />
            </button>
            <style>{`
                .grayscale-mode { filter: grayscale(100%); }
                .high-contrast { filter: contrast(125%); }
            `}</style>
        </div>
    );
};

export default AccessibilityWidget;
