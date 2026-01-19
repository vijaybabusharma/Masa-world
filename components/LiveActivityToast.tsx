
import React, { useState, useEffect } from 'react';
import { HeartIcon, UsersIcon, HandRaisedIcon } from './icons/FeatureIcons';

const MOCK_ACTIVITIES = [
    { name: "Priya S.", city: "Mumbai", action: "just volunteered", type: 'volunteer' },
    { name: "Rahul K.", city: "Delhi", action: "donated ₹500", type: 'donate' },
    { name: "Sarah J.", city: "London", action: "joined as a member", type: 'member' },
    { name: "Amit B.", city: "Pune", action: "took the Youth Pledge", type: 'pledge' },
    { name: "Local Team", city: "Jaipur", action: "completed a cleanup drive", type: 'event' },
    { name: "Anjali M.", city: "Bangalore", action: "shared a story", type: 'share' },
];

const LiveActivityToast: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [activity, setActivity] = useState(MOCK_ACTIVITIES[0]);

    useEffect(() => {
        const showToast = () => {
            const randomActivity = MOCK_ACTIVITIES[Math.floor(Math.random() * MOCK_ACTIVITIES.length)];
            setActivity(randomActivity);
            setVisible(true);
            setTimeout(() => setVisible(false), 5000); // Hide after 5s
        };

        // Show first toast after 3s
        const initialTimer = setTimeout(showToast, 3000);

        // Then show every 20-40s randomly
        const interval = setInterval(() => {
            if (Math.random() > 0.5) showToast();
        }, 20000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!visible) return null;

    const getIcon = () => {
        switch(activity.type) {
            case 'volunteer': return <UsersIcon className="h-4 w-4 text-masa-blue" />;
            case 'donate': return <HeartIcon className="h-4 w-4 text-red-500" />;
            case 'pledge': return <HandRaisedIcon className="h-4 w-4 text-masa-orange" />;
            default: return <UsersIcon className="h-4 w-4 text-green-600" />;
        }
    };

    return (
        <div className="fixed bottom-40 left-6 z-40 animate-fade-in-up">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full py-2 px-4 shadow-lg flex items-center gap-3">
                <div className="bg-gray-100 p-1.5 rounded-full">
                    {getIcon()}
                </div>
                <div className="text-xs">
                    <p className="font-bold text-gray-800">{activity.name} <span className="font-normal text-gray-500">from {activity.city}</span></p>
                    <p className="text-gray-600">{activity.action}</p>
                </div>
            </div>
        </div>
    );
};

export default LiveActivityToast;
