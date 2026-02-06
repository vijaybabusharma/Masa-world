
import { eventsData, postsData, coursesData } from './data';
import { Post, GlobalSettings, PageMetadata, Event, Course, MenuItem, NavItem, SliderItem, PillarItem, Testimonial } from '../types';

// Keys for LocalStorage
const KEYS = {
    EVENTS: 'masa_content_events',
    BLOGS: 'masa_content_blogs',
    COURSES: 'masa_content_courses',
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
            { id: 'nav-impact-stories', label: 'Impact Stories', page: 'impact-stories' },
        ]
    },
    { id: 'nav-initiatives', label: 'Initiatives', page: 'initiatives' },
    { id: 'nav-gallery', label: 'Gallery', page: 'gallery' },
    { 
        id: 'nav-media', label: 'Media & Resources', page: 'media-reports',
        subItems: [
            { id: 'nav-media-highlights', label: 'Media Highlights', page: 'media-highlights' },
            { id: 'nav-reports', label: 'Annual Reports', page: 'media-reports' },
            { id: 'nav-courses', label: 'Courses & Trainings', page: 'courses' },
            { id: 'nav-events', label: 'Events', page: 'events' },
            { id: 'nav-awards', label: 'Awards', page: 'awards' },
            { id: 'nav-records', label: 'Records', page: 'records' },
        ]
    },
    { 
        id: 'nav-get-involved', label: 'Get Involved', page: 'get-involved',
        subItems: [
            { id: 'nav-donate', label: 'Donate Now', page: 'donate' },
            { id: 'nav-volunteer', label: 'Volunteer', page: 'volunteer' },
            { id: 'nav-membership', label: 'Become a Member', page: 'membership' },
            { id: 'nav-careers', label: 'Careers & Internships', page: 'careers' },
        ]
    },
    { id: 'nav-blog', label: 'Blog', page: 'blog' },
];

const defaultFooterLinks: { about: NavItem[], work: NavItem[], involved: NavItem[], resources: NavItem[], policies: NavItem[] } = {
    about: [
        { id: 'footer-about', label: 'About MASA', page: 'about' },
        { id: 'footer-mission', label: 'Mission & Vision', page: 'mission-vision' },
        { id: 'footer-values', label: 'Core Values', page: 'core-values' },
        { id: 'footer-founder', label: 'Founder\'s Message', page: 'founder-message' },
        { id: 'footer-governance', label: 'Governance', page: 'governance' },
        { id: 'footer-impact', label: 'Global Impact', page: 'global-impact' },
        { id: 'footer-contact', label: 'Contact Us', page: 'contact' },
    ],
    work: [
        { id: 'footer-prog-overview', label: 'Programs Overview', page: 'programs-overview' },
        { id: 'footer-sports', label: 'Sports', page: 'sports' },
        { id: 'footer-education', label: 'Education', page: 'education' },
        { id: 'footer-culture', label: 'Culture', page: 'culture' },
        { id: 'footer-initiatives', label: 'Social Initiatives', page: 'initiatives' },
        { id: 'footer-impact-stories', label: 'Impact Stories', page: 'impact-stories' },
        { id: 'footer-voices', label: 'Community Voices', page: 'community-voices' },
    ],
    involved: [
        { id: 'footer-volunteer', label: 'Volunteer', page: 'volunteer' },
        { id: 'footer-member', label: 'Membership', page: 'membership' },
        { id: 'footer-donate', label: 'Donate', page: 'donate' },
        { id: 'footer-careers', label: 'Careers', page: 'careers' },
    ],
    resources: [
        { id: 'footer-blog', label: 'Blog', page: 'blog' },
        { id: 'footer-events', label: 'Events', page: 'events' },
        { id: 'footer-courses', label: 'Courses & Trainings', page: 'courses' },
        { id: 'footer-gallery', label: 'Gallery', page: 'gallery' },
        { id: 'footer-media-highlights', label: 'Media Highlights', page: 'media-highlights' },
        { id: 'footer-reports', label: 'Annual Reports', page: 'media-reports' },
    ],
    policies: [
        { id: 'footer-privacy', label: 'Privacy Policy', page: 'privacy-policy' },
        { id: 'footer-terms', label: 'Terms & Conditions', page: 'terms-and-conditions' },
        { id: 'footer-disclaimer', label: 'Disclaimer', page: 'disclaimer' },
        { id: 'footer-copyright', label: 'Copyright', page: 'copyright-policy' },
        { id: 'footer-editorial', label: 'Editorial Policy', page: 'editorial-policy' },
        { id: 'footer-fact-check', label: 'Fact-Check', page: 'fact-check-policy' },
        { id: 'footer-comment', label: 'Comment Policy', page: 'comment-policy' },
        { id: 'footer-ethical', label: 'Ethical Use', page: 'ethical-use-policy' },
    ]
};

const defaultSliderItems: SliderItem[] = [
    { id: 'slide1', headline: "Empowering Youth. Building Nations.", subtext: "We forge future leaders through sports, education, and culture.", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1800&q=80", cta: { label: "Get Involved", page: "get-involved" } },
    { id: 'slide2', headline: "Action Today. Impact for Generations.", subtext: "Our model builds character, fosters social unity, and nurtures responsible citizens.", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1800&q=80", cta: { label: "Explore Programs", page: "programs-overview" } },
];

const defaultPillars: PillarItem[] = [
    {
        id: 'pillar-sports',
        label: "ACTION",
        title: "Sports",
        description: "Promoting physical fitness, discipline, and team spirit through structured sports programs and competitive tournaments.",
        page: "sports",
        icon: "UsersIcon",
        color: "red"
    },
    {
        id: 'pillar-education',
        label: "KNOWLEDGE",
        title: "Education",
        description: "Empowering minds through leadership workshops, skill development trainings, and value-based learning initiatives.",
        page: "education",
        icon: "AcademicCapIcon",
        color: "blue"
    },
    {
        id: 'pillar-heritage',
        label: "HERITAGE",
        title: "Culture",
        description: "Preserving heritage and fostering social harmony through vibrant cultural events, arts, and community celebrations.",
        page: "culture",
        icon: "TargetIcon",
        color: "green"
    }
];

const defaultTestimonials: Testimonial[] = [
    {
        quote: "I joined MASA as a student looking for a certificate. I stayed because I found a purpose. The leadership training didn't just teach me how to manage a team; it taught me how to manage myself.",
        author: "Vikram Singh",
        role: "Student Volunteer, 3 Years",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
        quote: "As a donor, transparency is everything. MASA's regular impact reports and the ability to see exactly where my funds go give me immense confidence. It's rare to see such professionalism.",
        author: "Mrs. Anjali Kapoor",
        role: "Life Member & Donor",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
        quote: "The sports kit provided to our village team changed everything. We went from playing barefoot to winning the district championship. MASA believed in us when no one else did.",
        author: "Rahul D.",
        role: "Beneficiary, Sports Program",
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0aa3e6?auto=format&fit=crop&w=200&q=80"
    },
    {
        quote: "What I love about MASA is the diversity. At the Cultural Utsav, I met people from 10 different states. It reminded me of the strength in our unity.",
        author: "Priya Menon",
        role: "Cultural Event Participant",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
];

// Default Settings
const defaultSettings: GlobalSettings = {
    general: { siteName: 'MASA World Foundation', contactEmail: 'masaworldfoundation@gmail.com', enableRegistrations: true, maintenanceMode: false },
    homepage: {
        slider: { slides: defaultSliderItems, autoplaySpeed: 7000 },
        pillars: defaultPillars,
        testimonials: defaultTestimonials,
        sections: {
            impactSnapshot: { visible: true },
            whatWeDo: { visible: true, title: "What We Do", subtitle: "Our holistic development ecosystem." },
            incredibleSection: { visible: true, title: "Let's Create Incredible!", subtitle: "We organize, manage, and host impactful activities across sports, education, and culture." },
            founderMessage: { visible: true },
            communityVoices: { visible: true, title: "Voices from Our Community", subtitle: "Real stories from the people we serve and work with." },
            trust: { visible: true, title: "The Cycle of Trust", subtitle: "Transparency is built into every step of our process." },
            upcomingEvents: { visible: true, title: "Upcoming Events", subtitle: "Join our upcoming events and be part of the change." },
            careers: { visible: true, title: "Careers & Internships", subtitle: "Join our team to drive social impact." },
            getInvolved: { visible: true, title: "Get Involved", subtitle: "Join our mission to create a lasting impact." },
            finalCta: { visible: true },
        },
    },
    navigation: {
        headerMenu: defaultHeaderMenu,
        footerAboutLinks: defaultFooterLinks.about,
        footerWorkLinks: defaultFooterLinks.work,
        footerInvolvedLinks: defaultFooterLinks.involved,
        footerResourceLinks: defaultFooterLinks.resources,
        footerPolicyLinks: defaultFooterLinks.policies,
    },
    social: [
        { id: 'fb', platform: 'facebook', url: 'https://www.facebook.com/masaworld.org', enabled: true }, 
        { id: 'ig', platform: 'instagram', url: 'https://www.instagram.com/masaworldfoundation', enabled: true },
        { id: 'li', platform: 'linkedin', url: 'https://www.linkedin.com/company/masaworld-foundation', enabled: true },
        { id: 'yt', platform: 'youtube', url: 'https://www.youtube.com/masaworldfoundation', enabled: true }
    ],
    scripts: { googleAnalyticsId: '', enableAnalytics: false, facebookPixelId: '', enablePixel: false, googleAdsenseCode: '', enableAdsense: false, googleSearchConsole: '', enableGoogleSearchConsole: false, customHead: '', enableCustomHead: false, customBodyStart: '', enableCustomBodyStart: false, customBodyEnd: '', enableCustomBodyEnd: false },
    appearance: { customCss: '', enableCustomCss: false },
    payments: { currency: 'INR', razorpayEnabled: true, razorpayKey: '', stripeEnabled: false, stripeKey: '', paypalEnabled: false, paypalClientId: '', manualPaymentEnabled: true, manualPaymentInstructions: 'Contact for details.', donationSuccessMessage: 'Thank you!', donationFailureMessage: 'Payment failed.' },
    features: { blogEnabled: true, eventsEnabled: true, coursesEnabled: true, whatsAppIntegrationEnabled: false, whatsAppNumber: '' },
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
            pillars: existingSettings.homepage?.pillars && existingSettings.homepage.pillars.length > 0 ? existingSettings.homepage.pillars : defaultSettings.homepage.pillars,
            testimonials: existingSettings.homepage?.testimonials && existingSettings.homepage.testimonials.length > 0 ? existingSettings.homepage.testimonials : defaultSettings.homepage.testimonials,
            sections: { ...defaultSettings.homepage.sections, ...(existingSettings.homepage?.sections || {}) },
        },
        navigation: { ...defaultSettings.navigation, ...existingSettings.navigation },
        scripts: { ...defaultSettings.scripts, ...existingSettings.scripts },
        features: { ...defaultSettings.features, ...existingSettings.features },
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
        if (typeof window === 'undefined') return defaultPages;
        const data = localStorage.getItem(KEYS.PAGES);
        return data ? JSON.parse(data) : defaultPages;
    },
    savePage: (page: PageMetadata) => {
        if (typeof window === 'undefined') return;
        const pages = ContentManager.getPages();
        const index = pages.findIndex(p => p.id === page.id);
        page.lastModified = new Date().toISOString();
        if (index >= 0) pages[index] = page;
        else pages.push(page);
        localStorage.setItem(KEYS.PAGES, JSON.stringify(pages));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },

    // --- EVENTS ---
    getEvents: (): Event[] => {
        if (typeof window === 'undefined') return eventsData;
        const data = localStorage.getItem(KEYS.EVENTS);
        return data ? JSON.parse(data) : [];
    },
    saveEvent: (event: Event) => {
        if (typeof window === 'undefined') return;
        const events = ContentManager.getEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) events[index] = event;
        else events.unshift(event);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },
    deleteEvent: (id: string) => {
        if (typeof window === 'undefined') return;
        const events = ContentManager.getEvents().filter(e => e.id !== id);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },

    // --- BLOGS ---
    getPosts: (): Post[] => {
        if (typeof window === 'undefined') return postsData;
        const data = localStorage.getItem(KEYS.BLOGS);
        return data ? JSON.parse(data) : [];
    },
    savePost: (post: Post) => {
        if (typeof window === 'undefined') return;
        const posts = ContentManager.getPosts();
        const index = posts.findIndex(p => p.id === post.id);
        post.publishDate = new Date().toISOString(); // Update date on save
        if (index >= 0) posts[index] = post;
        else posts.unshift(post);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },
    deletePost: (id: number) => {
        if (typeof window === 'undefined') return;
        const posts = ContentManager.getPosts().filter(p => p.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },

    // --- COURSES ---
    getCourses: (): Course[] => {
        if (typeof window === 'undefined') return coursesData;
        const data = localStorage.getItem(KEYS.COURSES);
        return data ? JSON.parse(data) : [];
    },
    saveCourse: (course: Course) => {
        if (typeof window === 'undefined') return;
        const courses = ContentManager.getCourses();
        const index = courses.findIndex(c => c.id === course.id);
        if (index >= 0) courses[index] = course;
        else courses.unshift(course);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },
    deleteCourse: (id: number) => {
        if (typeof window === 'undefined') return;
        const courses = ContentManager.getCourses().filter(c => c.id !== id);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
        window.dispatchEvent(new Event('masa-settings-updated'));
    },
};
