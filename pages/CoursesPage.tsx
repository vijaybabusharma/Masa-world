
import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../types';
import { 
    ClockIcon, 
    LaptopIcon, 
    SignalIcon, 
    ArrowRightIcon, 
    AcademicCapIcon, 
    TrophyIcon, 
    GlobeIcon,
    CheckIcon
} from '../components/icons/FeatureIcons';
import { XIcon } from '../components/icons/UiIcons';
import { coursesData, Course } from '../utils/data';

const CourseDetailsModal: React.FC<{ course: Course; onClose: () => void; onEnroll: () => void }> = ({ course, onClose, onEnroll }) => {
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 text-gray-600 transition-colors z-10">
                    <XIcon className="h-6 w-6" />
                </button>
                
                <div className="relative h-64">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-8 text-white">
                            <span className="bg-masa-orange px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">{course.category}</span>
                            <h2 className="text-3xl font-bold">{course.title}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
                         <div className="flex items-center"><SignalIcon className="h-4 w-4 mr-2"/> {course.level}</div>
                         <div className="flex items-center"><ClockIcon className="h-4 w-4 mr-2"/> {course.duration}</div>
                         <div className="flex items-center"><LaptopIcon className="h-4 w-4 mr-2"/> {course.mode}</div>
                    </div>

                    <h3 className="text-xl font-bold text-masa-charcoal mb-3">About this Course</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{course.fullDescription}</p>

                    <h3 className="text-xl font-bold text-masa-charcoal mb-3">Key Highlights</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {course.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                                <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                        <button onClick={onEnroll} className="flex-1 bg-masa-blue text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md text-center">
                            Enroll Now
                        </button>
                        <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors text-center">
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
             {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

const PageHeader: React.FC<{ title: string; subtitle: string; bgImage?: string }> = ({ title, subtitle, bgImage }) => (
    <div className="relative bg-masa-charcoal py-24 text-white text-center overflow-hidden">
        {bgImage && (
            <div className="absolute inset-0 opacity-20">
                <img src={bgImage} alt="Header Background" className="w-full h-full object-cover" />
            </div>
        )}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{title}</h1>
            <p className="mt-2 text-xl text-gray-300 max-w-2xl mx-auto font-light">{subtitle}</p>
            <button onClick={() => document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg transform hover:-translate-y-1">
                Explore Courses
            </button>
        </div>
    </div>
);

const CoursesPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [selectedMode, setSelectedMode] = useState<string>('All');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const filteredCourses = coursesData.filter(course => {
        return (selectedCategory === 'All' || course.category === selectedCategory) &&
               (selectedLevel === 'All' || course.level === selectedLevel) &&
               (selectedMode === 'All' || course.mode === selectedMode);
    });

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

    const handleEnroll = () => {
        // If a course is selected, we might want to pass that context, but for now just navigate to contact
        // In a real app, we'd pass the course ID via URL params or context
        setSelectedCourse(null);
        navigateTo('contact');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {selectedCourse && (
                <CourseDetailsModal 
                    course={selectedCourse} 
                    onClose={() => setSelectedCourse(null)} 
                    onEnroll={handleEnroll} 
                />
            )}

            <PageHeader 
                title="Masa Academy" 
                subtitle="Empowering you with skills for life, leadership, and excellence." 
                bgImage="https://picsum.photos/1600/900?grayscale&blur=2&random=99"
            />

            <section className="py-12 border-b border-gray-200 bg-white sticky top-20 z-40 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <h2 className="text-xl font-bold text-masa-charcoal hidden md:block">Filter Courses</h2>
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Categories</option>
                                <option value="Sports">Sports</option>
                                <option value="Education">Education</option>
                                <option value="Culture">Culture</option>
                            </select>

                            <select 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            <select 
                                value={selectedMode} 
                                onChange={(e) => setSelectedMode(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none bg-white text-gray-700 font-medium flex-grow md:flex-grow-0"
                            >
                                <option value="All">All Modes</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section id="course-grid" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map(course => (
                                <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
                                    <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center ${getCategoryColor(course.category)}`}>
                                            {getCategoryIcon(course.category)}
                                            {course.category}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-masa-charcoal mb-3 group-hover:text-masa-blue transition-colors cursor-pointer" onClick={() => setSelectedCourse(course)}>
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                                            {course.description}
                                        </p>
                                        
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-500 mb-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center">
                                                <SignalIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.level}
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.duration}
                                            </div>
                                            <div className="flex items-center col-span-2">
                                                <LaptopIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                {course.mode} Mode
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-auto">
                                            <button 
                                                onClick={() => setSelectedCourse(course)}
                                                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button 
                                                onClick={() => navigateTo('contact')}
                                                className="flex-1 py-3 rounded-xl bg-masa-blue text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No courses found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            <button 
                                onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSelectedMode('All'); }}
                                className="mt-6 text-masa-orange font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Bottom CTA for General Inquiries */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-masa-charcoal mb-4">Can't find what you're looking for?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        We offer customized training programs for institutions and corporate groups. Reach out to us for bespoke workshops.
                    </p>
                    <button 
                        onClick={() => navigateTo('contact')} 
                        className="bg-masa-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
                    >
                        Contact / Inquiry
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
