import React, { useState, useEffect } from 'react';
import { SliderItem } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, ToggleSwitch } from './AdminComponents';
import { TrashIcon, PlusIcon, PencilIcon } from '../icons/FeatureIcons';

const SliderManagerModule: React.FC = () => {
    const [slides, setSlides] = useState<SliderItem[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentSlide, setCurrentSlide] = useState<Partial<SliderItem> | null>(null);

    useEffect(() => {
        const settings = ContentManager.getSettings();
        setSlides(settings.homepage.slider.slides || []);
    }, []);

    const handleSave = () => {
        if (currentSlide) {
            let updatedSlides;
            if (slides.find(s => s.id === currentSlide.id)) {
                updatedSlides = slides.map(s => s.id === currentSlide.id ? currentSlide as SliderItem : s);
            } else {
                updatedSlides = [...slides, currentSlide as SliderItem];
            }
            
            const settings = ContentManager.getSettings();
            settings.homepage.slider.slides = updatedSlides;
            ContentManager.saveSettings(settings);
            setSlides(updatedSlides);
            setView('list');
            setCurrentSlide(null);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            const updatedSlides = slides.filter(s => s.id !== id);
            const settings = ContentManager.getSettings();
            settings.homepage.slider.slides = updatedSlides;
            ContentManager.saveSettings(settings);
            setSlides(updatedSlides);
        }
    };

    const handleNew = () => {
        setCurrentSlide({
            id: Date.now().toString(),
            headline: '',
            subtext: '',
            image: '',
            cta: { label: '', page: 'home' },
            enabled: true
        });
        setView('edit');
    };

    return (
        <div className="animate-fade-in-up">
            {view === 'list' ? (
                <>
                    <ModuleHeader title="Slider Management" onAction={handleNew} actionLabel="Add New Slide" />
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/50 text-gray-400 uppercase font-black text-[10px] tracking-[0.2em] border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6">Slide</th>
                                    <th className="px-8 py-6">Headline</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {slides.map(slide => (
                                    <tr key={slide.id} className="hover:bg-gray-50/50 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <img src={slide.image} alt={slide.headline} className="w-20 h-12 object-cover rounded-lg" />
                                        </td>
                                        <td className="px-8 py-6 font-black text-gray-900 uppercase tracking-tight">{slide.headline}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 text-[9px] rounded-lg font-black uppercase tracking-widest ${slide.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {slide.enabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button onClick={() => { setCurrentSlide(slide); setView('edit'); }} className="text-masa-blue font-black text-[10px] uppercase tracking-widest mr-4">Edit</button>
                                            <button onClick={() => handleDelete(slide.id)} className="text-red-500 font-black text-[10px] uppercase tracking-widest">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6">
                        {currentSlide?.headline ? `Editing: ${currentSlide.headline}` : 'Add New Slide'}
                    </h2>
                    <InputField label="Headline" value={currentSlide?.headline || ''} onChange={e => setCurrentSlide({...currentSlide!, headline: e.target.value})} />
                    <InputField label="Subtext" value={currentSlide?.subtext || ''} onChange={e => setCurrentSlide({...currentSlide!, subtext: e.target.value})} />
                    <InputField label="Image URL" value={currentSlide?.image || ''} onChange={e => setCurrentSlide({...currentSlide!, image: e.target.value})} />
                    <InputField label="CTA Label" value={currentSlide?.cta?.label || ''} onChange={e => setCurrentSlide({...currentSlide!, cta: {...currentSlide!.cta!, label: e.target.value}})} />
                    <ToggleSwitch label="Enabled" checked={currentSlide?.enabled || false} onChange={val => setCurrentSlide({...currentSlide!, enabled: val})} />
                    <div className="flex gap-4 pt-6">
                        <button onClick={handleSave} className="bg-masa-orange text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">Save Slide</button>
                        <button onClick={() => setView('list')} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderManagerModule;
