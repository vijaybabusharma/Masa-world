
import React from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { DocumentCheckIcon, SparklesIcon, TrophyIcon, GlobeIcon, UsersIcon } from '../components/icons/FeatureIcons';

const RecordsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <ActivityPageLayout
            navigateTo={navigateTo}
            heroData={{
                title: "Our Records",
                subtitle: "Showcasing extraordinary feats of discipline, dedication, and human spirit.",
                primaryCtaLabel: "Attempt a Record",
                primaryCtaAction: () => navigateTo('contact'),
                bgImage: "https://picsum.photos/1600/900?grayscale&blur=2&random=50"
            }}
            overviewData={{
                title: "Pushing the Boundaries",
                description: "We believe in celebrating extraordinary achievements to inspire the wider community. This space is dedicated to the official records set by individuals and groups associated with our foundation, showcasing exceptional skill, endurance, and commitment.",
                relevance: "Documenting Indian talent on national and international platforms."
            }}
            focusAreas={[
                { icon: SparklesIcon, label: "Human Potential" },
                { icon: TrophyIcon, label: "Endurance" },
                { icon: DocumentCheckIcon, label: "Verification" },
                { icon: GlobeIcon, label: "Global Standards" },
                { icon: UsersIcon, label: "Inspiration" },
            ]}
            processSteps={[
                { title: "Apply", description: "Submit proposal for a record attempt." },
                { title: "Prepare", description: "Training and logistical setup." },
                { title: "Attempt", description: "Official performance before adjudicators." },
                { title: "Certify", description: "Verification and awarding of the record." },
            ]}
            activities={[
                {
                    title: "Mass Yoga Session Record",
                    date: "June 21, 2023",
                    location: "Lucknow",
                    image: "https://picsum.photos/600/400?random=51",
                    status: "Record Holder"
                },
                {
                    title: "Non-Stop Skating Marathon",
                    date: "Feb 2023",
                    location: "Chandigarh",
                    image: "https://picsum.photos/600/400?random=52",
                    status: "Record Holder"
                },
                {
                    title: "Largest Self-Defense Lesson",
                    date: "Pending",
                    location: "Delhi",
                    image: "https://picsum.photos/600/400?random=53",
                    status: "Upcoming Attempt"
                },
            ]}
            participants={[
                "Athletes",
                "Student Groups",
                "Martial Artists",
                "Talented Individuals",
                "Schools"
            ]}
            impactMetrics={[
                { value: "10+", label: "Official Records" },
                { value: "1000+", label: "Participants" },
                { value: "National", label: "Recognition" },
                { value: "Global", label: "Aspirations" },
            ]}
            testimonial={{
                quote: "Training for the record was as much a mental challenge as a physical one. The support from the Masa community was my constant motivation.",
                author: "Record Holder",
                role: "Endurance Skater"
            }}
            ctaData={{
                title: "Make History With Us",
                text: "Do you have a unique talent? Let's showcase it to the world.",
                primaryLabel: "Register Attempt",
                primaryAction: () => navigateTo('contact'),
                secondaryLabel: "View Records",
                secondaryAction: () => navigateTo('gallery')
            }}
        />
    );
};

export default RecordsPage;
