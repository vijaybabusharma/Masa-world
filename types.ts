
export type Page = 'home' | 'about' | 'initiatives' | 'gallery' | 'blog' | 'get-involved' | 'volunteer' | 'contact' | 'donate' | 'events' | 'trainings' | 'awards' | 'records' | 'conferences' | 'founder-message' | 'media-reports' | 'membership' | 'sports' | 'education' | 'culture' | 'courses' | 'thank-you-volunteer' | 'thank-you-donate' | 'thank-you-membership' | 'thank-you-career' | 'thank-you-contact' | 'thank-you-event' | 'admin-dashboard' | 'admin-login' | 'careers' | 'mission-vision' | 'core-values' | 'governance' | 'global-impact' | 'dashboard' | 'login' | 'disclaimer' | 'terms-and-conditions' | 'privacy-policy' | 'copyright-policy' | 'editorial-policy' | 'fact-check-policy' | 'comment-policy' | 'ethical-use-policy' | 'ngo-help-desk' | 'impact-stories' | 'media-highlights' | 'programs-overview' | 'community-voices';

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
    status?: 'Draft' | 'Published' | 'Scheduled';
    // Advanced Blog Features
    slug?: string;
    seoTitle?: string;
    metaDescription?: string;
    allowComments?: boolean;
    views?: number;
    featured?: boolean;
    publishDate?: string; // ISO string for scheduling
}

export type MembershipType = 'Community' | 'Supporting' | 'Life' | 'International' | 'Student / Youth';
export type PartnershipType = 'Institutional' | 'Corporate';

// --- Admin & Auth Types ---
export type UserRole = 'Super Admin' | 'Editor' | 'Event Manager' | 'Course Manager';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: AdminUser | null;
}

// --- CMS Content Types ---
export interface PageMetadata {
    id: Page;
    title: string;
    description: string;
    lastModified: string;
}

export interface Submission {
    id: number;
    type: 'contact' | 'volunteer' | 'donation' | 'membership' | 'partnership' | 'career';
    timestamp: string;
    data: any;
    status: 'New' | 'Read' | 'Replied';
}

export interface SocialLink {
    id: string;
    platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'whatsapp';
    url: string;
    enabled: boolean;
}

// --- Global Settings & Modules ---
export interface GlobalSettings {
    general: {
        siteName: string;
        contactEmail: string;
        enableRegistrations: boolean;
        maintenanceMode: boolean;
    };
    social: SocialLink[];
    scripts: {
        // Analytics & Tracking
        googleAnalyticsId: string;
        enableAnalytics: boolean;
        
        facebookPixelId: string;
        enablePixel: boolean;

        // Monetization & Ads
        googleAdsenseCode: string; // Full script or Client ID
        enableAdsense: boolean;

        // Verification
        googleSearchConsole: string; // Meta tag content
        
        // Custom Code Injection
        customHead: string;
        enableCustomHead: boolean;
        
        customBody: string;
        enableCustomBody: boolean;
        
        customFooter: string;
        enableCustomFooter: boolean;
    };
    appearance: {
        customCss: string;
        customJs: string;
    };
    payments: {
        currency: 'INR' | 'USD';
        razorpayEnabled: boolean;
        razorpayKey: string;
        stripeEnabled: boolean;
        paypalEnabled: boolean;
        manualPaymentEnabled: boolean;
        donationReceiptEmail: boolean;
    };
    features: {
        blogEnabled: boolean;
        eventsEnabled: boolean;
        coursesEnabled: boolean;
        ngoHelpDeskEnabled: boolean;
    };
}
