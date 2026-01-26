
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';
import { QuoteIcon } from '../components/icons/FeatureIcons';

const CommunityVoicesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Community Voices">
            <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                Hear directly from the volunteers, members, and beneficiaries who make MASA World Foundation a vibrant family of change-makers.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Voice 1 */}
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                    <QuoteIcon className="h-8 w-8 text-masa-orange absolute top-6 left-6 opacity-20" />
                    <p className="text-gray-700 italic mb-6 relative z-10 pt-4">
                        "I joined MASA as a student looking for a certificate. I stayed because I found a purpose. The leadership training didn't just teach me how to manage a team; it taught me how to manage myself."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                        <div>
                            <p className="font-bold text-masa-charcoal">Vikram Singh</p>
                            <p className="text-xs text-gray-500">Student Volunteer, 3 Years</p>
                        </div>
                    </div>
                </div>

                {/* Voice 2 */}
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                    <QuoteIcon className="h-8 w-8 text-masa-blue absolute top-6 left-6 opacity-20" />
                    <p className="text-gray-700 italic mb-6 relative z-10 pt-4">
                        "As a donor, transparency is everything to me. MASA's regular impact reports and the ability to see exactly where my funds go give me immense confidence. It's rare to see such professionalism in an NGO."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-200 rounded-full"></div>
                        <div>
                            <p className="font-bold text-masa-charcoal">Mrs. Kapoor</p>
                            <p className="text-xs text-gray-500">Life Member & Donor</p>
                        </div>
                    </div>
                </div>

                {/* Voice 3 */}
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                    <QuoteIcon className="h-8 w-8 text-green-500 absolute top-6 left-6 opacity-20" />
                    <p className="text-gray-700 italic mb-6 relative z-10 pt-4">
                        "The sports kit provided to our village team changed everything. We went from playing barefoot to winning the district championship. MASA believed in us when no one else did."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-200 rounded-full"></div>
                        <div>
                            <p className="font-bold text-masa-charcoal">Rahul D.</p>
                            <p className="text-xs text-gray-500">Beneficiary, Sports Program</p>
                        </div>
                    </div>
                </div>

                {/* Voice 4 */}
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                    <QuoteIcon className="h-8 w-8 text-masa-charcoal absolute top-6 left-6 opacity-20" />
                    <p className="text-gray-700 italic mb-6 relative z-10 pt-4">
                        "What I love about MASA is the diversity. At the Cultural Utsav, I met people from 10 different states. It truly felt like a 'Mini India'. It reminded me of the strength in our unity."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-200 rounded-full"></div>
                        <div>
                            <p className="font-bold text-masa-charcoal">Sarah T.</p>
                            <p className="text-xs text-gray-500">Event Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-16">
                <h3 className="text-xl font-bold text-masa-charcoal mb-4">Have a story to share?</h3>
                <button onClick={() => navigateTo('contact')} className="bg-masa-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors shadow-md">
                    Share Your Experience
                </button>
            </div>
        </PolicyPageLayout>
    );
};

export default CommunityVoicesPage;
