
import { eventsData, postsData, coursesData } from './data';
import { Post, GlobalSettings, PageMetadata, MasaEvent, Course, MenuItem, NavItem, SliderItem, PillarItem, Testimonial, GalleryItem, FounderMessageContent, ImpactStatsOverride, DeliveryAreaItem, ProcessStep, ButtonSettings, Redirect, TrashItem, Revision, Comment, PageContent } from '../types';

// Keys for LocalStorage
const KEYS = {
    EVENTS: 'masa_content_events',
    BLOGS: 'masa_content_blogs',
    COURSES: 'masa_content_courses',
    GALLERY: 'masa_content_gallery',
    SETTINGS: 'masa_global_settings',
    PAGES: 'masa_content_pages',
    PAGE_CONTENT: 'masa_page_content_'
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
            { id: 'nav-founder', label: 'Founder’s Message', page: 'founder-message' },
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
        { id: 'footer-founder', label: 'Founder’s Message', page: 'founder-message' },
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
        id: 'slide-vision', 
        headline: "Masa World Foundation: Global Vision, Local Action", 
        subtext: "Connecting global resources with local communities to drive sustainable social impact through disciplined action.", 
        description: "Our foundation acts as a bridge between global philanthropy and local needs.",
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1800&q=80", 
        mobileImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
        cta: { label: "Get Involved", page: "get-involved" },
        enabled: true
    },
    { 
        id: 'slide-youth', 
        headline: "Empowering the Next Generation of Leaders", 
        subtext: "Nurturing youth through discipline, sports, and leadership programs to build a resilient and responsible future.", 
        description: "We believe in the power of youth to transform society.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80", 
        mobileImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        cta: { label: "Youth Programs", page: "courses" },
        enabled: true
    },
    { 
        id: 'slide-impact', 
        headline: "Building Resilient and Responsible Communities", 
        subtext: "Our grassroots initiatives focus on health, education, and social unity to create lasting positive change.", 
        description: "Impact that lasts beyond the program duration.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80", 
        mobileImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
        cta: { label: "Our Initiatives", page: "initiatives" },
        enabled: true
    },
    { 
        id: 'slide-trust', 
        headline: "Transparency and Trust in Every Action", 
        subtext: "We ensure ethical fund usage and provide regular impact reports to our global community of supporters.", 
        description: "Your trust is our most valuable asset.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80", 
        mobileImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        cta: { label: "Donate Now", page: "donate" },
        enabled: true
    },
    { 
        id: 'slide-volunteer', 
        headline: "Join Our Global Network of Change-Makers", 
        subtext: "Become a volunteer or member today and contribute your skills to meaningful social transformation.", 
        description: "Together, we can achieve more.",
        image: "https://images.unsplash.com/photo-1559027615-cd26735550b4?auto=format&fit=crop&w=1800&q=80", 
        mobileImage: "https://images.unsplash.com/photo-1559027615-cd26735550b4?auto=format&fit=crop&w=800&q=80",
        cta: { label: "Volunteer Now", page: "volunteer" },
        enabled: true
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
        'final_cta': { id: 'final_cta', label: 'Become a Member', actionType: 'link', target: 'membership', visible: true, style: 'primary' },
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
            impactSnapshot: { visible: true, textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            whatWeDo: { visible: true, title: "What We Do", subtitle: "Our holistic development ecosystem.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            incredibleSection: { visible: true, title: "Let's Create Incredible!", subtitle: "We organize, manage, and host impactful activities across sports, education, and culture.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            founderMessage: { visible: true, textAlign: 'left', paddingTop: '4rem', paddingBottom: '4rem' },
            communityVoices: { visible: true, title: "Voices from Our Community", subtitle: "Real stories from the people we serve and work with.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            trust: { visible: true, title: "The Cycle of Trust", subtitle: "Transparency is built into every step of our process.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            upcomingEvents: { visible: true, title: "Upcoming Events", subtitle: "Join our upcoming events and be part of the change.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            careers: { visible: true, title: "Careers & Internships", subtitle: "Join our team to drive social impact.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            getInvolved: { visible: true, title: "Get Involved", subtitle: "Join our mission to create a lasting impact.", textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' },
            finalCta: { visible: true, textAlign: 'center', paddingTop: '6rem', paddingBottom: '6rem' },
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
    seo: {
        ogImage: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=782,fit=crop/AMq4Dg7v0wH5yKM1/founder-B9OrhqqUN6Kq3Qir.jpeg',
        ogTitle: 'MASA World Foundation',
        ogDescription: 'Empowering Youth Through Sports, Education & Culture.',
        twitterCard: 'summary_large_image',
        sitemapEnabled: true,
        robotsTxt: 'User-agent: *\nAllow: /',
    },
    scripts: { googleAnalyticsId: '', enableAnalytics: false, facebookPixelId: '', enablePixel: false, googleAdsenseCode: '', enableAdsense: false, googleSearchConsole: '', enableGoogleSearchConsole: false, customHead: '', enableCustomHead: false, customBodyStart: '', enableCustomBodyStart: false, customBodyEnd: '', enableCustomBodyEnd: false },
    appearance: { 
        customCss: '', 
        enableCustomCss: false,
        typography: {
            headingDesktop: '4.5rem',
            headingMobile: '2.5rem',
            paragraph: '1.125rem',
            button: '1rem'
        },
        buttons: {
            padding: '1rem 2rem',
            borderRadius: '9999px',
            alignment: 'center'
        }
    },
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
        if (!data) return defaultSettings;
        try {
            const parsed = JSON.parse(data);
            // Deep merge to ensure new properties exist even if loading old settings
            return {
                ...defaultSettings,
                ...parsed,
                appearance: {
                    ...defaultSettings.appearance,
                    ...(parsed.appearance || {}),
                    typography: {
                        ...defaultSettings.appearance?.typography,
                        ...(parsed.appearance?.typography || {})
                    },
                    buttons: {
                        ...defaultSettings.appearance?.buttons,
                        ...(parsed.appearance?.buttons || {})
                    }
                },
                general: {
                    ...defaultSettings.general,
                    ...(parsed.general || {})
                },
                scripts: {
                    ...defaultSettings.scripts,
                    ...(parsed.scripts || {})
                },
                homepage: {
                    ...defaultSettings.homepage,
                    ...(parsed.homepage || {})
                }
            };
        } catch (e) {
            console.error("Failed to parse settings", e);
            return defaultSettings;
        }
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
        if (!data) {
            // Initialize with defaults if empty
            localStorage.setItem(KEYS.PAGES, JSON.stringify(defaultPages));
            return defaultPages;
        }
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
        
        // Sort by order if available
        pages.sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));
        
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
    
    getPageContent: (id: string): PageContent | null => {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(`${KEYS.PAGE_CONTENT}${id}`);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch { return null; }
    },
    
    savePageContent: async (content: PageContent) => {
        if (typeof window === 'undefined') return;
        content.lastModified = new Date().toISOString();
        localStorage.setItem(`${KEYS.PAGE_CONTENT}${content.id}`, JSON.stringify(content));
        
        // Also update metadata
        const meta: PageMetadata = {
            id: content.id as any,
            title: content.title,
            description: content.metaDescription,
            lastModified: content.lastModified
        };
        // Add extra fields to meta for the list view
        (meta as any).status = content.status;
        (meta as any).slug = content.slug;
        (meta as any).order = content.order;
        (meta as any).parentId = content.parentId;
        
        await ContentManager.savePage(meta);
    },
    
    deletePage: async (id: string) => {
        if (typeof window === 'undefined') return;
        const pages = ContentManager.getPages();
        const pageToDelete = pages.find(p => p.id === id);
        if (pageToDelete) {
            await ContentManager.moveToTrash(id, 'page', pageToDelete);
        }
        const updatedPages = pages.filter(p => p.id !== id);
        localStorage.setItem(KEYS.PAGES, JSON.stringify(updatedPages));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPages)
            });
        } catch (err) { console.error('Failed to delete page on server', err); }
    },

    searchContent: (query: string) => {
        const q = query.toLowerCase().trim();
        if (!q) return [];

        const results: any[] = [];

        // Search Pages
        const pages = ContentManager.getPages();
        pages.forEach(p => {
            if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
                results.push({
                    type: 'page',
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    page: p.id
                });
            }
        });

        // Search Events
        const events = ContentManager.getEvents();
        events.forEach(e => {
            if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)) {
                results.push({
                    type: 'event',
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    page: 'events'
                });
            }
        });

        // Search Blogs
        const posts = ContentManager.getPosts();
        posts.forEach(p => {
            if (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)) {
                results.push({
                    type: 'blog',
                    id: p.id,
                    title: p.title,
                    description: p.summary,
                    page: 'blog'
                });
            }
        });

        return results;
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
        const events = ContentManager.getEvents();
        const eventToDelete = events.find(e => e.id === id);
        if (eventToDelete) {
            await ContentManager.moveToTrash(id, 'event', eventToDelete);
        }
        const updatedEvents = events.filter(e => e.id !== id);
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(updatedEvents));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvents)
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
        const posts = ContentManager.getPosts();
        const postToDelete = posts.find(p => p.id === id);
        if (postToDelete) {
            await ContentManager.moveToTrash(id, 'post', postToDelete);
        }
        const updatedPosts = posts.filter(p => p.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(updatedPosts));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPosts)
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
        const courses = ContentManager.getCourses();
        const courseToDelete = courses.find(c => c.id === id);
        if (courseToDelete) {
            await ContentManager.moveToTrash(id, 'event', courseToDelete); // Using event type for simplicity in trash
        }
        const updatedCourses = courses.filter(c => c.id !== id);
        localStorage.setItem(KEYS.COURSES, JSON.stringify(updatedCourses));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCourses)
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
        const items = ContentManager.getGalleryItems();
        const itemToDelete = items.find(i => i.id === id);
        if (itemToDelete) {
            await ContentManager.moveToTrash(id, 'event', itemToDelete);
        }
        const updatedItems = items.filter(i => i.id !== id);
        localStorage.setItem(KEYS.GALLERY, JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('masa-settings-updated'));
        try {
            await fetch('/api/content/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItems)
            });
        } catch (err) { console.error('Failed to delete gallery item on server', err); }
    },

    // --- CMS ADVANCED ---
    moveToTrash: async (originalId: string | number, type: string, data: any) => {
        try {
            await fetch('/api/trash/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ originalId, type, data })
            });
        } catch (err) { console.error('Failed to move to trash', err); }
    },

    getTrash: async (): Promise<TrashItem[]> => {
        try {
            const res = await fetch('/api/trash');
            return res.json();
        } catch { return []; }
    },

    restoreFromTrash: async (id: string) => {
        try {
            await fetch(`/api/trash/restore/${id}`, { method: 'POST' });
            await ContentManager.syncWithServer();
        } catch (err) { console.error('Failed to restore from trash', err); }
    },

    permanentDelete: async (id: string) => {
        try {
            await fetch(`/api/trash/${id}`, { method: 'DELETE' });
        } catch (err) { console.error('Failed to permanently delete', err); }
    },

    getRevisions: async (type: 'post' | 'page', id: string | number): Promise<Revision[]> => {
        try {
            const res = await fetch(`/api/revisions/${type}/${id}`);
            return res.json();
        } catch { return []; }
    },

    getComments: async (): Promise<Comment[]> => {
        try {
            const res = await fetch('/api/comments');
            return res.json();
        } catch { return []; }
    },

    updateCommentStatus: async (id: string, status: Comment['status']) => {
        try {
            await fetch(`/api/comments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
        } catch (err) { console.error('Failed to update comment status', err); }
    },

    deleteComment: async (id: string) => {
        try {
            await fetch(`/api/comments/${id}`, { method: 'DELETE' });
        } catch (err) { console.error('Failed to delete comment', err); }
    },

    getRedirects: async (): Promise<Redirect[]> => {
        try {
            const res = await fetch('/api/redirects');
            return res.json();
        } catch { return []; }
    },

    saveRedirect: async (redirect: Partial<Redirect>) => {
        try {
            await fetch('/api/redirects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(redirect)
            });
        } catch (err) { console.error('Failed to save redirect', err); }
    },

    deleteRedirect: async (id: string) => {
        try {
            await fetch(`/api/redirects/${id}`, { method: 'DELETE' });
        } catch (err) { console.error('Failed to delete redirect', err); }
    }
};
