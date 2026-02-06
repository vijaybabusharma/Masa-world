
import React, { useEffect, useState } from 'react';
import { 
    UsersIcon, 
    PresentationChartBarIcon,
    GlobeIcon,
    ClockIcon
} from './icons/FeatureIcons';
import { getStats } from '../utils/mockBackend';

const ImpactSnapshot: React.FC = () => {
    const [stats, setStats] = useState({
        youth: 75000,
        programs: 650,
        globalReach: 114,
        years: 13,
    });

    useEffect(() => {
        const calculateStats = () => {
            const backendStats = getStats();
            const foundationStartYear = 2011;
            const currentYear = new Date().getFullYear();

            setStats({
                youth: 75000 + (backendStats.members + backendStats.pledges + backendStats.enrollments),
                programs: 650 + (backendStats.volunteers + backendStats.enrollments),
                globalReach: 114 + (backendStats.countries),
                years: currentYear - foundationStartYear,
            });
        };
        calculateStats();
    }, []);

    const metrics = [
        { icon: UsersIcon, value: `${stats.youth.toLocaleString()}+`, label: "Youth", color: "text-masa-orange" },
        { icon: PresentationChartBarIcon, value: `${stats.programs.toLocaleString()}+`, label: "Programs", color: "text-masa-blue" },
        { icon: GlobeIcon, value: `${stats.globalReach.toLocaleString()}+`, label: "Global Reach", color: "text-green-600" },
        { icon: ClockIcon, value: `${stats.years}+`, label: "Years of Impact", color: "text-purple-600" }
    ];

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 py-4 md:py-6 px-2 md:px-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {metrics.map((metric, index) => (
                            <div key={index} className="flex justify-center items-center gap-3 md:gap-4 p-4">
                                <metric.icon className={`h-7 w-7 md:h-8 md:w-8 flex-shrink-0 ${metric.color}`} />
                                <div className="text-left">
                                    <p className={`text-2xl sm:text-3xl lg:text-4xl font-black ${metric.color} tracking-tight`}>
                                        {metric.value}
                                    </p>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-tight">
                                        {metric.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactSnapshot;
