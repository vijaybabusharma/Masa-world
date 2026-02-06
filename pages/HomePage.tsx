
import React, { useState, useEffect } from 'react';
import { NavigationProps, PartnershipType, GlobalSettings } from '../types';
import FounderMessageSection from '../components/FounderMessageSection';
import ImpactSnapshot from '../components/ImpactSnapshot';
import WhatWeDoSection from '../components/WhatWeDoSection';
import CommunityVoicesSection from '../components/CommunityVoicesSection';
import TrustSection from '../components/TrustSection';
import LatestNewsAndEvents from '../components/LatestNewsAndEvents';
import IncredibleSection, { DeliveryAreaItem } from '../components/IncredibleSection';
import HowWeWorkSection from '../components/HowWeWorkSection';
import CareersSection from '../components/CareersSection';
import HeroSection from '../components/HeroSection';
import GetInvolvedSection from '../components/GetInvolvedSection';
import FinalCta from '../components/FinalCta';
import PartnershipModal from '../components/PartnershipModal';
import { ContentManager } from '../utils/contentManager';

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

    const deliveryItems: DeliveryAreaItem[] = [
        { type: 'Events', title: 'Events', description: 'National & international programs, competitions, and social initiatives.' },
        { type: 'Trainings', title: 'Trainings', description: 'Skill development, leadership, and discipline-focused programs.' },
        { type: 'Awards', title: 'Awards', description: 'Recognition of excellence, dedication, and real-life heroes.' },
        { type: 'Records', title: 'Records', description: 'Documenting extraordinary achievements and milestones.' },
        { type: 'Conferences', title: 'Conferences', description: 'Knowledge sharing, collaboration, and global dialogue.' }
    ];

    const sections = settings.sections;

    return (
        <>
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            
            <HeroSection navigateTo={navigateTo} />
            
            {sections.impactSnapshot.visible && <ImpactSnapshot />}
            {sections.whatWeDo.visible && <WhatWeDoSection navigateTo={navigateTo} />}
            {sections.incredibleSection.visible && 
                <IncredibleSection 
                    navigateTo={navigateTo}
                    title={sections.incredibleSection.title || "Let's Create Incredible!"}
                    description={sections.incredibleSection.subtitle || "We organize, manage, and host impactful activities across sports, education, and culture to engage communities and drive our mission forward—locally and globally."}
                    items={deliveryItems} 
                />
            }

            <HowWeWorkSection />

            {sections.founderMessage.visible && <FounderMessageSection navigateTo={navigateTo} bgColor="bg-white" />}
            {sections.trust.visible && <TrustSection navigateTo={navigateTo} />}
            {sections.upcomingEvents.visible && <LatestNewsAndEvents navigateTo={navigateTo} />}
            {sections.getInvolved.visible && <GetInvolvedSection navigateTo={navigateTo} onPartnerClick={setPartnershipModal} />}
            {sections.careers.visible && <CareersSection navigateTo={navigateTo} />}
            {sections.communityVoices.visible && <CommunityVoicesSection navigateTo={navigateTo} />}
            {sections.finalCta.visible && <FinalCta navigateTo={navigateTo} />}
            
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
