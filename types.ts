
export type Page = 'home' | 'about' | 'initiatives' | 'gallery' | 'blog' | 'get-involved' | 'volunteer' | 'contact' | 'donate' | 'events' | 'trainings' | 'awards' | 'records' | 'conferences' | 'founder-message' | 'media-reports' | 'membership' | 'sports' | 'education' | 'culture' | 'courses' | 'thank-you-volunteer' | 'thank-you-donate' | 'thank-you-membership' | 'thank-you-career' | 'thank-you-contact' | 'thank-you-event' | 'admin-dashboard' | 'admin-login' | 'careers' | 'mission-vision' | 'core-values' | 'governance' | 'global-impact' | 'dashboard' | 'login' | 'disclaimer' | 'terms-and-conditions' | 'privacy-policy' | 'copyright-policy' | 'editorial-policy' | 'fact-check-policy' | 'comment-policy' | 'ethical-use-policy' | 'impact-stories' | 'media-highlights' | 'programs-overview' | 'community-voices' | 'ngo-help-desk' | 'pledge-platform' | 'take-pledge' | 'verify-certificate' | 'thank-you-pledge';

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
    slug?: string;
    seoTitle?: string;
    metaDescription?: string;
    allowComments?: boolean;
    views?: number;
    featured?: boolean;
    publishDate?: string; // ISO string for scheduling
}

export interface Course {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    category: 'Sports' | 'Education' | 'Culture';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    mode: 'Online' | 'Offline' | 'Hybrid';
    image: string;
    highlights: string[];
    price: string;
}

export interface Event {
    id: string;
    title: string;
    category: 'Conference' | 'Training' | 'Sports' | 'Community' | 'Award';
    date: string;
    displayDate: string;
    location: string;
    description: string;
    image: string;
    status: 'Upcoming' | 'Completed';
    price?: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image: string;
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

// --- Navigation Menu Types ---
export interface NavItem {
  id: string;
  label: string;
  page: Page;
  isExternal?: boolean;
  url?: string;
}

export interface DropdownNavItem extends NavItem {
    subItems: NavItem[];
}

export type MenuItem = NavItem | DropdownNavItem;

// --- Homepage Settings Types ---
export interface PillarItem {
    id: string;
    label: string;
    title: string;
    description: string;
    page: Page;
    icon: 'UsersIcon' | 'AcademicCapIcon' | 'TargetIcon';
    color: 'red' | 'blue' | 'green';
}

export interface SliderItem {
    id: string;
    headline: string;
    subtext: string;
    image: string;
    cta: { label: string; page: Page };
}

export interface HomepageSection {
    visible: boolean;
    title?: string;
    subtitle?: string;
    // other section-specific properties
}

export interface HomepageSettings {
    slider: {
        slides: SliderItem[];
        autoplaySpeed: number;
    };
    pillars: PillarItem[];
    testimonials: Testimonial[];
    sections: {
        impactSnapshot: HomepageSection;
        whatWeDo: HomepageSection & { title: string; subtitle: string; };
        incredibleSection: HomepageSection & { title: string; subtitle: string; };
        founderMessage: HomepageSection;
        communityVoices: HomepageSection & { title: string; subtitle: string; };
        trust: HomepageSection & { title: string; subtitle: string; };
        upcomingEvents: HomepageSection & { title: string; subtitle: string; };
        careers: HomepageSection & { title: string; subtitle: string; };
        getInvolved: HomepageSection & { title: string; subtitle: string; };
        finalCta: HomepageSection;
    };
}

// --- Global Settings & Modules ---
export interface GlobalSettings {
    general: {
        siteName: string;
        contactEmail: string;
        enableRegistrations: boolean;
        maintenanceMode: boolean;
    };
    homepage: HomepageSettings;
    navigation: {
        headerMenu: MenuItem[];
        footerAboutLinks: NavItem[];
        footerWorkLinks: NavItem[];
        footerInvolvedLinks: NavItem[];
        footerResourceLinks: NavItem[];
        footerPolicyLinks: NavItem[];
    };
    social: SocialLink[];
    scripts: {
        googleAnalyticsId: string;
        enableAnalytics: boolean;
        facebookPixelId: string;
        enablePixel: boolean;
        googleAdsenseCode: string;
        enableAdsense: boolean;
        googleSearchConsole: string;
        enableGoogleSearchConsole: boolean;
        customHead: string;
        enableCustomHead: boolean;
        customBodyStart: string;
        enableCustomBodyStart: boolean;
        customBodyEnd: string;
        enableCustomBodyEnd: boolean;
    };
    appearance: {
        customCss: string;
        enableCustomCss: boolean;
    };
    payments: {
        currency: 'INR' | 'USD';
        razorpayEnabled: boolean;
        razorpayKey: string;
        stripeEnabled: boolean;
        stripeKey: string;
        paypalEnabled: boolean;
        paypalClientId: string;
        manualPaymentEnabled: boolean;
        manualPaymentInstructions: string;
        donationSuccessMessage: string;
        donationFailureMessage: string;
    };
    features: {
        blogEnabled: boolean;
        eventsEnabled: boolean;
        coursesEnabled: boolean;
        whatsAppIntegrationEnabled: boolean;
        whatsAppNumber: string;
    };
}
