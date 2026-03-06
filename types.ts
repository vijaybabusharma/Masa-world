
export type Page = 'home' | 'about' | 'initiatives' | 'gallery' | 'blog' | 'get-involved' | 'volunteer' | 'contact' | 'donate' | 'events' | 'awards' | 'records' | 'conferences' | 'founder-message' | 'media-reports' | 'membership' | 'sports' | 'education' | 'culture' | 'thank-you-volunteer' | 'thank-you-donate' | 'thank-you-membership' | 'thank-you-career' | 'thank-you-contact' | 'thank-you-event' | 'admin-dashboard' | 'admin-login' | 'careers' | 'mission-vision' | 'core-values' | 'governance' | 'global-impact' | 'dashboard' | 'login' | 'disclaimer' | 'terms-and-conditions' | 'privacy-policy' | 'copyright-policy' | 'editorial-policy' | 'fact-check-policy' | 'comment-policy' | 'ethical-use-policy' | 'impact-stories' | 'media-highlights' | 'programs-overview' | 'community-voices' | 'ngo-help-desk' | string;

export interface NavigationProps {
  navigateTo: (page: Page, anchor?: string) => void;
}

export interface GalleryItem {
    id: number | string;
    category: string;
    title: string;
    location: string;
    date: string;
    imageUrl: string;
    videoUrl?: string;
    description: string;
    tags: string[];
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
    approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
    approvalNotes?: string;
    slug?: string;
    seoTitle?: string;
    metaDescription?: string;
    allowComments?: boolean;
    views?: number;
    featured?: boolean;
    publishDate?: string; // ISO string for scheduling
    revisionHistory?: Revision[];
}

export interface Revision {
    id: string;
    contentId: string | number;
    contentType: 'post' | 'page';
    data: any;
    timestamp: string;
    author: string;
}

export interface Comment {
    id: string;
    postId: number;
    authorName: string;
    authorEmail: string;
    content: string;
    timestamp: string;
    status: 'Pending' | 'Approved' | 'Spam' | 'Trash';
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

export interface MasaEvent {
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
    id: string;
    quote: string;
    author: string;
    role: string;
    image: string;
}

export type MembershipType = 'Community' | 'Supporting' | 'Life' | 'International' | 'Student / Youth';
export type PartnershipType = 'Institutional' | 'Corporate';

// --- Admin & Auth Types ---
export type UserRole = 'Super Admin' | 'Admin / Manager' | 'Editor' | 'Content Creator' | 'Volunteer Coordinator' | 'Accountant / Finance';

export interface ActivityLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    target: string;
    timestamp: string;
    details?: string;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    status: 'Active' | 'Disabled';
    lastLogin?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: AdminUser | null;
}

// --- CMS Content Types ---
export interface PageSection {
    id: string;
    type: 'Hero' | 'Text' | 'Image' | 'Features' | 'Timeline' | 'Contact' | 'Custom' | 'FounderMessage' | 'MissionVision' | 'CoreValues';
    visible: boolean;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    items?: any[]; // For lists like values, timeline events
    style?: any;
}

export interface PageContent {
    id: string; // Changed from Page to string to allow new pages
    slug: string;
    title: string;
    seoTitle?: string;
    metaDescription: string;
    sections: PageSection[];
    lastModified: string;
    status: 'Draft' | 'Published' | 'Scheduled';
    parentId?: string;
    visibility: 'Public' | 'Private' | 'Password';
    password?: string;
    publishDate?: string;
    order: number;
    isHomepage?: boolean;
    featuredImage?: string;
    headerImage?: string;
    seoKeywords?: string;
    revisionHistory?: Revision[];
}

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
    description?: string;
    image: string;
    mobileImage?: string;
    cta: { label: string; page: Page; url?: string };
    enabled: boolean;
}

export interface SectionCustomization {
    visible: boolean;
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
    buttonEnabled?: boolean;
    imageReplace?: string;
    textAlign?: 'left' | 'center' | 'right';
}

export type HomepageSection = SectionCustomization;

export interface FounderMessageContent {
    image: string;
    name: string;
    title: string;
    quote: string;
    text: string;
}

export interface ImpactStatsOverride {
    enabled: boolean;
    youth: number;
    programs: number;
    globalReach: number;
    years: number;
}

export interface DeliveryAreaItem {
    id: string;
    type: 'Events' | 'Trainings' | 'Awards' | 'Records' | 'Conferences';
    title: string;
    description: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface HomepageSettings {
    slider: {
        slides: SliderItem[];
        autoplaySpeed: number;
    };
    pillars: PillarItem[];
    testimonials: Testimonial[];
    deliveryItems: DeliveryAreaItem[];
    processSteps: ProcessStep[];
    founderMessageContent: FounderMessageContent;
    impactStats: ImpactStatsOverride;
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

export interface PaymentLink {
    id: string;
    name: string;
    url: string;
    provider: 'Razorpay' | 'Stripe' | 'PayPal' | 'Other';
    active: boolean;
}

export interface SmartButton {
    id: string;
    label: string;
    actionType: 'link' | 'payment' | 'scroll';
    target: string; // URL or PaymentLink ID or Element ID
    visible: boolean;
    newTab?: boolean;
    style?: 'primary' | 'secondary' | 'outline';
}

export interface ButtonSettings {
    paymentLinks: PaymentLink[];
    zones: Record<string, SmartButton>;
    floatingButton: SmartButton & { position: 'bottom-right' | 'bottom-left' };
}

// --- Global Settings & Modules ---
export interface GlobalSettings {
    general: {
        siteName: string;
        siteLogo?: string;
        siteFavicon?: string;
        contactEmail: string;
        contactPhone?: string;
        address?: string;
        footerText?: string;
        copyrightText?: string;
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
    seo: {
        ogImage?: string;
        ogTitle?: string;
        ogDescription?: string;
        twitterCard?: 'summary' | 'summary_large_image';
        twitterSite?: string;
        twitterCreator?: string;
        robotsTxt?: string;
        sitemapEnabled: boolean;
        schemaMarkup?: string;
        canonicalUrl?: string;
    };
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
        typography: {
            headingDesktop: string;
            headingMobile: string;
            paragraph: string;
            button: string;
        };
        buttons: {
            padding: string;
            borderRadius: string;
            alignment: 'left' | 'center' | 'right';
        };
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
    buttons: ButtonSettings;
}

export interface Redirect {
    id: string;
    oldUrl: string;
    newUrl: string;
    type: 301 | 302;
    active: boolean;
}

export interface TrashItem {
    id: string;
    originalId: string | number;
    type: 'post' | 'page' | 'media' | 'event';
    data: any;
    deletedAt: string;
    deletedBy: string;
}

export interface Menu {
    id: 'header' | 'footer';
    items: MenuItem[];
}
