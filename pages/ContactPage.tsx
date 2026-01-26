
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { submitForm } from '../utils/mockBackend';
import { 
    EnvelopeIcon, 
    MapPinIcon, 
    HeartIcon, 
    ShieldCheckIcon, 
    GlobeIcon, 
    PresentationChartBarIcon,
    ArrowRightIcon,
    BriefcaseIcon
} from '../components/icons/FeatureIcons';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const PurposeCard: React.FC<{ title: string; description: string; page: any; navigateTo: NavigationProps['navigateTo'] }> = ({ title, description, page, navigateTo }) => (
    <button
        onClick={() => navigateTo(page)}
        className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-left w-full hover:shadow-lg hover:border-masa-orange transition-all duration-300 group"
    >
        <h4 className="font-bold text-masa-charcoal mb-2">{title}</h4>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <span className="text-masa-blue font-bold text-sm flex items-center group-hover:text-masa-orange transition-colors">
            Go to Page <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </span>
    </button>
);


const ContactPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        subject: 'General Inquiry',
        message: '',
        consent: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
             setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await submitForm('contact', formData);
        setIsSubmitting(false);
        navigateTo('thank-you-contact');
    };

    return (
        <div className="bg-gray-50">
            <PageHeader title="Contact Us" subtitle="We’re here to connect, collaborate, and support your journey with MASA World Foundation." />

            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column: Info & Links */}
                        <div className="lg:col-span-5 space-y-8 sticky top-28">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-masa-charcoal mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <EnvelopeIcon className="h-6 w-6 text-masa-orange mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">Email (Primary)</h4>
                                            <a href="mailto:masaworldfoundation@gmail.com" className="text-masa-blue hover:underline">masaworldfoundation@gmail.com</a>
                                            <p className="text-xs text-gray-500 mt-1">We usually respond within 24–48 hours.</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start gap-4">
                                        <MapPinIcon className="h-6 w-6 text-masa-orange mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">Country Focus</h4>
                                            <p className="text-gray-700">India (with global communication support)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                               <PurposeCard title="Volunteer & Careers" description="Join our team to create change." page="get-involved" navigateTo={navigateTo} />
                               <PurposeCard title="Donations & Support" description="Help fuel our mission financially." page="donate" navigateTo={navigateTo} />
                               <PurposeCard title="Partnerships & CSR" description="Collaborate for greater impact." page="membership" navigateTo={navigateTo} />
                               <PurposeCard title="Media & Reports" description="Access our official documents." page="media-reports" navigateTo={navigateTo} />
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200">
                            <h2 className="text-3xl font-bold text-masa-charcoal mb-2">Send Us a Message</h2>
                            <p className="text-gray-600 mb-8">Please fill out the form below and we'll get back to you.</p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                    <input required name="fullName" onChange={handleChange} type="text" id="fullName" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                        <input required name="email" onChange={handleChange} type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                        <input name="mobile" onChange={handleChange} type="tel" id="mobile" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                                    <select required name="subject" onChange={handleChange} value={formData.subject} id="subject" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white transition-all">
                                        <option>General Inquiry</option>
                                        <option>Volunteer</option>
                                        <option>Careers & Internships</option>
                                        <option>Donation</option>
                                        <option value="Partnership / CSR">Partnership / CSR</option>
                                        <option value="Media & Reports">Media & Reports</option>
                                        <option value="Events / Trainings">Events / Trainings</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                                    <textarea required name="message" onChange={handleChange} id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none transition-all"></textarea>
                                </div>
                                <div className="flex items-start pt-2">
                                    <input required id="consent" name="consent" type="checkbox" onChange={handleChange} className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                                    <label htmlFor="consent" className="ml-2 text-sm text-gray-600">I consent to MASA World Foundation contacting me regarding my inquiry.</label>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full text-white py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-masa-orange hover:bg-orange-600 hover:-translate-y-1'}`}
                                >
                                    {isSubmitting ? 'Sending Message...' : 'Submit Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Trust & Assurance Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
                        {[
                            { icon: ShieldCheckIcon, title: "Registered NGO" },
                            { icon: HeartIcon, title: "Ethical Practices" },
                            { icon: PresentationChartBarIcon, title: "Transparent Communication" },
                            { icon: GlobeIcon, title: "Global Collaboration" }
                        ].map(item => (
                            <div key={item.title} className="flex flex-col items-center">
                                <div className="bg-gray-100 p-3 rounded-full text-masa-blue mb-3">
                                    <item.icon className="h-6 w-6"/>
                                </div>
                                <h4 className="font-semibold text-sm text-gray-700">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
