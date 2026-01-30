
import { eventsData, postsData, coursesData, pledgeData } from './data';
import { Post, GlobalSettings, PageMetadata, Event, Course, Pledge, MenuItem, NavItem } from '../types';

// Keys for LocalStorage
const KEYS = {
    EVENTS: 'masa_content_events',
    BLOGS: 'masa_content_blogs',
    COURSES: 'masa_content_courses',
    PLEDGES: 'masa_content_pledges',
    SETTINGS: 'masa_global_settings',
    PAGES: 'masa_content_pages'
};

// Default Navigation Menus
const defaultHeaderMenu: MenuItem[] = [
    { id: 'nav-home', label: 'Home', page: 'home' },
    { 
        id: 'nav-about', label: 'About Us', page: 'about',
        subItems: [
            { id: 'nav-about-sub', label: 'Our Story', page: 'about' },
            { id: 'nav-mission', label: 'Mission & Vision', page: 'mission-vision' },
            { id: 'nav-values', label: 'Core Values', page: 'core-values' },
            { id: 'nav-founder', label: 'Founder\'s Message', page: 'founder-message' },
            { id: 'nav-governance', label: 'Governance', page: 'governance' },
        ]
    },
    { 
        id: 'nav-programs', label: 'Our Work', page: 'programs-overview',
        subItems: [
            { id: 'nav-prog-overview', label: 'Programs Overview', page: 'programs-overview' },
            { id: 'nav-sports', label: 'Sports', page: 'sports' },
            { id: 'nav-education', label: 'Education', page: 'education' },
            { id: 'nav-culture', label: 'Culture', page: 'culture' },
            { id: 'nav-initiatives', label: 'Social Initiatives', page: 'initiatives' },
            { id: 'nav-impact-stories', label: 'Impact Stories', page: 'impact-stories' },
        ]
    },
    { 
        id: 'nav-media', label: 'Media & Resources', page: 'media-reports',
        subItems: [
            { id: 'nav-media-highlights', label: 'Media Highlights', page: 'media-highlights' },
            { id: 'nav-gallery', label: 'Gallery', page: 'gallery' },
            { id: 'nav-reports', label: 'Annual Reports', page: 'media-reports' },
            { id: 'nav-courses', label: 'Courses & Trainings', page: 'courses' },
            { id: 'nav-events', label: 'Events', page: 'events' },
        ]
    },
    { 
        id: 'nav-get-involved', label: 'Get Involved', page: 'get-involved',
        subItems: [
            { id: 'nav-donate', label: 'Donate Now', page: 'donate' },
            { id: 'nav-volunteer', label: 'Volunteer', page: 'volunteer' },
            { id: 'nav-membership', label: 'Become a Member', page: 'membership' },
            { id: 'nav-careers', label: 'Careers & Internships', page: 'careers' },
            { id: 'nav-pledge', label: 'Take a Pledge', page: 'pledge' },
        ]
    },
    { id: 'nav-blog', label: 'Blog', page: 'blog' },
    { id: 'nav-contact', label: 'Contact', page: 'contact' },
];

const defaultFooterLinks: { about: NavItem[], involved: NavItem[], resources: NavItem[], policies: NavItem[] } = {
    about: [
        { id: 'footer-about', label: 'About MASA', page: 'about' },
        { id: 'footer-mission', label: 'Mission & Vision', page: 'mission-vision' },
        { id: 'footer-founder', label: 'Founder\'s Message', page: 'founder-message' },
        { id: 'footer-careers', label: 'Careers', page: 'careers' },
    ],
    involved: [
        { id: 'footer-volunteer', label: 'Volunteer', page: 'volunteer' },
        { id: 'footer-member', label: 'Membership', page: 'membership' },
        { id: 'footer-donate', label: 'Donate', page: 'donate' },
        { id: 'footer-pledge', label: 'Take a Pledge', page: 'pledge' },
        { id: 'footer-contact', label: 'Contact Us', page: 'contact' },
    ],
    resources: [
        { id: 'footer-blog', label: 'Blog', page: 'blog' },
        { id: 'footer-events', label: 'Events', page: 'events' },
        { id: 'footer-reports', label: 'Reports', page: 'media-reports' },
        { id: 'footer-gallery', label: 'Gallery', page: 'gallery' },
    ],
    policies: [
        { id: 'footer-privacy', label: 'Privacy Policy', page: 'privacy-policy' },
        { id: 'footer-terms', label: 'Terms & Conditions', page: 'terms-and-conditions' },
        { id: 'footer-disclaimer', label: 'Disclaimer', page: 'disclaimer' },
    ]
};


// Default Settings
const defaultSettings: GlobalSettings = {
    general: {
        siteName: 'MASA World Foundation',
        contactEmail: 'masaworldfoundation@gmail.com',
        enableRegistrations: true,
        maintenanceMode: false,
    },
    navigation: {
        headerMenu: defaultHeaderMenu,
        footerAboutLinks: defaultFooterLinks.about,
        footerInvolvedLinks: defaultFooterLinks.involved,
        footerResourceLinks: defaultFooterLinks.resources,
        footerPolicyLinks: defaultFooterLinks.policies,
    },
    social: [
        { id: 'fb', platform: 'facebook', url: 'https://facebook.com/masaworldfoundation', enabled: true },
        { id: 'ig', platform: 'instagram', url: 'https://instagram.com/masaworldfoundation', enabled: true },
        { id: 'tw', platform: 'twitter', url: 'https://twitter.com/masaworldfoundation', enabled: true },
        { id: 'li', platform: 'linkedin', url: 'https://www.linkedin.com/company/masaworld-foundation/', enabled: true },
        { id: 'yt', platform: 'youtube', url: 'https://youtube.com/MASAWORLDFoundation', enabled: true },
        { id: 'wa', platform: 'whatsapp', url: 'https://wa.me/919876543210', enabled: false },
    ],
    scripts: {
        googleAnalyticsId: '',
        enableAnalytics: false,
        facebookPixelId: '',
        enablePixel: false,
        googleAdsenseCode: '',
        enableAdsense: false,
        googleSearchConsole: '',
        customHead: '',
        enableCustomHead: false,
        customBodyStart: '',
        enableCustomBodyStart: false,
        customBodyEnd: '',
        enableCustomBodyEnd: false,
    },
    appearance: {
        customCss: '',
        enableCustomCss: false,
    },
    payments: {
        currency: 'INR',
        razorpayEnabled: true,
        razorpayKey: '',
        stripeEnabled: false,
        stripeKey: '',
        paypalEnabled: false,
        paypalClientId: '',
        manualPaymentEnabled: true,
        manualPaymentInstructions: 'Please contact us for bank transfer details.',
        donationSuccessMessage: 'Thank you for your generous donation! A receipt has been sent to your email.',
        donationFailureMessage: 'Your donation could not be processed. Please try again or contact support.',
    },
    features: {
        blogEnabled: true,
        eventsEnabled: true,
        coursesEnabled: true,
        ngoHelpDeskEnabled: true,
        pledgePlatformEnabled: true,
        whatsAppIntegrationEnabled: false,
        whatsAppNumber: '',
    }
};

const defaultPages: PageMetadata[] = [
    { id: 'home', title: 'Home - MASA World', description: 'Empowering Youth Through Sports, Education & Culture.', lastModified: new Date().toISOString() },
    { id: 'about', title: 'About Us - MASA World', description: 'Learn about our history, mission, and vision.', lastModified: new Date().toISOString() },
    { id: 'initiatives', title: 'Our Initiatives', description: 'Explore our key programs and social impact projects.', lastModified: new Date().toISOString() },
    { id: 'contact', title: 'Contact Us', description: 'Get in touch with the MASA World Foundation team.', lastModified: new Date().toISOString() },
    { id: 'donate', title: 'Donate', description: 'Support our cause and make a difference.', lastModified: new Date().toISOString() },
];

// Helper to initialize data if empty
const initializeData = () => {
    if (!localStorage.getItem(KEYS.EVENTS)) {
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(eventsData));
    }
    if (!localStorage.getItem(KEYS.BLOGS)) {
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(postsData));
    }
    if (!localStorage.getItem(KEYS.COURSES)) {
        localStorage.setItem(KEYS.COURSES, JSON.stringify(coursesData));
    }
    if (!localStorage.getItem(KEYS.PLEDGES)) {
        localStorage.setItem(KEYS.PLEDGES, JSON.stringify(pledgeData));
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
    } else {
        const current = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
        if (!current.features?.pledgePlatformEnabled) { 
            const merged = { 
                ...defaultSettings, 
                ...current,
                general: { ...defaultSettings.general, ...current.general },
                navigation: { ...defaultSettings.navigation, ...current.navigation },
                social: current.social || defaultSettings.social,
                scripts: { ...defaultSettings.scripts, ...current.scripts },
                appearance: { ...defaultSettings.appearance, ...current.appearance },
                payments: { ...defaultSettings.payments, ...current.payments },
                features: { ...defaultSettings.features, ...current.features },
            };
            localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
        }
    }
    if (!localStorage.getItem(KEYS.PAGES)) {
        localStorage.setItem(KEYS.PAGES, JSON.stringify(defaultPages));
    }
};

if (typeof window !== 'undefined') {
    initializeData();
}

export const ContentManager = {
    // --- SETTINGS ---
    getSettings: (): GlobalSettings => {
        const data = localStorage.getItem(KEYS.SETTINGS);
        return data ? JSON.parse(data) : defaultSettings;
    },
    saveSettings: (settings: GlobalSettings) => {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },

    // --- PAGES ---
    getPages: (): PageMetadata[] => {
        const data = localStorage.getItem(KEYS.PAGES);
        return data ? JSON.parse(data) : defaultPages;
    },
    savePage: (page: PageMetadata) => {
        const pages = ContentManager.getPages();
        const index = pages.findIndex(p => p.id === page.id);
        page.lastModified = new Date().toISOString();
        if (index >= 0) pages[index] = page;
        else pages.push(page);
        localStorage.setItem(KEYS.PAGES, JSON.stringify(pages));
    },

    // --- EVENTS ---
    getEvents: (): Event[] => {
        const data = localStorage.getItem(KEYS.EVENTS);
        return data ? JSON.parse(data) : [];
    },
    saveEvent: (event: Event) => {
        const events = ContentManager.getEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) events[index] = event;
        else events.unshift(event);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    },
    deleteEvent: (id: string) => {
        const events = ContentManager.getEvents().filter(e => e.id !== id);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    },

    // --- BLOGS ---
    getPosts: (): Post[] => {
        const data = localStorage.getItem(KEYS.BLOGS);
        return data ? JSON.parse(data) : [];
    },
    savePost: (post: Post) => {
        const posts = ContentManager.getPosts();
        const index = posts.findIndex(p => p.id === post.id);
        if (index >= 0) posts[index] = post;
        else posts.unshift(post);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
    },
    deletePost: (id: number) => {
        const posts = ContentManager.getPosts().filter(p => p.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
    },

    // --- COURSES ---
    getCourses: (): Course[] => {
        const data = localStorage.getItem(KEYS.COURSES);
        return data ? JSON.parse(data) : [];
    },
    saveCourse: (course: Course) => {
        const courses = ContentManager.getCourses();
        const index = courses.findIndex(c => c.id === course.id);
        if (index >= 0) courses[index] = course;
        else courses.unshift(course);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
    },
    deleteCourse: (id: number) => {
        const courses = ContentManager.getCourses().filter(c => c.id !== id);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
    },

    // --- PLEDGES ---
    getPledges: (): Pledge[] => {
        const data = localStorage.getItem(KEYS.PLEDGES);
        return data ? JSON.parse(data) : [];
    },
    savePledge: (pledge: Pledge) => {
        const pledges = ContentManager.getPledges();
        const index = pledges.findIndex(p => p.id === pledge.id);
        if (index >= 0) pledges[index] = pledge;
        else pledges.unshift(pledge);
        localStorage.setItem(KEYS.PLEDGES, JSON.stringify(pledges));
    },
    deletePledge: (id: string) => {
        const pledges = ContentManager.getPledges().filter(p => p.id !== id);
        localStorage.setItem(KEYS.PLEDGES, JSON.stringify(pledges));
    }
};
