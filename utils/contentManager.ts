
import { eventsData, postsData, coursesData } from './data';
import { Post, GlobalSettings, PageMetadata, MasaEvent, Course, MenuItem, NavItem, SliderItem, PillarItem, Testimonial, GalleryItem, FounderMessageContent, ImpactStatsOverride, DeliveryAreaItem, ProcessStep, ButtonSettings } from '../types';

// Keys for LocalStorage
const KEYS = {
    EVENTS: 'masa_content_events',
    BLOGS: 'masa_content_blogs',
    COURSES: 'masa_content_courses',
    GALLERY: 'masa_content_gallery',
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
        id: 'nav-get-involved', label: 'Get Involved', page: 'get-involved',
        subItems: [
            { id: 'nav-donate', label: 'Donate Now', page: 'donate' },
            { id: 'nav-volunteer', label: 'Volunteer', page: 'volunteer' },
            { id: 'nav-membership', label: 'Become a Member', page: 'membership' },
            { id: 'nav-careers', label: 'Careers & Internships', page: 'careers' },
            { id: 'nav-media-highlights', label: 'Media Highlights', page: 'media-highlights' },
            { id: 'nav-reports', label: 'Annual Reports', page: 'media-reports' },
            { id: 'nav-courses', label: 'Courses & Trainings', page: 'courses' },
            { id: 'nav-events', label: 'Events', page: 'events' },
            { id: 'nav-awards', label: 'Awards', page: 'awards' },
            { id: 'nav-records', label: 'Records', page: 'records' },
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
    { 
        id: 'slide-empower', 
        headline: "Empowering Youth. Building Nations.", 
        subtext: "We forge future leaders through sports, education, and culture.", 
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "Get Involved", page: "get-involved" } 
    },
    { 
        id: 'slide-events', 
        headline: "Global Stages, Local Impact.", 
        subtext: "From national competitions to international exchange programs, we create platforms for youth to shine.", 
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "View Events", page: "events" } 
    },
    { 
        id: 'slide-trainings', 
        headline: "Forging Leaders of Tomorrow.", 
        subtext: "Discipline-focused training and skill development that builds character and competence.", 
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "Join Training", page: "trainings" } 
    },
    { 
        id: 'slide-awards', 
        headline: "Honoring Real-Life Heroes.", 
        subtext: "Recognizing the dedication and excellence of those who go above and beyond for society.", 
        image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "See Awardees", page: "awards" } 
    },
    { 
        id: 'slide-records', 
        headline: "Breaking Boundaries.", 
        subtext: "Documenting extraordinary human achievements and milestones that inspire us all.", 
        image: "https://images.unsplash.com/photo-1552674605-5d226f5abdff?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "View Records", page: "records" } 
    },
    { 
        id: 'slide-conferences', 
        headline: "Conversations That Shape the Future.", 
        subtext: "Bringing together thought leaders to drive meaningful social progress.", 
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=80", 
        cta: { label: "Our Conferences", page: "conferences" } 
    },
    {
        id: 'slide-sports',
        headline: "Champions in the Making.",
        subtext: "Nurturing talent, discipline, and teamwork through world-class sports programs.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=80",
        cta: { label: "Explore Sports", page: "sports" }
    },
    {
        id: 'slide-culture',
        headline: "Celebrating Our Roots.",
        subtext: "Preserving heritage and fostering unity through vibrant cultural exchange.",
        image: "https://images.unsplash.com/photo-1533551030926-9bc2cb24c823?auto=format&fit=crop&w=1800&q=80",
        cta: { label: "View Culture", page: "culture" }
    },
    {
        id: 'slide-volunteer',
        headline: "Be the Change You Wish to See.",
        subtext: "Join thousands of volunteers making a tangible difference in communities every day.",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=80",
        cta: { label: "Volunteer Now", page: "volunteer" }
    }
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
        id: 'test-1',
        quote: "I joined MASA as a student looking for a certificate. I stayed because I found a purpose. The leadership training didn't just teach me how to manage a team; it taught me how to manage myself.",
        author: "Vikram Singh",
        role: "Student Volunteer, 3 Years",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 'test-2',
        quote: "As a donor, transparency is everything. MASA's regular impact reports and the ability to see exactly where my funds go give me immense confidence. It's rare to see such professionalism.",
        author: "Mrs. Anjali Kapoor",
        role: "Life Member & Donor",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 'test-3',
        quote: "The sports kit provided to our village team changed everything. We went from playing barefoot to winning the district championship. MASA believed in us when no one else did.",
        author: "Rahul D.",
        role: "Beneficiary, Sports Program",
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0aa3e6?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 'test-4',
        quote: "What I love about MASA is the diversity. At the Cultural Utsav, I met people from 10 different states. It reminded me of the strength in our unity.",
        author: "Priya Menon",
        role: "Cultural Event Participant",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
];

const defaultGalleryItems: GalleryItem[] = [
    { id: 1, category: 'Sports Events', title: 'Annual Sports Day', location: 'New Delhi', date: 'Aug 15, 2024', imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=800&q=80', description: 'A vibrant celebration of sportsmanship where over 500 young athletes showcased incredible determination and talent in track and field events.', tags: ['Sports', 'Youth', 'Competition', 'Athletics'] },
    { id: 2, category: 'Community Outreach', title: 'Rural Health Camp', location: 'Uttar Pradesh', date: 'Jul 20, 2024', imageUrl: 'https://images.unsplash.com/photo-1628348070889-cb656243b487?auto=format&fit=crop&w=800&q=80', description: 'Our dedicated team of doctors and volunteers provided essential healthcare screenings to over 1,000 people in a single day, bridging critical gaps in medical access.', tags: ['Health', 'Community', 'Service', 'Medical'] },
    { id: 3, category: 'Trainings & Workshops', title: 'Leadership Bootcamp', location: 'Mumbai', date: 'Jul 10, 2024', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', description: 'An intensive 3-day workshop that transformed aspiring students into confident leaders through sessions on public speaking, strategic thinking, and team management.', tags: ['Education', 'Leadership', 'Youth', 'Skills'] },
    { id: 4, category: 'Awards & Recognition', title: 'Real Hero Awards', location: 'New Delhi', date: 'Jun 05, 2024', imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80', description: 'A night dedicated to honoring the unsung heroes of our society. We celebrated 20 individuals whose selfless work inspires us all.', tags: ['Awards', 'Recognition', 'Community', 'Heroes'] },
    { id: 5, category: 'Conferences & Seminars', title: 'National Youth Conclave', location: 'Bangalore', date: 'May 15, 2024', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', description: 'A vital platform where policymakers and student leaders engaged in fruitful discussions on education reform and the future of India\'s youth.', tags: ['Conference', 'Youth', 'Policy', 'Debate'] },
    { id: 6, category: 'International Programs', title: 'Global Exchange Forum', location: 'Virtual', date: 'Apr 22, 2024', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', description: 'Connecting bright young minds from India and around the world to collaborate on sustainable development goals and foster global understanding.', tags: ['Global', 'International', 'Culture', 'SDGs'] },
    { id: 7, category: 'Sports Events', title: 'District Football League', location: 'Kolkata', date: 'Mar 30, 2024', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', description: 'The finals of our district league, where fierce competition, incredible teamwork, and the pure joy of the game were on full display.', tags: ['Sports', 'Football', 'Youth', 'Teamwork'] },
    { id: 8, category: 'Community Outreach', title: 'City Cleanliness Drive', location: 'Pune', date: 'Mar 12, 2024', imageUrl: 'https://images.unsplash.com/photo-1618521630643-b19623e4d872?auto=format&fit=crop&w=800&q=80', description: 'Hundreds of volunteers joined hands to create a cleaner city, spreading awareness about waste segregation and our collective civic duty.', tags: ['Community', 'Environment', 'Volunteer', 'SwachhBharat'] },
];

const defaultDeliveryItems: DeliveryAreaItem[] = [
    { id: 'del-events', type: 'Events', title: 'Events', description: 'National & international programs, competitions, and social initiatives.' },
    { id: 'del-trainings', type: 'Trainings', title: 'Trainings', description: 'Skill development, leadership, and discipline-focused programs.' },
    { id: 'del-awards', type: 'Awards', title: 'Awards', description: 'Recognition of excellence, dedication, and real-life heroes.' },
    { id: 'del-records', type: 'Records', title: 'Records', description: 'Documenting extraordinary achievements and milestones.' },
    { id: 'del-conferences', type: 'Conferences', title: 'Conferences', description: 'Knowledge sharing, collaboration, and global dialogue.' }
];

const defaultProcessSteps: ProcessStep[] = [
    { id: 'step-1', icon: 'SearchIcon', title: "Identify", description: "We locate vulnerable communities and critical gaps in social support through grassroots research." },
    { id: 'step-2', icon: 'UsersIcon', title: "Mobilize", description: "We gather resources, passionate volunteers, and local leadership to build a strong foundation for action." },
    { id: 'step-3', icon: 'SparklesIcon', title: "Empower", description: "We execute targeted programs for skills, health, and rights, giving communities the tools they need." },
    { id: 'step-4', icon: 'PresentationChartBarIcon', title: "Sustain", description: "We ensure long-term impact by fostering community ownership and creating self-reliant models for change." },
];

const defaultFounderMessageContent: FounderMessageContent = {
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=782,fit=crop/AMq4Dg7v0wH5yKM1/founder-B9OrhqqUN6Kq3Qir.jpeg',
    name: "Vijay Babu Sharma",
    title: "Founder & Chairman",
    quote: "At MASA World Foundation, we believe that sports, education, and culture together shape confident individuals and responsible communities.",
    text: "Our mission is to empower youth, recognize real heroes, and create lasting impact through disciplined action. We invite you to join this movement of positive change."
};

const defaultImpactStats: ImpactStatsOverride = {
    enabled: false,
    youth: 75000,
    programs: 650,
    globalReach: 114,
    years: 13
};

const defaultButtonSettings: ButtonSettings = {
    paymentLinks: [
        { id: 'pl-general', name: 'General Donation', url: 'https://razorpay.me/@masaworldfoundation', provider: 'Razorpay', active: true },
        { id: 'pl-membership', name: 'Membership Fee', url: 'https://razorpay.me/@masaworldfoundation', provider: 'Razorpay', active: true },
    ],
    zones: {
        'header_donate': { id: 'header_donate', label: 'Donate', actionType: 'link', target: 'donate', visible: true, style: 'primary' },
        'hero_cta': { id: 'hero_cta', label: 'Get Involved', actionType: 'link', target: 'get-involved', visible: true, style: 'primary' },
        'final_cta': { id: 'final_cta', label: 'Become a Member Today', actionType: 'link', target: 'membership', visible: true, style: 'primary' },
    },
    floatingButton: { id: 'floating_donate', label: 'Donate Now', actionType: 'payment', target: 'pl-general', visible: false, position: 'bottom-right', style: 'primary' }
};

// Default Settings
const defaultSettings: GlobalSettings = {
    general: { siteName: 'MASA World Foundation', contactEmail: 'masaworldfoundation@gmail.com', enableRegistrations: true, maintenanceMode: false },
    homepage: {
        slider: { slides: defaultSliderItems, autoplaySpeed: 7000 },
        pillars: defaultPillars,
        testimonials: defaultTestimonials,
        deliveryItems: defaultDeliveryItems,
        processSteps: defaultProcessSteps,
        founderMessageContent: defaultFounderMessageContent,
        impactStats: defaultImpactStats,
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
    buttons: defaultButtonSettings,
};

const defaultPages: PageMetadata[] = [
    { id: 'home', title: 'Home - MASA World', description: 'Empowering Youth Through Sports, Education & Culture.', lastModified: new Date().toISOString() },
];

// Helper to initialize data if empty
const initializeData = () => {
    // No-op: Data should be managed on the server
};

if (typeof window !== 'undefined') {
    // ContentManager.syncWithServer(); // We'll call this explicitly when needed
}

export const ContentManager = {
    // --- SYNC ---
    syncWithServer: async () => {
        if (typeof window === 'undefined') return;
        try {
            const fetchJson = async (url: string) => {
                const r = await fetch(url);
                if (!r.ok) return null;
                return r.json();
            };

            const [settings, pages, events, posts, courses, gallery] = await Promise.all([
                fetchJson('/api/content/settings'),
                fetchJson('/api/content/pages'),
                fetchJson('/api/content/events'),
                fetchJson('/api/content/posts'),
                fetchJson('/api/content/courses'),
                fetchJson('/api/content/gallery')
            ]);

            if (settings && typeof settings === 'object' && !Array.isArray(settings) && !settings.message) {
                localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
            }
            if (Array.isArray(pages)) localStorage.setItem(KEYS.PAGES, JSON.stringify(pages));
            if (Array.isArray(events)) localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
            if (Array.isArray(posts)) localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
            if (Array.isArray(courses)) localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
            if (Array.isArray(gallery)) localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
            
            window.dispatchEvent(new Event('masa-settings-updated'));
        } catch (err) {
            console.error('Failed to sync content', err);
        }
    },

    // --- FORMS ---
    submitForm: async (data: any) => {
        try {
            const res = await fetch('/api/forms/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (err) {
            console.error('Form submission failed', err);
            throw err;
        }
    },

    // --- SETTINGS ---
    getSettings: (): GlobalSettings => {
        if (typeof window === 'undefined') return defaultSettings;
        const data = localStorage.getItem(KEYS.SETTINGS);
        return data ? JSON.parse(data) : defaultSettings;
    },
    saveSettings: async (settings: GlobalSettings) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
        } catch (err) { console.error('Failed to save settings to server', err); }
    },

    // --- PAGES ---
    getPages: (): PageMetadata[] => {
        if (typeof window === 'undefined') return defaultPages;
        const data = localStorage.getItem(KEYS.PAGES);
        if (!data) return defaultPages;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : defaultPages;
        } catch { return defaultPages; }
    },
    savePage: async (page: PageMetadata) => {
        if (typeof window === 'undefined') return;
        const pages = ContentManager.getPages();
        const index = pages.findIndex(p => p.id === page.id);
        page.lastModified = new Date().toISOString();
        if (index >= 0) pages[index] = page;
        else pages.push(page);
        localStorage.setItem(KEYS.PAGES, JSON.stringify(pages));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pages)
            });
        } catch (err) { console.error('Failed to save pages to server', err); }
    },

    // --- EVENTS ---
    getEvents: (): MasaEvent[] => {
        if (typeof window === 'undefined') return eventsData;
        const data = localStorage.getItem(KEYS.EVENTS);
        if (!data) return eventsData;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : eventsData;
        } catch { return eventsData; }
    },
    saveEvent: async (event: MasaEvent) => {
        if (typeof window === 'undefined') return;
        const events = ContentManager.getEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) events[index] = event;
        else events.unshift(event);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(events)
            });
        } catch (err) { console.error('Failed to save events to server', err); }
    },
    deleteEvent: async (id: string) => {
        if (typeof window === 'undefined') return;
        const events = ContentManager.getEvents().filter(e => e.id !== id);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(events)
            });
        } catch (err) { console.error('Failed to delete event on server', err); }
    },

    // --- BLOGS ---
    getPosts: (): Post[] => {
        if (typeof window === 'undefined') return postsData;
        const data = localStorage.getItem(KEYS.BLOGS);
        if (!data) return postsData;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : postsData;
        } catch { return postsData; }
    },
    savePost: async (post: Post) => {
        if (typeof window === 'undefined') return;
        const posts = ContentManager.getPosts();
        const index = posts.findIndex(p => p.id === post.id);
        post.publishDate = new Date().toISOString(); // Update date on save
        if (index >= 0) posts[index] = post;
        else posts.unshift(post);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(posts)
            });
        } catch (err) { console.error('Failed to save posts to server', err); }
    },
    deletePost: async (id: number) => {
        if (typeof window === 'undefined') return;
        const posts = ContentManager.getPosts().filter(p => p.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(posts));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(posts)
            });
        } catch (err) { console.error('Failed to delete post on server', err); }
    },

    // --- COURSES ---
    getCourses: (): Course[] => {
        if (typeof window === 'undefined') return coursesData;
        const data = localStorage.getItem(KEYS.COURSES);
        if (!data) return coursesData;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : coursesData;
        } catch { return coursesData; }
    },
    saveCourse: async (course: Course) => {
        if (typeof window === 'undefined') return;
        const courses = ContentManager.getCourses();
        const index = courses.findIndex(c => c.id === course.id);
        if (index >= 0) courses[index] = course;
        else courses.unshift(course);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courses)
            });
        } catch (err) { console.error('Failed to save courses to server', err); }
    },
    deleteCourse: async (id: number) => {
        if (typeof window === 'undefined') return;
        const courses = ContentManager.getCourses().filter(c => c.id !== id);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courses)
            });
        } catch (err) { console.error('Failed to delete course on server', err); }
    },

    // --- GALLERY ---
    getGalleryItems: (): GalleryItem[] => {
        if (typeof window === 'undefined') return defaultGalleryItems;
        const data = localStorage.getItem(KEYS.GALLERY);
        if (!data) return defaultGalleryItems;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultGalleryItems;
        } catch { return defaultGalleryItems; }
    },
    saveGalleryItem: async (item: GalleryItem) => {
        if (typeof window === 'undefined') return;
        const items = ContentManager.getGalleryItems();
        const index = items.findIndex(i => i.id === item.id);
        if (index >= 0) items[index] = item;
        else items.unshift(item);
        localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items)
            });
        } catch (err) { console.error('Failed to save gallery to server', err); }
    },
    deleteGalleryItem: async (id: number | string) => {
        if (typeof window === 'undefined') return;
        const items = ContentManager.getGalleryItems().filter(i => i.id !== id);
        localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items)
            });
        } catch (err) { console.error('Failed to delete gallery item on server', err); }
    },
};
