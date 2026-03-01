
export const defaultSettings = {
    general: { siteName: 'MASA World Foundation', contactEmail: 'masaworldfoundation@gmail.com', enableRegistrations: true, maintenanceMode: false },
    homepage: {
        slider: { slides: [], autoplaySpeed: 7000 },
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
    appearance: { customCss: '', enableCustomCss: false },
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
