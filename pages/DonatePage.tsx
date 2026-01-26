
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationProps } from '../types';
import { ShieldCheckIcon, EyeIcon, HeartIcon, CheckIcon, GlobeIcon, AcademicCapIcon, TrophyIcon, SparklesIcon } from '../components/icons/FeatureIcons';
import { submitForm } from '../utils/mockBackend';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const FundingGoalsSection: React.FC = () => {
    const goals = [
        {
            title: "Youth Leadership Program",
            description: "Fund our next 3-month bootcamp to train 50 young leaders in rural areas.",
            raised: 75000,
            goal: 100000,
            currency: '₹',
            icon: AcademicCapIcon,
        },
        {
            title: "Community Sports Kits",
            description: "Provide 100 sports kits (football, cricket) to underserved community teams.",
            raised: 28000,
            goal: 50000,
            currency: '₹',
            icon: TrophyIcon,
        },
    ];

    const impactExamples = [
        { amount: "₹500", effect: "Provides educational materials for a child." },
        { amount: "₹2,500", effect: "Organizes a community health awareness event." },
        { amount: "₹5,000", effect: "Sponsors a full-day youth leadership workshop." },
    ];

    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Your Donation in Action</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        See how your contribution directly fuels our key initiatives and helps us reach our current funding goals.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 text-left md:text-center">
                        <SparklesIcon className="h-4 w-4 text-masa-blue flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">Future Roadmap: Real-time AI Impact Tracking to show exactly where your funds go.</span>
                    </div>
                </div>

                {/* Funding Goal Cards */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                    {goals.map((goal, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <goal.icon className="h-7 w-7 text-masa-blue" />
                                </div>
                                <h3 className="text-xl font-bold text-masa-charcoal">{goal.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">{goal.description}</p>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div 
                                    className="bg-masa-orange h-2.5 rounded-full" 
                                    style={{ width: `${(goal.raised / goal.goal) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500">
                                <span>{goal.currency}{goal.raised.toLocaleString()} raised</span>
                                <span>Goal: {goal.currency}{goal.goal.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Impact Examples */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-masa-charcoal mb-8">Every Contribution Counts</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {impactExamples.map((example, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center shadow-sm w-full sm:w-64">
                                <p className="text-2xl font-bold text-masa-orange mb-2">{example.amount}</p>
                                <p className="text-gray-700">{example.effect}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const DonatePage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
    const [amount, setAmount] = useState<number | string>('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: 'India',
        pan: '',
        address: '',
        purpose: 'General',
        eventTag: ''
    });
    
    useEffect(() => {
        const targetEvent = sessionStorage.getItem('target_event_support');
        if (targetEvent) {
            setFormData(prev => ({ ...prev, purpose: 'Specific Event', eventTag: targetEvent }));
            // Clear it after reading so it doesn't persist forever
            sessionStorage.removeItem('target_event_support');
        }
    }, []);
    
    // Preset amounts
    const amounts = currency === 'INR' 
        ? [500, 1000, 2500, 5000] 
        : [25, 50, 100, 250];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDonate = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm('donation', { ...formData, amount, currency });
        navigateTo('thank-you-donate');
    };

    const impactMessage = useMemo(() => {
        const numAmount = Number(amount) || 0;
        if (numAmount === 0) return "Every contribution makes a real difference.";
        if (currency === 'INR') {
            if (numAmount >= 5000) return "Supports a full-day youth leadership workshop.";
            if (numAmount >= 2500) return "Helps organize a community awareness event.";
            if (numAmount >= 1000) return "Sponsors sports equipment for a youth team.";
            if (numAmount >= 500) return "Provides educational materials for a child.";
        } else { // USD
            if (numAmount >= 100) return "Funds a local hero recognition ceremony.";
            if (numAmount >= 50) return "Helps organize a community awareness event.";
            if (numAmount >= 25) return "Sponsors sports equipment for a youth team.";
        }
        return "Your support helps fuel our grassroots initiatives.";
    }, [amount, currency]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="Support Our Mission" subtitle="Your contribution empowers youth and builds stronger communities." />

            <FundingGoalsSection />

            <section id="donate-form" className="pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                        
                        {/* Donation Form */}
                        <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-masa-orange to-masa-blue"></div>
                            <h3 className="text-2xl font-bold text-masa-charcoal mb-6">Secure Donation</h3>
                            
                            <form onSubmit={handleDonate} className="space-y-8">
                                {/* Currency & Amount */}
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Select Currency</label>
                                        <div className="inline-flex bg-white p-1 rounded-lg border border-gray-200">
                                            <button type="button" onClick={() => { setCurrency('INR'); setAmount(''); }} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'INR' ? 'bg-masa-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>INR (₹)</button>
                                            <button type="button" onClick={() => { setCurrency('USD'); setAmount(''); }} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'USD' ? 'bg-masa-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>USD ($)</button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                         {amounts.map(val => (
                                            <button 
                                                type="button" 
                                                key={val} 
                                                onClick={() => setAmount(val)} 
                                                className={`py-3 px-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 active:scale-95 ${amount === val ? 'border-masa-orange bg-orange-50 text-masa-orange' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                                            >
                                                {currency === 'INR' ? '₹' : '$'}{val}
                                            </button>
                                         ))}
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{currency === 'INR' ? '₹' : '$'}</span>
                                        <input 
                                            type="number" 
                                            placeholder="Enter custom amount" 
                                            value={amount} 
                                            onChange={(e) => setAmount(e.target.value)} 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange focus:border-transparent outline-none transition-all font-semibold"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4 flex items-start gap-2 text-sm text-masa-blue">
                                        <HeartIcon className="h-5 w-5 flex-shrink-0" />
                                        <p className="font-medium">{impactMessage}</p>
                                    </div>
                                </div>

                                {/* Donor Details */}
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Donor Information</h4>
                                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name *</label>
                                            <input required name="fullName" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address *</label>
                                            <input required name="email" onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                                            <input name="phone" onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Country *</label>
                                            <select required name="country" onChange={handleChange} value={formData.country} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none bg-white">
                                                <option value="India">India</option>
                                                <option value="USA">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Conditional Fields based on Currency/Country */}
                                    {currency === 'INR' && (
                                        <div className="mb-4">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">PAN Number (Required for Tax Exemption)</label>
                                            <input name="pan" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none uppercase" placeholder="ABCDE1234F" />
                                        </div>
                                    )}

                                    <div className="mb-4">
                                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address (Optional)</label>
                                         <input name="address" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none" placeholder="Street Address, City, Postal Code" />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Purpose of Donation</label>
                                        <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-charcoal outline-none bg-white">
                                            <option value="General">General Fund (Where needed most)</option>
                                            <option value="Education">Education & Skills</option>
                                            <option value="Sports">Sports Development</option>
                                            <option value="Culture">Cultural Preservation</option>
                                            {formData.eventTag && <option value="Specific Event">Specific Event: {formData.eventTag}</option>}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <input id="don-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                                    <label htmlFor="don-consent" className="ml-2 text-sm text-gray-600">
                                        I confirm that the funds are my own and I agree to the Privacy Policy.
                                    </label>
                                </div>

                                <button type="submit" className="w-full bg-masa-orange text-white py-4 rounded-full font-bold text-lg hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center active:scale-95">
                                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                    Secure Pay {currency === 'INR' ? '₹' : '$'}{Number(amount) || '...'}
                                </button>
                            </form>
                        </div>

                        {/* Sidebar Trust Badges */}
                        <div className="lg:col-span-4 space-y-6">
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-50 rounded-full text-masa-blue"><ShieldCheckIcon className="h-6 w-6"/></div>
                                    <h3 className="font-bold text-gray-900">100% Secure</h3>
                                </div>
                                <p className="text-sm text-gray-600">We use industry-standard encryption to protect your financial data.</p>
                             </div>
                             
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-50 rounded-full text-green-600"><CheckIcon className="h-6 w-6"/></div>
                                    <h3 className="font-bold text-gray-900">Tax Deductible</h3>
                                </div>
                                <p className="text-sm text-gray-600">Donations are eligible for tax exemption under relevant sections (e.g., 80G in India).</p>
                             </div>

                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-50 rounded-full text-masa-orange"><EyeIcon className="h-6 w-6"/></div>
                                    <h3 className="font-bold text-gray-900">Transparency</h3>
                                </div>
                                <p className="text-sm text-gray-600">Annual impact reports are sent to all donors showing exactly how funds were used.</p>
                             </div>

                             <div className="bg-masa-charcoal text-white p-8 rounded-2xl shadow-lg mt-8">
                                <h4 className="font-bold mb-2">Need Assistance?</h4>
                                <p className="text-sm text-gray-300 mb-4">Contact our donor support team for wire transfer details or queries.</p>
                                <button onClick={() => navigateTo('contact')} className="text-masa-orange font-bold text-sm hover:underline">Contact Support</button>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonatePage;
