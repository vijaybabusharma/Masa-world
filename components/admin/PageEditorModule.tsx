import React, { useState, useEffect } from 'react';
import { PageMetadata, PageContent, PageSection } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, SelectField, ToggleSwitch } from './AdminComponents';
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, PencilIcon } from '../icons/FeatureIcons';

const PageEditorModule: React.FC = () => {
    const [pages, setPages] = useState<PageMetadata[]>([]);
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPages(ContentManager.getPages());
    }, []);

    const handleEdit = async (pageMeta: PageMetadata) => {
        setLoading(true);
        try {
            // In a real app, fetch full page content by ID/slug
            // For now, we'll mock it or use a helper
            const mockContent: PageContent = {
                id: pageMeta.id,
                slug: pageMeta.id,
                title: pageMeta.title,
                metaDescription: pageMeta.description,
                sections: [
                    { id: 'sec-1', type: 'Hero', visible: true, title: 'Welcome to MASA', content: 'Empowering youth through sports, education and culture.' },
                    { id: 'sec-2', type: 'Text', visible: true, title: 'Our Mission', content: 'To create a positive impact in society.' }
                ],
                lastModified: pageMeta.lastModified,
                status: 'Published'
            };
            setCurrentPage(mockContent);
            setView('edit');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setCurrentPage({
            id: `page-${Date.now()}`,
            slug: '',
            title: 'New Page',
            metaDescription: '',
            sections: [],
            lastModified: new Date().toISOString(),
            status: 'Draft'
        });
        setView('edit');
    };

    const handleSave = async () => {
        if (currentPage) {
            setLoading(true);
            try {
                const meta: PageMetadata = {
                    id: currentPage.id as any,
                    title: currentPage.title,
                    description: currentPage.metaDescription,
                    lastModified: new Date().toISOString()
                };
                await ContentManager.savePage(meta);
                setPages(ContentManager.getPages());
                setView('list');
                setCurrentPage(null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const addSection = (type: PageSection['type']) => {
        if (currentPage) {
            const newSection: PageSection = {
                id: `sec-${Date.now()}`,
                type,
                visible: true,
                title: `New ${type} Section`,
                content: ''
            };
            setCurrentPage({ ...currentPage, sections: [...currentPage.sections, newSection] });
        }
    };

    const removeSection = (id: string) => {
        if (currentPage) {
            setCurrentPage({ ...currentPage, sections: currentPage.sections.filter(s => s.id !== id) });
        }
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (currentPage) {
            const newSections = [...currentPage.sections];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex >= 0 && targetIndex < newSections.length) {
                [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
                setCurrentPage({ ...currentPage, sections: newSections });
            }
        }
    };

    if (view === 'edit' && currentPage) {
        return (
            <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setView('list')} className="text-sm font-bold text-masa-blue hover:underline">&larr; Back to Pages</button>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={loading} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold shadow-md disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Page'}
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ModuleHeader title="Page Sections" />
                        {currentPage.sections.map((section, idx) => (
                            <div key={section.id} className={`bg-white rounded-xl border-2 p-6 transition-all ${section.visible ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-60'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-2 rounded-lg"><PencilIcon className="h-4 w-4 text-gray-500" /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{section.type} Section</h4>
                                            <p className="text-xs text-gray-500">ID: {section.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => moveSection(idx, 'up')} className="p-1.5 hover:bg-gray-100 rounded border"><ArrowUpIcon className="h-4 w-4" /></button>
                                        <button onClick={() => moveSection(idx, 'down')} className="p-1.5 hover:bg-gray-100 rounded border"><ArrowDownIcon className="h-4 w-4" /></button>
                                        <button onClick={() => removeSection(section.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded border border-red-100"><TrashIcon className="h-4 w-4" /></button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <InputField label="Section Title" value={section.title} onChange={e => {
                                        const newSections = [...currentPage.sections];
                                        newSections[idx].title = e.target.value;
                                        setCurrentPage({ ...currentPage, sections: newSections });
                                    }} />
                                    <TextareaField label="Content" value={section.content} onChange={e => {
                                        const newSections = [...currentPage.sections];
                                        newSections[idx].content = e.target.value;
                                        setCurrentPage({ ...currentPage, sections: newSections });
                                    }} rows={3} />
                                    <ToggleSwitch label="Visible on Website" checked={section.visible} onChange={val => {
                                        const newSections = [...currentPage.sections];
                                        newSections[idx].visible = val;
                                        setCurrentPage({ ...currentPage, sections: newSections });
                                    }} />
                                </div>
                            </div>
                        ))}

                        <div className="bg-gray-50 border-2 border-dashed rounded-xl p-8 text-center">
                            <p className="text-gray-500 mb-4 font-medium">Add a new section to this page</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Hero', 'Text', 'Image', 'Features', 'Timeline', 'Contact'].map(type => (
                                    <button 
                                        key={type}
                                        onClick={() => addSection(type as any)}
                                        className="bg-white border px-4 py-2 rounded-lg text-sm font-bold hover:border-masa-blue hover:text-masa-blue transition-all"
                                    >
                                        + {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ModuleHeader title="Page Settings" />
                        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                            <InputField label="Page Title" value={currentPage.title} onChange={e => setCurrentPage({ ...currentPage, title: e.target.value })} />
                            <InputField label="URL Slug" value={currentPage.slug} onChange={e => setCurrentPage({ ...currentPage, slug: e.target.value })} placeholder="e.g. about-us" />
                            <TextareaField label="Meta Description" value={currentPage.metaDescription} onChange={e => setCurrentPage({ ...currentPage, metaDescription: e.target.value })} rows={4} />
                            <SelectField label="Status" value={currentPage.status} onChange={e => setCurrentPage({ ...currentPage, status: e.target.value as any })}>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </SelectField>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Page Editor" onAction={handleNew} actionLabel="Create New Page" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map(page => (
                    <div key={page.id} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl"><PencilIcon className="h-6 w-6 text-masa-blue" /></div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">Last edited: {new Date(page.lastModified).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{page.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-6">{page.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-masa-blue">/{page.id}</span>
                            <button 
                                onClick={() => handleEdit(page)}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-masa-blue group-hover:text-white transition-all"
                            >
                                Edit Page
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageEditorModule;