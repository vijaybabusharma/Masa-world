
import React, { useEffect, useState } from 'react';
import { 
    UsersIcon, 
    PresentationChartBarIcon,
    GlobeIcon,
    ClockIcon
} from './icons/FeatureIcons';
import { getStats } from '../utils/mockBackend';
import { ContentManager } from '../utils/contentManager';

const ImpactSnapshot: React.FC = () => {
    const [stats, setStats] = useState({
        youth: 75000,
        programs: 650,
        globalReach: 114,
        years: 13,
    });

    useEffect(() => {
        const calculateStats = async () => {
            const settings = ContentManager.getSettings();
            const overrides = settings.homepage.impactStats;

            if (overrides && overrides.enabled) {
                setStats({
                    youth: overrides.youth,
                    programs: overrides.programs,
                    globalReach: overrides.globalReach,
                    years: overrides.years,
                });
            } else {
                const backendStats = await getStats();
                const foundationStartYear = 2011;
                const currentYear = new Date().getFullYear();

                setStats({
                    youth: 75000 + ((backendStats.members || 0) + (backendStats.pledges || 0) + (backendStats.enrollments || 0)),
                    programs: 650 + ((backendStats.volunteers || 0) + (backendStats.enrollments || 0)),
                    globalReach: 114 + (backendStats.countries || 0),
                    years: currentYear - foundationStartYear,
                });
            }
        };

        calculateStats();
        
        const handleSettingsUpdate = () => calculateStats();
        window.addEventListener('masa-settings-updated', handleSettingsUpdate);
        return () => window.removeEventListener('masa-settings-updated', handleSettingsUpdate);
    }, []);

    const metrics = [
        { icon: UsersIcon, value: `${stats.youth.toLocaleString()}+`, label: "Youth", color: "text-masa-orange" },
        { icon: PresentationChartBarIcon, value: `${stats.programs.toLocaleString()}+`, label: "Programs", color: "text-masa-blue" },
        { icon: GlobeIcon, value: `${stats.globalReach.toLocaleString()}+`, label: "Global Reach", color: "text-green-600" },
        { icon: ClockIcon, value: `${stats.years}+`, label: "Years of Impact", color: "text-purple-600" }
    ];

    return (
        <div className="bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 py-8 md:py-12 px-4 md:px-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {metrics.map((metric, index) => (
                            <div key={index} className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 p-6 transition-transform hover:scale-105 duration-300">
                                <div className={`p-4 rounded-2xl bg-gray-50/50 ${metric.color} bg-opacity-10`}>
                                    <metric.icon className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0" />
                                </div>
                                <div className="text-center md:text-left">
                                    <p className={`text-3xl sm:text-4xl lg:text-5xl font-black ${metric.color} tracking-tighter leading-none mb-1`}>
                                        {metric.value}
                                    </p>
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-gray-400 leading-tight">
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
