
import React, { useState } from 'react';
import { NavigationProps, PartnershipType } from '../types';
import FounderMessageSection from '../components/FounderMessageSection';
import ImpactSnapshot from '../components/ImpactSnapshot';
import WhatWeDoSection from '../components/WhatWeDoSection';
import CommunityVoicesSection from '../components/CommunityVoicesSection';
import TrustSection from '../components/TrustSection';
import LatestNewsAndEvents from '../components/LatestNewsAndEvents';
import IncredibleSection, { DeliveryAreaItem } from '../components/IncredibleSection';
import CareersSection from '../components/CareersSection';
import HeroSection from '../components/HeroSection';
import GetInvolvedSection from '../components/GetInvolvedSection';
import FinalCta from '../components/FinalCta';
import PartnershipModal from '../components/PartnershipModal';

// --- MAIN HOME PAGE COMPONENT (RE-ARRANGED) ---
const HomePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [partnershipModal, setPartnershipModal] = useState<PartnershipType | null>(null);

    const deliveryItems: DeliveryAreaItem[] = [
        { type: 'Events', title: 'Events', description: 'National & international programs, competitions, and social initiatives.' },
        { type: 'Trainings', title: 'Trainings', description: 'Skill development, leadership, and discipline-focused programs.' },
        { type: 'Awards', title: 'Awards', description: 'Recognition of excellence, dedication, and real-life heroes.' },
        { type: 'Records', title: 'Records', description: 'Documenting extraordinary achievements and milestones.' },
        { type: 'Conferences', title: 'Conferences', description: 'Knowledge sharing, collaboration, and global dialogue.' }
    ];

    return (
        <>
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            
            {/* 1. Hook: Attract and state mission */}
            <HeroSection navigateTo={navigateTo} />
            
            {/* 2. Credibility: Show scale and impact immediately */}
            <ImpactSnapshot />
            
            {/* 3. The "What": Explain core pillars */}
            <WhatWeDoSection navigateTo={navigateTo} />
            
            {/* 4. The "How": Detail the activities */}
            <IncredibleSection 
                navigateTo={navigateTo}
                title="Let's Create Incredible!"
                description="We organize, manage, and host impactful activities across sports, education, and culture to engage communities and drive our mission forward—locally and globally."
                items={deliveryItems} 
            />
            
            {/* 5. The "Who": Add a human connection with the founder */}
            <FounderMessageSection navigateTo={navigateTo} bgColor="bg-white" />
            
            {/* 6. Social Proof: Show impact on real people */}
            <CommunityVoicesSection navigateTo={navigateTo} />
            
            {/* 7. Trust: Build confidence with accountability */}
            <TrustSection navigateTo={navigateTo} />
            
            {/* 8. Timeliness: Show the organization is currently active */}
            <LatestNewsAndEvents navigateTo={navigateTo} />

            {/* 9. CTA 1 (Specific): Offer career opportunities */}
            <CareersSection navigateTo={navigateTo} />
            
            {/* 10. CTA 2 (Broad): The main call for involvement */}
            <GetInvolvedSection navigateTo={navigateTo} onPartnerClick={setPartnershipModal} />
            
            {/* 11. Final CTA: A final, powerful ask */}
            <FinalCta navigateTo={navigateTo} />
            
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
