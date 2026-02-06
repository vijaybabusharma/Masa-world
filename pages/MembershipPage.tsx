
import React, { useState } from 'react';
import { NavigationProps, PartnershipType } from '../types';
import { 
    CheckIcon, 
    ShieldCheckIcon, 
    HeartIcon, 
    SparklesIcon,
    GlobeIcon,
    UsersIcon,
    BriefcaseIcon,
    ArrowRightIcon,
    AcademicCapIcon
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
        </div>
    </div>
);

interface MembershipTier {
    title: string;
    description: string;
    benefits: string[];
    price: string;
    duration: string;
    icon: any;
    tierType: 'free' | 'paid' | 'special';
}

const MembershipPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
    const [partnershipModal, setPartnershipModal] = useState<PartnershipType | null>(null);
    const [nominationModal, setNominationModal] = useState(false);

    const tiers: MembershipTier[] = [
        {
            title: "Community Member",
            description: "For supporters, students, and well-wishers who want to stay connected.",
            price: "Free",
            duration: "Lifetime",
            benefits: ["Digital newsletter subscription", "Event & activity updates", "Community participation rights"],
            icon: UsersIcon,
            tierType: "free",
        },
        {
            title: "Youth / Student Member",
            description: "Dedicated to school & college students for skill building.",
            price: "Free",
            duration: "Annual",
            benefits: ["Priority access to trainings", "Participation certificates", "Mentorship opportunities", "Youth network access"],
            icon: AcademicCapIcon,
            tierType: "free",
        },
        {
            title: "Volunteer Member",
            description: "For active contributors giving their time and skills.",
            price: "Time Contribution",
            duration: "Project Based",
            benefits: ["Official Volunteer ID Card", "Experience Letter / Certificate", "Leadership opportunities", "Network with changemakers"],
            icon: HeartIcon,
            tierType: "special",
        },
        {
            title: "Supporting Member",
            description: "For individuals enabling our work through financial support.",
            price: "₹999",
            duration: "Annual",
            benefits: ["All free benefits included", "Official Digital Membership Card", "Priority seating at events", "Annual Impact Report"],
            icon: SparklesIcon,
            tierType: "paid",
        },
        {
            title: "Life Member",
            description: "For committed long-term patrons of our mission.",
            price: "₹10,000",
            duration: "Lifetime",
            benefits: ["Lifetime Membership Status", "Name on Website Supporter Wall", "VIP Event Invitations", "Advisory Board Eligibility"],
            icon: ShieldCheckIcon,
            tierType: "paid",
        },
        {
            title: "International Member",
            description: "For global citizens and NRIs supporting from abroad.",
            price: "$50",
            duration: "Annual",
            benefits: ["Global network access", "International impact reports", "Cross-cultural exchange priority"],
            icon: GlobeIcon,
            tierType: "paid",
        },
    ];

    const handleApply = (tier: MembershipTier) => {
        if (tier.title === "Volunteer Member") {
            navigateTo('volunteer');
        } else {
            setSelectedTier(tier);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {selectedTier && (
                <MembershipModal 
                    tier={selectedTier}
                    onClose={() => setSelectedTier(null)}
                />
            )}
            {partnershipModal && <PartnershipModal partnershipType={partnershipModal} onClose={() => setPartnershipModal(null)} />}
            {nominationModal && <NominationModal onClose={() => setNominationModal(false)} />}
            
            <PageHeader />
            
            <section id="membership-tiers" className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tiers.map((tier) => (
                            <div key={tier.title} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group relative">
                                {/* Header */}
                                <div className="p-6 pb-0">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-full ${tier.tierType === 'paid' ? 'bg-orange-100 text-masa-orange' : 'bg-blue-100 text-masa-blue'}`}>
                                            <tier.icon className="h-6 w-6" />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${tier.tierType === 'paid' ? 'border-masa-orange text-masa-orange' : 'border-gray-300 text-gray-500'}`}>
                                            {tier.duration}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-masa-charcoal mb-2">{tier.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="px-6 mb-4">
                                    <span className="text-3xl font-extrabold text-masa-charcoal">{tier.price}</span>
                                    {tier.tierType === 'paid' && <span className="text-gray-500 text-sm font-medium"> / {tier.duration}</span>}
                                </div>

                                {/* Benefits */}
                                <div className="px-6 pb-6 flex-grow border-t border-gray-50 pt-4">
                                    <ul className="space-y-3">
                                        {tier.benefits.map((b, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                                <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action */}
                                <div className="p-6 pt-0 mt-auto">
                                    <button
                                        onClick={() => handleApply(tier)}
                                        className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                                            tier.tierType === 'paid' 
                                            ? 'bg-masa-orange text-white hover:bg-orange-600 shadow-md' 
                                            : 'bg-masa-blue text-white hover:bg-blue-900'
                                        }`}
                                    >
                                        Apply Now <ArrowRightIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Partnerships Section */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-center text-masa-charcoal mb-10">Institutional & Corporate Partnerships</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-purple-100 p-3 rounded-full text-purple-600"><BriefcaseIcon className="h-6 w-6"/></div>
                                    <h3 className="font-bold text-lg text-masa-charcoal">Corporate / CSR</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-6">Partner with us for CSR initiatives, employee engagement, and impactful social projects with full reporting.</p>
                                <button onClick={() => setPartnershipModal('Corporate')} className="text-purple-600 font-bold text-sm hover:underline">Inquire for Partnership &rarr;</button>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600"><AcademicCapIcon className="h-6 w-6"/></div>
                                    <h3 className="font-bold text-lg text-masa-charcoal">Institutional</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-6">For schools and colleges to integrate our leadership and skill-building modules into their curriculum.</p>
                                <button onClick={() => setPartnershipModal('Institutional')} className="text-green-600 font-bold text-sm hover:underline">Apply for Institution &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MembershipPage;
