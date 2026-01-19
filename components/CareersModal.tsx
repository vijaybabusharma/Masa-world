
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { submitForm } from '../utils/mockBackend';
import { NavigationProps } from '../types';

interface CareersModalProps extends NavigationProps {
  initialRole: string;
  onClose: () => void;
}

const CareersModal: React.FC<CareersModalProps> = ({ initialRole, onClose, navigateTo }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: initialRole,
        message: '',
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, role: initialRole }));
    }, [initialRole]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm('career', formData);
        onClose(); // Close modal immediately
        navigateTo('thank-you-career');
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
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <XIcon className="h-6 w-6" />
                </button>
                <div className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-4">Careers & Internships Application</h3>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input required name="fullName" onChange={handleChange} type="text" className="mt-1 block w-full input-field" /></div>
                            <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input required name="email" onChange={handleChange} type="email" className="mt-1 block w-full input-field" /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Phone Number</label><input required name="phone" onChange={handleChange} type="tel" className="mt-1 block w-full input-field" /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role of Interest</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full input-field bg-white">
                                <option>Social Work Internship</option>
                                <option>Project Coordinator</option>
                                <option>Research Fellowship</option>
                                <option value="General Application">General Application (Future Opportunities)</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Cover Letter / Message</label><textarea required name="message" onChange={handleChange} rows={4} className="mt-1 block w-full input-field"></textarea></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF)</label>
                            <input required type="file" accept=".pdf" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-masa-blue hover:file:bg-blue-100"/>
                        </div>
                        <div className="flex items-start pt-2">
                          <input id="career-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                          <label htmlFor="career-consent" className="ml-2 text-sm text-gray-600">I consent to MASA World Foundation storing my data and contacting me regarding job opportunities.</label>
                        </div>
                        <button type="submit" className="w-full bg-masa-blue text-white py-3 px-4 rounded-md font-semibold transition-colors hover:bg-blue-900">
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
            {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
            <style>{`
                .input-field { border: 1px solid #D1D5DB; border-radius: 0.375rem; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
                .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-color: #1E3A8A; border-color: var(--tw-ring-color); }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default CareersModal;
