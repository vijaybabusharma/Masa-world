
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationProps } from '../types';
import { XIcon } from '../components/icons/UiIcons';
import { HeartIcon, UsersIcon, SparklesIcon, CalendarDaysIcon, MapPinIcon, PlusIcon, CameraIcon } from '../components/icons/FeatureIcons';
import GalleryUploadModal from '../components/GalleryUploadModal';
import AiImageGeneratorModal from '../components/AiImageGeneratorModal';

// --- Data ---
const galleryCategories = [
    'All', 'Sports Events', 'Trainings & Workshops', 'Awards & Recognition', 
    'Conferences & Seminars', 'Community Outreach', 'International Programs'
];

const galleryData = [
    { id: 1, category: 'Sports Events', title: 'Annual Sports Day', location: 'New Delhi', date: 'Aug 15, 2024', imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=800&q=80', description: 'A vibrant celebration of sportsmanship where over 500 young athletes showcased incredible determination and talent in track and field events.', tags: ['Sports', 'Youth', 'Competition', 'Athletics'] },
    { id: 2, category: 'Community Outreach', title: 'Rural Health Camp', location: 'Uttar Pradesh', date: 'Jul 20, 2024', imageUrl: 'https://images.unsplash.com/photo-1628348070889-cb656243b487?auto=format&fit=crop&w=800&q=80', description: 'Our dedicated team of doctors and volunteers provided essential healthcare screenings to over 1,000 people in a single day, bridging critical gaps in medical access.', tags: ['Health', 'Community', 'Service', 'Medical'] },
    { id: 3, category: 'Trainings & Workshops', title: 'Leadership Bootcamp', location: 'Mumbai', date: 'Jul 10, 2024', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', description: 'An intensive 3-day workshop that transformed aspiring students into confident leaders through sessions on public speaking, strategic thinking, and team management.', tags: ['Education', 'Leadership', 'Youth', 'Skills'] },
    { id: 4, category: 'Awards & Recognition', title: 'Real Hero Awards', location: 'New Delhi', date: 'Jun 05, 2024', imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80', description: 'A night dedicated to honoring the unsung heroes of our society. We celebrated 20 individuals whose selfless work inspires us all.', tags: ['Awards', 'Recognition', 'Community', 'Heroes'] },
    { id: 5, category: 'Conferences & Seminars', title: 'National Youth Conclave', location: 'Bangalore', date: 'May 15, 2024', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', description: 'A vital platform where policymakers and student leaders engaged in fruitful discussions on education reform and the future of India\'s youth.', tags: ['Conference', 'Youth', 'Policy', 'Debate'] },
    { id: 6, category: 'International Programs', title: 'Global Exchange Forum', location: 'Virtual', date: 'Apr 22, 2024', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', description: 'Connecting bright young minds from India and around the world to collaborate on sustainable development goals and foster global understanding.', tags: ['Global', 'International', 'Culture', 'SDGs'] },
    { id: 7, category: 'Sports Events', title: 'District Football League', location: 'Kolkata', date: 'Mar 30, 2024', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', description: 'The finals of our district league, where fierce competition, incredible teamwork, and the pure joy of the game were on full display.', tags: ['Sports', 'Football', 'Youth', 'Teamwork'] },
    { id: 8, category: 'Community Outreach', title: 'City Cleanliness Drive', location: 'Pune', date: 'Mar 12, 2024', imageUrl: 'https://images.unsplash.com/photo-1618521630643-b19623e4d872?auto=format&fit=crop&w=800&q=80', description: 'Hundreds of volunteers joined hands to create a cleaner city, spreading awareness about waste segregation and our collective civic duty.', tags: ['Community', 'Environment', 'Volunteer', 'SwachhBharat'] },
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[85vh] relative flex flex-col md:flex-row overflow-hidden animate-scale-up" 
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button - Mobile Overlay */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-20 bg-black/50 text-white hover:bg-black/70 p-2 rounded-full backdrop-blur-md transition-all md:hidden"
                >
                    <XIcon className="h-5 w-5" />
                </button>

                {/* Media Section */}
                <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black flex items-center justify-center relative group">
                    {item.videoUrl ? (
                        <video src={item.videoUrl} controls autoPlay className="max-w-full max-h-full object-contain" />
                    ) : (
                        <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                    )}
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white flex flex-col relative">
                    {/* Desktop Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 hidden md:block text-gray-400 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full z-10"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>

                    <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="inline-block px-3 py-1 bg-masa-orange/10 text-masa-orange text-xs font-bold uppercase tracking-wider rounded-full">
                                    {item.category}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-masa-charcoal leading-tight mb-3">
                                {item.title}
                            </h2>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 font-medium">
                                <div className="flex items-center gap-1">
                                    <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                                    <span>{item.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 leading-relaxed mb-8 text-justify">
                            <p>{item.description}</p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-xs text-center text-gray-400 mb-3 font-medium">Like this moment?</div>
                        <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-masa-orange text-masa-orange py-3 rounded-xl font-bold hover:bg-masa-orange hover:text-white transition-all shadow-sm group">
                            <HeartIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            Share & Support
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
            `}</style>
        </div>
    );
};


const GalleryPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return galleryData;
        return galleryData.filter(item => item.category === activeCategory);
    }, [activeCategory]);
    
    const handleSubmitToGallery = (base64Data: string) => {
        // This is a mock. In a real app, this would likely involve more data.
        console.log("Submitting AI Image to gallery workflow...", base64Data.substring(0, 50) + "...");
        setIsAiModalOpen(false);
        // Can open upload modal with pre-filled image if desired
        setIsUploadModalOpen(true); 
    };

    return (
        <div className="bg-gray-50">
            {selectedItem && <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            {isUploadModalOpen && <GalleryUploadModal categories={galleryCategories.filter(c => c !== 'All')} onClose={() => setIsUploadModalOpen(false)} />}
            {isAiModalOpen && <AiImageGeneratorModal onClose={() => setIsAiModalOpen(false)} onSubmitToGallery={handleSubmitToGallery} />}

            {/* 1. Hero Section */}
            <section className="relative bg-masa-charcoal py-24 text-white text-center">
                 <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover" alt="Gallery photography"/>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Moments That Create Impact</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">A visual journey of our work across sports, education, culture, and community development.</p>
                </div>
            </section>
            
            {/* Action Bar */}
            <div className="bg-white py-3 border-b border-gray-200">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
                    <button onClick={() => setIsUploadModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-masa-blue text-masa-blue px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">
                        <CameraIcon className="h-4 w-4" />
                        Upload Media
                    </button>
                    <button onClick={() => setIsAiModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-masa-orange text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors">
                        <SparklesIcon className="h-4 w-4" />
                        Generate with AI
                    </button>
                </div>
            </div>

            {/* 2. Category Filters */}
            <nav className="sticky top-16 md:top-20 bg-white/80 backdrop-blur-md shadow-sm z-30">
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
                                <img src={(item as any).imageUrl || 'https://images.unsplash.com/photo-1585844264776-b871c4eb5b53?auto=format&fit=crop&w=800&q=80'} alt={item.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <h3 className="font-bold text-sm md:text-base leading-tight">{item.title}</h3>
                                    <p className="text-xs opacity-90 mt-1 flex items-center gap-1"><MapPinIcon className="h-3 w-3"/> {item.location}</p>
                                </div>
                                {(item as any).videoUrl && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

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
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default GalleryPage;
