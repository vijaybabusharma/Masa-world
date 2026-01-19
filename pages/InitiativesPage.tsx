
import React from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { ShieldCheckIcon, HeartIcon, UsersIcon, SparklesIcon, GlobeIcon } from '../components/icons/FeatureIcons';

const InitiativesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <ActivityPageLayout
            navigateTo={navigateTo}
            heroData={{
                title: "Our Initiatives",
                subtitle: "Addressing critical needs through holistic social reform and youth development.",
                primaryCtaLabel: "Support Our Cause",
                primaryCtaAction: () => navigateTo('donate'),
                bgImage: "https://picsum.photos/1600/900?grayscale&blur=2&random=1"
            }}
            overviewData={{
                title: "Driving Social Reform",
                description: "Masa World Foundation works on a multi-dimensional approach to uplift society. From empowering women with self-defense skills to ensuring basic health for the underprivileged, our initiatives are designed to create sustainable, long-term impact.",
                relevance: "Focused on the grassroots level in India with a vision to create replicable models of social change for the world."
            }}
            focusAreas={[
                { icon: ShieldCheckIcon, label: "Gender Equality" },
                { icon: HeartIcon, label: "Community Health" },
                { icon: UsersIcon, label: "Youth Development" },
                { icon: SparklesIcon, label: "Skill Building" },
                { icon: GlobeIcon, label: "Social Awareness" },
            ]}
            processSteps={[
                { title: "Identify", description: "Locating vulnerable communities and critical gaps in social support." },
                { title: "Mobilize", description: "Gathering resources, volunteers, and local leadership." },
                { title: "Empower", description: "Executing targeted programs for skills, health, and rights." },
                { title: "Sustain", description: "Ensuring long-term community self-reliance." },
            ]}
            activities={[
                {
                    title: "Women's Self-Defense Workshop",
                    date: "Ongoing",
                    location: "New Delhi & NCR",
                    image: "https://picsum.photos/600/400?random=11",
                    status: "Core Program"
                },
                {
                    title: "Rural Health Checkup Camp",
                    date: "Monthly",
                    location: "Uttar Pradesh",
                    image: "https://picsum.photos/600/400?random=10",
                    status: "Active"
                },
                {
                    title: "Youth Vocational Training",
                    date: "Quarterly Batches",
                    location: "Multiple Centers",
                    image: "https://picsum.photos/600/400?random=12",
                    status: "Enrolling"
                },
            ]}
            participants={[
                "Students & Youth",
                "Women & Girls",
                "Rural Families",
                "Local Volunteers",
                "Partner NGOs"
            ]}
            impactMetrics={[
                { value: "114th", label: "Global Gender Gap Focus" },
                { value: "50+", label: "Health Camps" },
                { value: "5000+", label: "Women Trained" },
                { value: "20+", label: "Villages Adopted" },
            ]}
            testimonial={{
                quote: "By educating women and providing them the right awareness, we are helping the weaker women become strong. Be safe and stay safe!",
                author: "Impact Beneficiary",
                role: "Self-Defense Program"
            }}
            ctaData={{
                title: "Be a Catalyst for Change",
                text: "Your support can help us expand these critical initiatives to more communities in need.",
                primaryLabel: "Donate Now",
                primaryAction: () => navigateTo('donate'),
                secondaryLabel: "Volunteer",
                secondaryAction: () => navigateTo('get-involved', 'volunteer-section')
            }}
        />
    );
};

export default InitiativesPage;
