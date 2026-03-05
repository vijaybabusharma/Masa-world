
export const defaultSettings = {
    general: { siteName: 'MASA World Foundation', contactEmail: 'masaworldfoundation@gmail.com', enableRegistrations: true, maintenanceMode: false },
    homepage: {
        slider: { 
            slides: [
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
                    subtext: "Become a volunteer or member and contribute your skills to meaningful social transformation.", 
                    description: "Together, we can achieve more.",
                    image: "https://images.unsplash.com/photo-1559027615-cd26735550b4?auto=format&fit=crop&w=1800&q=80", 
                    mobileImage: "https://images.unsplash.com/photo-1559027615-cd26735550b4?auto=format&fit=crop&w=800&q=80",
                    cta: { label: "Volunteer Now", page: "volunteer" },
                    enabled: true
                }
            ],
            autoplaySpeed: 7000 
        },
        pillars: [],
        testimonials: [],
        deliveryItems: [],
        processSteps: [],
        founderMessageContent: {
            image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=782,fit=crop/AMq4Dg7v0wH5yKM1/founder-B9OrhqqUN6Kq3Qir.jpeg',
            name: "Vijay Babu Sharma",
            title: "Founder & Chairman",
            quote: "At MASA World Foundation, we believe that sports, education, and culture together shape confident individuals and responsible communities.",
            text: "Our mission is to empower youth, recognize real heroes, and create lasting impact through disciplined action. We invite you to join this movement of positive change."
        },
        impactStats: { enabled: false, youth: 75000, programs: 650, globalReach: 114, years: 13 },
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
        headerMenu: [
            { id: 'nav-home', label: 'Home', page: 'home' },
            { id: 'nav-about', label: 'About Us', page: 'about' },
            { id: 'nav-initiatives', label: 'Initiatives', page: 'initiatives' },
            { id: 'nav-gallery', label: 'Gallery', page: 'gallery' },
            { id: 'nav-blog', label: 'Blog', page: 'blog' },
            { id: 'nav-donate', label: 'Donate', page: 'donate' },
        ],
        footerAboutLinks: [],
        footerWorkLinks: [],
        footerInvolvedLinks: [],
        footerResourceLinks: [],
        footerPolicyLinks: [],
    },
    social: [
        { id: 'fb', platform: 'facebook', url: 'https://www.facebook.com/masaworld.org', enabled: true }, 
        { id: 'ig', platform: 'instagram', url: 'https://www.instagram.com/masaworldfoundation', enabled: true },
    ],
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
    buttons: {
        paymentLinks: [
            { id: 'pl-general', name: 'General Donation', url: 'https://razorpay.me/@masaworldfoundation', provider: 'Razorpay', active: true },
        ],
        zones: {
            'header_donate': { id: 'header_donate', label: 'Donate', actionType: 'link', target: 'donate', visible: true, style: 'primary' },
        },
        floatingButton: { id: 'floating_donate', label: 'Donate Now', actionType: 'payment', target: 'pl-general', visible: false, position: 'bottom-right', style: 'primary' }
    },
};

export const defaultPages = [
    { id: 'home', title: 'Home - MASA World', description: 'Empowering Youth Through Sports, Education & Culture.', lastModified: new Date().toISOString() },
];
