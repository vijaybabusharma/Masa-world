
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { ShieldCheckIcon, CreditCardIcon, LockClosedIcon, CheckIcon, UsersIcon } from './icons/FeatureIcons';
import { submitForm } from '../utils/mockBackend';

interface MembershipModalProps {
  tier: {
      title: string;
      price: string;
      description: string;
      benefits: string[];
  };
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ tier, onClose }) => {
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'success' | 'failure'>('form');
  const [formData, setFormData] = useState({
      fullName: '', email: '', mobile: '', location: '', studentStatus: '', amount: tier.price === 'Free' ? '' : tier.price
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
      cardNumber: '', expiry: '', cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tier.price !== 'Free') {
        setStep('payment');
    } else {
        submitApplication();
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setStep('processing');
      // Simulate payment delay
      setTimeout(() => {
          submitApplication();
      }, 2000);
  };

  const submitApplication = () => {
      submitForm('membership', { ...formData, membershipType: tier.title });
      setStep('success');
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
  
  const isPaid = tier.price !== 'Free';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-masa-charcoal">
                {step === 'success' ? 'Welcome Aboard!' : `Apply for ${tier.title}`}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                <XIcon className="h-6 w-6" />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
            {/* STEP 1: FORM */}
            {step === 'form' && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-masa-orange">{tier.title}</h4>
                            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">{tier.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{tier.description}</p>
                    </div>

                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label><input required name="fullName" onChange={handleChange} type="text" className="w-full input-field" placeholder="Enter full name" /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label><input required name="email" onChange={handleChange} type="email" className="w-full input-field" placeholder="name@example.com" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Mobile *</label><input required name="mobile" onChange={handleChange} type="tel" className="w-full input-field" placeholder="+91..." /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">City / Country *</label><input required name="location" onChange={handleChange} type="text" className="w-full input-field" /></div>
                    </div>

                    {tier.title.includes('Student') && (
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">School / College Name *</label><input required name="studentStatus" onChange={handleChange} type="text" className="w-full input-field" /></div>
                    )}

                    <div className="flex items-start mt-2">
                        <input id="mem-consent" type="checkbox" required className="h-4 w-4 text-masa-orange border-gray-300 rounded focus:ring-masa-orange mt-1" />
                        <label htmlFor="mem-consent" className="ml-2 text-sm text-gray-600">I agree to MASA World Foundation's membership terms and privacy policy.</label>
                    </div>

                    <button type="submit" className="w-full bg-masa-charcoal text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md mt-4">
                        {isPaid ? 'Proceed to Payment' : 'Submit Application'}
                    </button>
                </form>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="text-center mb-6">
                        <ShieldCheckIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <h4 className="text-xl font-bold text-gray-800">Secure Payment</h4>
                        <p className="text-sm text-gray-500">Complete your membership contribution.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-gray-600">Amount Due</span>
                            <span className="text-2xl font-bold text-masa-charcoal">{tier.price}</span>
                        </div>
                        
                        {/* Mock Card Form */}
                        <div className="space-y-3">
                            <div className="relative">
                                <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input required name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} placeholder="Card Number (Mock)" className="w-full pl-10 input-field" maxLength={19} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input required name="expiry" value={paymentDetails.expiry} onChange={handlePaymentChange} placeholder="MM/YY" className="w-full input-field" maxLength={5} />
                                <div className="relative">
                                    <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input required name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} type="password" placeholder="CVV" className="w-full input-field" maxLength={3} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button type="button" onClick={() => setStep('form')} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            Back
                        </button>
                        <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md">
                            Pay {tier.price}
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
                        <UsersIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-masa-charcoal mb-2">Welcome to MASA!</h3>
                    <p className="text-gray-600 mb-8">
                        Thank you, <strong>{formData.fullName}</strong>. You are now officially a <strong>{tier.title}</strong>. A confirmation email with your digital ID card has been sent to {formData.email}.
                    </p>
                    <button onClick={onClose} className="w-full bg-masa-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-md">
                        Go to Dashboard
                    </button>
                </div>
            )}
        </div>
      </div>
      <style>{`
        .input-field { @apply px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-masa-orange outline-none transition-all; }
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
