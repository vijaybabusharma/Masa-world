
import React, { useState, useEffect } from 'react';
import { NavigationProps, Course } from '../types';
import { 
    ClockIcon, 
    LaptopIcon, 
    SignalIcon, 
    ArrowRightIcon, 
    AcademicCapIcon, 
    TrophyIcon, 
    GlobeIcon,
    CheckIcon,
    CreditCardIcon,
    LockClosedIcon,
    ShieldCheckIcon
} from '../components/icons/FeatureIcons';
import { XIcon } from '../components/icons/UiIcons';
import { ContentManager } from '../utils/contentManager';
import { submitForm } from '../utils/mockBackend';

// --- ENROLLMENT MODAL COMPONENT ---
interface EnrollmentModalProps {
    course: Course;
    onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, onClose }) => {
    const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'success' | 'failure'>('form');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        location: '',
        consent: false
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Simulate Payment Processing
        setTimeout(() => {
            // Simulate 90% success rate for demo
            const isSuccess = Math.random() > 0.1; 
            
            if (isSuccess || true) { // Forcing success for smooth demo flow as per request
                const enrollmentData = {
                    ...formData,
                    courseName: course.title,
                    courseId: course.id,
                    fee: course.price || 'Free',
                    mode: course.mode,
                    status: 'Confirmed'
                };
                submitForm('enrollment', enrollmentData);
                setStep('success');
            } else {
                setStep('failure');
            }
        }, 2000);
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const isFree = course.price === 'Free';
    const inputFieldClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-masa-orange outline-none transition-all";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-masa-charcoal">
                        {step === 'success' ? 'Confirmation' : 'Enroll in Course'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-grow">
                    
                    {/* STEP 1: REGISTRATION FORM */}
                    {step === 'form' && (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Course Summary */}
                            <div className="bg-blue-50 p-4 rounded-xl mb-6">
                                <h4 className="font-bold text-masa-charcoal text-lg mb-1">{course.title}</h4>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1"/> {course.duration}</span>
                                    <span className="flex items-center"><LaptopIcon className="h-4 w-4 mr-1"/> {course.mode}</span>
                                    <span className="font-bold text-masa-orange bg-white px-2 py-0.5 rounded shadow-sm">
                                        {course.price || 'Free'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                                    <input required name="fullName" value={formData.fullName} onChange={handleChange} className={inputFieldClasses} placeholder="Enter full name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputFieldClasses} placeholder="name@example.com" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Mobile *</label>
                                        <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={inputFieldClasses} placeholder="+91..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">City / Country</label>
                                        <input required name="location" value={formData.location} onChange={handleChange} className={inputFieldClasses} placeholder="e.g. Delhi, India" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start pt-2">
                                <input required id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={handleChange} className="mt-1 h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange" />
                                <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                                    I agree to the <a href="#" className="text-masa-blue hover:underline">Terms of Service</a> & <a href="#" className="text-masa-blue hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-masa-charcoal text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md mt-2">
                                {isFree ? 'Complete Enrollment' : 'Proceed to Payment'}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: PAYMENT GATEWAY (SIMULATED) */}
                    {step === 'payment' && (
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                            <div className="text-center mb-6">
                                <ShieldCheckIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                                <h4 className="text-xl font-bold text-gray-800">Secure Payment</h4>
                                <p className="text-sm text-gray-500">Pay securely to confirm your seat.</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-semibold text-gray-600">Total Amount</span>
                                    <span className="text-2xl font-bold text-masa-charcoal">{course.price}</span>
                                </div>
                                
                                {/* Mock Card Form */}
                                <div className="space-y-3">
                                    <div className="relative">
                                        <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input required name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} placeholder="Card Number (Mock)" className={`w-full pl-10 ${inputFieldClasses}`} maxLength={19} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input required name="expiry" value={paymentDetails.expiry} onChange={handlePaymentChange} placeholder="MM/YY" className={inputFieldClasses} maxLength={5} />
                                        <div className="relative">
                                            <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input required name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} type="password" placeholder="CVV" className={inputFieldClasses} maxLength={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setStep('form')} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                                    Back
                                </button>
                                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md">
                                    Pay Now
                                </button>
                            </div>
                            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                                <LockClosedIcon className="h-3 w-3" /> 256-bit SSL Encrypted Transaction
                            </p>
                        </form>
                    )}

                    {/* STEP 3: PROCESSING */}
                    {step === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-16 h-16 border-4 border-masa-blue border-t-transparent rounded-full animate-spin mb-6"></div>
                            <h4 className="text-xl font-bold text-gray-800">Processing...</h4>
                            <p className="text-gray-500 mt-2">Please do not close this window.</p>
                        </div>
                    )}

                    {/* STEP 4: SUCCESS */}
                    {step === 'success' && (
                        <div className="text-center py-6 animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckIcon className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-masa-charcoal mb-2">Enrollment Successful!</h3>
                            <p className="text-gray-600 mb-8">
                                Thank you, <strong>{formData.fullName}</strong>. You have successfully enrolled in <strong>{course.title}</strong>. A confirmation email has been sent to {formData.email}.
                            </p>
                            <button onClick={onClose} className="w-full bg-masa-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-md">
                                Done
                            </button>
                        </div>
                    )}

                    {/* STEP 5: FAILURE */}
                    {step === 'failure' && (
                        <div className="text-center py-6 animate-fade-in">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XIcon className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h3>
                            <p className="text-gray-600 mb-8">
                                Unfortunately, the transaction could not be completed. Please check your details and try again.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button onClick={() => setStep('payment')} className="flex-1 bg-masa-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 shadow-md">
                                    Retry Payment
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <style>{`
                @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

// --- EXISTING COURSE DETAILS MODAL (MODIFIED) ---
const CourseDetailsModal: React.FC<{ course: Course; onClose: () => void; onEnroll: () => void }> = ({ course, onClose, onEnroll }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 text-gray-600 transition-colors z-10">
                    <XIcon className="h-6 w-6" />
                </button>
                
                <div className="relative h-64">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-8 text-white w-full">
                            <div className="flex justify-between items-start">
                                <span className="bg-masa-orange px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">{course.category}</span>
                                <span className="bg-white text-masa-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block shadow-md">
                                    {course.price || 'Free'}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold">{course.title}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
                         <div className="flex items-center"><SignalIcon className="h-4 w-4 mr-2"/> {course.level}</div>
                         <div className="flex items-center"><ClockIcon className="h-4 w-4 mr-2"/> {course.duration}</div>
                         <div className="flex items-center"><LaptopIcon className="h-4 w-4 mr-2"/> {course.mode}</div>
                    </div>

                    <h3 className="text-xl font-bold text-masa-charcoal mb-3">About this Course</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{course.fullDescription}</p>

                    <h3 className="text-xl font-bold text-masa-charcoal mb-3">Key Highlights</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {course.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                                <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                        <button onClick={onEnroll} className="flex-1 bg-masa-blue text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md text-center">
                            Enroll Now ({course.price || 'Free'})
                        </button>
                        <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors text-center">
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
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
            <button onClick={() => document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg transform hover:-translate-y-1">
                Explore Courses
            </button>
        </div>
    </div>
);

const CoursesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [selectedMode, setSelectedMode] = useState<string>('All');
    const [selectedPrice, setSelectedPrice] = useState<string>('All'); 
    
    // UI State for Modals
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // For Details Modal
    const [enrollmentCourse, setEnrollmentCourse] = useState<Course | null>(null); // For Enrollment Modal

    useEffect(() => {
        setCourses(ContentManager.getCourses());
    }, []);

    const filteredCourses = courses.filter(course => {
        const matchesPrice = selectedPrice === 'All' 
            ? true 
            : selectedPrice === 'Free' 
                ? (course.price === 'Free') 
                : (course.price !== 'Free');

        return (selectedCategory === 'All' || course.category === selectedCategory) &&
               (selectedLevel === 'All' || course.level === selectedLevel) &&
               (selectedMode === 'All' || course.mode === selectedMode) &&
               matchesPrice;
    });

    const getCategoryIcon = (category: string) => {
        switch(category) {
            case 'Sports': return <TrophyIcon className="h-4 w-4 mr-1"/>;
            case 'Education': return <AcademicCapIcon className="h-4 w-4 mr-1"/>;
            case 'Culture': return <GlobeIcon className="h-4 w-4 mr-1"/>;
            default: return null;
        }
    };

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'Sports': return 'bg-orange-100 text-masa-orange border-orange-200';
            case 'Education': return 'bg-blue-100 text-masa-blue border-blue-200';
            case 'Culture': return 'bg-purple-100 text-purple-600 border-purple-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const handleEnrollClick = (course: Course) => {
        setSelectedCourse(null); // Close details modal if open
        setEnrollmentCourse(course); // Open enrollment modal
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* View Details Modal */}
            {selectedCourse && (
                <CourseDetailsModal 
                    course={selectedCourse} 
                    onClose={() => setSelectedCourse(null)} 
                    onEnroll={() => handleEnrollClick(selectedCourse)} 
                />
            )}

            {/* New Enrollment Modal */}
            {enrollmentCourse && (
                <EnrollmentModal 
                    course={enrollmentCourse}
                    onClose={() => setEnrollmentCourse(null)}
                />
            )}

            <PageHeader 
                title="Masa Academy" 
                subtitle="Empowering you with skills for life, leadership, and excellence." 
                bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
            />

            <section className="py-12 border-b border-gray-200 bg-white sticky top-20 z-40 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <h2 className="text-xl font-bold text-masa-charcoal hidden md:block">Filter Courses</h2>
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Categories</option>
                                <option value="Sports">Sports</option>
                                <option value="Education">Education</option>
                                <option value="Culture">Culture</option>
                            </select>

                            <select 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            <select 
                                value={selectedMode} 
                                onChange={(e) => setSelectedMode(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Modes</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>

                            <select 
                                value={selectedPrice} 
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Prices</option>
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section id="course-grid" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map(course => (
                                <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
                                    <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center ${getCategoryColor(course.category)}`}>
                                            {getCategoryIcon(course.category)}
                                            {course.category}
                                        </div>
                                        {/* Price Badge on Card */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-masa-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm border border-gray-200">
                                            {course.price || 'Free'}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors cursor-pointer" onClick={() => setSelectedCourse(course)}>
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                                            {course.description}
                                        </p>
                                        
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-500 mb-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center">
                                                <SignalIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.level}
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.duration}
                                            </div>
                                            <div className="flex items-center col-span-2">
                                                <LaptopIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.mode} Mode
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-auto">
                                            <button 
                                                onClick={() => setSelectedCourse(course)}
                                                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button 
                                                onClick={() => handleEnrollClick(course)}
                                                className="flex-1 py-3 rounded-xl bg-masa-blue text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No courses found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            <button 
                                onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSelectedMode('All'); setSelectedPrice('All'); }}
                                className="mt-6 text-masa-orange font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Bottom CTA for General Inquiries */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-masa-charcoal mb-4">Can't find what you're looking for?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        We offer customized training programs for institutions and corporate groups. Reach out to us for bespoke workshops.
                    </p>
                    <button 
                        onClick={() => navigateTo('contact')} 
                        className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
                    >
                        Contact / Inquiry
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
