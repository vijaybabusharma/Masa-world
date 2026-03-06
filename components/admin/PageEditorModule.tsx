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
        const fetchPages = async () => {
            const data = await ContentManager.getPages();
            setPages(data);
        };
        fetchPages();
    }, []);

    const handleEdit = async (pageMeta: PageMetadata) => {
        setLoading(true);
        try {
            const content = await ContentManager.getPageContent(pageMeta.id);
            if (content) {
                setCurrentPage(content);
            } else {
                // Fallback to basic content if not found
                const fallback: PageContent = {
                    id: pageMeta.id,
                    slug: (pageMeta as any).slug || pageMeta.id,
                    title: pageMeta.title,
                    metaDescription: pageMeta.description,
                    sections: [],
                    lastModified: pageMeta.lastModified,
                    status: (pageMeta as any).status || 'Published',
                    visibility: 'Public',
                    order: (pageMeta as any).order || 0,
                    parentId: (pageMeta as any).parentId
                };
                setCurrentPage(fallback);
            }
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
            status: 'Draft',
            visibility: 'Public',
            order: 0
        });
        setView('edit');
    };

    const handleDuplicate = async (pageMeta: PageMetadata) => {
        const content = await ContentManager.getPageContent(pageMeta.id);
        const newId = `page-${Date.now()}`;
        const newPage: PageContent = content ? {
            ...content,
            id: newId,
            title: `${content.title} (Copy)`,
            slug: `${content.slug}-copy`,
            lastModified: new Date().toISOString(),
            status: 'Draft'
        } : {
            id: newId,
            slug: `${pageMeta.id}-copy`,
            title: `${pageMeta.title} (Copy)`,
            metaDescription: pageMeta.description,
            sections: [],
            lastModified: new Date().toISOString(),
            status: 'Draft',
            visibility: 'Public',
            order: (pageMeta as any).order || 0
        };
        
        await ContentManager.savePageContent(newPage);
        setPages(await ContentManager.getPages());
    };

    const handleDelete = async (id: string) => {
        if (confirm('Move this page to trash?')) {
            await ContentManager.deletePage(id);
            setPages(await ContentManager.getPages());
        }
    };

    const handleSave = async () => {
        if (currentPage) {
            setLoading(true);
            try {
                await ContentManager.savePageContent(currentPage);
                setPages(await ContentManager.getPages());
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
                        <button 
                            onClick={() => {
                                // Save to session storage for preview
                                sessionStorage.setItem(`preview_page_${currentPage.id}`, JSON.stringify(currentPage));
                                window.open(`/${currentPage.slug || currentPage.id}?preview=true&previewId=${currentPage.id}`, '_blank');
                            }} 
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all"
                        >
                            Preview
                        </button>
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
                            <InputField label="SEO Title (Meta Title)" value={currentPage.seoTitle || ''} onChange={e => setCurrentPage({ ...currentPage, seoTitle: e.target.value })} placeholder="Leave blank to use Page Title" />
                            <InputField label="URL Slug" value={currentPage.slug} onChange={e => setCurrentPage({ ...currentPage, slug: e.target.value })} placeholder="e.g. about-us" />
                            
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div>
                                    <label className="font-bold text-sm text-blue-900">Set as Homepage</label>
                                    <p className="text-[10px] text-blue-700">This page will be the site's landing page.</p>
                                </div>
                                <ToggleSwitch checked={currentPage.isHomepage} onChange={async val => {
                                    if (val) {
                                        // Unset other homepages
                                        const pages = await ContentManager.getPages();
                                        await Promise.all(pages.map(async p => {
                                            if ((p as any).isHomepage) {
                                                const content = await ContentManager.getPageContent(p.id);
                                                if (content) {
                                                    content.isHomepage = false;
                                                    await ContentManager.savePageContent(content);
                                                }
                                            }
                                        }));
                                    }
                                    setCurrentPage({ ...currentPage, isHomepage: val });
                                }} />
                            </div>

                            <SelectField label="Parent Page" value={currentPage.parentId || ''} onChange={e => setCurrentPage({ ...currentPage, parentId: e.target.value })}>
                                <option value="">None (Root)</option>
                                {pages.filter(p => p.id !== currentPage.id).map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </SelectField>
                            <InputField label="Order" type="number" value={String(currentPage.order)} onChange={e => setCurrentPage({ ...currentPage, order: Number(e.target.value) })} />
                            
                            <div className="space-y-4">
                                <InputField label="Featured Image URL" value={currentPage.featuredImage || ''} onChange={e => setCurrentPage({ ...currentPage, featuredImage: e.target.value })} />
                                <InputField label="Header Image URL" value={currentPage.headerImage || ''} onChange={e => setCurrentPage({ ...currentPage, headerImage: e.target.value })} />
                            </div>

                            <TextareaField label="Meta Description" value={currentPage.metaDescription} onChange={e => setCurrentPage({ ...currentPage, metaDescription: e.target.value })} rows={3} />
                            <InputField label="SEO Keywords" value={currentPage.seoKeywords || ''} onChange={e => setCurrentPage({ ...currentPage, seoKeywords: e.target.value })} />
                            
                            <hr className="my-4" />
                            
                            <SelectField label="Visibility" value={currentPage.visibility} onChange={e => setCurrentPage({ ...currentPage, visibility: e.target.value as any })}>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                                <option value="Password">Password Protected</option>
                            </SelectField>
                            {currentPage.visibility === 'Password' && (
                                <InputField label="Page Password" type="password" value={currentPage.password || ''} onChange={e => setCurrentPage({ ...currentPage, password: e.target.value })} />
                            )}
                            
                            <SelectField label="Status" value={currentPage.status} onChange={e => setCurrentPage({ ...currentPage, status: e.target.value as any })}>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Scheduled">Scheduled</option>
                            </SelectField>
                            {currentPage.status === 'Scheduled' && (
                                <InputField label="Publish Date" type="datetime-local" value={currentPage.publishDate || ''} onChange={e => setCurrentPage({ ...currentPage, publishDate: e.target.value })} />
                            )}
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
                        <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                            {(page as any).parentId && <span className="text-masa-blue text-xs font-normal bg-blue-50 px-2 py-0.5 rounded">Child</span>}
                            {page.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-6">{page.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-masa-blue">/{page.id}</span>
                                {(page as any).status && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded w-fit mt-1 ${
                                        (page as any).status === 'Published' ? 'bg-green-100 text-green-700' :
                                        (page as any).status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {(page as any).status}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={async () => {
                                        const index = pages.findIndex(p => p.id === page.id);
                                        if (index > 0) {
                                            const newPages = [...pages];
                                            [newPages[index], newPages[index-1]] = [newPages[index-1], newPages[index]];
                                            // Update order property for both
                                            newPages[index].order = index;
                                            newPages[index-1].order = index - 1;
                                            await Promise.all(newPages.map(p => ContentManager.savePage(p)));
                                            setPages(newPages);
                                        }
                                    }}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                                    title="Move Up"
                                >
                                    <ArrowUpIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={async () => {
                                        const index = pages.findIndex(p => p.id === page.id);
                                        if (index < pages.length - 1) {
                                            const newPages = [...pages];
                                            [newPages[index], newPages[index+1]] = [newPages[index+1], newPages[index]];
                                            // Update order property for both
                                            newPages[index].order = index;
                                            newPages[index+1].order = index + 1;
                                            await Promise.all(newPages.map(p => ContentManager.savePage(p)));
                                            setPages(newPages);
                                        }
                                    }}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                                    title="Move Down"
                                >
                                    <ArrowDownIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={() => handleDuplicate(page)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                                    title="Duplicate"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(page.id as any)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                    title="Delete"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={() => handleEdit(page)}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-masa-blue group-hover:text-white transition-all"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageEditorModule;