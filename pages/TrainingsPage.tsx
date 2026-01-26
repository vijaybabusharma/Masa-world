
import React from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { AcademicCapIcon, BriefcaseIcon, ShieldCheckIcon, UsersIcon, TrophyIcon } from '../components/icons/FeatureIcons';

const TrainingsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <ActivityPageLayout
            navigateTo={navigateTo}
            heroData={{
                title: "Our Trainings",
                subtitle: "Building the leaders of tomorrow with discipline and skill.",
                primaryCtaLabel: "Join a Training",
                primaryCtaAction: () => navigateTo('contact'),
                bgImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80"
            }}
            overviewData={{
                title: "Discipline, Leadership, and Skill Building",
                description: "Our training programs range from short-term courses for deprived sections of society to specialized coaching for sports professionals. We provide training to sports coaches for effective public dealing, making them more people-centric. Additionally, our youth development programs strive to instill leadership qualities and practical life skills.",
                relevance: "Bridging the gap between academic education and real-world employability in India."
            }}
            focusAreas={[
                { icon: TrophyIcon, label: "Sports Training" },
                { icon: UsersIcon, label: "Leadership Training" },
                { icon: ShieldCheckIcon, label: "Life Skills & Discipline" },
                { icon: BriefcaseIcon, label: "Community Capacity Building" },
                { icon: AcademicCapIcon, label: "Vocational Skills" },
            ]}
            processSteps={[
                { title: "Assess", description: "Identifying skill gaps in target groups." },
                { title: "Train", description: "Rigorous theoretical and practical sessions." },
                { title: "Mentor", description: "Ongoing guidance from industry experts." },
                { title: "Certify", description: "Recognition of skills acquired." },
            ]}
            activities={[
                {
                    title: "Youth Leadership Bootcamp",
                    date: "Monthly",
                    location: "Regional Centers",
                    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600&q=80",
                    status: "Current Training"
                },
                {
                    title: "Sports Coaches Training",
                    date: "Quarterly",
                    location: "National Sports Complex",
                    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80",
                    status: "Upcoming Training"
                },
                {
                    title: "Digital Literacy Workshop",
                    date: "Last Batch: June",
                    location: "Rural Centers",
                    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
                    status: "Past Training"
                },
            ]}
            participants={[
                "Students (15-25 yrs)",
                "Sports Coaches",
                "Women & Girls",
                "Job Seekers",
                "Rural Youth"
            ]}
            impactMetrics={[
                { value: "5000+", label: "Youth Trained" },
                { value: "200+", label: "Workshops" },
                { value: "95%", label: "Completion Rate" },
                { value: "500+", label: "Placements" },
            ]}
            testimonial={{
                quote: "The 3-day leadership training was transformative. It wasn't just about theory; the practical exercises taught me more about teamwork and responsibility than years of classroom learning.",
                author: "Rohan K.",
                role: "Youth Participant"
            }}
            ctaData={{
                title: "Upgrade Your Skills",
                text: "Invest in yourself or sponsor a training for those who cannot afford it.",
                primaryLabel: "Join Training",
                primaryAction: () => navigateTo('contact'),
                secondaryLabel: "Request Training",
                secondaryAction: () => navigateTo('contact')
            }}
        />
    );
};

export default TrainingsPage;
