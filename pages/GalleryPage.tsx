
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationProps } from '../types';
import { XIcon } from '../components/icons/UiIcons';
import { HeartIcon, UsersIcon, SparklesIcon } from '../components/icons/FeatureIcons';
import GalleryUploadModal from '../components/GalleryUploadModal';
import AiImageGeneratorModal from '../components/AiImageGeneratorModal';

// --- Data ---
const galleryCategories = [
    'All', 'Sports Events', 'Trainings & Workshops', 'Awards & Recognition', 
    'Conferences & Seminars', 'Community Outreach', 'International Programs'
];

const galleryData = [
    { id: 1, category: 'Sports Events', title: 'Annual Sports Day', location: 'New Delhi', date: 'Aug 15, 2024', imageUrl: 'https://picsum.photos/800/600?random=1', description: 'Our annual celebration of sportsmanship and youth talent.', tags: ['Sports', 'Youth', 'Competition'] },
    { id: 2, category: 'Community Outreach', title: 'Rural Health Camp', location: 'Uttar Pradesh', date: 'Jul 20, 2024', imageUrl: 'https://picsum.photos/600/800?random=2', description: 'Providing essential healthcare services to underserved communities.', tags: ['Health', 'Community', 'Service'] },
    { id: 3, category: 'Trainings & Workshops', title: 'Leadership Bootcamp', location: 'Mumbai', date: 'Jul 10, 2024', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Empowering the next generation of leaders with essential skills.', tags: ['Education', 'Leadership', 'Youth'] },
    { id: 4, category: 'Awards & Recognition', title: 'Real Hero Awards', location: 'New Delhi', date: 'Jun 05, 2024', imageUrl: 'https://picsum.photos/800/800?random=4', description: 'Honoring the unsung heroes of our society.', tags: ['Awards', 'Recognition', 'Community'] },
    { id: 5, category: 'Conferences & Seminars', title: 'National Youth Conclave', location: 'Bangalore', date: 'May 15, 2024', imageUrl: 'https://picsum.photos/600/400?random=5', description: 'A platform for dialogue on national issues concerning youth.', tags: ['Conference', 'Youth', 'Policy'] },
    { id: 6, category: 'International Programs', title: 'Global Exchange Forum', location: 'Virtual', date: 'Apr 22, 2024', imageUrl: 'https://picsum.photos/800/500?random=6', description: 'Connecting youth leaders from India and around the world.', tags: ['Global', 'International', 'Culture'] },
    { id: 7, category: 'Sports Events', title: 'District Football League', location: 'Kolkata', date: 'Mar 30, 2024', imageUrl: 'https://picsum.photos/700/800?random=7', description: 'Fostering teamwork and discipline through competitive sports.', tags: ['Sports', 'Football', 'Youth'] },
    { id: 8, category: 'Community Outreach', title: 'City Cleanliness Drive', location: 'Pune', date: 'Mar 12, 2024', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Volunteers coming together to create a cleaner, healthier city.', tags: ['Community', 'Environment', 'Volunteer'] },
];

// --- Components ---

const LightboxModal: React.FC<{ item: any; onClose: () => void }> = ({ item, onClose }) => {
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] relative flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10">
                    <XIcon className="h-5 w-5" />
                </button>
                <div className="flex-shrink-0 bg-black flex items-center justify-center h-3/4">
                    {item.videoUrl ? (
                        <video src={item.videoUrl} controls autoPlay className="max-w-full max-h-full" />
                    ) : (
                        <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                    )}
                </div>
                <div className="p-6 flex-grow overflow-y-auto">
                    <h3 className="text-2xl font-bold text-masa-charcoal">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.location} &bull; {item.date}</p>
                    <p className="mt-4 text-gray-700">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};


const GalleryPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return galleryData;
        return galleryData.filter(item => item.category === activeCategory);
    }, [activeCategory]);
    
    const handleAiImageSubmit = (base64Data: string) => {
        setAiGeneratedImage(base64Data);
        setIsAiModalOpen(false);
        setIsUploadModalOpen(true);
    };
    
    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
        setAiGeneratedImage(null);
    };

    return (
        <div className="bg-gray-50">
            {selectedItem && <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            {isUploadModalOpen && <GalleryUploadModal categories={galleryCategories.filter(c => c !== 'All')} onClose={handleCloseUploadModal} generatedImage={aiGeneratedImage} />}
            {isAiModalOpen && <AiImageGeneratorModal onClose={() => setIsAiModalOpen(false)} onSubmitToGallery={handleAiImageSubmit} />}

            {/* 1. Hero Section */}
            <section className="relative bg-masa-charcoal py-24 text-white text-center">
                 <div className="absolute inset-0 opacity-20">
                    <img src="https://picsum.photos/1600/900?grayscale&blur=2&random=90" className="w-full h-full object-cover" alt="Community action"/>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Moments That Create Impact</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">A visual journey of our work across sports, education, culture, and community development.</p>
                </div>
            </section>

            {/* 2. Category Filters */}
            <nav className="sticky top-20 bg-white/80 backdrop-blur-md shadow-sm z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center overflow-x-auto no-scrollbar">
                        {galleryCategories.map(category => (
                            <button 
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex-shrink-0 px-4 py-3 font-semibold border-b-2 transition-colors text-sm md:text-base ${
                                    activeCategory === category 
                                    ? 'border-masa-orange text-masa-orange' 
                                    : 'border-transparent text-gray-500 hover:text-masa-charcoal'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
            
            {/* 3. Image & Video Grid */}
            <main className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => (
                            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer aspect-w-1 aspect-h-1" onClick={() => setSelectedItem(item)}>
                                <img src={item.imageUrl || `https://img.youtube.com/vi/${item.videoUrl?.split('/').pop()}/0.jpg`} alt={item.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                    <h3 className="font-bold text-sm md:text-base leading-tight">{item.title}</h3>
                                    <p className="text-xs opacity-80 mt-1">{item.location}</p>
                                </div>
                                {item.videoUrl && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* 5. Submit Media Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold text-masa-charcoal">Share Your Moments with MASA</h2>
                    <p className="mt-4 text-lg text-gray-600">If you are a volunteer, partner, or participant, you can submit photos or videos from MASA activities to be featured in our gallery.</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-masa-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg transform hover:-translate-y-1"
                        >
                            Submit Your Photos & Videos
                        </button>
                        <button 
                            onClick={() => setIsAiModalOpen(true)}
                            className="flex items-center justify-center gap-2 bg-masa-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors shadow-lg transform hover:-translate-y-1"
                        >
                            <SparklesIcon className="h-5 w-5" />
                            Generate with AI
                        </button>
                    </div>
                </div>
            </section>
            
            {/* 6. CTA Section */}
            <section className="bg-masa-blue text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Be a Part of These Stories</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button onClick={() => navigateTo('volunteer')} className="flex items-center justify-center gap-2 bg-white text-masa-blue px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg"><HeartIcon className="h-5 w-5"/> Become a Volunteer</button>
                        <button onClick={() => navigateTo('membership')} className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-masa-blue transition-all"><UsersIcon className="h-5 w-5"/> Join as a Member</button>
                        <button onClick={() => navigateTo('donate')} className="flex items-center justify-center gap-2 bg-masa-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg"><SparklesIcon className="h-5 w-5"/> Donate Now</button>
                    </div>
                </div>
            </section>
            {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default GalleryPage;
