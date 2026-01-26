
import React, { useEffect, useState } from 'react';
import { UsersIcon, CalendarDaysIcon, HeartIcon, GlobeIcon, TrophyIcon, HandRaisedIcon } from './icons/FeatureIcons';
import { getStats } from '../utils/mockBackend';

const ImpactSnapshot: React.FC = () => {
    // Default fallback values
    const [stats, setStats] = useState({
        youth: 80000,
        programs: 750,
        volunteers: 2500,
        communities: 75,
        pledges: 125000,
        certificates: 130000
    });

    useEffect(() => {
        // Fetch stats on mount
        const backendStats = getStats();
        // Since getStats returns some zeros for initial state, we merge with base values to show "10,000+" instead of just "0" if local storage is empty
        // In a real app, this logic would happen on the backend or we'd just show what we have.
        // Here we simulate the "base" numbers + new activity.
        setStats(prev => ({
            youth: 80000 + (backendStats.pledges || 0) + (backendStats.members || 0), // Rough estimate logic
            programs: 750 + (backendStats.gallery || 0), // Simulating gallery posts as program evidence
            volunteers: 2500 + (backendStats.volunteers || 0),
            communities: 75 + (backendStats.countries || 0), // Adding countries count
            pledges: 125000 + (backendStats.pledges || 0),
            certificates: 125000 + (backendStats.pledges || 0) + (backendStats.volunteers || 0) // Pledges + Vols get certs
        }));
    }, []);

    const metrics = [
        { icon: UsersIcon, value: `${stats.youth.toLocaleString()}+`, label: "Youth Impacted" },
        { icon: CalendarDaysIcon, value: `${stats.programs.toLocaleString()}+`, label: "Programs Conducted" },
        { icon: HandRaisedIcon, value: `${stats.pledges.toLocaleString()}+`, label: "Pledges Taken" },
        { icon: GlobeIcon, value: `${stats.communities.toLocaleString()}+`, label: "Global Reach" },
    ];

    return (
        <div className="bg-masa-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200">
                        {metrics.map((metric, index) => (
                            <div key={index} className="p-6 text-center group hover:bg-gray-50 transition-colors duration-300 first:rounded-l-2xl last:rounded-r-2xl">
                                <div className="w-14 h-14 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-orange transition-colors duration-300">
                                    <metric.icon className="h-7 w-7 text-masa-orange group-hover:text-white transition-colors duration-300" />
                                </div>
                                <p className="text-3xl lg:text-4xl font-extrabold text-masa-charcoal">{metric.value}</p>
                                <p className="mt-1 text-sm font-bold text-gray-500 uppercase tracking-wider">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactSnapshot;
