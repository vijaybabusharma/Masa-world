
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';
import { QuoteIcon } from '../components/icons/FeatureIcons';

const ImpactStoriesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Impact Stories">
            <h3>Real Stories, Real Change</h3>
            <p>Every number in our impact report represents a life transformed. Here are the stories of individuals who have overcome challenges and are now leading change in their communities.</p>

            <hr />

            <div className="space-y-12 mt-8">
                {/* Story 1 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80" alt="Rohan's Story" className="w-full md:w-1/3 rounded-xl object-cover h-64 md:h-auto" />
                    <div>
                        <h4 className="text-xl font-bold text-masa-charcoal mb-2">Rohan's Journey: From the Streets to the Stadium</h4>
                        <p className="text-gray-600 text-base mb-4 leading-relaxed">
                            Rohan grew up in a challenging neighborhood where opportunities were scarce. Through MASA's grassroots football league, he found discipline, mentorship, and a goal. Today, he captains his district team and coaches younger children.
                        </p>
                        <blockquote className="border-l-4 border-masa-orange pl-4 italic text-gray-700 text-base leading-relaxed">
                            "Football gave me a reason to wake up early and work hard. MASA gave me the shoes to play in."
                        </blockquote>
                    </div>
                </div>

                {/* Story 2 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=600&q=80" alt="Anjali's Story" className="w-full md:w-1/3 rounded-xl object-cover h-64 md:h-auto" />
                    <div>
                        <h4 className="text-xl font-bold text-masa-charcoal mb-2">Anjali: Breaking Barriers with Self-Defense</h4>
                        <p className="text-gray-600 text-base mb-4 leading-relaxed">
                            Anjali attended our 'Fearless Women' workshop hesitantly. Over three months of rigorous training, she not only learned physical defense but gained the confidence to pursue higher education in a different city.
                        </p>
                        <blockquote className="border-l-4 border-masa-blue pl-4 italic text-gray-700 text-base leading-relaxed">
                            "The training taught me that strength isn't just physical; it's about believing you have the right to be safe."
                        </blockquote>
                    </div>
                </div>

                {/* Story 3 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80" alt="Community Story" className="w-full md:w-1/3 rounded-xl object-cover h-64 md:h-auto" />
                    <div>
                        <h4 className="text-xl font-bold text-masa-charcoal mb-2">Village Transformation: The Clean Water Project</h4>
                        <p className="text-gray-600 text-base mb-4 leading-relaxed">
                            In partnership with local volunteers, MASA organized a community-led initiative to restore a village pond. This effort not only improved water access but united the community across social divides.
                        </p>
                        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700 text-base leading-relaxed">
                            "We realized that when we work together, we don't need to wait for outside help." — Village Sarpanch
                        </blockquote>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-blue-50 p-6 rounded-xl text-center">
                <h3 className="text-lg font-bold text-masa-blue mb-2">Help Us Write More Stories</h3>
                <p className="text-gray-600 text-sm mb-4">Your contribution can be the start of someone else's success story.</p>
                <button onClick={() => navigateTo('donate')} className="bg-masa-orange text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors">
                    Donate Now
                </button>
            </div>
        </PolicyPageLayout>
    );
};

export default ImpactStoriesPage;
