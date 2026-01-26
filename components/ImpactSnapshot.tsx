
import React, { useEffect, useState } from 'react';
import { UsersIcon, CalendarDaysIcon, GlobeIcon } from './icons/FeatureIcons';
import { getStats } from '../utils/mockBackend';

const ImpactSnapshot: React.FC = () => {
    // Updated credible figures
    const [stats, setStats] = useState({
        youth: 75000,
        programs: 650,
        communities: 90, 
    });

    useEffect(() => {
        // Fetch stats on mount
        const backendStats = getStats();
        // Simulate base + new activity
        setStats(prev => ({
            youth: 75000 + (backendStats.members || 0), 
            programs: 650 + (backendStats.gallery || 0), 
            communities: 90 + (backendStats.countries || 0), 
        }));
    }, []);

    const metrics = [
        { 
            icon: UsersIcon, 
            value: `${stats.youth.toLocaleString()}+`, 
            label: "Youth Impacted",
            micro: "Lives Transformed"
        },
        { 
            icon: CalendarDaysIcon, 
            value: `${stats.programs.toLocaleString()}+`, 
            label: "Programs Conducted",
            micro: "Since 2013"
        },
        { 
            icon: GlobeIcon, 
            value: `${stats.communities.toLocaleString()}+`, 
            label: "Global Reach",
            micro: "Nations Connected"
        },
    ];

    return (
        <div className="bg-masa-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-gray-100">
                        {metrics.map((metric, index) => (
                            <div key={index} className="p-8 text-center group hover:bg-gray-50 transition-colors duration-300 first:rounded-l-2xl last:rounded-r-2xl">
                                {/* Icon Container - Enhanced definition */}
                                <div className="w-16 h-16 mx-auto bg-orange-50/80 rounded-full flex items-center justify-center mb-5 group-hover:bg-masa-orange group-hover:shadow-md transition-all duration-300 ring-4 ring-white shadow-sm border border-orange-100">
                                    <metric.icon className="h-7 w-7 text-masa-orange group-hover:text-white transition-colors duration-300" />
                                </div>
                                
                                {/* Value - Heavier weight for authority */}
                                <p className="text-4xl lg:text-5xl font-black text-masa-charcoal tracking-tight leading-none mb-3">
                                    {metric.value}
                                </p>
                                
                                {/* Accent Divider - Visual balance */}
                                <div className="h-0.5 w-8 bg-gray-200 mx-auto rounded-full mb-3 group-hover:bg-masa-orange/40 transition-colors"></div>

                                {/* Label - Professional tracking */}
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em]">
                                    {metric.label}
                                </p>

                                {/* Micro-text - Added Context */}
                                <p className="text-[10px] font-medium text-masa-blue mt-1 opacity-80 uppercase tracking-wide">
                                    {metric.micro}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactSnapshot;
