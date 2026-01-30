
import { eventsData, postsData, coursesData, pledgeData } from './data';
import { Post, GlobalSettings, PageMetadata, Event, Course, Pledge, MenuItem, NavItem, SliderItem } from '../types';

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

const defaultSliderItems: SliderItem[] = [
    { id: 'slide1', headline: "Empowering Youth. Building Nations.", subtext: "We forge future leaders through sports, education, and culture.", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1800&q=80", ctas: [{ label: "Get Involved", page: "get-involved", primary: true }, { label: "Donate Now", page: "donate", primary: false }] },
    { id: 'slide2', headline: "Action Today. Impact for Generations.", subtext: "Our model builds character, fosters social unity, and nurtures responsible citizens.", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1800&q=80", ctas: [{ label: "Explore Programs", page: "programs-overview", primary: true }, { label: "Volunteer", page: "volunteer", primary: false }] },
];

// Default Settings
const defaultSettings: GlobalSettings = {
    general: { siteName: 'MASA World Foundation', contactEmail: 'masaworldfoundation@gmail.com', enableRegistrations: true, maintenanceMode: false },
    homepage: {
        slider: { slides: defaultSliderItems, autoplaySpeed: 7000 },
        sections: {
            impactSnapshot: { visible: true },
            featuredEvent: { visible: true },
            whyMasa: { visible: true, title: "Our Guiding Principles", subtitle: "Driven by a commitment to genuine social transformation." },
            programIcons: { visible: true },
            pledgeSnapshot: { visible: true },
            eventsHighlight: { visible: true, title: "Upcoming & Recent Events", subtitle: "Explore our national and international programs." },
            featuredCourses: { visible: true, title: "Featured Courses & Programs", subtitle: "Unlock your potential with our expert-led trainings." },
            latestBlogs: { visible: true },
            pillars: { visible: true },
            keyInitiatives: { visible: true },
            founderMessage: { visible: true },
            credibilityStrip: { visible: true },
            getInvolved: { visible: true },
            accountability: { visible: true },
            testimonials: { visible: true },
            finalCta: { visible: true },
        },
    },
    navigation: {
        headerMenu: defaultHeaderMenu,
        footerAboutLinks: defaultFooterLinks.about,
        footerInvolvedLinks: defaultFooterLinks.involved,
        footerResourceLinks: defaultFooterLinks.resources,
        footerPolicyLinks: defaultFooterLinks.policies,
    },
    social: [{ id: 'fb', platform: 'facebook', url: 'https://facebook.com', enabled: true }, { id: 'ig', platform: 'instagram', url: 'https://instagram.com', enabled: true }, { id: 'tw', platform: 'twitter', url: 'https://twitter.com', enabled: true }],
    scripts: { googleAnalyticsId: '', enableAnalytics: false, facebookPixelId: '', enablePixel: false, googleAdsenseCode: '', enableAdsense: false, googleSearchConsole: '', customHead: '', enableCustomHead: false, customBodyStart: '', enableCustomBodyStart: false, customBodyEnd: '', enableCustomBodyEnd: false },
    appearance: { customCss: '', enableCustomCss: false },
    payments: { currency: 'INR', razorpayEnabled: true, razorpayKey: '', stripeEnabled: false, stripeKey: '', paypalEnabled: false, paypalClientId: '', manualPaymentEnabled: true, manualPaymentInstructions: 'Contact for details.', donationSuccessMessage: 'Thank you!', donationFailureMessage: 'Payment failed.' },
    features: { blogEnabled: true, eventsEnabled: true, coursesEnabled: true, ngoHelpDeskEnabled: true, pledgePlatformEnabled: true, whatsAppIntegrationEnabled: false, whatsAppNumber: '', aiFeaturesEnabled: true },
    certificates: { generationEnabled: true, logoUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png', signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg' },
};

const defaultPages: PageMetadata[] = [
    { id: 'home', title: 'Home - MASA World', description: 'Empowering Youth Through Sports, Education & Culture.', lastModified: new Date().toISOString() },
];

// Helper to initialize data if empty
const initializeData = () => {
    if (typeof window === 'undefined') return;

    const initKey = (key: string, data: any) => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(data));
    };

    initKey(KEYS.EVENTS, eventsData);
    initKey(KEYS.BLOGS, postsData);
    initKey(KEYS.COURSES, coursesData);
    initKey(KEYS.PLEDGES, pledgeData);
    initKey(KEYS.PAGES, defaultPages);
    
    // Smartly merge settings to add new fields without overwriting user changes
    const existingSettings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const mergedSettings = {
        ...defaultSettings,
        ...existingSettings,
        general: { ...defaultSettings.general, ...existingSettings.general },
        homepage: {
            ...defaultSettings.homepage,
            ...(existingSettings.homepage || {}),
            slider: { ...defaultSettings.homepage.slider, ...(existingSettings.homepage?.slider || {}) },
            sections: { ...defaultSettings.homepage.sections, ...(existingSettings.homepage?.sections || {}) },
        },
        navigation: { ...defaultSettings.navigation, ...existingSettings.navigation },
        scripts: { ...defaultSettings.scripts, ...existingSettings.scripts },
        features: { ...defaultSettings.features, ...existingSettings.features },
        certificates: { ...defaultSettings.certificates, ...existingSettings.certificates },
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(mergedSettings));
};

if (typeof window !== 'undefined') {
    initializeData();
}

export const ContentManager = {
    // --- SETTINGS ---
    getSettings: (): GlobalSettings => {
        if (typeof window === 'undefined') return defaultSettings;
        const data = localStorage.getItem(KEYS.SETTINGS);
        return data ? JSON.parse(data) : defaultSettings;
    },
    saveSettings: (settings: GlobalSettings) => {
        if (typeof window === 'undefined') return;
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
