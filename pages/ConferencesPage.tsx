
import React from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { MicrophoneIcon, UsersIcon, GlobeIcon, SparklesIcon, HandshakeIcon } from '../components/icons/FeatureIcons';

const ConferencesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <ActivityPageLayout
            navigateTo={navigateTo}
            heroData={{
                title: "Our Conferences",
                subtitle: "Engaging dialogue to enlighten minds and solve national issues.",
                primaryCtaLabel: "Register Interest",
                primaryCtaAction: () => navigateTo('contact'),
                bgImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80"
            }}
            overviewData={{
                title: "Addressing National Issues Through Dialogue",
                description: "We organize social events regularly in different places to discuss various topics of national interest. Our conferences engage experts to find solutions to bigger problems of society, such as rural empowerment, waste minimization, skill development in youth, and equal opportunities for both genders.",
                relevance: "Creating a platform for intellectual exchange and policy advocacy in India."
            }}
            focusAreas={[
                { icon: UsersIcon, label: "Youth Development" },
                { icon: GlobeIcon, label: "Sports & Education" },
                { icon: SparklesIcon, label: "Social Innovation" },
                { icon: MicrophoneIcon, label: "Expert Dialogue" },
                { icon: HandshakeIcon, label: "Collaboration" },
            ]}
            processSteps={[
                { title: "Theme", description: "Selecting a pressing social topic." },
                { title: "Invite", description: "Gathering experts, speakers, and partner organizations." },
                { title: "Convene", description: "Facilitating discussions and workshops." },
                { title: "Resolve", description: "Drafting actionable outcomes and whitepapers." },
            ]}
            activities={[
                {
                    title: "National Youth Conclave",
                    date: "Jan 2025",
                    location: "New Delhi",
                    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
                    status: "Upcoming"
                },
                {
                    title: "Rural Development Summit",
                    date: "March 2024",
                    location: "Bhopal",
                    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80",
                    status: "Past Event"
                },
                {
                    title: "Women in Leadership Forum",
                    date: "Nov 2023",
                    location: "Bangalore",
                    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80",
                    status: "Completed"
                },
            ]}
            participants={[
                "Policy Makers",
                "Industry Experts (Speakers)",
                "Student Leaders",
                "Partner Organizations",
                "Academicians"
            ]}
            impactMetrics={[
                { value: "20+", label: "Conferences" },
                { value: "100+", label: "Speakers Hosted" },
                { value: "5000+", label: "Delegates" },
                { value: "Actionable", label: "Resolutions" },
            ]}
            testimonial={{
                quote: "The Masa World Conference was a convergence of passion and expertise. The discussions were insightful, but more importantly, they led to actionable partnership plans.",
                author: "Dr. R. Sharma",
                role: "Policy Advisor & Speaker"
            }}
            ctaData={{
                title: "Join the Discussion",
                text: "Be part of the solution. Attend our next conference to learn, share, and network.",
                primaryLabel: "Register Interest",
                primaryAction: () => navigateTo('contact'),
                secondaryLabel: "Partner With Us",
                secondaryAction: () => navigateTo('contact')
            }}
        />
    );
};

export default ConferencesPage;
