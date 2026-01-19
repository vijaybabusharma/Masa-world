
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { PartnershipType } from '../types';
import { submitForm } from '../utils/mockBackend';

interface PartnershipModalProps {
  partnershipType: PartnershipType;
  onClose: () => void;
}

const PartnershipModal: React.FC<PartnershipModalProps> = ({ partnershipType, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm('partnership', { ...formData, partnershipType });
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

    const formFields = partnershipType === 'Institutional' ? (
        <>
            <div><label htmlFor="inst-name" className="block text-sm font-medium text-gray-700">Institution Name</label><input required onChange={handleChange} type="text" id="inst-name" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="inst-contact-person" className="block text-sm font-medium text-gray-700">Contact Person</label><input required onChange={handleChange} type="text" id="inst-contact-person" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="inst-email" className="block text-sm font-medium text-gray-700">Email Address</label><input required onChange={handleChange} type="email" id="inst-email" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="inst-phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input required onChange={handleChange} type="tel" id="inst-phone" className="mt-1 block w-full input-field" /></div>
            <div>
                <label htmlFor="inst-type" className="block text-sm font-medium text-gray-700">Type of Institution</label>
                <select required onChange={handleChange} id="inst-type" className="mt-1 block w-full input-field">
                    <option>School</option>
                    <option>College</option>
                    <option>University</option>
                    <option>Other</option>
                </select>
            </div>
            <div><label htmlFor="inst-proposal" className="block text-sm font-medium text-gray-700">Proposal / Message</label><textarea onChange={handleChange} id="inst-proposal" rows={3} className="mt-1 block w-full input-field"></textarea></div>
        </>
    ) : (
        <>
            <div><label htmlFor="corp-name" className="block text-sm font-medium text-gray-700">Company / Foundation Name</label><input required onChange={handleChange} type="text" id="corp-name" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="corp-contact-person" className="block text-sm font-medium text-gray-700">Contact Person</label><input required onChange={handleChange} type="text" id="corp-contact-person" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="corp-email" className="block text-sm font-medium text-gray-700">Email Address</label><input required onChange={handleChange} type="email" id="corp-email" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="corp-phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input required onChange={handleChange} type="tel" id="corp-phone" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="corp-interest" className="block text-sm font-medium text-gray-700">Area of Interest (CSR)</label><input onChange={handleChange} type="text" id="corp-interest" placeholder="e.g., Youth Empowerment, Environment" className="mt-1 block w-full input-field" /></div>
            <div><label htmlFor="corp-proposal" className="block text-sm font-medium text-gray-700">Proposal / Message</label><textarea onChange={handleChange} id="corp-proposal" rows={3} className="mt-1 block w-full input-field"></textarea></div>
        </>
    );

    let buttonClass = partnershipType === 'Corporate' ? 'bg-masa-orange text-white hover:bg-orange-600' : 'bg-masa-charcoal text-white hover:bg-gray-800';
    
    // Explicit title mapping for separation
    const title = partnershipType === 'Institutional' 
        ? "Institutional Membership Application" 
        : "Corporate / CSR Partnership Application";

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
                                Your submission has been received. Our team will review it and get in touch with you shortly.
                            </p>
                            <div className="flex flex-col gap-3 mt-6">
                                <button onClick={onClose} className="w-full bg-masa-charcoal text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800">
                                    Close
                                </button>
                                <button onClick={handleReset} className="w-full text-gray-500 text-sm hover:text-gray-800 transition-colors">
                                    Submit Another Inquiry
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {formFields}
                                <button type="submit" className={`w-full text-white py-3 px-4 rounded-md font-semibold transition-colors ${buttonClass}`}>
                                    {partnershipType === 'Institutional' ? "Submit Institutional Application" : "Submit Partnership Inquiry"}
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

export default PartnershipModal;
