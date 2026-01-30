
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const MediaHighlightsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Media Highlights">
            <h3>In the News</h3>
            <p>MASA World Foundation's efforts in sports, education, and cultural preservation have been recognized by various media outlets. Here is a snapshot of our recent coverage.</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">National Daily • Jan 15, 2024</p>
                    <h4 className="text-lg font-bold text-masa-charcoal mb-2">"Grassroots Sports League Transform Rural Youth"</h4>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        A feature article on how MASA's district-level football leagues are providing a platform for hidden talent in Uttar Pradesh.
                    </p>
                    <span className="text-masa-blue font-bold text-sm">Read More &rarr;</span>
                </div>

                <div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Education Weekly • Dec 10, 2023</p>
                    <h4 className="text-lg font-bold text-masa-charcoal mb-2">"Beyond Textbooks: The Rise of Value-Based Learning"</h4>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        An interview with our Founder, Vijay Babu Sharma, discussing the importance of integrating ethics and leadership into school curriculums.
                    </p>
                    <span className="text-masa-blue font-bold text-sm">Read More &rarr;</span>
                </div>

                <div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Culture Today • Nov 05, 2023</p>
                    <h4 className="text-lg font-bold text-masa-charcoal mb-2">"Reviving Lost Arts: NGO supports 500+ Artisans"</h4>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        Coverage of our annual 'Cultural Utsav' and its impact on the livelihoods of traditional craftsmen.
                    </p>
                    <span className="text-masa-blue font-bold text-sm">Read More &rarr;</span>
                </div>

                <div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Civic News • Oct 02, 2023</p>
                    <h4 className="text-lg font-bold text-masa-charcoal mb-2">"Clean City Drive Sets New Record"</h4>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        Report on the massive volunteer turnout for MASA's cleanliness drive, highlighting the role of youth in civic duties.
                    </p>
                    <span className="text-masa-blue font-bold text-sm">Read More &rarr;</span>
                </div>
            </div>

            <div className="mt-12">
                <h3>Press Enquiries</h3>
                <p>For official statements, interviews, or high-resolution assets, please contact our media team.</p>
                <p className="font-bold text-masa-charcoal mt-2">Email: masaworldfoundation@gmail.com</p>
            </div>
        </PolicyPageLayout>
    );
};

export default MediaHighlightsPage;
