
import React from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { TrophyIcon, SparklesIcon, UsersIcon, HeartIcon, CheckIcon } from '../components/icons/FeatureIcons';

const AwardsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <ActivityPageLayout
            navigateTo={navigateTo}
            heroData={{
                title: "MASA Awards & Recognition",
                subtitle: "Celebrating the unsung heroes who build our communities.",
                primaryCtaLabel: "Submit Nomination",
                primaryCtaAction: () => navigateTo('contact'),
                bgImage: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=1600&q=80"
            }}
            overviewData={{
                title: "Honoring Real Heroes",
                description: "Our Awards initiative is dedicated to finding and celebrating the everyday heroes whose selfless contributions often go unnoticed. From dedicated teachers and sanitation workers to honest officials, we believe their stories are a powerful source of inspiration for the entire nation.",
                relevance: "Creating a culture of appreciation and recognition across Indian society."
            }}
            focusAreas={[
                { icon: UsersIcon, label: "Youth Excellence" },
                { icon: HeartIcon, label: "Social Impact" },
                { icon: TrophyIcon, label: "Sports Achievement" },
                { icon: SparklesIcon, label: "Community Leadership" },
                { icon: CheckIcon, label: "Integrity & Service" },
            ]}
            processSteps={[
                { title: "Nomination", description: "Open call for nominations from the public via our online form." },
                { title: "Verification", description: "Rigorous background check of contributions and impact." },
                { title: "Jury Selection", description: "An independent jury selects the most impactful stories." },
                { title: "Ceremony", description: "Public recognition ceremony to honor the awardees." },
            ]}
            activities={[
                {
                    title: "Real Hero Awards 2023",
                    date: "Dec 2023",
                    location: "New Delhi",
                    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=600&q=80",
                    status: "Completed"
                },
                {
                    title: "Sanitation Warriors Felicitation",
                    date: "Oct 2023",
                    location: "Mumbai",
                    image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80",
                    status: "Completed"
                },
                {
                    title: "Teacher's Day Honors",
                    date: "Sept 2024",
                    location: "Nationwide",
                    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
                    status: "Upcoming"
                },
            ]}
            participants={[
                "Social Workers",
                "Teachers & Educators",
                "Sanitation Workers",
                "Civic Officials",
                "Brave Citizens"
            ]}
            impactMetrics={[
                { value: "100+", label: "Heroes Honored" },
                { value: "50+", label: "Cities Reached" },
                { value: "10k+", label: "Lives Inspired" },
                { value: "Annual", label: "Ceremony" },
            ]}
            testimonial={{
                quote: "Receiving this award was not just an honor for me, but for my entire team. It tells us our work matters.",
                author: "Ramesh P.",
                role: "Sanitation Worker & Awardee"
            }}
            ctaData={{
                title: "Know a Hero?",
                text: "Help us find the next inspiring story. Nominations are open year-round.",
                primaryLabel: "Submit Nomination",
                primaryAction: () => navigateTo('contact'),
                secondaryLabel: "View Hall of Fame",
                secondaryAction: () => navigateTo('gallery')
            }}
        />
    );
};

export default AwardsPage;
