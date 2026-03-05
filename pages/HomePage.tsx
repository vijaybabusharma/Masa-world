
import React, { useState, useEffect } from 'react';
import { NavigationProps, PartnershipType, GlobalSettings, DeliveryAreaItem } from '../types';
import FounderMessageSection from '../components/FounderMessageSection';
import ImpactSnapshot from '../components/ImpactSnapshot';
import WhatWeDoSection from '../components/WhatWeDoSection';
import CommunityVoicesSection from '../components/CommunityVoicesSection';
import TrustSection from '../components/TrustSection';
import LatestNewsAndEvents from '../components/LatestNewsAndEvents';
import IncredibleSection from '../components/IncredibleSection';
import HowWeWorkSection from '../components/HowWeWorkSection';
import CareersSection from '../components/CareersSection';
import HeroSection from '../components/HeroSection';
import GetInvolvedSection from '../components/GetInvolvedSection';
import FinalCta from '../components/FinalCta';
import PartnershipModal from '../components/PartnershipModal';
import GalleryHighlights from '../components/GalleryHighlights';
import CoreFocusSection from '../components/CoreFocusSection';
import CoursesTrainingsSection from '../components/CoursesTrainingsSection';
import { ContentManager } from '../utils/contentManager';

const SectionWrapper: React.FC<{ 
    section: any, 
    children: React.ReactNode, 
    className?: string 
}> = ({ section, children, className = "" }) => {
    if (!section.visible) return null;
    
    const style: React.CSSProperties = {
        paddingTop: section.paddingTop || undefined,
        paddingBottom: section.paddingBottom || undefined,
        textAlign: section.textAlign as any || undefined,
        backgroundColor: section.backgroundColor || undefined,
        backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    
    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
};

const HomePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [partnershipModal, setPartnershipModal] = useState<PartnershipType | null>(null);
    const [settings, setSettings] = useState<GlobalSettings['homepage']>(ContentManager.getSettings().homepage);

    useEffect(() => {
        const loadSettings = () => {
            const currentSettings = ContentManager.getSettings();
            setSettings(currentSettings.homepage);
        };
        loadSettings();
        window.addEventListener('masa-settings-updated', loadSettings);
        return () => window.removeEventListener('masa-settings-updated', loadSettings);
    }, []);

    const deliveryItems: DeliveryAreaItem[] = settings.deliveryItems || [
        { id: 'del-events', type: 'Events', title: 'Events', description: 'National & international programs, competitions, and social initiatives.' },
        { id: 'del-trainings', type: 'Trainings', title: 'Trainings', description: 'Skill development, leadership, and discipline-focused programs.' },
        { id: 'del-awards', type: 'Awards', title: 'Awards', description: 'Recognition of excellence, dedication, and real-life heroes.' },
        { id: 'del-records', type: 'Records', title: 'Records', description: 'Documenting extraordinary achievements and milestones.' },
        { id: 'del-conferences', type: 'Conferences', title: 'Conferences', description: 'Knowledge sharing, collaboration, and global dialogue.' }
    ];

    const sections = settings.sections;

    return (
        <>
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            
            <HeroSection navigateTo={navigateTo} />
            
            <SectionWrapper section={sections.impactSnapshot}>
                <ImpactSnapshot />
            </SectionWrapper>

            <SectionWrapper section={sections.whatWeDo}>
                <WhatWeDoSection navigateTo={navigateTo} />
            </SectionWrapper>

            <CoreFocusSection navigateTo={navigateTo} />

            <CoursesTrainingsSection navigateTo={navigateTo} />

            <SectionWrapper section={sections.incredibleSection}>
                <IncredibleSection 
                    navigateTo={navigateTo}
                    title={sections.incredibleSection.title || "Let's Create Incredible!"}
                    description={sections.incredibleSection.subtitle || "We organize, manage, and host impactful activities across sports, education, and culture to engage communities and drive our mission forward—locally and globally."}
                    items={deliveryItems} 
                />
            </SectionWrapper>

            <HowWeWorkSection />

            <SectionWrapper section={sections.founderMessage}>
                <FounderMessageSection navigateTo={navigateTo} bgColor="bg-white" />
            </SectionWrapper>

            <SectionWrapper section={sections.trust}>
                <TrustSection navigateTo={navigateTo} />
            </SectionWrapper>

            <SectionWrapper section={sections.upcomingEvents}>
                <LatestNewsAndEvents navigateTo={navigateTo} />
            </SectionWrapper>

            <GalleryHighlights navigateTo={navigateTo} />

            <SectionWrapper section={sections.getInvolved}>
                <GetInvolvedSection navigateTo={navigateTo} onPartnerClick={setPartnershipModal} />
            </SectionWrapper>

            <SectionWrapper section={sections.careers}>
                <CareersSection navigateTo={navigateTo} />
            </SectionWrapper>

            <SectionWrapper section={sections.communityVoices}>
                <CommunityVoicesSection navigateTo={navigateTo} />
            </SectionWrapper>

            <SectionWrapper section={sections.finalCta}>
                <FinalCta navigateTo={navigateTo} />
            </SectionWrapper>
            
             <style>{`
                @keyframes fade-in-up { 
                    0% { opacity: 0; transform: translateY(30px) scale(0.98); } 
                    100% { opacity: 1; transform: translateY(0) scale(1); } 
                }
                .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                
                @keyframes ken-burns {
                  0% { transform: scale(1.05) translate(0, 0); }
                  50% { transform: scale(1.1) translate(-1%, 1%); }
                  100% { transform: scale(1.05) translate(0, 0); }
                }
                .animate-ken-burns {
                  animation: ken-burns 30s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default HomePage;
