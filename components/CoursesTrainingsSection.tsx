
import React, { useState, useEffect } from 'react';
import { NavigationProps, Course } from '../types';
import { ContentManager } from '../utils/contentManager';
import { 
    ClockIcon, 
    LaptopIcon, 
    SignalIcon, 
    ArrowRightIcon, 
    AcademicCapIcon, 
    TrophyIcon, 
    GlobeIcon 
} from './icons/FeatureIcons';

const CoursesTrainingsSection: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [sectionSettings, setSectionSettings] = useState(ContentManager.getSettings().homepage.sections.whatWeDo); // Reusing whatWeDo settings or default

    useEffect(() => {
        const loadContent = () => {
            const allCourses = ContentManager.getCourses();
            // Get top 3 featured or just first 3
            setCourses(allCourses.slice(0, 3));
        };
        loadContent();
    }, []);

    const getCategoryIcon = (category: string) => {
        switch(category) {
            case 'Sports': return <TrophyIcon className="h-4 w-4 mr-1"/>;
            case 'Education': return <AcademicCapIcon className="h-4 w-4 mr-1"/>;
            case 'Culture': return <GlobeIcon className="h-4 w-4 mr-1"/>;
            default: return null;
        }
    };

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'Sports': return 'bg-orange-100 text-masa-orange border-orange-200';
            case 'Education': return 'bg-blue-100 text-masa-blue border-blue-200';
            case 'Culture': return 'bg-purple-100 text-purple-600 border-purple-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-masa-charcoal sm:text-4xl mb-4">Masa Academy: Courses & Trainings</h2>
                        <p className="text-lg text-gray-600">
                            Empowering youth and professionals with specialized skills in sports, education, and leadership. Explore our most popular programs.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigateTo('courses')}
                        className="inline-flex items-center text-masa-orange font-bold hover:underline group"
                    >
                        View All Courses <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <div 
                            key={course.id} 
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group cursor-pointer"
                            onClick={() => navigateTo('courses')}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={course.image} 
                                    alt={course.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center ${getCategoryColor(course.category)}`}>
                                    {getCategoryIcon(course.category)}
                                    {course.category}
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-masa-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm border border-gray-200">
                                    {course.price || 'Free'}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                    {course.description}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <SignalIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                        {course.level}
                                    </div>
                                    <div className="flex items-center">
                                        <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                        {course.duration}
                                    </div>
                                    <div className="flex items-center col-span-2">
                                        <LaptopIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                        {course.mode} Mode
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-masa-charcoal rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-masa-blue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-2xl font-bold mb-4">Specialized Leadership & Vocational Trainings</h3>
                            <p className="text-gray-300">
                                Beyond our standard courses, we offer intensive bootcamps and workshops for youth leadership, digital literacy, and community capacity building.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => navigateTo('trainings')}
                                className="bg-white text-masa-charcoal px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Explore Trainings
                            </button>
                            <button 
                                onClick={() => navigateTo('contact')}
                                className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
                            >
                                Request Workshop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesTrainingsSection;
