import React, { useState, useEffect } from 'react';
import { ModuleHeader } from './AdminComponents';
import { CreditCardIcon, ArrowDownTrayIcon, PlusIcon } from '../icons/FeatureIcons';

interface Donation {
    id: string;
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    date: string;
    method: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

const DonationPanel: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await fetch('/api/donations');
                if (res.ok) {
                    const data = await res.json();
                    setDonations(Array.isArray(data) ? data : []);
                } else {
                    setDonations([]);
                }
            } catch (err) {
                console.error('Failed to fetch donations', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, []);

    const handleExport = () => {
        const csv = [
            ['ID', 'Donor', 'Email', 'Amount', 'Currency', 'Date', 'Method', 'Status'],
            ...donations.map(d => [d.id, d.donorName, d.email, d.amount, d.currency, d.date, d.method, d.status])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `donations_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <ModuleHeader 
                title="Donations & Finance" 
                onAction={handleExport} 
                actionLabel="Export CSV"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Revenue</div>
                    <div className="text-3xl font-bold text-gray-800">
                        ₹{donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Donors</div>
                    <div className="text-3xl font-bold text-gray-800">{donations.length}</div>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Avg Donation</div>
                    <div className="text-3xl font-bold text-gray-800">
                        ₹{donations.length > 0 ? Math.round(donations.reduce((acc, d) => acc + d.amount, 0) / donations.length).toLocaleString() : 0}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold">
                        <tr>
                            <th className="p-4 text-left">Donor</th>
                            <th className="p-4 text-left">Amount</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Method</th>
                            <th className="p-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {donations.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic">No donation records found.</td></tr>
                        ) : (
                            donations.map(donation => (
                                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{donation.donorName}</div>
                                        <div className="text-xs text-gray-500">{donation.email}</div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">
                                        {donation.currency} {donation.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(donation.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-gray-500">{donation.method}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                                            donation.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                            donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationPanel;
