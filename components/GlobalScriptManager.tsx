
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
            if (appearance.customCss) {
                const style = document.createElement('style');
                style.setAttribute('data-masa-injected', 'css');
                style.innerHTML = appearance.customCss;
                document.head.appendChild(style);
            }

            // --- 3. GOOGLE SEARCH CONSOLE ---
            if (scripts.googleSearchConsole) {
                // Check if existing meta tag exists to update, else create
                let meta = document.querySelector('meta[name="google-site-verification"]');
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', 'google-site-verification');
                    document.head.appendChild(meta);
                }
                meta.setAttribute('content', scripts.googleSearchConsole);
            }

            // --- 4. GOOGLE ANALYTICS (GA4) ---
            if (scripts.enableAnalytics && scripts.googleAnalyticsId) {
                // GA script loader
                const gaScript = document.createElement('script');
                gaScript.setAttribute('data-masa-injected', 'ga');
                gaScript.async = true;
                gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${scripts.googleAnalyticsId}`;
                document.head.appendChild(gaScript);

                // GA Config
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
                // If it's just the CA-PUB ID
                if (scripts.googleAdsenseCode.startsWith('ca-pub')) {
                    const adScript = document.createElement('script');
                    adScript.setAttribute('data-masa-injected', 'adsense');
                    adScript.async = true;
                    adScript.crossOrigin = "anonymous";
                    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${scripts.googleAdsenseCode}`;
                    document.head.appendChild(adScript);
                } else {
                    // Assume it's a full script tag string, inject safely (User beware)
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = scripts.googleAdsenseCode;
                    const script = tempDiv.querySelector('script');
                    if (script) {
                        const adScript = document.createElement('script');
                        adScript.setAttribute('data-masa-injected', 'adsense-custom');
                        // Copy attributes
                        Array.from(script.attributes).forEach(attr => adScript.setAttribute(attr.name, attr.value));
                        adScript.innerHTML = script.innerHTML;
                        document.head.appendChild(adScript);
                    }
                }
            }

            // --- 7. CUSTOM HEAD SCRIPTS ---
            if (scripts.enableCustomHead && scripts.customHead) {
                injectRawScript(scripts.customHead, document.head, 'custom-head');
            }

            // --- 8. CUSTOM BODY SCRIPTS (Start of Body) ---
            if (scripts.enableCustomBody && scripts.customBody) {
                injectRawScript(scripts.customBody, document.body, 'custom-body');
            }

            // --- 9. CUSTOM FOOTER SCRIPTS (End of Body) ---
            if (scripts.enableCustomFooter && scripts.customFooter) {
                injectRawScript(scripts.customFooter, document.body, 'custom-footer', true);
            }
        };

        // Helper to inject raw script content
        const injectRawScript = (content: string, target: HTMLElement, id: string, appendToEnd: boolean = false) => {
            try {
                // Create a temporary container to parse HTML
                const div = document.createElement('div');
                div.innerHTML = content;
                
                const nodes = Array.from(div.childNodes);
                
                nodes.forEach((node, index) => {
                    if (node.nodeName === 'SCRIPT') {
                        const script = document.createElement('script');
                        script.setAttribute('data-masa-injected', `${id}-${index}`);
                        // Copy attributes
                        Array.from((node as Element).attributes).forEach(attr => script.setAttribute(attr.name, attr.value));
                        script.innerHTML = (node as Element).innerHTML;
                        if (appendToEnd) target.appendChild(script);
                        else target.insertBefore(script, target.firstChild);
                    } else {
                        // For non-script tags (like noscript, style, or tracking pixels in img)
                        const clonedNode = node.cloneNode(true);
                        // Add identifier if it's an element
                        if (clonedNode instanceof Element) {
                            clonedNode.setAttribute('data-masa-injected', `${id}-${index}`);
                        }
                        if (appendToEnd) target.appendChild(clonedNode);
                        else target.insertBefore(clonedNode, target.firstChild);
                    }
                });
            } catch (e) {
                console.error(`Error injecting ${id}:`, e);
            }
        };

        // Apply immediately on mount
        applySettings();

        // Listen for updates from Admin Dashboard
        window.addEventListener('masa-settings-updated', applySettings);
        return () => window.removeEventListener('masa-settings-updated', applySettings);
    }, []);

    return null; 
};

export default GlobalScriptManager;
