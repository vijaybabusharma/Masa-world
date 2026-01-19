
import React from 'react';
import { NavigationProps, Page } from '../types';
import { ShieldCheckIcon, EyeIcon, PresentationChartBarIcon, GlobeIcon, ArrowRightIcon } from './icons/FeatureIcons';

interface TrustPoint {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    text: string;
    cta: {
        label: string;
        page: Page;
    } | null;
}

const trustPoints: TrustPoint[] = [
    {
        icon: ShieldCheckIcon,
        title: "Registered",
        text: "Fully compliant non-profit entity.",
        cta: null
    },
    {
        icon: EyeIcon,
        title: "Transparent",
        text: "100% accountability for every rupee.",
        cta: {
            label: "Details",
            page: "contact"
        }
    },
    {
        icon: PresentationChartBarIcon,
        title: "Impact First",
        text: "Focused on tangible ground results.",
        cta: {
            label: "Reports",
            page: "contact"
        }
    },
    {
        icon: GlobeIcon,
        title: "Global Reach",
        text: "Connecting local needs to global aid.",
        cta: {
            label: "Join",
            page: "membership"
        }
    }
];

const TrustSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <section className="bg-masa-blue text-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                         <h2 className="text-2xl font-bold">Trust & Integrity</h2>
                         <p className="text-blue-200 text-sm">The foundation of everything we do.</p>
                    </div>

                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                        {trustPoints.map((point, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => point.cta && navigateTo(point.cta.page)}>
                                <point.icon className="h-8 w-8 text-masa-orange mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-sm">{point.title}</h3>
                                <p className="text-xs text-blue-200 mt-1 hidden lg:block">{point.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 md:mt-0">
                        <button 
                            onClick={() => navigateTo('about')}
                            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center"
                        >
                            Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
