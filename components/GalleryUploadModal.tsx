
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { submitForm } from '../utils/mockBackend';

interface GalleryUploadModalProps {
  categories: string[];
  onClose: () => void;
}

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({ categories, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        category: categories[0] || '',
        description: '',
        file: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate upload
        setTimeout(() => {
            const submissionData = { ...formData, fileName: formData.file?.name };
            submitForm('gallery', submissionData);
            setIsSubmitting(false);
            setSubmitted(true);
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10">
                    <XIcon className="h-6 w-6" />
                </button>
                <div className="p-8">
                    {submitted ? (
                        <div className="text-center py-8">
                            <h3 className="text-2xl font-bold text-green-700">Thank You!</h3>
                            <p className="mt-4 text-gray-600">
                                Your media has been submitted for review. We appreciate you sharing your moments with us!
                            </p>
                            <button onClick={onClose} className="mt-6 w-full bg-masa-charcoal text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800">
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-center mb-6">Submit to Gallery</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input required name="fullName" onChange={handleChange} type="text" className="mt-1 block w-full input-field" /></div>
                                <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input required name="email" onChange={handleChange} type="email" className="mt-1 block w-full input-field" /></div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Event / Category</label>
                                    <select required name="category" onChange={handleChange} className="mt-1 block w-full input-field bg-white">
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div><label className="block text-sm font-medium text-gray-700">Description</label><textarea required name="description" onChange={handleChange} rows={2} className="mt-1 block w-full input-field" placeholder="Briefly describe the photo/video..."></textarea></div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Upload Photo / Video</label>
                                    <input required type="file" onChange={handleFileChange} accept="image/*,video/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-masa-blue hover:file:bg-blue-100"/>
                                </div>
                                <div className="flex items-start pt-2">
                                    <input id="media-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                                    <label htmlFor="media-consent" className="ml-2 text-sm text-gray-600">I confirm I have the rights to this media and give MASA World Foundation permission to use it.</label>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-masa-blue text-white py-3 px-4 rounded-md font-semibold transition-colors hover:bg-blue-900 disabled:bg-gray-400">
                                    {isSubmitting ? 'Submitting...' : 'Submit Media'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
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

export default GalleryUploadModal;
