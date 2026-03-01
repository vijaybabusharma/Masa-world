
import React, { useState } from 'react';
import { FacebookIcon, TwitterIcon, LinkedInIcon, WhatsAppIcon } from './icons/SocialIcons';
import { Post } from '../types';
import { SparklesIcon } from './icons/FeatureIcons';

interface SocialShareButtonsProps {
  post: Pick<Post, 'title' | 'summary' | 'url'>;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ post }) => {
    const [copied, setCopied] = useState(false);
    // Get base URL dynamically
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${post.url}` : `https://masaworld.org${post.url}`;

    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const encodedSummary = encodeURIComponent(post.summary);
    const shareText = encodeURIComponent(`${post.title} - MASA World Foundation`);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
        whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const commonButtonStyles = "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-masa-orange active:scale-95";

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl mt-8 relative overflow-hidden group">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-masa-orange/10 to-transparent rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700 pointer-events-none"></div>
             
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                 <div className="text-center md:text-left max-w-md">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <SparklesIcon className="h-5 w-5 text-masa-orange" />
                        <h4 className="text-2xl font-bold text-masa-charcoal">Share this story</h4>
                    </div>
                    <p className="text-gray-600 font-medium">Spread the word and inspire others to create change.</p>
                 </div>
                 
                 <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
                     <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
                        className={`${commonButtonStyles} bg-[#1877F2] hover:bg-[#166fe5] shadow-md hover:shadow-blue-500/30`}>
                        <FacebookIcon className="w-5 h-5" />
                        <span>Facebook</span>
                     </a>
                     <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"
                        className={`${commonButtonStyles} bg-black hover:bg-gray-800 shadow-md hover:shadow-gray-500/30`}>
                         <TwitterIcon className="w-5 h-5" />
                         <span>X</span>
                     </a>
                     <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"
                        className={`${commonButtonStyles} bg-[#25D366] hover:bg-[#1ebe57] shadow-md hover:shadow-green-500/30`}>
                         <WhatsAppIcon className="w-5 h-5" />
                         <span>WhatsApp</span>
                     </a>
                     <button onClick={handleCopy} aria-label="Copy Link"
                        className={`${commonButtonStyles} bg-gray-600 hover:bg-gray-700 shadow-md hover:shadow-gray-500/30`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                         </svg>
                         <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                     </button>
                 </div>
             </div>
        </div>
    );
};

export default SocialShareButtons;
