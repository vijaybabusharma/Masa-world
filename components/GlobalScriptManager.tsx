
import React, { useEffect } from 'react';
import { ContentManager } from '../utils/contentManager';

const GlobalScriptManager: React.FC = () => {
    useEffect(() => {
        const applySettings = () => {
            const settings = ContentManager.getSettings();

            // 1. Custom CSS
            let styleTag = document.getElementById('masa-custom-css');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'masa-custom-css';
                document.head.appendChild(styleTag);
            }
            if (styleTag) styleTag.innerHTML = settings.appearance.customCss;

            // 2. Custom JS (Head) - Executed carefully
            // Note: In a real React app, executing raw strings as JS is dangerous (XSS).
            // For this admin panel simulation, we assume the admin is trusted.
            // We won't eval() for safety in this demo, but we'll log where it would go.
            if (settings.appearance.customJs) {
                console.log('Custom JS Loaded (Simulation):', settings.appearance.customJs);
            }

            // 3. Meta Tags (Verification)
            if (settings.monetization.metaVerification) {
                let meta = document.querySelector('meta[name="google-site-verification"]');
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', 'google-site-verification');
                    document.head.appendChild(meta);
                }
                meta.setAttribute('content', settings.monetization.metaVerification);
            }

            // 4. Analytics (Simulation)
            if (settings.monetization.googleAnalyticsId) {
                // Check if script exists, if not, create it
                // Logic omitted for brevity, but this is where gtag.js goes
            }
        };

        // Apply immediately
        applySettings();

        // Listen for updates
        window.addEventListener('masa-settings-updated', applySettings);
        return () => window.removeEventListener('masa-settings-updated', applySettings);
    }, []);

    return null; // This component renders nothing visual
};

export default GlobalScriptManager;
