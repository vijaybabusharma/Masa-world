
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import ActivityPageLayout from '../components/ActivityPageLayout';
import { CalendarDaysIcon, UsersIcon, GlobeIcon, SparklesIcon, TrophyIcon, AcademicCapIcon, HeartIcon } from '../components/icons/FeatureIcons';
import { submitForm } from '../utils/mockBackend';

const EventRegistrationForm: React.FC<{ navigateTo: NavigationProps['navigateTo'] }> = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        event: 'Annual Sports Day 2024',
        mode: 'On-ground',
        consent: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
             setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            roles: [`Event: ${formData.event}`],
            availability: `Mode: ${formData.mode}`,
            consent: formData.consent,
            source: 'Event Registration Form'
        };
        submitForm('volunteer', submissionData);
        navigateTo('thank-you-volunteer');
    };

    return (
        <section id="event-registration-form" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-gray-50 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
                    <h2 className="text-3xl font-bold text-masa-charcoal mb-6 text-center">Register for an Event</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                            <input required id="fullName" name="fullName" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="First Last" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <input required id="email" name="email" onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input required id="phone" name="phone" onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" placeholder="+91..." />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="event" className="block text-sm font-bold text-gray-700 mb-2">Which event are you interested in? *</label>
                            <select required id="event" name="event" onChange={handleChange} value={formData.event} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
                                <option>Annual Sports Day 2024</option>
                                <option>City Cleanliness Drive</option>
                                <option>Cultural Utsav</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="mode" className="block text-sm font-bold text-gray-700 mb-2">Preferred Participation Mode *</label>
                            <select required id="mode" name="mode" onChange={handleChange} value={formData.mode} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
                                <option>On-ground</option>
                                <option>Remote</option>
                            </select>
                        </div>
                        <div className="flex items-start pt-4 border-t border-gray-100">
                            <input id="consent" name="consent" type="checkbox" required onChange={handleChange} className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                            <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                                I agree to the event terms and consent to being contacted by Masa World Foundation.
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-masa-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg">
                            Submit Registration
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const EventsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const scrollToForm = () => {
        document.getElementById('event-registration-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <ActivityPageLayout
                navigateTo={navigateTo}
                heroData={{
                    title: "Our Events",
                    subtitle: "Bringing communities together for action, celebration, and change.",
                    primaryCtaLabel: "Register for an Event",
                    primaryCtaAction: scrollToForm,
                    bgImage: "https://picsum.photos/1600/900?grayscale&blur=2&random=20"
                }}
                overviewData={{
                    title: "Community, Connection, and Change",
                    description: "Our events are the heartbeat of our foundation. From large-scale community drives and awareness campaigns to intimate hero recognition ceremonies, each event is an opportunity to connect, inspire, and create a tangible impact on the ground.",
                    relevance: "Hosting impactful events across India that foster national unity and global awareness."
                }}
                focusAreas={[
                    { icon: TrophyIcon, label: "Sports Events" },
                    { icon: AcademicCapIcon, label: "Educational Events" },
                    { icon: GlobeIcon, label: "Cultural Events" },
                    { icon: HeartIcon, label: "Social Campaigns" },
                    { icon: UsersIcon, label: "Community Engagement" },
                ]}
                processSteps={[
                    { title: "Plan", description: "Designing events that address specific community needs." },
                    { title: "Mobilize", description: "Gathering volunteers and partners for execution." },
                    { title: "Execute", description: "Delivering impactful experiences on the ground." },
                    { title: "Impact", description: "Measuring outcomes and community feedback." },
                ]}
                activities={[
                    {
                        title: "Annual Sports Day 2024",
                        date: "Aug 15, 2024",
                        location: "National Stadium, Delhi",
                        image: "https://picsum.photos/600/400?random=21",
                        status: "Upcoming"
                    },
                    {
                        title: "City Cleanliness Drive",
                        date: "July 05, 2024",
                        location: "Mumbai",
                        image: "https://picsum.photos/600/400?random=22",
                        status: "Past Event"
                    },
                    {
                        title: "Cultural Utsav",
                        date: "Oct 2024",
                        location: "Jaipur",
                        image: "https://picsum.photos/600/400?random=23",
                        status: "Planning"
                    },
                ]}
                participants={[
                    "General Public",
                    "School Students",
                    "Corporate Teams",
                    "Local Families",
                    "Volunteers"
                ]}
                impactMetrics={[
                    { value: "500+", label: "Events Hosted" },
                    { value: "100k+", label: "Attendees" },
                    { value: "50+", label: "Cities Covered" },
                    { value: "100%", label: "Volunteer Driven" },
                ]}
                testimonial={{
                    quote: "Attending the 'Real Hero' award ceremony was incredibly moving. It's one thing to hear about good work, but another to see these local heroes being honored.",
                    author: "Anjali S.",
                    role: "Community Member"
                }}
                ctaData={{
                    title: "Join the Celebration",
                    text: "Don't miss out on our next big event. Be part of the energy and the impact.",
                    primaryLabel: "Register Now",
                    primaryAction: scrollToForm,
                    secondaryLabel: "Sponsor an Event",
                    secondaryAction: () => navigateTo('contact')
                }}
            />
            <EventRegistrationForm navigateTo={navigateTo} />
        </>
    );
};

export default EventsPage;
