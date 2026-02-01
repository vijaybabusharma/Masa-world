
import React from 'react';
import { NavigationProps, PartnershipType } from '../types';
import { 
    HeartIcon, 
    UsersIcon, 
    HandshakeIcon, 
    SparklesIcon
} from './icons/FeatureIcons';

interface GetInvolvedSectionProps extends NavigationProps {
    onPartnerClick: (type: PartnershipType) => void;
}

const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ navigateTo, onPartnerClick }) => {
    const actions = [
        { 
            type: 'nav' as const,
            icon: HeartIcon, 
            title: "Volunteer With Us", 
            desc: "Join our on-ground teams and lend your skills to create direct, measurable change in communities.", 
            page: 'volunteer' as const,
            anchor: 'volunteer-form', 
            buttonText: "Volunteer Registration", 
            color: 'default' 
        },
        { 
            type: 'nav' as const,
            icon: UsersIcon, 
            title: "Become a Member", 
            desc: "Become a core supporter of our long-term vision. Members are the backbone of our foundation.", 
            page: 'membership' as const,
            buttonText: "Explore Memberships", 
            color: 'orange' 
        },
        { 
            type: 'modal' as const,
            icon: HandshakeIcon, 
            title: "Partner / Collaborate", 
            desc: "Collaborate with us to scale impact. We partner with schools, companies, and NGOs to build sustainable programs.", 
            modal: 'Corporate' as PartnershipType,
            buttonText: "Partner With Us", 
            color: 'default' 
        },
        { 
            type: 'nav' as const,
            icon: SparklesIcon, 
            title: "Donate & Support", 
            desc: "Fuel our mission with a financial contribution. Every donation directly supports a child, an athlete, or a community project.", 
            page: 'donate' as const,
            buttonText: "Donate Now", 
            color: 'highlight' 
        }
    ];

    const handleClick = (action: typeof actions[number]) => {
        if (action.type === 'nav') {
            navigateTo(action.page, (action as any).anchor);
        } else if (action.type === 'modal') {
            onPartnerClick(action.modal);
        }
    };
    
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Get Involved</h2>
                    <p className="mt-4 text-lg text-gray-600">Join our mission to create a lasting impact. Whether you volunteer, donate, or partner with us, your contribution matters.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {actions.map((a) => (
                        <div key={a.title} className={`p-8 rounded-2xl shadow-lg flex flex-col text-center items-center group transition-all duration-300 transform hover:-translate-y-1 ${a.color === 'highlight' ? 'bg-masa-orange text-white' : 'bg-white border border-gray-200'}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-colors duration-300 ${a.color === 'highlight' ? 'bg-white/20' : 'bg-orange-50 group-hover:bg-masa-orange'}`}>
                                <a.icon className={`h-8 w-8 transition-colors duration-300 ${a.color === 'highlight' ? 'text-white' : 'text-masa-orange group-hover:text-white'}`} />
                            </div>
                            <h3 className={`text-xl font-bold ${a.color === 'highlight' ? 'text-white' : 'text-masa-charcoal'}`}>{a.title}</h3>
                            <p className={`my-4 flex-grow text-sm ${a.color === 'highlight' ? 'text-orange-100' : 'text-gray-600'}`}>{a.desc}</p>
                            
                            <button 
                                onClick={() => handleClick(a)} 
                                className={`mt-auto font-bold py-3 px-8 rounded-full transition-all duration-300 w-full ${
                                    a.color === 'highlight' ? 'bg-white text-masa-orange hover:bg-orange-50' : 
                                    (a.color === 'orange' ? 'bg-masa-orange text-white hover:bg-orange-600' : 'bg-white border-2 border-masa-blue text-masa-blue hover:bg-masa-blue hover:text-white')
                                }`}
                            >
                                {a.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GetInvolvedSection;
