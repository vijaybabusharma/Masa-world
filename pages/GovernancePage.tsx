
import React from 'react';
import { NavigationProps } from '../types';
import { ShieldCheckIcon, DocumentTextIcon, PresentationChartBarIcon, CheckIcon, UsersIcon } from '../components/icons/FeatureIcons';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const GovernancePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const reports = [
        { year: "2023", title: "Annual Report 2023", url: "#" },
        { year: "2022", title: "Annual Report 2022", url: "#" },
        { year: "2021", title: "Annual Report 2021", url: "#" },
    ];
    
    const impactMetrics = [
        { value: "500+", label: "Programs Conducted" },
        { value: "10k+", label: "Youth Impacted" },
        { value: "50+", label: "Communities Reached" },
        { value: "95%", label: "Fund Utilization" },
    ];
    
    const programHighlights = [
        { title: "Youth Leadership Bootcamp", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80", desc: "Empowered over 1,000 young leaders with essential skills." },
        { title: "National Sports Conclave", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80", desc: "Brought together athletes and coaches from across the country." },
        { title: "Rural Health Initiative", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80", desc: "Provided free health checkups in 20+ underserved villages." },
    ];

    return (
        <div className="bg-gray-50">
            <PageHeader title="Annual Reports & Transparency" subtitle="Our commitment to accountability, integrity, and measurable impact." />
            
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Year-Wise Reports</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Explore our detailed reports to see our work in action and understand our financial stewardship.</p>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reports.map(report => (
                             <a key={report.year} href={report.url} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center group">
                                 <div className="p-4 bg-blue-100 rounded-full mb-4 text-masa-blue">
                                     <DocumentTextIcon className="h-8 w-8"/>
                                 </div>
                                 <p className="text-sm font-bold text-gray-500">{report.year}</p>
                                 <h3 className="font-bold text-masa-charcoal text-lg mb-2 flex-grow">{report.title}</h3>
                                 <span className="mt-4 text-sm font-semibold text-masa-blue group-hover:text-masa-orange transition-colors">Download PDF &rarr;</span>
                             </a>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-masa-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-center text-2xl font-bold mb-10">2023 Impact Snapshot</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {impactMetrics.map((metric) => (
                            <div key={metric.label}>
                                <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-masa-orange">{metric.value}</p>
                                <p className="mt-2 text-lg text-gray-300 font-medium">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-masa-charcoal mb-12">Program Highlights from the Year</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programHighlights.map(item => (
                            <div key={item.title} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                                <img src={item.img} alt={item.title} className="h-48 w-full object-cover"/>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-masa-charcoal">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="prose prose-lg max-w-full text-gray-600">
                            <h2 className="text-3xl font-bold text-masa-charcoal mb-4">Financial & Governance Statement</h2>
                            <p>MASA World Foundation is committed to complete transparency. A majority of our funding goes directly into program costs, ensuring maximum impact on the ground. We operate with lean administrative overheads and adhere to all statutory compliance requirements for non-profits in India and globally.</p>
                            <ul>
                                <li><strong>Compliance:</strong> Registered non-profit, fully compliant with all regulations.</li>
                                <li><strong>Governance:</strong> Overseen by a dedicated board of advisors and leaders.</li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border-l-4 border-masa-orange shadow-sm">
                            <h3 className="font-bold text-xl text-masa-charcoal mb-4">Request Official Documents</h3>
                             <p className="text-gray-600 mb-6">For official documents, detailed financial reports, or governance policies, please contact our administrative office.</p>
                             <p className="font-semibold text-gray-800">Email: <a href="mailto:masaworldfoundation@gmail.com" className="text-masa-blue hover:underline">masaworldfoundation@gmail.com</a></p>
                             <button onClick={() => navigateTo('contact')} className="mt-6 bg-masa-charcoal text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                Request Detailed Reports
                             </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GovernancePage;
