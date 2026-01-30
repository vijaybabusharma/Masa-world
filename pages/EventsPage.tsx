import React, { useState, useEffect } from 'react';
// FIX: The Event type is defined in `../types`, not `../utils/data`.
import { NavigationProps, Event } from '../types';
import { 
    CalendarDaysIcon, 
    UsersIcon, 
    GlobeIcon, 
    SparklesIcon, 
    TrophyIcon, 
    AcademicCapIcon, 
    HeartIcon, 
    MapPinIcon, 
    CheckIcon, 
    CreditCardIcon, 
    LockClosedIcon, 
    ShieldCheckIcon,
    MicrophoneIcon,
    HandshakeIcon,
    ArrowRightIcon
} from '../components/icons/FeatureIcons';
import { XIcon } from '../components/icons/UiIcons';
import { submitForm } from '../utils/mockBackend';
import { ContentManager } from '../utils/contentManager';

// --- EVENT REGISTRATION MODAL ---
interface EventRegistrationModalProps {
    event: Event;
    onClose: () => void;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
    const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'success'>('form');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        mode: 'On-ground',
        consent: false
    });
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = event.price || 'Free';
        if (price !== 'Free') {
            setStep('payment');
        } else {
            submitRegistration();
        }
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setTimeout(() => {
            submitRegistration();
        }, 2000);
    };

    const submitRegistration = () => {
        submitForm('volunteer', { // Reusing volunteer submission for generic event registration mock
            ...formData,
            eventName: event.title,
            source: 'Event Registration'
        });
        setStep('success');
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = 'auto'; };
    }, [onClose]);

    const isPaid = event.price && event.price !== 'Free';
    const inputFieldClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-masa-orange outline-none transition-all";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-masa-charcoal">{step === 'success' ? 'Registration Confirmed' : 'Event Registration'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><XIcon className="h-6 w-6" /></button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {step === 'form' && (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-xl mb-4">
                                <h4 className="font-bold text-masa-charcoal text-lg">{event.title}</h4>
                                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                    <span className="flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-1"/> {event.displayDate}</span>
                                    <span className="font-bold text-masa-orange bg-white px-2 py-0.5 rounded shadow-sm">{event.price || 'Free'}</span>
                                </div>
                            </div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label><input required name="fullName" onChange={handleChange} className={inputFieldClasses} placeholder="Full Name" /></div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label><input required name="email" type="email" onChange={handleChange} className={inputFieldClasses} placeholder="email@example.com" /></div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number *</label><input required name="mobile" type="tel" onChange={handleChange} className={inputFieldClasses} placeholder="+91..." /></div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Participation Mode</label>
                                <select name="mode" onChange={handleChange} className={`${inputFieldClasses} bg-white`}>
                                    <option>On-ground</option>
                                    <option>Remote (if applicable)</option>
                                </select>
                            </div>
                            <div className="flex items-start mt-2">
                                <input id="evt-consent" type="checkbox" required className="h-4 w-4 text-masa-orange mt-1" />
                                <label htmlFor="evt-consent" className="ml-2 text-sm text-gray-600">I agree to the event terms and conditions.</label>
                            </div>
                            <button type="submit" className="w-full bg-masa-charcoal text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md mt-2">
                                {isPaid ? 'Proceed to Payment' : 'Confirm Registration'}
                            </button>
                        </form>
                    )}

                    {step === 'payment' && (
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                            <div className="text-center mb-6"><ShieldCheckIcon className="h-12 w-12 text-green-600 mx-auto mb-2" /><h4 className="text-xl font-bold">Secure Payment</h4></div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4"><span className="text-sm font-semibold">Total Amount</span><span className="text-2xl font-bold">{event.price}</span></div>
                                <div className="space-y-3">
                                    <div className="relative"><CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input required name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} placeholder="Card Number (Mock)" className={`w-full pl-10 ${inputFieldClasses}`} maxLength={19} /></div>
                                    <div className="grid grid-cols-2 gap-3"><input required name="expiry" value={paymentDetails.expiry} onChange={handlePaymentChange} placeholder="MM/YY" className={inputFieldClasses} maxLength={5} /><div className="relative"><LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input required name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} type="password" placeholder="CVV" className={inputFieldClasses} maxLength={3} /></div></div>
                                </div>
                            </div>
                            <div className="flex gap-3"><button type="button" onClick={() => setStep('form')} className="flex-1 bg-gray-100 font-bold py-3 rounded-xl">Back</button><button type="submit" className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">Pay Now</button></div>
                        </form>
                    )}

                    {step === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-10"><div className="w-12 h-12 border-4 border-masa-blue border-t-transparent rounded-full animate-spin mb-4"></div><p className="font-bold text-gray-700">Processing...</p></div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-6 animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckIcon className="h-10 w-10 text-green-600" /></div>
                            <h3 className="text-2xl font-bold text-masa-charcoal mb-2">You're In!</h3>
                            <p className="text-gray-600 mb-8">Registration for <strong>{event.title}</strong> successful. A confirmation email has been sent to {formData.email}.</p>
                            <button onClick={onClose} className="w-full bg-masa-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-md">Done</button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`@keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }`}</style>
        </div>
    );
};

const PageHeader: React.FC<{ title: string; subtitle: string; bgImage?: string }> = ({ title, subtitle, bgImage }) => (
    <div className="relative bg-masa-charcoal py-24 text-white text-center overflow-hidden">
        {bgImage && (
            <div className="absolute inset-0 opacity-20">
                <img src={bgImage} alt="Header Background" className="w-full h-full object-cover" />
            </div>
        )}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{title}</h1>
            <p className="mt-2 text-xl text-gray-300 max-w-2xl mx-auto font-light">{subtitle}</p>
            <button onClick={() => document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg transform hover:-translate-y-1">
                Explore Events
            </button>
        </div>
    </div>
);

const EventsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    
    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

    useEffect(() => {
        setEvents(ContentManager.getEvents());
    }, []);

    const handleParticipate = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleViewReport = (event: Event) => {
        alert(`Viewing highlights for ${event.title}`);
        navigateTo('gallery');
    };

    // Filter Logic
    const filteredEvents = events.filter(event => {
        const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
        const statusMatch = selectedStatus === 'All' || event.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    const categories = ['All', 'Conference', 'Training', 'Sports', 'Community', 'Award'];

    return (
        <div className="bg-gray-50 min-h-screen">
            {selectedEvent && <EventRegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

            {/* 1. Hero */}
            <PageHeader 
                title="Our Events" 
                subtitle="Bringing communities together for action, celebration, and change."
                bgImage="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80"
            />

            {/* 2. Filter Bar */}
            <section className="py-8 border-b border-gray-200 bg-white sticky top-20 z-40 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-masa-charcoal">Filter by:</span>
                        </div>
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
                            </select>

                            <select 
                                value={selectedStatus} 
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Status</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Events Grid */}
            <section id="events-grid" className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map(event => (
                                <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border text-white ${event.status === 'Upcoming' ? 'bg-green-600 border-green-600' : 'bg-gray-600 border-gray-600'}`}>
                                            {event.status}
                                        </div>
                                        {event.price && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-masa-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                                                {event.price}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="text-xs font-bold text-masa-orange uppercase tracking-wide mb-2 block">{event.category}</span>
                                        <h3 className="text-xl font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors leading-tight">
                                            {event.title}
                                        </h3>
                                        <div className="text-sm text-gray-500 mb-4 space-y-1.5">
                                            <div className="flex items-center gap-2"><CalendarDaysIcon className="h-4 w-4 text-gray-400"/> {event.displayDate}</div>
                                            <div className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-gray-400"/> {event.location}</div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow">{event.description}</p>
                                        
                                        <div className="mt-auto">
                                            {event.status === 'Upcoming' ? (
                                                <button 
                                                    onClick={() => handleParticipate(event)}
                                                    className="w-full bg-masa-blue text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-sm"
                                                >
                                                    Participate Now
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleViewReport(event)}
                                                    className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                                                >
                                                    View Highlights
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-400">No events found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            <button 
                                onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); }}
                                className="mt-6 text-masa-orange font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Why Participate (Condensed Info) */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Why Participate?</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Our events are more than just gatherings. They are platforms for growth, connection, and impact.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: UsersIcon, title: "Networking", desc: "Connect with like-minded change-makers." },
                            { icon: SparklesIcon, title: "Skill Building", desc: "Learn from experts and hands-on workshops." },
                            { icon: GlobeIcon, title: "Impact", desc: "Directly contribute to community development." },
                            { icon: HandshakeIcon, title: "Community", desc: "Be part of a supportive global family." }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-gray-100">
                                <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-masa-blue">
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="font-bold text-masa-charcoal mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Host/Sponsor CTA */}
            <section className="py-20 bg-masa-charcoal text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Want to Host or Sponsor an Event?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Partner with us to organize impactful events in your community or institution. Let's drive change together.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigateTo('contact')} 
                            className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            Contact for Partnership <ArrowRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;