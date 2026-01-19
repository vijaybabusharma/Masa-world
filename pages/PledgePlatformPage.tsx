
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps } from '../types';
import { pledgeData, Pledge } from '../utils/data';
import { submitForm, verifyCertificate, getStats, sendOtp, verifyOtp } from '../utils/mockBackend';
import PledgeCertificate from '../components/PledgeCertificate';
import { ArrowRightIcon, HandRaisedIcon, SparklesIcon, UsersIcon, ShieldCheckIcon, CheckIcon, DocumentTextIcon, EnvelopeIcon, PhoneIcon } from '../components/icons/FeatureIcons';
import { XIcon } from '../components/icons/UiIcons';
import { FacebookIcon, TwitterIcon } from '../components/icons/SocialIcons';

// --- MODAL COMPONENTS (defined inside for single-page structure) ---

const PledgeFormModal: React.FC<{
    pledge: Pledge;
    onClose: () => void;
    onComplete: (data: any) => void;
}> = ({ pledge, onClose, onComplete }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: OTP, 3: Sapath
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        country: 'India',
        location: '',
        participantType: 'Individual',
        organizationName: '',
    });
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpSentMsg, setOtpSentMsg] = useState('');
    const [timer, setTimer] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // Timer logic for Resend OTP
    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending OTP
        sendOtp(formData.email); // Sending to email as primary
        setOtpSentMsg(`OTP sent successfully to ${formData.email} and ${formData.mobile}`);
        setStep(2);
        setTimer(60); // Start 60s timer
        setOtp(''); // Clear previous OTP if any
        setOtpError('');
    };

    const handleResendOtp = () => {
        setOtpError('');
        sendOtp(formData.email);
        setOtpSentMsg('OTP resent successfully!');
        setTimer(60);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (verifyOtp(otp)) {
            setStep(3); // Move to Sapath
        } else {
            setOtpError('Invalid OTP. Please try again (Hint: 123456)');
        }
    };

    const handleFinalSubmit = () => {
        if (!agreed) {
            alert('You must agree to the pledge to proceed.');
            return;
        }
        setIsSubmitting(true);
        const submissionData = { ...formData, pledgeTitle: pledge.title, pledgeId: pledge.id, consent: true, verified: true };
        submitForm('pledge', submissionData);
        
        // Simulate backend delay
        setTimeout(() => {
            onComplete(JSON.parse(sessionStorage.getItem('last_pledge') || '{}'));
            setIsSubmitting(false);
        }, 1500);
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

    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"><XIcon className="h-6 w-6" /></button>
                
                {/* Header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 text-center">
                    <h3 className="text-xl font-bold text-masa-charcoal">Official Pledge Portal</h3>
                    <p className="text-sm text-masa-orange font-semibold mt-1">{pledge.title}</p>
                </div>

                <div className="p-8">
                    {/* STEP 1: DETAILS */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="text-center mb-6">
                                <h4 className="text-lg font-bold">Step 1: Basic Details</h4>
                                <p className="text-xs text-gray-500 mt-1 bg-blue-50 p-2 rounded border border-blue-100">
                                    <ShieldCheckIcon className="h-3 w-3 inline mr-1 text-masa-blue"/>
                                    Your details are used only to generate your pledge certificate.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input required name="fullName" onChange={handleChange} value={formData.fullName} type="text" placeholder="Full Name *" className="w-full input-field" />
                                <select name="participantType" onChange={handleChange} value={formData.participantType} className="w-full input-field bg-white">
                                    <option>Individual</option>
                                    <option>Organization</option>
                                </select>
                            </div>
                            {formData.participantType === 'Organization' && (
                                 <input name="organizationName" onChange={handleChange} value={formData.organizationName} type="text" placeholder="Organization Name *" className="w-full input-field" required/>
                            )}
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email Address *" className="w-full input-field pl-10" />
                            </div>
                            <div className="relative">
                                <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required name="mobile" onChange={handleChange} value={formData.mobile} type="tel" placeholder="Mobile Number *" className="w-full input-field pl-10" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <select required name="country" onChange={handleChange} value={formData.country} className="w-full input-field bg-white">
                                    <option>India</option><option>United States</option><option>United Kingdom</option><option>Other</option>
                                </select>
                                <input name="location" onChange={handleChange} value={formData.location} type="text" placeholder="State / City" className="w-full input-field" />
                            </div>
                            <button type="submit" className="w-full bg-masa-charcoal text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-md mt-4 flex justify-center items-center gap-2">
                                Send OTP for Verification <ArrowRightIcon className="h-4 w-4" />
                            </button>
                        </form>
                    )}

                    {/* STEP 2: OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
                            <div className="mb-4">
                                <h4 className="text-lg font-bold">Step 2: Verify Identity</h4>
                                {otpSentMsg && (
                                    <div className="mt-3 bg-green-50 text-green-700 p-2 rounded text-sm border border-green-200 flex items-center justify-center gap-2">
                                        <CheckIcon className="h-4 w-4" /> {otpSentMsg}
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP</label>
                                <input 
                                    type="text" 
                                    maxLength={6} 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    className="w-full text-center text-3xl tracking-widest font-bold border-b-2 border-masa-orange focus:border-masa-blue outline-none py-2 bg-transparent" 
                                    placeholder="• • • • • •"
                                    autoFocus
                                    required 
                                />
                                {otpError && <p className="text-red-500 text-sm mt-2 animate-pulse">{otpError}</p>}
                                <p className="text-xs text-gray-400 mt-4">Hint: Use 123456</p>
                            </div>

                            <button type="submit" className="w-full bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-md">
                                Verify & Continue
                            </button>
                            
                            <div className="flex justify-between items-center text-sm pt-2">
                                <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-masa-charcoal underline">
                                    Edit Details
                                </button>
                                {timer > 0 ? (
                                    <span className="text-gray-400 cursor-not-allowed">Resend OTP in {timer}s</span>
                                ) : (
                                    <button type="button" onClick={handleResendOtp} className="text-masa-orange font-semibold hover:underline">
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </form>
                    )}

                    {/* STEP 3: SAPATH (OATH) */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 border-2 border-orange-100">
                                    <HandRaisedIcon className="h-8 w-8 text-masa-orange" />
                                </div>
                                <h4 className="text-xl font-bold text-masa-charcoal">Pledge Confirmation</h4>
                                <p className="text-sm text-gray-500 font-medium">Sapath Patra</p>
                            </div>

                            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100 shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-masa-orange"></div>
                                <p className="font-serif text-lg text-gray-800 text-center italic leading-relaxed">
                                    "I, <span className="font-bold text-masa-charcoal">{formData.fullName}</span>, {pledge.statement.toLowerCase().replace('i pledge to', 'solemnly pledge to')}"
                                </p>
                            </div>

                            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <input 
                                    type="checkbox" 
                                    id="agree" 
                                    checked={agreed} 
                                    onChange={(e) => setAgreed(e.target.checked)} 
                                    className="h-5 w-5 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-0.5" 
                                />
                                <label htmlFor="agree" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                    I have read the pledge carefully and I agree to it sincerely.
                                </label>
                            </div>

                            <button 
                                onClick={handleFinalSubmit} 
                                disabled={!agreed || isSubmitting}
                                className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 ${agreed ? 'bg-gradient-to-r from-masa-orange to-red-600 text-white hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Generating Certificate...
                                    </>
                                ) : (
                                    'Confirm My Pledge'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
             {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
             <style>{`.input-field { border: 1px solid #D1D5DB; border-radius: 0.5rem; padding: 0.75rem 1rem; transition: all 0.2s; } .input-field:focus { border-color: #F97316; ring: 2px solid #F97316; outline: none; } @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }`}</style>
        </div>
    );
};

const PledgeCompletionModal: React.FC<{
    pledgeInfo: any;
    onClose: () => void;
}> = ({ pledgeInfo, onClose }) => {
    const handleShare = (platform: 'wa' | 'fb' | 'tw') => {
        const text = encodeURIComponent(`I've just taken the "${pledgeInfo.pledgeTitle}" pledge with MASA World Foundation! Join me in making a commitment to positive change. #MASAPledge`);
        let url = '';
        if (platform === 'wa') url = `https://wa.me/?text=${text}`;
        if (platform === 'fb') url = `https://www.facebook.com/sharer/sharer.php?u=example.com&quote=${text}`;
        if (platform === 'tw') url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, '_blank');
    };
    
    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"><XIcon className="h-6 w-6" /></button>
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckIcon className="h-10 w-10 text-green-600"/>
                    </div>
                    <h1 className="text-4xl font-extrabold text-masa-charcoal mb-2">Congratulations!</h1>
                    <p className="text-lg text-gray-600 mb-8">Your commitment contributes to real social change. <br/>A copy of this certificate has been sent to your email and WhatsApp.</p>
                    
                    {pledgeInfo && (
                        <div className="max-w-md mx-auto mb-8 transform scale-95 hover:scale-100 transition-transform duration-500 shadow-lg border-4 border-white rounded-lg">
                            <PledgeCertificate name={pledgeInfo.fullName} pledgeTitle={pledgeInfo.pledgeTitle} certId={pledgeInfo.certificateId} date={pledgeInfo.timestamp.split(',')[0]} />
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => alert('Simulating PDF download...')} className="bg-masa-blue text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-900 transition-colors shadow-lg flex items-center justify-center gap-2">
                            <DocumentTextIcon className="h-5 w-5"/> Download PDF
                        </button>
                        <button onClick={() => handleShare('wa')} className="bg-green-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2">
                            <CheckIcon className="h-5 w-5"/> Share on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PledgePlatformPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [showPledgeModal, setShowPledgeModal] = useState(false);
    const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [completionData, setCompletionData] = useState<any>(null);
    const [stats, setStats] = useState({ pledges: 125000, countries: 75, youth: 80000, orgs: 150 });
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { title: "Take a Pledge for a Better Tomorrow", subtitle: "Commit to positive change.", image: "https://picsum.photos/1600/900?grayscale&blur=2&random=1" },
        { title: "Commit to Sports, Education & Culture", subtitle: "Empower communities with us.", image: "https://picsum.photos/1600/900?grayscale&blur=2&random=2" },
        { title: "Be a Responsible Global Citizen", subtitle: "Your action today shapes the future.", image: "https://picsum.photos/1600/900?grayscale&blur=2&random=3" },
    ];
    
    const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % slides.length), [slides.length]);
    useEffect(() => { const timer = setInterval(nextSlide, 5000); return () => clearInterval(timer); }, [nextSlide]);

    const handleTakePledgeClick = (pledge: Pledge) => {
        setSelectedPledge(pledge);
        setShowPledgeModal(true);
    };

    const handleFormComplete = (data: any) => {
        setShowPledgeModal(false);
        setCompletionData(data);
        setShowCompletionModal(true);
        // Update stats
        setStats(prev => ({ ...prev, pledges: prev.pledges + 1 }));
    };

    // --- Verification Section State ---
    const [verifyCertId, setVerifyCertId] = useState('');
    const [verifyResult, setVerifyResult] = useState<any>(null);
    const [verifyError, setVerifyError] = useState('');
    const [verifySearched, setVerifySearched] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setVerifySearched(true);
        setVerifyError('');
        setVerifyResult(null);
        const found = verifyCertificate(verifyCertId.trim());
        if (found) setVerifyResult(found);
        else setVerifyError('Certificate ID not found. Please check the ID and try again.');
    };

    return (
        <div className="bg-gray-50">
            {showPledgeModal && selectedPledge && <PledgeFormModal pledge={selectedPledge} onClose={() => setShowPledgeModal(false)} onComplete={handleFormComplete} />}
            {showCompletionModal && completionData && <PledgeCompletionModal pledgeInfo={completionData} onClose={() => setShowCompletionModal(false)} />}
            
            {/* SECTION 1: HERO SLIDER */}
            <section className="relative bg-gray-800 text-white h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {slides.map((slide, index) => (<div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}><img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-30" /></div>))}
                <div className="relative container mx-auto px-4 text-center z-10 animate-fade-in-up max-w-5xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md leading-tight">{slides[currentSlide].title}</h1>
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-masa-orange mb-8 drop-shadow-sm">{slides[currentSlide].subtitle}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <button onClick={() => document.getElementById('pledge-categories')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-masa-orange text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            Take the Pledge <ArrowRightIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => navigateTo('certificate-downloader')} className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-white hover:text-masa-charcoal transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            <DocumentTextIcon className="h-5 w-5" /> Download Your Certificate
                        </button>
                    </div>

                    <p className="mt-6 text-sm md:text-base text-gray-200 font-medium opacity-90 max-w-2xl mx-auto">
                        Take a pledge today and receive your digital certificate instantly.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-semibold text-white/90">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                            <SparklesIcon className="h-4 w-4 text-yellow-400" />
                            <span>Instant Digital Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                            <CheckIcon className="h-4 w-4 text-green-400" />
                            <span>Email & WhatsApp Delivery</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                            <UsersIcon className="h-4 w-4 text-blue-400" />
                            <span>Open for Individuals & Organizations</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: WHY TAKE A PLEDGE */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[{icon: SparklesIcon, text: "Create Awareness"}, {icon: UsersIcon, text: "Build Responsibility"}, {icon: HandRaisedIcon, text: "Inspire Community"}, {icon: ShieldCheckIcon, text: "Get a Digital Certificate"}].map(item => (
                            <div key={item.text} className="text-center p-4"><div className="w-16 h-16 mx-auto bg-blue-50 text-masa-blue rounded-full flex items-center justify-center mb-4"><item.icon className="h-8 w-8"/></div><h3 className="font-semibold text-masa-charcoal">{item.text}</h3></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: PLEDGE CATEGORIES */}
            <section id="pledge-categories" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16"><h2 className="text-3xl font-bold text-masa-charcoal">Choose Your Pledge</h2><p className="mt-4 text-lg text-gray-600">Select a cause that resonates with you.</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {pledgeData.map(pledge => <div key={pledge.id} className="bg-white p-6 rounded-xl shadow-md border hover:border-masa-orange transition-all flex flex-col text-center items-center"><div className="w-14 h-14 bg-orange-50 text-masa-orange rounded-full flex items-center justify-center mb-4"><pledge.icon className="h-7 w-7"/></div><h3 className="font-bold text-masa-charcoal mb-2 flex-grow">{pledge.title}</h3><p className="text-xs text-gray-500 mb-4">{pledge.description}</p><button onClick={() => handleTakePledgeClick(pledge)} className="mt-auto w-full bg-masa-blue text-white font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors text-sm">Take Pledge</button></div>)}
                    </div>
                </div>
            </section>

            {/* SECTION: Download Your Certificates */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-blue-50 rounded-2xl p-10 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-masa-blue text-white rounded-full flex items-center justify-center mb-4">
                            <DocumentTextIcon className="h-8 w-8"/>
                        </div>
                        <h2 className="text-3xl font-bold text-masa-charcoal">Download Your Certificates</h2>
                        <p className="mt-2 text-gray-600 max-w-xl mx-auto">Already taken a pledge or completed a program? Access all your official certificates here.</p>
                        <button 
                            onClick={() => navigateTo('certificate-downloader')}
                            className="mt-6 bg-masa-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900 transition-colors shadow-md"
                        >
                            Get My Certificates
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 7: IMPACT COUNTERS */}
            <section className="py-16 bg-masa-charcoal text-white"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">{[{v: stats.pledges, l: "Pledges Taken"},{v: stats.countries, l: "Countries"},{v: stats.youth, l: "Youth Engaged"},{v: stats.orgs, l: "Organizations"}].map(s => <div key={s.l}><p className="text-4xl font-extrabold text-masa-orange">{s.v.toLocaleString()}+</p><p className="mt-1 text-gray-300 font-medium">{s.l}</p></div>)}</div></div></section>

             {/* VERIFY CERTIFICATE SECTION */}
            <section className="py-20 bg-gray-100"><div className="container mx-auto px-4 max-w-2xl"><div className="bg-white p-8 rounded-2xl shadow-lg border text-center"><ShieldCheckIcon className="h-12 w-12 mx-auto text-masa-blue mb-4" /><h2 className="text-3xl font-bold text-masa-charcoal">Verify Pledge Certificate</h2><p className="mt-2 text-gray-600">Enter a Certificate ID to verify its authenticity.</p><form onSubmit={handleVerify} className="mt-8 flex flex-col sm:flex-row gap-2"><input type="text" value={verifyCertId} onChange={(e) => {setVerifyCertId(e.target.value); if(verifyError) setVerifyError('');}} placeholder="Enter Certificate ID" className="flex-grow px-4 py-3 rounded-lg border focus:ring-2 focus:ring-masa-orange outline-none" required /><button type="submit" className="bg-masa-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-900">Verify</button></form>{verifySearched && (<div className="mt-6 text-left">{verifyResult && (<div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"><h3 className="font-bold text-green-800">Certificate Valid</h3><p><strong>Name:</strong> {verifyResult.fullName}</p><p><strong>Pledge:</strong> {verifyResult.pledgeTitle}</p><p><strong>Date:</strong> {verifyResult.timestamp}</p></div>)}{verifyError && (<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"><p className="font-bold text-red-800">{verifyError}</p></div>)}</div>)}</div></div></section>
            
            {/* FOOTER CTA */}
            <section className="py-20 bg-white"><div className="container mx-auto px-4 text-center"><h2 className="text-3xl font-bold text-masa-charcoal mb-4">Want to do more than a pledge?</h2><div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><button onClick={() => navigateTo('volunteer')} className="bg-masa-blue text-white px-8 py-3 rounded-full font-bold">Become a Volunteer</button><button onClick={() => navigateTo('membership')} className="bg-masa-charcoal text-white px-8 py-3 rounded-full font-bold">Become a Member</button><button onClick={() => navigateTo('donate')} className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold">Donate Now</button></div></div></section>
        </div>
    );
};

export default PledgePlatformPage;
