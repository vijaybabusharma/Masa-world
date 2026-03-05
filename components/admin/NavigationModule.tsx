import React, { useState, useEffect } from 'react';
import { GlobalSettings, MenuItem, NavItem, Page } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, SelectField } from './AdminComponents';
import { PlusIcon, TrashIcon, ArrowDownIcon, ArrowUpIcon } from '../icons/FeatureIcons';

const NavigationModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings | null>(null);
    const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');

    useEffect(() => {
        setSettings(ContentManager.getSettings());
    }, []);

    const handleSave = () => {
        if (settings) {
            ContentManager.saveSettings(settings);
            alert('Navigation saved successfully!');
        }
    };

    const addMenuItem = (parent?: string) => {
        if (!settings) return;
        const newItem: MenuItem = { id: `nav-${Date.now()}`, label: 'New Link', page: 'home' };
        
        const newSettings = { ...settings };
        if (activeTab === 'header') {
            newSettings.navigation.headerMenu.push(newItem);
        } else {
            newSettings.navigation.footerAboutLinks.push(newItem as NavItem);
        }
        setSettings(newSettings);
    };

    const removeMenuItem = (id: string) => {
        if (!settings) return;
        const newSettings = { ...settings };
        if (activeTab === 'header') {
            newSettings.navigation.headerMenu = newSettings.navigation.headerMenu.filter(m => m.id !== id);
        } else {
            newSettings.navigation.footerAboutLinks = newSettings.navigation.footerAboutLinks.filter(m => m.id !== id);
        }
        setSettings(newSettings);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (!settings) return;
        const newSettings = { ...settings };
        const menu = activeTab === 'header' ? newSettings.navigation.headerMenu : newSettings.navigation.footerAboutLinks;
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= menu.length) return;
        
        const temp = menu[index];
        menu[index] = menu[newIndex];
        menu[newIndex] = temp;
        
        setSettings(newSettings);
    };

    if (!settings) return <div>Loading...</div>;

    const currentMenu = activeTab === 'header' ? settings.navigation.headerMenu : settings.navigation.footerAboutLinks;

    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
                <ModuleHeader title="Navigation & Menus" />
                <button onClick={handleSave} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90">Save Changes</button>
            </div>

            <div className="flex gap-4 border-b">
                <button 
                    onClick={() => setActiveTab('header')}
                    className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'header' ? 'border-b-2 border-masa-blue text-masa-blue' : 'text-gray-500'}`}
                >
                    Header Menu
                </button>
                <button 
                    onClick={() => setActiveTab('footer')}
                    className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'footer' ? 'border-b-2 border-masa-blue text-masa-blue' : 'text-gray-500'}`}
                >
                    Footer Links
                </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 capitalize">{activeTab} Navigation</h3>
                    <button onClick={() => addMenuItem()} className="text-masa-blue font-bold text-sm flex items-center gap-1 hover:underline">
                        <PlusIcon className="h-4 w-4" /> Add Item
                    </button>
                </div>
                
                <div className="divide-y">
                    {currentMenu.map((item, idx) => (
                        <React.Fragment key={item.id}>
                            <div className="p-4 flex items-center gap-4 hover:bg-gray-50 group">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-masa-blue disabled:opacity-0"><ArrowUpIcon className="h-4 w-4"/></button>
                                <button onClick={() => moveItem(idx, 'down')} disabled={idx === currentMenu.length - 1} className="text-gray-400 hover:text-masa-blue disabled:opacity-0"><ArrowDownIcon className="h-4 w-4"/></button>
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField 
                                    label="Label" 
                                    value={item.label} 
                                    onChange={e => {
                                        const newSettings = { ...settings };
                                        const menu = activeTab === 'header' ? newSettings.navigation.headerMenu : newSettings.navigation.footerAboutLinks;
                                        menu[idx].label = e.target.value;
                                        setSettings(newSettings);
                                    }}
                                />
                                <SelectField 
                                    label="Link to Page" 
                                    value={item.page}
                                    onChange={e => {
                                        const newSettings = { ...settings };
                                        const menu = activeTab === 'header' ? newSettings.navigation.headerMenu : newSettings.navigation.footerAboutLinks;
                                        menu[idx].page = e.target.value as Page;
                                        setSettings(newSettings);
                                    }}
                                >
                                    <option value="home">Home</option>
                                    <option value="about">About</option>
                                    <option value="initiatives">Initiatives</option>
                                    <option value="gallery">Gallery</option>
                                    <option value="blog">Blog</option>
                                    <option value="events">Events</option>
                                    <option value="contact">Contact</option>
                                    <option value="donate">Donate</option>
                                </SelectField>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button onClick={() => removeMenuItem(item.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded" title="Delete Item">
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                                {activeTab === 'header' && (
                                    <button 
                                        onClick={() => {
                                            const newSettings = { ...settings };
                                            if (!newSettings.navigation.headerMenu[idx].subItems) {
                                                newSettings.navigation.headerMenu[idx].subItems = [];
                                            }
                                            newSettings.navigation.headerMenu[idx].subItems!.push({
                                                id: `sub-${Date.now()}`,
                                                label: 'New Sub-link',
                                                page: 'home'
                                            });
                                            setSettings(newSettings);
                                        }}
                                        className="text-masa-blue opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 rounded"
                                        title="Add Dropdown Item"
                                    >
                                        <PlusIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Sub Items Rendering */}
                        {item.subItems && item.subItems.length > 0 && (
                            <div className="bg-gray-50 pl-12 pr-4 py-2 border-t border-dashed divide-y">
                                {item.subItems.map((subItem, subIdx) => (
                                    <div key={subItem.id} className="py-2 flex items-center gap-4 group/sub">
                                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 rounded-bl -mt-4 mr-2"></div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InputField 
                                                label="Sub-label" 
                                                value={subItem.label} 
                                                onChange={e => {
                                                    const newSettings = { ...settings };
                                                    newSettings.navigation.headerMenu[idx].subItems![subIdx].label = e.target.value;
                                                    setSettings(newSettings);
                                                }}
                                            />
                                            <SelectField 
                                                label="Link to Page" 
                                                value={subItem.page}
                                                onChange={e => {
                                                    const newSettings = { ...settings };
                                                    newSettings.navigation.headerMenu[idx].subItems![subIdx].page = e.target.value as Page;
                                                    setSettings(newSettings);
                                                }}
                                            >
                                                <option value="home">Home</option>
                                                <option value="about">About</option>
                                                <option value="initiatives">Initiatives</option>
                                                <option value="gallery">Gallery</option>
                                                <option value="blog">Blog</option>
                                                <option value="events">Events</option>
                                                <option value="contact">Contact</option>
                                                <option value="donate">Donate</option>
                                            </SelectField>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const newSettings = { ...settings };
                                                newSettings.navigation.headerMenu[idx].subItems = newSettings.navigation.headerMenu[idx].subItems!.filter(s => s.id !== subItem.id);
                                                setSettings(newSettings);
                                            }} 
                                            className="text-red-500 opacity-0 group-hover/sub:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </React.Fragment>

                    ))}
                    {currentMenu.length === 0 && (
                        <div className="p-8 text-center text-gray-500 italic">No menu items found. Click "Add Item" to start.</div>
                    )}
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                <p className="font-bold mb-1">💡 Pro Tip:</p>
                <p>You can drag and drop items to reorder them (coming soon in v1.3). For now, use the arrows to move items up and down.</p>
            </div>
        </div>
    );
};

export default NavigationModule;
