
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
        // This function simulates fetching and calculating live data.
        const calculateStats = () => {
            const backendStats = getStats();
            // To match the requested "13+ Years", the start year is adjusted to 2011 (assuming current year is 2024).
            const foundationStartYear = 2011;
            const currentYear = new Date().getFullYear();

            const youthImpacted = 75000 + (backendStats.members + backendStats.pledges + backendStats.enrollments);
            const programsConducted = 650 + (backendStats.volunteers + backendStats.enrollments + backendStats.gallery);
            const globalReach = 114 + (backendStats.countries);
            const yearsOfImpact = currentYear - foundationStartYear;

            setStats({
                youth: youthImpacted,
                programs: programsConducted,
                globalReach: globalReach,
                years: yearsOfImpact,
            });
        };

        calculateStats();

        // Simulate a data refresh every 24 hours
        const interval = setInterval(calculateStats, 24 * 60 * 60 * 1000); 
        return () => clearInterval(interval);

    }, []);

    const metrics = [
        { 
            icon: UsersIcon, 
            value: `${stats.youth.toLocaleString()}+`, 
            label: "Youth",
            color: "text-masa-orange"
        },
        { 
            icon: PresentationChartBarIcon, 
            value: `${stats.programs.toLocaleString()}+`, 
            label: "Programs",
            color: "text-masa-blue"
        },
        { 
            icon: GlobeIcon, 
            value: `${stats.globalReach.toLocaleString()}+`, 
            label: "Global Reach",
            color: "text-green-600"
        },
        {
            icon: ClockIcon,
            value: `${stats.years}+`,
            label: "Years",
            color: "text-purple-600"
        }
    ];

    return (
        <div className="bg-masa-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-around items-center py-6 px-4 md:divide-x md:divide-gray-200 space-y-6 md:space-y-0">
                        {metrics.map((metric, index) => (
                            <div key={index} className="flex-1 flex justify-center items-center gap-4 px-4">
                                <metric.icon className={`h-8 w-8 flex-shrink-0 ${metric.color}`} />
                                <div className="text-left">
                                    <p className={`text-3xl lg:text-4xl font-black ${metric.color} tracking-tight`}>
                                        {metric.value}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-600 leading-tight">
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
