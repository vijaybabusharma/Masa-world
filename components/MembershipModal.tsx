
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { submitForm } from '../utils/mockBackend';

interface MembershipModalProps {
  membershipType: 'Community' | 'Supporting' | 'Life' | 'International' | 'Student / Youth';
  onClose: () => void;
  navigateTo: (page: 'thank-you-membership') => void;
}

const pricingOptions = {
    'Supporting': { currency: '₹', amounts: [999, 2499, 4999], default: 999 },
    'Life': { currency: '₹', amounts: [10000, 25000], default: 10000 },
    'International': { currency: '$', amounts: [25, 50, 100], default: 25 },
};

const MembershipModal: React.FC<MembershipModalProps> = ({ membershipType, onClose, navigateTo }) => {
  const [formData, setFormData] = useState({
      fullName: '', email: '', mobile: '', location: '', studentStatus: '', amount: ''
  });

  useEffect(() => {
    // Set default amount for paid tiers when modal opens
    if (['Supporting', 'Life', 'International'].includes(membershipType)) {
        const options = pricingOptions[membershipType as keyof typeof pricingOptions];
        setFormData(prev => ({ ...prev, amount: options.default.toString() }));
    }
  }, [membershipType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm('membership', { ...formData, membershipType });
    onClose();
    navigateTo('thank-you-membership');
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
  
  const isPaidTier = ['Supporting', 'Life', 'International'].includes(membershipType);
  const options = isPaidTier ? pricingOptions[membershipType as keyof typeof pricingOptions] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <XIcon className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-center">Become a {membershipType} Member</h3>
          <p className="text-center text-gray-600 mt-2">Join our global community to support local connections.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {isPaidTier && options && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Contribution Amount</label>
                    <div className="flex flex-wrap gap-2">
                        {options.amounts.map(amt => (
                             <button
                                type="button"
                                key={amt}
                                onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                                className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${formData.amount === amt.toString() ? 'bg-masa-orange text-white' : 'bg-white border border-gray-300 text-gray-600'}`}
                            >
                                {options.currency}{amt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {membershipType === 'Student / Youth' && (
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Status Verification</label>
                     <input name="studentStatus" onChange={handleChange} type="text" placeholder="e.g., School/College Name, Course" className="w-full input-field" />
                     <p className="text-xs text-gray-600 mt-2">Membership is free. You can add an optional ₹99 contribution below.</p>
                     <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                        <input name="amount" onChange={handleChange} type="number" placeholder="Optional: 99" className="pl-6 w-full input-field" />
                     </div>
                 </div>
            )}

            <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input required name="fullName" onChange={handleChange} type="text" className="mt-1 block w-full input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input required name="email" onChange={handleChange} type="email" className="mt-1 block w-full input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Mobile Number</label><input required name="mobile" onChange={handleChange} type="tel" className="mt-1 block w-full input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700">City / Country</label><input required name="location" onChange={handleChange} type="text" className="mt-1 block w-full input-field" /></div>
            <div className="flex items-start">
              <input id="mem-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
              <label htmlFor="mem-consent" className="ml-2 text-sm text-gray-600">I consent to receive updates and newsletters from Masa World Foundation.</label>
            </div>
            <button type="submit" className={`w-full text-white py-3 px-4 rounded-md font-semibold transition-colors ${isPaidTier ? 'bg-masa-orange hover:bg-orange-600' : 'bg-masa-blue hover:bg-blue-900'}`}>
              Submit Application
            </button>
          </form>
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

export default MembershipModal;
