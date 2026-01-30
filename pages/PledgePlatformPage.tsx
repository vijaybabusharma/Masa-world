
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavigationProps, Pledge } from '../types';
import { ContentManager } from '../utils/contentManager';
import { submitForm, verifyCertificate, getStats, sendOtp, verifyOtp, getCertificatesByContact } from '../utils/mockBackend';
import PledgeCertificate from '../components/PledgeCertificate';
import { 
    ArrowRightIcon, HandRaisedIcon, SparklesIcon, UsersIcon, ShieldCheckIcon, 
    CheckIcon, DocumentTextIcon, EnvelopeIcon, PhoneIcon, DownloadIcon, 
    SearchIcon, GlobeIcon, HeartIcon
} from '../components/icons/FeatureIcons';
import { XIcon } from '../components/icons/UiIcons';
import { FacebookIcon, TwitterIcon } from '../components/icons/SocialIcons';

// --- MODAL COMPONENTS ---

const PledgeFormModal: React.FC<{
    pledge: Pledge;
    onClose: () => void;
    onComplete: () => void;
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
    const oathContainerRef = useRef<HTMLDivElement>(null);
    const [canAgree, setCanAgree] = useState(false);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOathScroll = () => {
        const el = oathContainerRef.current;
        if (el) {
            // Check if user has scrolled to the bottom (with a 20px tolerance)
            if (el.scrollHeight - el.scrollTop <= el.clientHeight + 20) {
                setCanAgree(true);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        sendOtp(formData.email);
        setOtpSentMsg(`OTP sent successfully to ${formData.email} and ${formData.mobile}`);
        setStep(2);
        setTimer(60);
        setOtp('');
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
            setStep(3);
        } else {
            setOtpError('Invalid OTP. Please try again (Hint: 123456)');
        }
    };

    const handleFinalSubmit = async () => {
        if (!agreed) {
            alert('You must agree to the pledge to proceed.');
            return;
        }
        setIsSubmitting(true);
        const submissionData = { ...formData, pledgeTitle: pledge.title, pledgeId: pledge.id, consent: true, verified: true };
        await submitForm('pledge', submissionData);
        setIsSubmitting(false);
        onComplete();
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
                
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 text-center">
                    <h3 className="text-xl font-bold text-masa-charcoal">Official Pledge Portal</h3>
                    <p className="text-sm text-masa-orange font-semibold mt-1">{pledge.title}</p>
                </div>

                <div className="p-8">
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
                                <input required name="fullName" onChange={handleChange} value={formData.fullName} type="text" placeholder="Full Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                                <select name="participantType" onChange={handleChange} value={formData.participantType} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all bg-white">
                                    <option>Individual</option>
                                    <option>Organization</option>
                                </select>
                            </div>
                            {formData.participantType === 'Organization' && (
                                 <input name="organizationName" onChange={handleChange} value={formData.organizationName} type="text" placeholder="Organization Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all" required/>
                            )}
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email Address *" className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                            </div>
                            <div className="relative">
                                <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required name="mobile" onChange={handleChange} value={formData.mobile} type="tel" placeholder="Mobile Number *" className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <select required name="country" onChange={handleChange} value={formData.country} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all bg-white">
                                    <option>India</option><option>United States</option><option>United Kingdom</option><option>Other</option>
                                </select>
                                <input name="location" onChange={handleChange} value={formData.location} type="text" placeholder="State / City" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-masa-orange outline-none transition-all" />
                            </div>
                            <button type="submit" className="w-full bg-masa-charcoal text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-md mt-4 flex justify-center items-center gap-2">
                                Send OTP for Verification <ArrowRightIcon className="h-4 w-4" />
                            </button>
                        </form>
                    )}

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

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 border-2 border-orange-100">
                                    <HandRaisedIcon className="h-8 w-8 text-masa-orange" />
                                </div>
                                <h4 className="text-xl font-bold text-masa-charcoal">Read & Take the Oath</h4>
                                <p className="text-sm text-gray-500 font-medium">Sapath Patra</p>
                            </div>

                            <div 
                                ref={oathContainerRef}
                                onScroll={handleOathScroll}
                                className="bg-orange-50/50 p-6 rounded-xl border border-orange-100 shadow-inner relative overflow-hidden h-64 overflow-y-auto"
                            >
                                <div className="prose prose-sm text-gray-800 text-left leading-relaxed font-serif italic">
                                    <p>I, <span className="font-bold text-masa-charcoal not-italic">{formData.fullName}</span>, do solemnly pledge to...</p>
                                    {pledge.oathText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                                </div>
                            </div>

                            <div className={`flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 transition-opacity ${canAgree ? 'opacity-100' : 'opacity-50'}`}>
                                <input 
                                    type="checkbox" 
                                    id="agree-pledge" 
                                    checked={agreed}
                                    onChange={() => setAgreed(!agreed)}
                                    disabled={!canAgree}
                                    className="h-5 w-5 rounded text-masa-orange focus:ring-masa-orange mt-1 disabled:cursor-not-allowed" 
                                />
                                <label htmlFor="agree-pledge" className={`text-sm text-gray-700 ${!canAgree ? 'cursor-not-allowed' : ''}`}>
                                    I have read the pledge and I voluntarily commit to upholding its principles. {!canAgree && "(Please scroll to the end)"}
                                </label>
                            </div>

                            <button onClick={handleFinalSubmit} disabled={isSubmitting || !agreed} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon className="h-5 w-5" /> Confirm & Get Certificate
                                    </>
                                )}
                            </button>
                        </div>
                    )}
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

const CertificateViewModal: React.FC<{
    certData: any;
    onClose: () => void;
}> = ({ certData, onClose }) => {
    const certRef = useRef<HTMLDivElement>(null);
    
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/pledge` : `https://masaworld.org/pledge`;
    const shareText = `I just took the "${certData.pledgeTitle}" pledge with MASA World Foundation! Join me in making a commitment. Verify my certificate ID: ${certData.certificateId}`;
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(shareText)}`,
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-4xl relative animate-fade-in-up max-h-[95vh] overflow-y-auto flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 bg-white/50 hover:bg-white rounded-full p-2 z-10"><XIcon className="h-6 w-6" /></button>
                <div ref={certRef} className="p-4 sm:p-8">
                    <PledgeCertificate 
                        name={certData.fullName}
                        pledgeTitle={certData.pledgeTitle}
                        certId={certData.certificateId}
                        date={new Date(certData.timestamp).toLocaleDateString('en-GB')}
                    />
                </div>
                <div className="bg-white p-4 border-t border-gray-200 mt-auto flex flex-col sm:flex-row gap-3 justify-center items-center sticky bottom-0">
                    <button onClick={() => alert('Print functionality to be implemented.')} className="flex-1 bg-masa-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors"><DownloadIcon className="h-5 w-5"/> Download/Print</button>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"><TwitterIcon className="h-5 w-5"/> Share on X</a>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"><FacebookIcon className="h-5 w-5"/> Share on Facebook</a>
                </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

const PledgePlatformPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [pledges, setPledges] = useState<Pledge[]>([]);
    const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);
    const [certificateData, setCertificateData] = useState<any>(null);
    const [pledgeCount, setPledgeCount] = useState(0);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [verifyCertId, setVerifyCertId] = useState('');
    const [verifyResult, setVerifyResult] = useState<any>(null);
    const [verifyError, setVerifyError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        setPledges(ContentManager.getPledges());
        const stats = getStats();
        setPledgeCount(1000 + (stats.pledges || 0)); // Start with a base number
    }, []);
    
    const filteredPledges = pledges.filter(pledge => {
        const matchesCategory = activeCategory === 'All' || pledge.category === activeCategory;
        const matchesSearch = pledge.title.toLowerCase().includes(searchQuery.toLowerCase()) || pledge.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const pledgeCategories = Array.from(new Set(pledges.map(p => p.category)));

    const getPledgeIcon = (iconName: string) => {
        switch (iconName) {
            case 'UsersIcon': return UsersIcon;
            case 'GlobeIcon': return GlobeIcon;
            case 'HeartIcon': return HeartIcon;
            case 'ShieldCheckIcon': return ShieldCheckIcon;
            default: return SparklesIcon;
        }
    };

    const handleTakePledge = (pledge: Pledge) => {
        setSelectedPledge(pledge);
    };

    const handlePledgeComplete = () => {
        setSelectedPledge(null);
        navigateTo('thank-you-pledge');
        setPledgeCount(prev => prev + 1);
    };
    
    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setVerifyError('');
        setVerifyResult(null);

        setTimeout(() => {
            const result = verifyCertificate(verifyCertId);
            if(result) {
                setVerifyResult(result);
            } else {
                setVerifyError('Certificate ID not found. Please check the ID and try again.');
            }
            setIsVerifying(false);
        }, 1000);
    };

    return (
        <div className="bg-white">
            {selectedPledge && <PledgeFormModal pledge={selectedPledge} onClose={() => setSelectedPledge(null)} onComplete={handlePledgeComplete} />}
            {certificateData && <CertificateViewModal certData={certificateData} onClose={() => setCertificateData(null)} />}
            
            <div className="relative bg-masa-charcoal text-white py-20 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <HandRaisedIcon className="h-16 w-16 mx-auto text-masa-orange mb-4"/>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Masa Sapath</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Take a pledge, make a commitment, and become a part of the change.</p>
                </div>
            </div>

            <section className="py-12 bg-white -mt-12 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-around text-center">
                        <div className="p-4">
                            <p className="text-4xl font-extrabold text-masa-blue">{pledgeCount.toLocaleString()}</p>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pledges Taken</p>
                        </div>
                         <div className="p-4">
                            <p className="text-4xl font-extrabold text-masa-orange">100%</p>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Verified & Digital</p>
                        </div>
                         <div className="p-4">
                            <p className="text-4xl font-extrabold text-green-600">Global</p>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Participation</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="take-pledge" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Choose Your Pledge</h2>
                        <p className="mt-2 text-gray-600 max-w-xl mx-auto">Select a cause you are passionate about and take a step towards a better tomorrow.</p>
                    </div>
                    {/* Filters */}
                    <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                             <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                             <input type="text" placeholder="Search pledges..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-masa-orange"/>
                        </div>
                        <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} className="py-3 px-4 rounded-full border border-gray-300 bg-white focus:ring-2 focus:ring-masa-orange">
                            <option value="All">All Categories</option>
                            {pledgeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {filteredPledges.map(pledge => {
                            const Icon = getPledgeIcon(pledge.icon);
                            return (
                                <div key={pledge.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col text-center items-center group">
                                    <div className="w-16 h-16 bg-blue-50 text-masa-blue rounded-full flex items-center justify-center mb-4 group-hover:bg-masa-orange group-hover:text-white transition-colors duration-300">
                                        <Icon className="h-8 w-8"/>
                                    </div>
                                    <h3 className="text-lg font-bold text-masa-charcoal mb-2 h-14 flex items-center">{pledge.title}</h3>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">{pledge.description}</p>
                                    <button onClick={() => handleTakePledge(pledge)} className="mt-auto w-full bg-masa-charcoal text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                                        Take this Pledge
                                    </button>
                                </div>
                            );
                        })}
                         {filteredPledges.length === 0 && (
                            <div className="md:col-span-2 lg:col-span-4 text-center text-gray-500 py-16">
                                <p className="font-bold text-lg">No pledges found.</p>
                                <p>Try adjusting your search or category filters.</p>
                            </div>
                         )}
                    </div>
                </div>
            </section>

            <section id="verify-certificate" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-200">
                        <div className="text-center">
                            <ShieldCheckIcon className="h-12 w-12 mx-auto text-green-600 mb-4"/>
                            <h2 className="text-3xl font-bold text-masa-charcoal">Verify & Download Certificate</h2>
                            <p className="mt-2 text-gray-600">Enter your Certificate ID to verify its authenticity or download a copy.</p>
                        </div>
                        <form onSubmit={handleVerify} className="mt-8 space-y-4">
                            <div>
                                <label htmlFor="verifyCertId" className="block text-sm font-bold text-gray-700 mb-2">Certificate ID</label>
                                <input id="verifyCertId" value={verifyCertId} onChange={(e) => setVerifyCertId(e.target.value)} type="text" placeholder="MASA-PLEDGE-XXXXXX" className="w-full text-center tracking-wider font-mono py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none" required/>
                            </div>
                            <button type="submit" disabled={isVerifying} className="w-full bg-masa-blue text-white py-3 rounded-full font-bold text-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400">
                                {isVerifying ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>

                        {verifyError && <p className="mt-4 text-center text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">{verifyError}</p>}
                        
                        {verifyResult && (
                            <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200 animate-fade-in">
                                <h4 className="font-bold text-green-800 flex items-center gap-2"><CheckIcon className="h-5 w-5"/> Certificate Verified!</h4>
                                <p className="text-sm text-gray-700 mt-2">
                                    <strong>Name:</strong> {verifyResult.fullName}<br/>
                                    <strong>Pledge:</strong> {verifyResult.pledgeTitle}<br/>
                                    <strong>Date:</strong> {new Date(verifyResult.timestamp).toLocaleDateString('en-GB')}
                                </p>
                                <button onClick={() => setCertificateData(verifyResult)} className="mt-3 text-masa-blue font-bold hover:underline text-sm">View & Download Certificate</button>
                            </div>
                        )}
                         <p className="text-center text-sm text-gray-500 mt-6">
                            Lost your ID? <button onClick={() => navigateTo('certificate-downloader')} className="font-bold text-masa-blue hover:underline">Find by Email/Mobile</button>
                         </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PledgePlatformPage;
