import React, { useState, useEffect } from 'react';
import { MasaEvent } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, SelectField } from './AdminComponents';

const EventManagerModule: React.FC = () => {
    const [events, setEvents] = useState<MasaEvent[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentEvent, setCurrentEvent] = useState<Partial<MasaEvent> | null>(null);

    useEffect(() => { setEvents(ContentManager.getEvents()); }, []);

    const handleEdit = (event: MasaEvent) => { setCurrentEvent(event); setView('edit'); };
    const handleNew = () => {
        setCurrentEvent({
            id: `evt-${Date.now()}`, title: '', category: 'Community', date: new Date().toISOString().split('T')[0],
            displayDate: '', location: '', description: '', image: '', status: 'Upcoming', price: 'Free'
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentEvent) ContentManager.saveEvent(currentEvent as MasaEvent);
        setEvents(ContentManager.getEvents());
        setView('list');
        setCurrentEvent(null);
    };
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure?')) {
            ContentManager.deleteEvent(id);
            setEvents(ContentManager.getEvents());
        }
    };

    if (view === 'edit' && currentEvent) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Events</button>
                <ModuleHeader title={currentEvent.id?.startsWith('evt-') ? 'New Event' : 'Edit Event'} />
                <div className="space-y-4 bg-white p-6 rounded-lg border">
                    <InputField label="Title" value={currentEvent.title} onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} />
                    <TextareaField label="Description" value={currentEvent.description} onChange={e => setCurrentEvent({ ...currentEvent, description: e.target.value })} rows={3} />
                    <InputField label="Image URL" value={currentEvent.image} onChange={e => setCurrentEvent({ ...currentEvent, image: e.target.value })} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <SelectField label="Category" value={currentEvent.category} onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value as MasaEvent['category'] })}>
                            <option>Conference</option><option>Training</option><option>Sports</option><option>Community</option><option>Award</option>
                        </SelectField>
                        <SelectField label="Status" value={currentEvent.status} onChange={e => setCurrentEvent({ ...currentEvent, status: e.target.value as MasaEvent['status'] })}>
                            <option>Upcoming</option><option>Completed</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <InputField label="Date (YYYY-MM-DD)" type="date" value={currentEvent.date} onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })} />
                        <InputField label="Display Date (e.g., Jan 15, 2025)" value={currentEvent.displayDate} onChange={e => setCurrentEvent({ ...currentEvent, displayDate: e.target.value })} />
                        <InputField label="Price (e.g., Free, ₹500)" value={currentEvent.price} onChange={e => setCurrentEvent({ ...currentEvent, price: e.target.value })} />
                    </div>
                    <InputField label="Location" value={currentEvent.location} onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })} />
                </div>
                <button onClick={handleSave} className="mt-6 bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Event</button>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Event Manager" onAction={handleNew} actionLabel="New Event" />
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider"><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.map(event => (
                            <tr key={event.id}>
                                <td className="p-3 font-bold">{event.title}</td><td className="p-3">{event.category}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${event.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{event.status}</span></td>
                                <td className="p-3">{event.displayDate}</td>
                                <td className="p-3 space-x-2"><button onClick={() => handleEdit(event)} className="text-masa-blue font-bold">Edit</button><button onClick={() => handleDelete(event.id)} className="text-red-500 font-bold">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventManagerModule;
