import React, { useState, useEffect } from 'react';
import { ModuleHeader } from './AdminComponents';
import { ClockIcon, UsersIcon, ShieldCheckIcon } from '../icons/FeatureIcons';

interface ActivityLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    target: string;
    timestamp: string;
    details?: string;
}

const ActivityLogModule: React.FC = () => {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/logs');
                if (res.ok) {
                    const data = await res.json();
                    setLogs(Array.isArray(data) ? data : []);
                } else {
                    setLogs([]);
                }
            } catch (err) {
                console.error('Failed to fetch logs', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="animate-fade-in-up space-y-6">
            <ModuleHeader title="Security & Activity Logs" />
            
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex items-center gap-2 text-gray-600 font-bold text-sm">
                    <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                    System Audit Trail (Last 1000 actions)
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase font-bold">
                            <tr>
                                <th className="p-4 text-left">Timestamp</th>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Action</th>
                                <th className="p-4 text-left">Target</th>
                                <th className="p-4 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic">No activity logs found.</td></tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-500 whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                    {log.userName ? log.userName.charAt(0) : '?'}
                                                </div>
                                                <span className="font-medium text-gray-800">{log.userName || 'Unknown User'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                                (log.action || '').includes('Delete') ? 'bg-red-100 text-red-700' :
                                                (log.action || '').includes('Create') ? 'bg-green-100 text-green-700' :
                                                (log.action || '').includes('Update') ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {log.action || 'Unknown Action'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600 font-medium">{log.target}</td>
                                        <td className="p-4 text-gray-400 text-xs italic">{log.details || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogModule;
