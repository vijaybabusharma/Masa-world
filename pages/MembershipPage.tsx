
import React, { useState } from 'react';
import { NavigationProps, MembershipType, PartnershipType } from '../types';
import { 
    CheckIcon, 
    UsersIcon, 
    GlobeIcon, 
    AcademicCapIcon, 
    BriefcaseIcon, 
    ShieldCheckIcon, 
    HeartIcon, 
    SparklesIcon
} from '../components/icons/FeatureIcons';
import MembershipModal from '../components/MembershipModal';
import PartnershipModal from '../components/PartnershipModal';
import NominationModal from '../components/NominationModal';

const PageHeader: React.FC = () => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Become a Member</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Join a global community committed to empowering youth through sports, education, and culture.
            </p>
            <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
                MASA World Foundation offers flexible membership options for individuals, institutions, and global supporters who wish to contribute, participate, and grow with our mission.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <SparklesIcon className="h-4 w-4 text-masa-orange" />
                <span className="text-sm text-gray-200 font-medium">Coming Soon: AI-enabled tools for digital reporting and impact tracking for all members.</span>
            </div>
        </div>
    </div>
);

const TrustAndTransparencySection: React.FC = () => {
    const trustPoints = [
        { icon: ShieldCheckIcon, text: "Registered NGO" },
        { icon: HeartIcon, text: "Full Transparency" },
        { icon: SparklesIcon, text: "Impact Reports" },
        { icon: GlobeIcon, text: "National & Global Reach" },
    ];
    return (
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
                    {trustPoints.map((point) => (
                        <div key={point.text} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 border border-gray-200">
                                <point.icon className="h-7 w-7 text-masa-blue" />
                            </div>
                            <p className="font-semibold text-gray-700">{point.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTA: React.FC<{ onFree: () => void; onPaid: () => void; onDonate: () => void; }> = ({ onFree, onPaid, onDonate }) => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-orange-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-masa-charcoal">Your Membership Creates Real Impact</h2>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button onClick={onFree} className="bg-masa-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">
                    Join Free
                </button>
                <button onClick={onPaid} className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                    Become a Member
                </button>
                <button onClick={onDonate} className="bg-transparent border-2 border-masa-charcoal text-masa-charcoal px-8 py-3 rounded-full font-bold hover:bg-masa-charcoal hover:text-white transition-colors">
                    Donate Now
                </button>
            </div>
        </div>
    </section>
);

interface MembershipTier {
    title: string;
    description: string;
    benefits: string[];
    buttonText: string;
    action: () => void;
    tierType: 'free' | 'paid' | 'special';
}

const MembershipPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [membershipModal, setMembershipModal] = useState<MembershipType | null>(null);
    const [partnershipModal, setPartnershipModal] = useState<PartnershipType | null>(null);
    const [nominationModal, setNominationModal] = useState(false);

    const tiers: MembershipTier[] = [
        {
            title: "Community Member",
            description: "For supporters, students, and well-wishers.",
            benefits: ["Digital newsletter", "Event & activity updates", "Community participation"],
            buttonText: "Join Free",
            action: () => setMembershipModal('Community'),
            tierType: "free",
        },
        {
            title: "Youth / Student Member",
            description: "For school & college students.",
            benefits: ["Training & event priority", "Participation certificates", "Youth programs access"],
            buttonText: "Join as Student",
            action: () => setMembershipModal('Student / Youth'),
            tierType: "free",
        },
        {
            title: "Volunteer Member",
            description: "For active volunteers contributing their time.",
            benefits: ["Volunteer ID & certificate", "Experience letter", "Leadership opportunities"],
            buttonText: "Apply as Volunteer",
            action: () => navigateTo('volunteer'),
            tierType: "special",
        },
        {
            title: "Supporting Member",
            description: "For individuals supporting financially (Annual).",
            benefits: ["All free benefits", "Official certificate", "Priority event access", "Annual impact report"],
            buttonText: "Become Supporting Member",
            action: () => setMembershipModal('Supporting'),
            tierType: "paid",
        },
        {
            title: "Life Member",
            description: "For long-term supporters (One-Time).",
            benefits: ["Lifetime membership", "Website recognition", "VIP invitations", "Advisory opportunities"],
            buttonText: "Become Life Member",
            action: () => setMembershipModal('Life'),
            tierType: "paid",
        },
        {
            title: "International Member",
            description: "For global supporters & NRIs.",
            benefits: ["Global participation", "International reports", "Global community access"],
            buttonText: "Join Internationally",
            action: () => setMembershipModal('International'),
            tierType: "paid",
        },
        {
            title: "Institutional Member",
            description: "For schools, colleges, and academies.",
            benefits: ["Co-branded programs", "Student engagement", "Academic collaborations"],
            buttonText: "Institutional Membership",
            action: () => setPartnershipModal('Institutional'),
            tierType: "special",
        },
        {
            title: "Corporate / CSR Member",
            description: "For companies & CSR partners.",
            benefits: ["CSR implementation", "Impact reporting", "Brand visibility"],
            buttonText: "Corporate Partnership",
            action: () => setPartnershipModal('Corporate'),
            tierType: "special",
        },
        {
            title: "Honorary / Advisory Member",
            description: "For leaders, experts, advisors (By Invitation).",
            benefits: ["Honorary recognition", "Advisory role", "No fee"],
            buttonText: "Submit Nomination",
            action: () => setNominationModal(true),
            tierType: "special",
        },
    ];

    return (
        <div className="bg-gray-50">
            {membershipModal && <MembershipModal membershipType={membershipModal} onClose={() => setMembershipModal(null)} navigateTo={navigateTo as any} />}
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            {nominationModal && <NominationModal onClose={() => setNominationModal(false)} />}
            
            <PageHeader />
            
            <section id="membership-tiers" className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tiers.map((tier) => (
                            <div key={tier.title} className={`bg-white rounded-2xl shadow-lg border-t-4 p-8 flex flex-col ${
                                tier.tierType === 'paid' ? 'border-masa-orange' : (tier.tierType === 'special' ? 'border-masa-charcoal' : 'border-masa-blue')
                            }`}>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{tier.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {tier.benefits.map((b) => (
                                        <li key={b} className="flex items-start text-sm text-gray-700">
                                            <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> {b}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={tier.action}
                                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors mt-auto ${
                                        tier.tierType === 'paid' ? 'bg-masa-orange hover:bg-orange-600' : (tier.tierType === 'special' ? 'bg-masa-charcoal hover:bg-gray-800' : 'bg-masa-blue hover:bg-blue-900')
                                    }`}
                                >
                                    {tier.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TrustAndTransparencySection />

            <FinalCTA 
                onFree={() => setMembershipModal('Community')}
                onPaid={() => setMembershipModal('Supporting')}
                onDonate={() => navigateTo('donate')}
            />
        </div>
    );
};

export default MembershipPage;
