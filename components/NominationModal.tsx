
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { submitForm } from '../utils/mockBackend';

interface NominationModalProps {
  onClose: () => void;
}

const NominationModal: React.FC<NominationModalProps> = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Normalize for email service
        const submissionData = {
            ...formData,
            // Standardize primary contact details
            fullName: formData['hon-nominator-name'],
            email: formData['hon-nominator-email'],
            // Specific Details
            nomineeName: formData['hon-nominee-name'],
            nomineeProfile: formData['hon-nominee-profile'],
            nominationReason: formData['hon-reason']
        };

        submitForm('nomination', submissionData);
        setSubmitted(true);
    };

    const handleReset = () => {
        setSubmitted(false);
        setFormData({});
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <XIcon className="h-6 w-6" />
                </button>
                <div className="p-8">
                    {submitted ? (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-700">Thank You!</h3>
                            <p className="mt-4 text-gray-600">
                                Your nomination has been received. Our team will review it and follow up if necessary.
                            </p>
                            <div className="flex flex-col gap-3 mt-6">
                                <button onClick={onClose} className="w-full bg-masa-charcoal text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800">
                                    Close
                                </button>
                                <button onClick={handleReset} className="w-full text-gray-500 text-sm hover:text-gray-800 transition-colors">
                                    Nominate Another Person
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-center">Honorary / Advisory Member Nomination</h3>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div><label htmlFor="hon-nominee-name" className="block text-sm font-medium text-gray-700">Nominee's Full Name</label><input required onChange={handleChange} type="text" id="hon-nominee-name" className="mt-1 block w-full input-field" /></div>
                                <div><label htmlFor="hon-nominee-profile" className="block text-sm font-medium text-gray-700">Nominee's Profile / Background</label><input required onChange={handleChange} type="text" id="hon-nominee-profile" placeholder="e.g., Social Leader, Educator, Expert" className="mt-1 block w-full input-field" /></div>
                                <div><label htmlFor="hon-reason" className="block text-sm font-medium text-gray-700">Reason for Nomination</label><textarea required onChange={handleChange} id="hon-reason" rows={3} className="mt-1 block w-full input-field"></textarea></div>
                                <hr className="my-2 border-gray-200" />
                                <div><label htmlFor="hon-nominator-name" className="block text-sm font-medium text-gray-700">Your Name (Nominator)</label><input required onChange={handleChange} type="text" id="hon-nominator-name" className="mt-1 block w-full input-field" /></div>
                                <div><label htmlFor="hon-nominator-email" className="block text-sm font-medium text-gray-700">Your Email Address</label><input required onChange={handleChange} type="email" id="hon-nominator-email" className="mt-1 block w-full input-field" /></div>
                                <button type="submit" className="w-full bg-masa-charcoal text-white py-3 px-4 rounded-md font-semibold transition-colors hover:bg-gray-800">
                                    Submit Nomination
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
            {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
            <style>{`
                .input-field { border: 1px solid #D1D5DB; border-radius: 0.375rem; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
                .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-color: #F97316; border-color: var(--tw-ring-color); }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default NominationModal;
