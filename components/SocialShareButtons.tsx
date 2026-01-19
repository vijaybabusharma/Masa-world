
import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './icons/SocialIcons';
import { Post } from '../types';

interface SocialShareButtonsProps {
  post: Pick<Post, 'title' | 'summary' | 'url'>;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ post }) => {
    // Get base URL dynamically for robust sharing links that work on any domain.
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${post.url}` : post.url;

    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const encodedSummary = encodeURIComponent(post.summary);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
    };

    const commonButtonStyles = "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-masa-orange";

    return (
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm mt-8">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-masa-charcoal">Share this story</h4>
                    <p className="text-gray-500 text-sm mt-1">Spread the word and inspire others.</p>
                 </div>
                 
                 <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
                     <a 
                        href={shareLinks.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        className={`${commonButtonStyles} bg-[#1877F2] hover:bg-[#166fe5] shadow-md`}
                    >
                        <FacebookIcon className="w-5 h-5" />
                        <span>Facebook</span>
                     </a>
                     <a 
                        href={shareLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                        className={`${commonButtonStyles} bg-[#1DA1F2] hover:bg-[#1a91da] shadow-md`}
                    >
                         <TwitterIcon className="w-5 h-5" />
                         <span>Twitter</span>
                     </a>
                     <a 
                        href={shareLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        className={`${commonButtonStyles} bg-[#0A66C2] hover:bg-[#095ab0] shadow-md`}
                    >
                         <LinkedInIcon className="w-5 h-5" />
                         <span>LinkedIn</span>
                     </a>
                 </div>
             </div>
        </div>
    );
};

export default SocialShareButtons;
