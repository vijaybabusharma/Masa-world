
export type Page = 'home' | 'about' | 'initiatives' | 'gallery' | 'blog' | 'get-involved' | 'volunteer' | 'contact' | 'donate' | 'events' | 'trainings' | 'awards' | 'records' | 'conferences' | 'founder-message' | 'media-reports' | 'membership' | 'sports' | 'education' | 'culture' | 'courses' | 'thank-you-volunteer' | 'thank-you-donate' | 'thank-you-membership' | 'thank-you-career' | 'thank-you-contact' | 'thank-you-event' | 'admin-dashboard' | 'admin-login' | 'careers' | 'mission-vision' | 'core-values' | 'governance' | 'global-impact' | 'dashboard' | 'login' | 'disclaimer' | 'terms-and-conditions' | 'privacy-policy' | 'copyright-policy' | 'editorial-policy' | 'fact-check-policy' | 'comment-policy' | 'ethical-use-policy' | 'pledge-platform' | 'certificate-downloader' | 'ngo-help-desk';

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

// --- Global Settings & Modules ---
export interface GlobalSettings {
    general: {
        siteName: string;
        contactEmail: string;
        enableRegistrations: boolean;
        maintenanceMode: boolean;
    };
    monetization: {
        googleAnalyticsId: string;
        googleAdsenseCode: string;
        facebookPixelId: string;
        metaVerification: string;
        customHeadScripts: string;
        customBodyScripts: string;
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
        pledgesEnabled: boolean;
        ngoHelpDeskEnabled: boolean;
    };
}
