
import React, { useEffect } from 'react';
import { NavigationProps } from '../types';
import { CheckIcon, ArrowRightIcon, HeartIcon, UsersIcon, GlobeIcon, BriefcaseIcon, CalendarDaysIcon } from '../components/icons/FeatureIcons';

interface ThankYouPageProps extends NavigationProps {
    type: 'volunteer' | 'donate' | 'membership' | 'career' | 'contact' | 'event';
}

const contentConfig = {
    volunteer: {
        title: "Thank You for Volunteering",
        subtitle: "You've taken the first step toward creating real impact.",
        message: "Our team has received your volunteer application and will contact you shortly. Together, we empower communities through sports, education, and culture.",
        primaryBtn: "Explore Our Work",
        primaryAction: "initiatives",
        icon: HeartIcon,
        color: "text-masa-blue",
        bg: "bg-blue-50"
    },
    donate: {
        title: "Thank You for Supporting Our Mission",
        subtitle: "Your contribution makes a difference.",
        message: "Your generous contribution helps us empower youth and communities. We deeply appreciate your support and commitment to positive change. A confirmation email has been sent to you.",
        primaryBtn: "View Our Impact",
        primaryAction: "media-reports",
        icon: CheckIcon,
        color: "text-green-600",
        bg: "bg-green-50"
    },
    membership: {
        title: "Welcome to MASA World Foundation!",
        subtitle: "You are now part of our global family.",
        message: "Thank you for becoming a member. A confirmation email with your digital ID card is on its way. We appreciate your support in our mission to empower communities.",
        primaryBtn: "Explore Our Initiatives",
        primaryAction: "initiatives",
        icon: UsersIcon,
        color: "text-masa-orange",
        bg: "bg-orange-50"
    },
    career: {
        title: "Thank You for Your Interest",
        subtitle: "Your application has been received.",
        message: "Thank you for applying to MASA World Foundation. We have received your application/resume successfully. Our team will review your details and contact you if there is a suitable opportunity aligned with your profile.",
        primaryBtn: "Explore Our Work",
        primaryAction: "initiatives",
        icon: BriefcaseIcon,
        color: "text-masa-charcoal",
        bg: "bg-gray-100"
    },
    contact: {
        title: "Thank You for Your Message",
        subtitle: "We've received your inquiry and will be in touch soon.",
        message: "Our team will review your message and respond within 24-48 business hours. We appreciate you reaching out to MASA World Foundation.",
        primaryBtn: "Return to Home",
        primaryAction: "home",
        icon: CheckIcon,
        color: "text-green-600",
        bg: "bg-green-50"
    },
    event: {
        title: "Registration Confirmed!",
        subtitle: "We look forward to seeing you there.",
        message: "Thank you for registering for the event. Your spot is reserved. We have sent a confirmation email with all the event details to your registered address.",
        primaryBtn: "View Other Events",
        primaryAction: "events",
        icon: CalendarDaysIcon,
        color: "text-masa-orange",
        bg: "bg-orange-50"
    }
};

const ThankYouPage: React.FC<ThankYouPageProps> = ({ navigateTo, type }) => {
    const config = contentConfig[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-20 px-4">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-2xl text-center border border-gray-100 animate-fade-in-up">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${config.bg}`}>
                    <config.icon className={`h-12 w-12 ${config.color}`} />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-masa-charcoal mb-4">
                    {config.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium mb-6">
                    {config.subtitle}
                </p>
                <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    {config.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigateTo(config.primaryAction as any)}
                        className="bg-masa-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        {config.primaryBtn}
                    </button>
                    <button 
                        onClick={() => navigateTo('home')}
                        className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
             {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ThankYouPage;
