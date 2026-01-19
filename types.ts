
export type Page = 'home' | 'about' | 'initiatives' | 'gallery' | 'blog' | 'get-involved' | 'volunteer' | 'contact' | 'donate' | 'events' | 'trainings' | 'awards' | 'records' | 'conferences' | 'founder-message' | 'media-reports' | 'membership' | 'sports' | 'education' | 'culture' | 'courses' | 'thank-you-volunteer' | 'thank-you-donate' | 'thank-you-membership' | 'thank-you-career' | 'thank-you-contact' | 'admin-dashboard' | 'admin-login' | 'careers' | 'mission-vision' | 'core-values' | 'governance' | 'global-impact' | 'pledge-platform' | 'dashboard' | 'login' | 'disclaimer' | 'terms-and-conditions' | 'privacy-policy' | 'copyright-policy' | 'editorial-policy' | 'fact-check-policy' | 'comment-policy' | 'ethical-use-policy' | 'certificate-downloader' | 'ngo-help-desk';

export interface NavigationProps {
  navigateTo: (page: Page, anchor?: string) => void;
}

export interface Post {
    id: number;
    title: string;
    date: string;
    category: string;
    summary: string;
    content: string;
    url: string;
    image?: string;
    author?: string;
    tags?: string[];
}

export type MembershipType = 'Community' | 'Supporting' | 'Life' | 'International' | 'Student / Youth';
export type PartnershipType = 'Institutional' | 'Corporate';
