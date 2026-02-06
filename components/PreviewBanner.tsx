
import React, { useState, useEffect } from 'react';
import { EyeIcon } from './icons/FeatureIcons';
import { XIcon } from './icons/UiIcons';

const PreviewBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('masa_preview') === 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleExitPreview = () => {
        sessionStorage.removeItem('masa_preview_settings');
        // Redirect to the same path without query parameters
        window.location.href = window.location.pathname;
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-yellow-400 text-yellow-900 p-3 text-center z-50 shadow-lg text-sm font-bold flex items-center justify-center gap-4">
            <EyeIcon className="h-5 w-5" />
            <span>
                Preview Mode: You are viewing unsaved changes. These are not live.
            </span>
            <button 
                onClick={handleExitPreview} 
                className="ml-4 bg-yellow-800 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-900 transition-colors flex items-center gap-1"
            >
                <XIcon className="h-3 w-3" />
                Exit Preview
            </button>
        </div>
    );
};

export default PreviewBanner;
