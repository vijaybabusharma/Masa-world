import React, { useState, useEffect } from 'react';
import { Submission } from '../../types';
import { ModuleHeader, InputField, TextareaField } from './AdminComponents';
import { EnvelopeIcon, TrashIcon, ArrowDownIcon } from '../icons/FeatureIcons';

const FormsManagerModule: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [view, setView] = useState<'submissions' | 'settings'>('submissions');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/forms/submissions');
            if (!res.ok) throw new Error('Failed to fetch submissions');
            const data = await res.json();
            if (Array.isArray(data)) {
                setSubmissions(data);
            } else {
                setSubmissions([]);
            }
        } catch (err) {
            console.error(err);
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <ModuleHeader title="Forms & Submissions" />
                <div className="flex gap-2">
                    <button onClick={() => setView('submissions')} className={`px-4 py-2 rounded-lg font-bold ${view === 'submissions' ? 'bg-masa-blue text-white' : 'bg-gray-100 text-gray-600'}`}>Inbox</button>
                    <button onClick={() => setView('settings')} className={`px-4 py-2 rounded-lg font-bold ${view === 'settings' ? 'bg-masa-blue text-white' : 'bg-gray-100 text-gray-600'}`}>Settings</button>
                </div>
            </div>

            {view === 'submissions' && (
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500">
                                <th className="p-4">Date</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Details</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(sub => (
                                <tr key={sub.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-sm text-gray-500">{new Date(sub.timestamp).toLocaleDateString()}</td>
                                    <td className="p-4 font-bold text-gray-800 capitalize">{sub.type}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {Object.entries(sub.data).map(([k, v]) => (
                                            <div key={k}><span className="font-bold">{k}:</span> {String(v)}</div>
                                        )).slice(0, 3)}
                                    </td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{sub.status}</span></td>
                                    <td className="p-4 text-right">
                                        <button className="text-red-500 hover:bg-red-50 p-2 rounded"><TrashIcon className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {submissions.length === 0 && (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No submissions found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'settings' && (
                <div className="bg-white p-6 rounded-lg border max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Form Settings</h3>
                    <div className="space-y-4">
                        <InputField label="Notification Email" defaultValue="masaworldfoundation@gmail.com" />
                        <TextareaField label="Default Success Message" defaultValue="Thank you for your submission. We will get back to you shortly." />
                        <button className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Settings</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormsManagerModule;
