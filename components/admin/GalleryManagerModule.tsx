import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, SelectField } from './AdminComponents';

const GalleryManagerModule: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        setItems(ContentManager.getGalleryItems());
    }, [isEditing]);

    const handleEdit = (item: GalleryItem) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleDelete = (id: number | string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            ContentManager.deleteGalleryItem(id);
            setItems(ContentManager.getGalleryItems());
        }
    };

    const handleSave = () => {
        if (currentItem) {
            ContentManager.saveGalleryItem(currentItem);
            setIsEditing(false);
            setCurrentItem(null);
        }
    };

    const handleAddNew = () => {
        setCurrentItem({
            id: Date.now(),
            category: 'Sports Events',
            title: '',
            location: '',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            imageUrl: '',
            description: '',
            tags: []
        });
        setIsEditing(true);
    };

    if (isEditing && currentItem) {
        return (
            <div className="animate-fade-in-up">
                <ModuleHeader title={currentItem.id ? 'Edit Gallery Item' : 'Add New Gallery Item'} />
                <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4 max-w-3xl">
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Title" value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} />
                        <SelectField label="Category" value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})}>
                            <option value="Sports Events">Sports Events</option>
                            <option value="Trainings & Workshops">Trainings & Workshops</option>
                            <option value="Awards & Recognition">Awards & Recognition</option>
                            <option value="Conferences & Seminars">Conferences & Seminars</option>
                            <option value="Community Outreach">Community Outreach</option>
                            <option value="International Programs">International Programs</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Location" value={currentItem.location} onChange={e => setCurrentItem({...currentItem, location: e.target.value})} />
                        <InputField label="Date" value={currentItem.date} onChange={e => setCurrentItem({...currentItem, date: e.target.value})} />
                    </div>
                    <InputField label="Image URL" value={currentItem.imageUrl} onChange={e => setCurrentItem({...currentItem, imageUrl: e.target.value})} />
                    <InputField label="Video URL (Optional)" value={currentItem.videoUrl || ''} onChange={e => setCurrentItem({...currentItem, videoUrl: e.target.value})} />
                    <TextareaField label="Description" value={currentItem.description} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} rows={4} />
                    <InputField label="Tags (comma separated)" value={currentItem.tags.join(', ')} onChange={e => setCurrentItem({...currentItem, tags: e.target.value.split(',').map(t => t.trim())})} />
                    
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="button" onClick={handleSave} className="px-6 py-2 bg-masa-blue text-white rounded-lg hover:bg-blue-900">Save Item</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Gallery Manager" onAction={handleAddNew} actionLabel="Add New Item" />
            <div className="grid md:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-100 relative">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => handleEdit(item)} className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Delete</button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-xs font-bold text-masa-orange uppercase mb-1">{item.category}</div>
                            <h3 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.date} • {item.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManagerModule;
