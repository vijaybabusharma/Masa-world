
import React from 'react';
import { NavigationProps } from '../types';
import { ShieldCheckIcon, UsersIcon, TrophyIcon, HeartIcon, LightBulbIcon, PresentationChartBarIcon } from '../components/icons/FeatureIcons';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const CoreValuesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const values = [
        { 
            title: "Discipline & Integrity", 
            description: "We uphold the highest ethical standards, ensuring honesty and accountability in all our actions.",
            icon: ShieldCheckIcon,
            color: "blue"
        },
        { 
            title: "Inclusivity & Equal Opportunity", 
            description: "We are here 'For Every One', creating equal opportunities regardless of background.",
            icon: UsersIcon,
            color: "orange"
        },
        { 
            title: "Transparency & Accountability", 
            description: "We operate with full transparency, ensuring our partners and donors trust our process.",
            icon: LightBulbIcon,
            color: "emerald"
        },
        { 
            title: "Community Leadership", 
            description: "We empower local leaders to drive change from within their own communities.",
            icon: HeartIcon,
            color: "rose"
        },
        { 
            title: "Sustainable Impact", 
            description: "We focus on creating long-term, self-sustaining change, not just temporary aid.",
            icon: PresentationChartBarIcon,
            color: "yellow"
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: { border: string; bg: string; text: string } } = {
            blue: { border: "border-masa-blue", bg: "bg-blue-50", text: "text-masa-blue" },
            orange: { border: "border-masa-orange", bg: "bg-orange-50", text: "text-masa-orange" },
            yellow: { border: "border-yellow-500", bg: "bg-yellow-50", text: "text-yellow-600" },
            rose: { border: "border-rose-500", bg: "bg-rose-50", text: "text-rose-600" },
            emerald: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600" },
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="bg-gray-50">
            <PageHeader title="Our Core Values" subtitle="The principles that guide every action we take." />
            
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value) => {
                            const Icon = value.icon;
                            const colors = getColorClasses(value.color);
                            return (
                                <div key={value.title} className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 ${colors.border}`}>
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colors.bg}`}>
                                        <Icon className={`h-8 w-8 ${colors.text}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-masa-charcoal mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                        <div className="bg-white p-8 rounded-2xl flex items-center justify-center text-center md:col-span-2 lg:col-span-1">
                            <div>
                                <h3 className="text-2xl font-bold text-masa-charcoal">Join a mission driven by values.</h3>
                                <button 
                                    onClick={() => navigateTo('get-involved')}
                                    className="mt-6 bg-masa-orange text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                                >
                                    Get Involved
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoreValuesPage;