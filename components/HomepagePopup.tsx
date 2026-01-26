
import React, { useEffect, useRef } from 'react';
import { Page, NavigationProps } from '../types';
import { XIcon } from './icons/UiIcons';
import { HeartIcon, UsersIcon, SparklesIcon, ArrowRightIcon } from './icons/FeatureIcons';

interface HomepagePopupProps extends NavigationProps {
  onClose: () => void;
}

const HomepagePopup: React.FC<HomepagePopupProps> = ({ navigateTo, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleNavigation = (page: Page) => {
    navigateTo(page);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={onClose} // Close on overlay click
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-scale-up p-8 text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="w-16 h-16 mx-auto bg-masa-blue text-white rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png" alt="MASA Logo" className="h-10 w-auto" onError={(e) => { e.currentTarget.src = '/favicon.svg'; }} />
        </div>

        <h2 id="popup-title" className="text-2xl font-bold text-masa-charcoal">
          Welcome to MASA World Foundation
        </h2>
        <p className="mt-2 text-gray-600">
          Join us in creating lasting impact. How would you like to get involved?
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => handleNavigation('volunteer')}
            className="w-full bg-masa-blue text-white py-3 rounded-full font-bold text-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
          >
            <HeartIcon className="h-5 w-5" /> Volunteer With Us
          </button>
          <button
            onClick={() => handleNavigation('membership')}
            className="w-full bg-masa-charcoal text-white py-3 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <UsersIcon className="h-5 w-5" /> Become a Member
          </button>
          <button
            onClick={() => handleNavigation('donate')}
            className="w-full bg-masa-orange text-white py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <SparklesIcon className="h-5 w-5" /> Donate Now
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => handleNavigation('initiatives')}
            className="text-masa-blue font-semibold hover:underline flex items-center justify-center mx-auto group"
          >
            Explore Our Programs
            <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default HomepagePopup;
