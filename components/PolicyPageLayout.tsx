
import React from 'react';
import { NavigationProps, Page } from '../types';

interface PolicyPageLayoutProps extends NavigationProps {
  title: string;
  children: React.ReactNode;
}

const policyPages: { label: string; page: Page }[] = [
    { label: 'Disclaimer', page: 'disclaimer' },
    { label: 'Terms & Conditions', page: 'terms-and-conditions' },
    { label: 'Privacy Policy', page: 'privacy-policy' },
    { label: 'Copyright Policy', page: 'copyright-policy' },
    { label: 'Editorial Policy', page: 'editorial-policy' },
    { label: 'Fact Check Policy', page: 'fact-check-policy' },
    { label: 'Comment Policy', page: 'comment-policy' },
    { label: 'Ethical Use Policy', page: 'ethical-use-policy' },
];

const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({ navigateTo, title, children }) => {
    return (
        <div className="bg-white">
            <div className="bg-masa-charcoal py-16 text-white text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold">{title}</h1>
                    <p className="mt-2 text-sm text-gray-400">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto prose lg:prose-lg prose-p:text-gray-700 prose-headings:text-masa-charcoal prose-strong:text-masa-charcoal prose-a:text-masa-blue hover:prose-a:text-masa-orange prose-ul:list-disc prose-ul:ml-6 prose-li:my-2 text-justify">
                    {children}
                </div>
                
                <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-center text-masa-charcoal mb-6">Other Policies</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {policyPages.map(link => (
                            <button 
                                key={link.page}
                                onClick={() => navigateTo(link.page)}
                                className="text-masa-blue hover:text-masa-orange hover:underline font-semibold transition-colors text-sm sm:text-base"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyPageLayout;
