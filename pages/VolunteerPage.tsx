
import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../types';
import { HeartIcon, UsersIcon, GlobeIcon, CameraIcon, TrophyIcon, CheckIcon } from '../components/icons/FeatureIcons';
import { submitForm } from '../utils/mockBackend';

const VolunteerPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    // Form States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        organizationName: '',
        email: '',
        phone: '',
        city: '',
        ageGroup: '',
        roles: [] as string[],
        availability: '',
        mode: '',
        skills: '',
        motivation: '',
        consent: false
    });

    useEffect(() => {
        const targetEvent = sessionStorage.getItem('target_event_volunteer');
        if (targetEvent) {
            setFormData(prev => ({
                ...prev,
                roles: [...prev.roles, `Event: ${targetEvent}`],
                skills: `I am specifically interested in volunteering for: ${targetEvent}`
            }));
            // Clear after reading
            sessionStorage.removeItem('target_event_volunteer');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (role: string) => {
        setFormData(prev => {
            const roles = prev.roles.includes(role) 
                ? prev.roles.filter(r => r !== role)
                : [...prev.roles, role];
            return { ...prev, roles };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await submitForm('volunteer', formData);
        setIsSubmitting(false);
        navigateTo('thank-you-volunteer');
    };

    const roles = [
        { title: "Youth Volunteer", icon: UsersIcon, desc: "Lead local youth groups in service projects." },
        { title: "Sports Coach", icon: TrophyIcon, desc: "Train young athletes and organize tournaments." },
        { title: "Event Volunteer", icon: GlobeIcon, desc: "Manage logistics for community events." },
        { title: "Media & Docs", icon: CameraIcon, desc: "Capture stories and manage digital content." },
        { title: "Outreach", icon: HeartIcon, desc: "Connect with communities and identify needs." }
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-masa-charcoal py-24 text-white text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Volunteer With MASA</h1>
                    <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Contribute your time, skills, and passion to create real impact on the ground.
                    </p>
                    <button 
                        onClick={() => document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-10 bg-masa-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl transform hover:-translate-y-1"
                    >
                        Apply as Volunteer
                    </button>
                </div>
            </section>

            {/* Opportunities Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-masa-charcoal mb-16">Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {roles.map((role, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
                                <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 text-masa-blue group-hover:bg-masa-blue group-hover:text-white transition-colors duration-300">
                                    <role.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                                <p className="text-base text-gray-600 leading-relaxed">{role.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Volunteer */}
            <section className="py-12 bg-masa-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why Volunteer With Us?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start"><CheckIcon className="h-6 w-6 text-masa-orange mr-3 flex-shrink-0" /><span>Create tangible grassroots impact.</span></li>
                                <li className="flex items-start"><CheckIcon className="h-6 w-6 text-masa-orange mr-3 flex-shrink-0" /><span>Develop leadership and organizational skills.</span></li>
                                <li className="flex items-start"><CheckIcon className="h-6 w-6 text-masa-orange mr-3 flex-shrink-0" /><span>Gain national and international exposure.</span></li>
                                <li className="flex items-start"><CheckIcon className="h-6 w-6 text-masa-orange mr-3 flex-shrink-0" /><span>Receive recognition and official certificates.</span></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                             <div className="inline-block bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                <p className="text-4xl font-extrabold text-masa-orange">1,200+</p>
                                <p className="text-lg opacity-80">Active Volunteers</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="volunteer-form" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
                        <h2 className="text-2xl font-bold text-masa-charcoal mb-6 text-center">Volunteer Registration Form</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Details */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                    <input required name="fullName" onChange={handleChange} value={formData.fullName} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="First Last" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Age Group *</label>
                                    <select required name="ageGroup" onChange={handleChange} value={formData.ageGroup} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
                                        <option value="">Select Age</option>
                                        <option value="Under 18">Under 18</option>
                                        <option value="18-25">18 - 25</option>
                                        <option value="26-35">26 - 35</option>
                                        <option value="36-50">36 - 50</option>
                                        <option value="50+">50+</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name (Optional)</label>
                                <input name="organizationName" onChange={handleChange} value={formData.organizationName} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="Your Company or Institution" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                    <input required name="email" onChange={handleChange} value={formData.email} type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
                                    <input required name="phone" onChange={handleChange} value={formData.phone} type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="+91..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Location (City / State / Country) *</label>
                                <input required name="city" onChange={handleChange} value={formData.city} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" />
                            </div>

                            {/* Preferences */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Area of Interest (Select all that apply) *</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['Sports Coaching', 'Education / Teaching', 'Cultural Events', 'Media & Content', 'Community Outreach', 'Administrative Support'].map(opt => (
                                        <label key={opt} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                                            <input type="checkbox" onChange={() => handleCheckboxChange(opt)} checked={formData.roles.includes(opt)} className="rounded text-masa-blue focus:ring-masa-blue h-4 w-4" />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Availability *</label>
                                    <select required name="availability" onChange={handleChange} value={formData.availability} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
                                        <option value="">Select...</option>
                                        <option>Weekdays (Full Time)</option>
                                        <option>Weekdays (Part Time)</option>
                                        <option>Weekends Only</option>
                                        <option>Flexible / Project Based</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Mode *</label>
                                    <select required name="mode" onChange={handleChange} value={formData.mode} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
                                        <option value="">Select...</option>
                                        <option>On-Ground (Field Work)</option>
                                        <option>Remote / Online</option>
                                        <option>Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Skills / Previous Experience</label>
                                <textarea name="skills" onChange={handleChange} value={formData.skills} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="e.g., Event management, teaching, digital marketing, content writing..."></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to volunteer? *</label>
                                <textarea required name="motivation" onChange={handleChange} value={formData.motivation} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="What inspires you to volunteer with MASA World Foundation?"></textarea>
                            </div>

                            <div className="flex items-start pt-4 border-t border-gray-100">
                                <input id="vol-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                                <label htmlFor="vol-consent" className="ml-2 text-sm text-gray-600">
                                    I agree to the volunteer code of conduct and consent to being contacted by Masa World Foundation.
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-masa-blue hover:bg-blue-900'}`}
                            >
                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VolunteerPage;
