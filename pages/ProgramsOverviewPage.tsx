
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';
import { TrophyIcon, AcademicCapIcon, GlobeIcon } from '../components/icons/FeatureIcons';

const ProgramsOverviewPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Programs Overview">
            <p className="lead text-xl text-gray-600 mb-8">
                Our work is structured around three core pillars designed to foster holistic development in individuals and communities. We believe these three elements are interconnected and essential for building a responsible society.
            </p>

            <div className="space-y-12">
                {/* Sports */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-masa-orange">
                        <TrophyIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-masa-charcoal mb-4 mt-0">1. Sports & Physical Development</h3>
                        <p className="text-gray-600 mb-4">
                            Sports is the school of life. It teaches discipline, resilience, teamwork, and the ability to handle both victory and defeat with grace.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Grassroots Leagues:</strong> Organizing local tournaments to identify hidden talent.</li>
                            <li><strong>Coaching Camps:</strong> Providing professional guidance to underprivileged athletes.</li>
                            <li><strong>Self-Defense:</strong> Empowering women and children with safety skills.</li>
                        </ul>
                        <button onClick={() => navigateTo('sports')} className="mt-4 text-masa-blue font-bold hover:underline">View Sports Programs &rarr;</button>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-masa-blue">
                        <AcademicCapIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-masa-charcoal mb-4 mt-0">2. Education & Skill Building</h3>
                        <p className="text-gray-600 mb-4">
                            Education goes beyond literacy. We focus on 'Life Skills'—leadership, ethics, communication, and digital literacy—that are crucial for the modern world.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Leadership Bootcamps:</strong> Developing the next generation of social leaders.</li>
                            <li><strong>Vocational Training:</strong> Practical skills for employability (Computer basics, etc.).</li>
                            <li><strong>Mentorship:</strong> Connecting youth with industry experts.</li>
                        </ul>
                        <button onClick={() => navigateTo('education')} className="mt-4 text-masa-blue font-bold hover:underline">View Education Programs &rarr;</button>
                    </div>
                </div>

                {/* Culture */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600">
                        <GlobeIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-masa-charcoal mb-4 mt-0">3. Culture & Heritage</h3>
                        <p className="text-gray-600 mb-4">
                            A community rooted in its culture is strong. We work to preserve traditional arts and foster social harmony through cultural exchange.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Cultural Utsavs:</strong> Celebrating diversity through festivals.</li>
                            <li><strong>Artisan Support:</strong> Providing platforms for traditional craftsmen.</li>
                            <li><strong>Heritage Awareness:</strong> Workshops on local history and arts.</li>
                        </ul>
                        <button onClick={() => navigateTo('culture')} className="mt-4 text-masa-blue font-bold hover:underline">View Culture Initiatives &rarr;</button>
                    </div>
                </div>
            </div>
        </PolicyPageLayout>
    );
};

export default ProgramsOverviewPage;
