
import { eventsData, postsData, coursesData, Event, Course } from './data';
import { Post, GlobalSettings, PageMetadata, Page } from '../types';

// Keys for LocalStorage
const KEYS = {
    EVENTS: 'masa_content_events',
    BLOGS: 'masa_content_blogs',
    COURSES: 'masa_content_courses',
    SETTINGS: 'masa_global_settings',
    PAGES: 'masa_content_pages'
};

// Default Settings
const defaultSettings: GlobalSettings = {
    general: {
        siteName: 'MASA World Foundation',
        contactEmail: 'masaworldfoundation@gmail.com',
        enableRegistrations: true,
        maintenanceMode: false,
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
        customBody: '',
        enableCustomBody: false,
        customFooter: '',
        enableCustomFooter: false,
    },
    appearance: {
        customCss: '',
        customJs: '',
    },
    payments: {
        currency: 'INR',
        razorpayEnabled: true,
        razorpayKey: '',
        stripeEnabled: false,
        paypalEnabled: false,
        manualPaymentEnabled: true,
        donationReceiptEmail: true,
    },
    features: {
        blogEnabled: true,
        eventsEnabled: true,
        coursesEnabled: true,
        ngoHelpDeskEnabled: true,
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
    if (!localStorage.getItem(KEYS.SETTINGS)) {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
    } else {
        // Migration: Ensure new fields exist if loading old settings
        const current = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
        if (!current.scripts || !current.social) {
            const merged = { ...defaultSettings, ...current };
            // Ensure social/scripts structure matches new type
            merged.social = current.social || defaultSettings.social;
            merged.scripts = { ...defaultSettings.scripts, ...current.monetization }; // migrate old monetization to scripts partially
            localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
        }
    }
    if (!localStorage.getItem(KEYS.PAGES)) {
        localStorage.setItem(KEYS.PAGES, JSON.stringify(defaultPages));
    }
};

// Ensure data is initialized on load
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
        // Dispatch event so app can react instantly
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
        if (index >= 0) {
            pages[index] = page;
        } else {
            pages.push(page);
        }
        localStorage.setItem(KEYS.PAGES, JSON.stringify(pages));
    },

    // --- EVENTS ---
    getEvents: (): Event[] => {
        const data = localStorage.getItem(KEYS.EVENTS);
        return data ? JSON.parse(data) : eventsData;
    },
    saveEvent: (event: Event) => {
        const events = ContentManager.getEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) {
            events[index] = event; // Update
        } else {
            events.unshift(event); // Add new
        }
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    },
    deleteEvent: (id: string) => {
        const events = ContentManager.getEvents().filter(e => e.id !== id);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    },

    // --- BLOGS ---
    getPosts: (): Post[] => {
        const data = localStorage.getItem(KEYS.BLOGS);
        return data ? JSON.parse(data) : postsData;
    },
    savePost: (post: Post) => {
        const posts = ContentManager.getPosts();
        const index = posts.findIndex(p => p.id === post.id);
        if (index >= 0) {
            posts[index] = post;
        } else {
            posts.unshift(post);
        }
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
    },
    deletePost: (id: number) => {
        const posts = ContentManager.getPosts().filter(p => p.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
    },

    // --- COURSES ---
    getCourses: (): Course[] => {
        const data = localStorage.getItem(KEYS.COURSES);
        return data ? JSON.parse(data) : coursesData;
    },
    saveCourse: (course: Course) => {
        const courses = ContentManager.getCourses();
        const index = courses.findIndex(c => c.id === course.id);
        if (index >= 0) {
            courses[index] = course;
        } else {
            courses.unshift(course);
        }
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
    },
    deleteCourse: (id: number) => {
        const courses = ContentManager.getCourses().filter(c => c.id !== id);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
    }
};
