import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, SelectField } from './AdminComponents';
import { RichTextEditor } from '../RichTextEditor';

const CourseManagerModule: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentCourse, setCurrentCourse] = useState<Partial<Course> | null>(null);

    useEffect(() => { setCourses(ContentManager.getCourses()); }, []);

    const handleEdit = (course: Course) => { setCurrentCourse(course); setView('edit'); };
    const handleNew = () => {
        setCurrentCourse({
            id: Date.now(), title: '', description: '', fullDescription: '', category: 'Education', 
            level: 'Beginner', duration: '', mode: 'Online', image: '', price: 'Free', highlights: []
        });
        setView('edit');
    };
    const handleSave = () => {
        if (currentCourse) ContentManager.saveCourse(currentCourse as Course);
        setCourses(ContentManager.getCourses());
        setView('list');
        setCurrentCourse(null);
    };
    const handleDelete = (id: number) => {
        if (window.confirm('Delete this course?')) {
            ContentManager.deleteCourse(id);
            setCourses(ContentManager.getCourses());
        }
    };

    if (view === 'edit' && currentCourse) {
        return (
            <div className="animate-fade-in-up">
                <button onClick={() => setView('list')} className="mb-4 text-sm font-bold text-masa-blue">&larr; Back to Courses</button>
                <ModuleHeader title={currentCourse.id ? 'Edit Course' : 'New Course'} />
                <div className="space-y-4 bg-white p-6 rounded-lg border">
                    <InputField label="Course Title" value={currentCourse.title} onChange={e => setCurrentCourse({ ...currentCourse, title: e.target.value })} />
                    <TextareaField label="Short Description" value={currentCourse.description} onChange={e => setCurrentCourse({ ...currentCourse, description: e.target.value })} rows={2} />
                    <div className="grid md:grid-cols-3 gap-4">
                        <SelectField label="Category" value={currentCourse.category} onChange={e => setCurrentCourse({ ...currentCourse, category: e.target.value as any })}>
                            <option>Sports</option><option>Education</option><option>Culture</option>
                        </SelectField>
                        <SelectField label="Level" value={currentCourse.level} onChange={e => setCurrentCourse({ ...currentCourse, level: e.target.value as any })}>
                            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                        </SelectField>
                        <SelectField label="Mode" value={currentCourse.mode} onChange={e => setCurrentCourse({ ...currentCourse, mode: e.target.value as any })}>
                            <option>Online</option><option>Offline</option><option>Hybrid</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Duration" value={currentCourse.duration} onChange={e => setCurrentCourse({ ...currentCourse, duration: e.target.value })} />
                        <InputField label="Price" value={currentCourse.price} onChange={e => setCurrentCourse({ ...currentCourse, price: e.target.value })} />
                    </div>
                    <InputField label="Image URL" value={currentCourse.image} onChange={e => setCurrentCourse({ ...currentCourse, image: e.target.value })} />
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Details</label>
                        <RichTextEditor value={currentCourse.fullDescription || ''} onChange={val => setCurrentCourse({ ...currentCourse, fullDescription: val })} />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-6 bg-masa-blue text-white px-6 py-2 rounded-lg font-bold">Save Course</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Course Manager" onAction={handleNew} actionLabel="New Course" />
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-gray-500 uppercase tracking-wider"><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Level</th><th className="p-3">Mode</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td className="p-3 font-bold">{course.title}</td><td className="p-3">{course.category}</td>
                                <td className="p-3">{course.level}</td><td className="p-3">{course.mode}</td>
                                <td className="p-3 space-x-2"><button onClick={() => handleEdit(course)} className="text-masa-blue font-bold">Edit</button><button onClick={() => handleDelete(course.id)} className="text-red-500 font-bold">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManagerModule;
