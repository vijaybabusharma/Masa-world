
import React, { useState, useEffect, useMemo } from 'react';
import { getSubmissions, getStats, sendEmail } from '../utils/mockBackend';
import { UsersIcon, HeartIcon, SparklesIcon, BriefcaseIcon, ShieldCheckIcon, AcademicCapIcon, HandRaisedIcon, CameraIcon } from '../components/icons/FeatureIcons';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple mock auth
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-masa-charcoal">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-masa-blue outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">Invalid password</p>}
                    <button className="w-full bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900">Login</button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-4">Hint: admin123</p>
            </div>
        </div>
    );
};

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'volunteers' | 'donations' | 'members' | 'queries' | 'careers' | 'pledges' | 'gallery'>('overview');
    const [stats, setStats] = useState<any>({});
    const [data, setData] = useState<any[]>([]);
    
    // Pledge-specific states
    const [pledgeFilters, setPledgeFilters] = useState({ country: 'All', category: 'All' });
    const allPledges = useMemo(() => getSubmissions('pledge'), []);

    useEffect(() => {
        const allStats = getStats();
        const today = new Date().toLocaleDateString();
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();

        const todayPledges = allPledges.filter((p: any) => new Date(p.id).toLocaleDateString() === today).length;
        const monthPledges = allPledges.filter((p: any) => new Date(p.id).getMonth() === thisMonth && new Date(p.id).getFullYear() === thisYear).length;
        
        setStats({...allStats, todayPledges, monthPledges });

        if (activeTab !== 'overview') {
            const typeMap: any = {
                'volunteers': 'volunteer', 'donations': 'donation', 'members': 'membership',
                'queries': 'contact', 'careers': 'career', 'pledges': 'pledge', 'gallery': 'gallery'
            };
            let submissions = getSubmissions(typeMap[activeTab]);
            
            if (activeTab === 'pledges') {
                submissions = allPledges.filter((p: any) => 
                    (pledgeFilters.country === 'All' || p.country === pledgeFilters.country) &&
                    (pledgeFilters.category === 'All' || p.pledgeTitle === pledgeFilters.category)
                );
            }
            setData(submissions);
        }
    }, [activeTab, pledgeFilters, allPledges]);
    
    const handleResendCertificate = (pledge: any) => {
        // Mock resending email
        const subject = `Your Pledge Certificate – MASA World Foundation`;
        const body = `Dear ${pledge.fullName},\n\nAs requested, here is your certificate for the pledge: "${pledge.pledgeTitle}".\n\nCertificate ID: ${pledge.certificateId}\n\nWarm regards,\nMASA World Foundation`;
        sendEmail(pledge.email, subject, body);
        alert(`Certificate re-sent to ${pledge.email}`);
    };

    const exportToCSV = (tabKey: string) => {
        console.log(`Exporting data for: ${tabKey}`, data);
        alert(`Data for "${tabKey}" logged to console. In a real app, this would trigger a CSV download.`);
    };

    const renderTable = (headers: string[], rows: any[], keys: string[]) => (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr>{headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.length === 0 ? (
                        <tr><td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">No records found</td></tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {keys.map(k => <td key={k} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{Array.isArray(row[k]) ? row[k].join(', ') : (row[k] || '-')}</td>)}
                                {activeTab === 'pledges' && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onClick={() => handleResendCertificate(row)} className="text-blue-600 hover:text-blue-900">Re-send</button>
                                        <button onClick={() => alert('Disabling entry (simulated).')} className="text-red-600 hover:text-red-900">Disable</button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    
    const pledgeCategories = useMemo(() => [...new Set(allPledges.map((p: any) => p.pledgeTitle))], [allPledges]);
    const pledgeCountries = useMemo(() => [...new Set(allPledges.map((p: any) => p.country))], [allPledges]);


    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-masa-charcoal text-white flex-shrink-0 hidden md:block">
                <div className="p-6"><h1 className="text-2xl font-bold">MASA<span className="text-masa-orange">ADMIN</span></h1></div>
                <nav className="mt-6">
                    {[{ id: 'overview', label: 'Overview', icon: SparklesIcon }, { id: 'pledges', label: 'Pledges', icon: HandRaisedIcon }, { id: 'gallery', label: 'Gallery Subs.', icon: CameraIcon }, { id: 'volunteers', label: 'Volunteers', icon: HeartIcon }, { id: 'donations', label: 'Donations', icon: BriefcaseIcon }, { id: 'members', label: 'Members', icon: UsersIcon }, { id: 'careers', label: 'Careers', icon: AcademicCapIcon }, { id: 'queries', label: 'Queries', icon: ShieldCheckIcon }].map((item) => (
                        <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${activeTab === item.id ? 'bg-masa-orange text-white' : 'text-gray-300'}`}><item.icon className="h-5 w-5 mr-3" />{item.label}</button>
                    ))}
                </nav>
                <div className="p-6 mt-auto"><button onClick={onLogout} className="text-sm text-gray-400 hover:text-white">Logout</button></div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 capitalize">{activeTab === 'gallery' ? 'Gallery Submissions' : activeTab}</h2>
                    <button onClick={() => exportToCSV(activeTab)} className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-50">Export CSV</button>
                </header>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Total Pledges</p><p className="text-3xl font-bold text-masa-charcoal">{stats.pledges || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Pledges Today</p><p className="text-3xl font-bold text-masa-charcoal">{stats.todayPledges || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Pledges This Month</p><p className="text-3xl font-bold text-masa-charcoal">{stats.monthPledges || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Gallery Submissions</p><p className="text-3xl font-bold text-masa-charcoal">{stats.gallery || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Total Volunteers</p><p className="text-3xl font-bold text-masa-charcoal">{stats.volunteers || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Donations</p><p className="text-3xl font-bold text-green-600">{stats.donations || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Members</p><p className="text-3xl font-bold text-masa-orange">{stats.members || 0}</p></div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border"><p className="text-sm font-medium text-gray-500">Pending Queries</p><p className="text-3xl font-bold text-purple-600">{stats.queries || 0}</p></div>
                    </div>
                )}
                
                {activeTab === 'pledges' && (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                            <select value={pledgeFilters.country} onChange={e => setPledgeFilters(f => ({...f, country: e.target.value}))} className="bg-gray-50 border-gray-200 rounded-md p-2">
                                <option value="All">All Countries</option>
                                {pledgeCountries.map((c: string) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <select value={pledgeFilters.category} onChange={e => setPledgeFilters(f => ({...f, category: e.target.value}))} className="bg-gray-50 border-gray-200 rounded-md p-2">
                                <option value="All">All Pledges</option>
                                {pledgeCategories.map((c: string) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        {renderTable(
                            ['Name', 'Type', 'Organization', 'Pledge Title', 'Cert. ID', 'Country', 'Actions'],
                            data,
                            ['fullName', 'participantType', 'organizationName', 'pledgeTitle', 'certificateId', 'country']
                        )}
                    </div>
                )}
                {activeTab === 'gallery' && renderTable(['Name', 'Email', 'Category', 'File', 'Date'], data, ['fullName', 'email', 'category', 'fileName', 'timestamp'])}
                {activeTab === 'volunteers' && renderTable(['Name', 'Email', 'Phone', 'Interests', 'Date'], data, ['fullName', 'email', 'phone', 'roles', 'timestamp'])}
                {activeTab === 'donations' && renderTable(['Name', 'Amount', 'Currency', 'Purpose', 'Date'], data, ['fullName', 'amount', 'currency', 'purpose', 'timestamp'])}
                {activeTab === 'members' && renderTable(['Name', 'Type', 'Email', 'Member ID', 'Date'], data, ['fullName', 'membershipType', 'email', 'memberId', 'timestamp'])}
                {activeTab === 'careers' && renderTable(['Name', 'Email', 'Phone', 'Role', 'Date'], data, ['fullName', 'email', 'phone', 'role', 'timestamp'])}
                {activeTab === 'queries' && renderTable(['Name', 'Email', 'Subject', 'Date'], data, ['name', 'email', 'subject', 'timestamp'])}
            </main>
        </div>
    );
};

const AdminDashboardPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => { const auth = sessionStorage.getItem('masa_admin_auth'); if (auth === 'true') setIsLoggedIn(true); }, []);
    const handleLogin = () => { sessionStorage.setItem('masa_admin_auth', 'true'); setIsLoggedIn(true); };
    const handleLogout = () => { sessionStorage.removeItem('masa_admin_auth'); setIsLoggedIn(false); };
    return isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />;
};

export default AdminDashboardPage;