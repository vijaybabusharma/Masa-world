
import React, { useEffect } from 'react';
import { ContentManager } from '../utils/contentManager';

const GlobalScriptManager: React.FC = () => {
    useEffect(() => {
        const applySettings = () => {
            const settings = ContentManager.getSettings();
            const { scripts, appearance } = settings;

            // --- 1. CLEANUP PREVIOUS INJECTIONS ---
            document.querySelectorAll('[data-masa-injected]').forEach(el => el.remove());

            // --- 2. CUSTOM CSS ---
            if (appearance.enableCustomCss && appearance.customCss) {
                const style = document.createElement('style');
                style.setAttribute('data-masa-injected', 'css');
                style.innerHTML = appearance.customCss;
                document.head.appendChild(style);
            }

            // --- 3. GOOGLE SEARCH CONSOLE ---
            if (scripts.googleSearchConsole) {
                let meta = document.querySelector('meta[name="google-site-verification"]');
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', 'google-site-verification');
                    document.head.appendChild(meta);
                }
                meta.setAttribute('content', scripts.googleSearchConsole);
                meta.setAttribute('data-masa-injected', 'gsc');
            }

            // --- 4. GOOGLE ANALYTICS (GA4) ---
            if (scripts.enableAnalytics && scripts.googleAnalyticsId) {
                const gaScript = document.createElement('script');
                gaScript.setAttribute('data-masa-injected', 'ga');
                gaScript.async = true;
                gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${scripts.googleAnalyticsId}`;
                document.head.appendChild(gaScript);

                const gaConfig = document.createElement('script');
                gaConfig.setAttribute('data-masa-injected', 'ga-config');
                gaConfig.innerHTML = `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${scripts.googleAnalyticsId}');
                `;
                document.head.appendChild(gaConfig);
            }

            // --- 5. FACEBOOK PIXEL ---
            if (scripts.enablePixel && scripts.facebookPixelId) {
                const pixelScript = document.createElement('script');
                pixelScript.setAttribute('data-masa-injected', 'fb-pixel');
                pixelScript.innerHTML = `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${scripts.facebookPixelId}');
                    fbq('track', 'PageView');
                `;
                document.head.appendChild(pixelScript);
            }

            // --- 6. GOOGLE ADSENSE ---
            if (scripts.enableAdsense && scripts.googleAdsenseCode) {
                if (scripts.googleAdsenseCode.startsWith('ca-pub')) {
                    const adScript = document.createElement('script');
                    adScript.setAttribute('data-masa-injected', 'adsense');
                    adScript.async = true;
                    adScript.crossOrigin = "anonymous";
                    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${scripts.googleAdsenseCode}`;
                    document.head.appendChild(adScript);
                } else {
                    injectRawHtml(scripts.googleAdsenseCode, document.head, 'adsense-custom');
                }
            }

            // --- 7. CUSTOM HEAD SCRIPTS ---
            if (scripts.enableCustomHead && scripts.customHead) {
                injectRawHtml(scripts.customHead, document.head, 'custom-head');
            }

            // --- 8. CUSTOM BODY SCRIPTS (Start of Body) ---
            if (scripts.enableCustomBodyStart && scripts.customBodyStart) {
                injectRawHtml(scripts.customBodyStart, document.body, 'custom-body-start', false);
            }

            // --- 9. CUSTOM FOOTER SCRIPTS (End of Body) ---
            if (scripts.enableCustomBodyEnd && scripts.customBodyEnd) {
                injectRawHtml(scripts.customBodyEnd, document.body, 'custom-body-end', true);
            }
        };

        const injectRawHtml = (content: string, target: HTMLElement, id: string, appendToEnd: boolean = false) => {
            const container = document.createRange().createContextualFragment(content);
            container.childNodes.forEach((node, index) => {
                if (node instanceof Element) {
                    node.setAttribute('data-masa-injected', `${id}-${index}`);
                }
            });
            if (appendToEnd) {
                target.appendChild(container);
            } else {
                target.insertBefore(container, target.firstChild);
            }
        };

        applySettings();

        window.addEventListener('masa-settings-updated', applySettings);
        return () => window.removeEventListener('masa-settings-updated', applySettings);
    }, []);

    return null; 
};

export default GlobalScriptManager;
