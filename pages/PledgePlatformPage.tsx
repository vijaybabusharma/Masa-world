
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
                                <h4 className="text-xl font-bold text-masa-charcoal">Read & Take the Oath</h4>
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
                                    type="