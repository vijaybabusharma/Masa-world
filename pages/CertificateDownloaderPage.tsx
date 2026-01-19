import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { DocumentTextIcon, DownloadIcon, EnvelopeIcon, PhoneIcon, ShieldCheckIcon } from '../components/icons/FeatureIcons';
import { sendOtp, verifyOtp, getCertificatesByContact } from '../utils/mockBackend';

const CertificateDownloaderPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [step, setStep] = useState(1); // 1: entry, 2: otp, 3: results
    const [contactMethod, setContactMethod] = useState<'email' | 'mobile'>('email');
    const [contactValue, setContactValue] = useState('');
    const [otp, setOtp] = useState('');
    const [certificates, setCertificates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        sendOtp(contactValue); // Simulate sending OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1000);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            if (verifyOtp(otp)) {
                const foundCerts = getCertificatesByContact(contactValue);
                setCertificates(foundCerts);
                setStep(3);
            } else {
                setError('Invalid OTP. Please try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setStep(1);
        setContactValue('');
        setOtp('');
        setCertificates([]);
        setError('');
        setVerifySearched(false);
    };

    const [verifyCertId, setVerifyCertId] = useState('');
    const [verifyResult, setVerifyResult] = useState<any>(null);
    const [verifyError, setVerifyError] = useState('');
    const [verifySearched, setVerifySearched] = useState(false);

    return (
        <div className="bg-gray-50 min-h-[80vh] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100">
                    <div className="text-center">
                        <DocumentTextIcon className="h-12 w-12 mx-auto text-masa-blue mb-4"/>
                        <h1 className="text-3xl font-bold text-masa-charcoal">Download Your Certificates</h1>
                        <p className="mt-2 text-gray-600">Access your official certificates from MASA World Foundation.</p>
                    </div>

                    {/* Step 1: Contact Info */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="mt-8 space-y-6 animate-fade-in">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Verification Method</label>
                                <div className="flex rounded-lg border border-gray-300 p-1">
                                    <button type="button" onClick={() => setContactMethod('email')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${contactMethod === 'email' ? 'bg-masa-blue text-white' : 'text-gray-500'}`}>Email</button>
                                    <button type="button" onClick={() => setContactMethod('mobile')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${contactMethod === 'mobile' ? 'bg-masa-blue text-white' : 'text-gray-500'}`}>Mobile</button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contactValue" className="block text-sm font-bold text-gray-700 mb-2">
                                    {contactMethod === 'email' ? 'Enter your registered Email' : 'Enter your registered Mobile Number'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {contactMethod === 'email' ? <EnvelopeIcon className="h-5 w-5 text-gray-400" /> : <PhoneIcon className="h-5 w-5 text-gray-400" />}
                                    </div>
                                    <input
                                        id="contactValue"
                                        type={contactMethod === 'email' ? 'email' : 'tel'}
                                        value={contactValue}
                                        onChange={(e) => setContactValue(e.target.value)}
                                        placeholder={contactMethod === 'email' ? 'you@example.com' : '+91...'}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full bg-masa-orange text-white py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6 animate-fade-in">
                            <p className="text-center text-gray-600">An OTP has been sent to <strong>{contactValue}</strong>. Please enter it below.</p>
                             <div>
                                <label htmlFor="otp" className="block text-sm font-bold text-gray-700 mb-2">Enter 6-Digit OTP</label>
                                <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full text-center tracking-[1em] text-2xl font-bold py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none" required />
                                <p className="text-xs text-gray-400 text-center mt-2">Hint: The OTP is 123456</p>
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                             <button type="submit" disabled={isLoading} className="w-full bg-masa-blue text-white py-3 rounded-full font-bold text-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Verifying...' : 'Verify & Get Certificates'}
                            </button>
                            <button type="button" onClick={handleReset} className="w-full text-center text-sm text-gray-500 hover:underline">Try with a different email/mobile</button>
                        </form>
                    )}

                    {/* Step 3: Display Results */}
                    {step === 3 && (
                        <div className="mt-8 animate-fade-in">
                            {certificates.length > 0 ? (
                                <>
                                    <h3 className="text-lg font-bold text-center mb-4">Found {certificates.length} Certificate(s)</h3>
                                    <div className="space-y-4">
                                        {certificates.map(cert => (
                                            <div key={cert.id} className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-masa-charcoal">{cert.title}</p>
                                                    <p className="text-xs text-gray-500">Type: {cert.type} | Issued: {cert.date}</p>
                                                    <p className="text-xs text-gray-500">ID: {cert.id}</p>
                                                </div>
                                                <button onClick={() => alert(`Simulating download for certificate ID: ${cert.id}`)} className="bg-masa-orange text-white p-2 rounded-full hover:bg-orange-600">
                                                    <DownloadIcon className="h-5 w-5"/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">No certificates found for this contact information.</p>
                            )}
                             <button type="button" onClick={handleReset} className="w-full mt-8 text-center text-sm text-gray-500 font-bold hover:underline">Start Over</button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default CertificateDownloaderPage;
