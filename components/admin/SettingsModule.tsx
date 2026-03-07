import React, { useState } from 'react';
import { GlobalSettings, SliderItem, DeliveryAreaItem, Testimonial, NavItem } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, TextareaField, SelectField, ToggleSwitch } from './AdminComponents';
import { EyeIcon, TrashIcon, PlusIcon, GlobeAltIcon, ArrowUpIcon, ArrowDownIcon } from '../icons/FeatureIcons';

const SettingsModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [activeTab, setActiveTab] = useState('scripts');
    
    const handleSettingsChange = (section: keyof GlobalSettings, key: any, value: any) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            (newSettings[section] as any)[key] = value;
            return newSettings;
        });
    };
    
    const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const [section, key] = name.split('.');
        const checked = (e.target as HTMLInputElement).checked;

        setSettings(prev => {
            const newSettings = { ...prev,
                [section]: {
                    ...(prev as any)[section],
                    [key]: type === 'checkbox' ? checked : value
                }
            };
            return newSettings;
        });
    };

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        alert('Settings saved successfully!');
    };

    const handlePreview = () => {
        sessionStorage.setItem('masa_preview_settings', JSON.stringify(settings));
        window.open('/?masa_preview=true', '_blank');
    };

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'social', label: 'Social Media' },
        { id: 'homepage', label: 'Homepage' },
        { id: 'navigation', label: 'Navigation' },
        { id: 'seo', label: 'SEO' },
        { id: 'scripts', label: 'Scripts & Analytics' },
        { id: 'appearance', label: 'Appearance' },
        { id: 'roles', label: 'Role Permissions' },
    ];

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
                 <div className="flex gap-2">
                    <button onClick={handlePreview} className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <EyeIcon className="h-4 w-4"/> Preview Changes
                    </button>
                    <button onClick={handleSave} className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-900 transition-colors">Save All Settings</button>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === tab.id ? 'border-masa-orange text-masa-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'general' && (
                <div className="space-y-6 max-w-4xl">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Branding</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField label="Site Logo URL" name="general.siteLogo" value={settings.general.siteLogo} onChange={handleNestedChange} />
                            <InputField label="Site Favicon URL" name="general.siteFavicon" value={settings.general.siteFavicon} onChange={handleNestedChange} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField label="Contact Phone" name="general.contactPhone" value={settings.general.contactPhone} onChange={handleNestedChange} />
                            <InputField label="Address" name="general.address" value={settings.general.address} onChange={handleNestedChange} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Footer Content</h3>
                        <div className="space-y-4">
                            <TextareaField label="Footer Text" name="general.footerText" value={settings.general.footerText} onChange={handleNestedChange} rows={3} />
                            <InputField label="Copyright Text" name="general.copyrightText" value={settings.general.copyrightText} onChange={handleNestedChange} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Features & Switches</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold">Enable User Registrations</label><p className="text-xs text-gray-500">Allow new users to sign up.</p></div>
                                <ToggleSwitch checked={settings.general.enableRegistrations} onChange={val => handleSettingsChange('general', 'enableRegistrations', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold text-red-600">Maintenance Mode</label><p className="text-xs text-gray-500">Show a maintenance page to visitors.</p></div>
                                <ToggleSwitch checked={settings.general.maintenanceMode} onChange={val => handleSettingsChange('general', 'maintenanceMode', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div><label className="font-bold">WhatsApp Integration</label><p className="text-xs text-gray-500">Show floating WhatsApp button.</p></div>
                                <ToggleSwitch checked={settings.features.whatsAppIntegrationEnabled} onChange={val => handleSettingsChange('features', 'whatsAppIntegrationEnabled', val)} />
                            </div>
                            {settings.features.whatsAppIntegrationEnabled && (
                                <InputField label="WhatsApp Number" name="features.whatsAppNumber" value={settings.features.whatsAppNumber} onChange={handleNestedChange} placeholder="e.g., 919876543210" />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'social' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-4xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media Links</h3>
                    <p className="text-sm text-gray-500 mb-6">Manage the social media links displayed in the header and footer.</p>
                    <div className="space-y-4">
                        {settings.social.map((link, index) => (
                            <div key={link.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold text-gray-600 uppercase text-xs">
                                    {link.platform.substring(0, 2)}
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1">{link.platform}</label>
                                    <input 
                                        type="text" 
                                        value={link.url} 
                                        onChange={(e) => {
                                            const newSocial = [...settings.social];
                                            newSocial[index].url = e.target.value;
                                            setSettings({ ...settings, social: newSocial });
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xs font-bold text-gray-400 mb-1">Visible</span>
                                    <ToggleSwitch 
                                        checked={link.enabled} 
                                        onChange={(val) => {
                                            const newSocial = [...settings.social];
                                            newSocial[index].enabled = val;
                                            setSettings({ ...settings, social: newSocial });
                                        }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'homepage' && (
                <div className="space-y-8 max-w-5xl">
                    {/* Hero Slider */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Hero Slider</h3>
                        <div className="space-y-6">
                            {settings.homepage.slider.slides.map((slide, index) => (
                                <div key={slide.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => {
                                                if (index > 0) {
                                                    const newSlides = [...settings.homepage.slider.slides];
                                                    [newSlides[index], newSlides[index-1]] = [newSlides[index-1], newSlides[index]];
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                                }
                                            }}
                                            className="p-1.5 bg-white border rounded shadow-sm hover:bg-gray-50 text-gray-600"
                                            title="Move Up"
                                        >
                                            <ArrowUpIcon className="h-4 w-4"/>
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (index < settings.homepage.slider.slides.length - 1) {
                                                    const newSlides = [...settings.homepage.slider.slides];
                                                    [newSlides[index], newSlides[index+1]] = [newSlides[index+1], newSlides[index]];
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                                }
                                            }}
                                            className="p-1.5 bg-white border rounded shadow-sm hover:bg-gray-50 text-gray-600"
                                            title="Move Down"
                                        >
                                            <ArrowDownIcon className="h-4 w-4"/>
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newSlides = settings.homepage.slider.slides.filter((_, i) => i !== index);
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }}
                                            className="p-1.5 bg-white border rounded shadow-sm hover:bg-red-50 text-red-500"
                                            title="Delete Slide"
                                        >
                                            <TrashIcon className="h-4 w-4"/>
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Headline" 
                                            value={slide.headline} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].headline = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                        <InputField 
                                            label="Background Image URL" 
                                            value={slide.image} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].image = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Mobile Image URL" 
                                            value={slide.mobileImage || ''} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].mobileImage = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                        <div className="flex items-center gap-4 mt-6">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Enabled</label>
                                            <ToggleSwitch 
                                                checked={slide.enabled} 
                                                onChange={(val) => {
                                                    const newSlides = [...settings.homepage.slider.slides];
                                                    newSlides[index].enabled = val;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                                }} 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <TextareaField 
                                            label="Subheading" 
                                            value={slide.subtext} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].subtext = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                            rows={2}
                                        />
                                        <TextareaField 
                                            label="Description" 
                                            value={slide.description || ''} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].description = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                            rows={2}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <InputField 
                                            label="CTA Label" 
                                            value={slide.cta.label} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].cta.label = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Link To Page" 
                                            value={slide.cta.page} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].cta.page = e.target.value as any;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }}
                                        >
                                            <option value="get-involved">Get Involved</option>
                                            <option value="programs-overview">Programs</option>
                                            <option value="about">About</option>
                                            <option value="contact">Contact</option>
                                            <option value="donate">Donate</option>
                                        </SelectField>
                                        <InputField 
                                            label="Custom URL (Optional)" 
                                            value={slide.cta.url || ''} 
                                            onChange={(e) => {
                                                const newSlides = [...settings.homepage.slider.slides];
                                                newSlides[index].cta.url = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: newSlides } } });
                                            }} 
                                        />
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newSlide: SliderItem = {
                                        id: `slide-${Date.now()}`,
                                        headline: 'New Headline',
                                        subtext: 'New Subtext',
                                        image: 'https://via.placeholder.com/1920x1080',
                                        cta: { label: 'Learn More', page: 'about' },
                                        enabled: true
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, slider: { ...settings.homepage.slider, slides: [...settings.homepage.slider.slides, newSlide] } } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Slide
                            </button>
                        </div>
                    </div>

                    {/* Founder Message */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Founder Message</h3>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField 
                                    label="Name" 
                                    value={settings.homepage.founderMessageContent.name} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, name: e.target.value } } })} 
                                />
                                <InputField 
                                    label="Title" 
                                    value={settings.homepage.founderMessageContent.title} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, title: e.target.value } } })} 
                                />
                            </div>
                            <InputField 
                                label="Image URL" 
                                value={settings.homepage.founderMessageContent.image} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, image: e.target.value } } })} 
                            />
                            <TextareaField 
                                label="Quote" 
                                value={settings.homepage.founderMessageContent.quote} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, quote: e.target.value } } })} 
                                rows={3}
                            />
                            <TextareaField 
                                label="Text" 
                                value={settings.homepage.founderMessageContent.text} 
                                onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, founderMessageContent: { ...settings.homepage.founderMessageContent, text: e.target.value } } })} 
                                rows={5}
                            />
                        </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Impact Stats Override</h3>
                            <ToggleSwitch 
                                checked={settings.homepage.impactStats.enabled} 
                                onChange={(val) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, enabled: val } } })} 
                            />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Enable this to manually set the impact numbers instead of calculating them from data.</p>
                        
                        {settings.homepage.impactStats.enabled && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField 
                                    label="Youth Impacted" 
                                    type="number"
                                    value={settings.homepage.impactStats.youth} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, youth: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Programs Conducted" 
                                    type="number"
                                    value={settings.homepage.impactStats.programs} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, programs: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Global Reach (Countries)" 
                                    type="number"
                                    value={settings.homepage.impactStats.globalReach} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, globalReach: parseInt(e.target.value) || 0 } } })} 
                                />
                                <InputField 
                                    label="Years of Impact" 
                                    type="number"
                                    value={settings.homepage.impactStats.years} 
                                    onChange={(e) => setSettings({ ...settings, homepage: { ...settings.homepage, impactStats: { ...settings.homepage.impactStats, years: parseInt(e.target.value) || 0 } } })} 
                                />
                            </div>
                        )}
                    </div>

                    {/* Pillars */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Core Pillars</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {settings.homepage.pillars.map((pillar, index) => (
                                <div key={pillar.id} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="mb-2 font-bold text-masa-blue uppercase text-xs tracking-wider">{pillar.label}</div>
                                    <div className="space-y-3">
                                        <InputField 
                                            label="Title" 
                                            value={pillar.title} 
                                            onChange={(e) => {
                                                const newPillars = [...settings.homepage.pillars];
                                                newPillars[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, pillars: newPillars } });
                                            }} 
                                        />
                                        <TextareaField 
                                            label="Description" 
                                            value={pillar.description} 
                                            onChange={(e) => {
                                                const newPillars = [...settings.homepage.pillars];
                                                newPillars[index].description = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, pillars: newPillars } });
                                            }} 
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process Steps (How We Work) */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Process Steps (How We Work)</h3>
                        <div className="space-y-6">
                            {settings.homepage.processSteps.map((step, index) => (
                                <div key={step.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Title" 
                                            value={step.title} 
                                            onChange={(e) => {
                                                const newSteps = [...settings.homepage.processSteps];
                                                newSteps[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Icon" 
                                            value={step.icon} 
                                            onChange={(e) => {
                                                const newSteps = [...settings.homepage.processSteps];
                                                newSteps[index].icon = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                            }}
                                        >
                                            <option value="SearchIcon">Search</option>
                                            <option value="UsersIcon">Users</option>
                                            <option value="SparklesIcon">Sparkles</option>
                                            <option value="PresentationChartBarIcon">Chart</option>
                                        </SelectField>
                                    </div>
                                    <TextareaField 
                                        label="Description" 
                                        value={step.description} 
                                        onChange={(e) => {
                                            const newSteps = [...settings.homepage.processSteps];
                                            newSteps[index].description = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, processSteps: newSteps } });
                                        }} 
                                        rows={2}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Items (Incredible Section) */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Incredible Section Items</h3>
                        <div className="space-y-6">
                            {settings.homepage.deliveryItems.map((item, index) => (
                                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button 
                                        onClick={() => {
                                            const newItems = settings.homepage.deliveryItems.filter((_, i) => i !== index);
                                            setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                        }}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                                    >
                                        <TrashIcon className="h-4 w-4"/>
                                    </button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Title" 
                                            value={item.title} 
                                            onChange={(e) => {
                                                const newItems = [...settings.homepage.deliveryItems];
                                                newItems[index].title = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                            }} 
                                        />
                                        <SelectField 
                                            label="Type (Icon)" 
                                            value={item.type} 
                                            onChange={(e) => {
                                                const newItems = [...settings.homepage.deliveryItems];
                                                newItems[index].type = e.target.value as any;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                            }}
                                        >
                                            <option value="Events">Events</option>
                                            <option value="Trainings">Trainings</option>
                                            <option value="Awards">Awards</option>
                                            <option value="Records">Records</option>
                                            <option value="Conferences">Conferences</option>
                                        </SelectField>
                                    </div>
                                    <TextareaField 
                                        label="Description" 
                                        value={item.description} 
                                        onChange={(e) => {
                                            const newItems = [...settings.homepage.deliveryItems];
                                            newItems[index].description = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: newItems } });
                                        }} 
                                        rows={2}
                                    />
                                </div>
                            ))}
                             <button 
                                onClick={() => {
                                    const newItem: DeliveryAreaItem = {
                                        id: `del-${Date.now()}`,
                                        type: 'Events',
                                        title: 'New Item',
                                        description: 'Description here.'
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, deliveryItems: [...settings.homepage.deliveryItems, newItem] } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Item
                            </button>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Testimonials</h3>
                        <div className="space-y-6">
                            {settings.homepage.testimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button 
                                        onClick={() => {
                                            const newTestimonials = settings.homepage.testimonials.filter((_, i) => i !== index);
                                            setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                        }}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                                    >
                                        <TrashIcon className="h-4 w-4"/>
                                    </button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <InputField 
                                            label="Name" 
                                            value={testimonial.author} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].author = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                        <InputField 
                                            label="Role" 
                                            value={testimonial.role} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].role = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                    </div>
                                    <TextareaField 
                                        label="Quote" 
                                        value={testimonial.quote} 
                                        onChange={(e) => {
                                            const newTestimonials = [...settings.homepage.testimonials];
                                            newTestimonials[index].quote = e.target.value;
                                            setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                        }} 
                                        rows={3}
                                    />
                                    <div className="mt-4">
                                         <InputField 
                                            label="Image URL" 
                                            value={testimonial.image} 
                                            onChange={(e) => {
                                                const newTestimonials = [...settings.homepage.testimonials];
                                                newTestimonials[index].image = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: newTestimonials } });
                                            }} 
                                        />
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newTestimonial: Testimonial = {
                                        id: `test-${Date.now()}`,
                                        author: 'New Name',
                                        role: 'New Role',
                                        quote: 'New Quote',
                                        image: 'https://via.placeholder.com/150'
                                    };
                                    setSettings({ ...settings, homepage: { ...settings.homepage, testimonials: [...settings.homepage.testimonials, newTestimonial] } });
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-masa-blue hover:text-masa-blue transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5"/> Add Testimonial
                            </button>
                        </div>
                    </div>

                    {/* Sections Visibility */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Homepage Sections</h3>
                        <div className="space-y-4">
                            {Object.entries(settings.homepage.sections).map(([key, section]) => (
                                <div key={key} className="p-4 bg-gray-50 rounded-lg border space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                            <ToggleSwitch 
                                                checked={(section as any).visible} 
                                                onChange={(val) => {
                                                    const newSections = { ...settings.homepage.sections };
                                                    (newSections as any)[key].visible = val;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                                }} 
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <SelectField label="Text Align" value={(section as any).textAlign || 'center'} onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].textAlign = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }}>
                                                <option value="left">Left</option>
                                                <option value="center">Center</option>
                                                <option value="right">Right</option>
                                            </SelectField>
                                            <InputField label="Padding Top" value={(section as any).paddingTop || '4rem'} onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].paddingTop = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }} />
                                            <InputField label="Padding Bottom" value={(section as any).paddingBottom || '4rem'} onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].paddingBottom = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }} />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {(section as any).title !== undefined && (
                                            <InputField 
                                                label="Section Title"
                                                value={(section as any).title} 
                                                onChange={(e) => {
                                                    const newSections = { ...settings.homepage.sections };
                                                    (newSections as any)[key].title = e.target.value;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                                }}
                                            />
                                        )}
                                        {(section as any).subtitle !== undefined && (
                                            <InputField 
                                                label="Section Subtitle"
                                                value={(section as any).subtitle} 
                                                onChange={(e) => {
                                                    const newSections = { ...settings.homepage.sections };
                                                    (newSections as any)[key].subtitle = e.target.value;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                                }}
                                            />
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputField 
                                            label="Background Image URL"
                                            value={(section as any).backgroundImage || ''} 
                                            onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].backgroundImage = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }}
                                        />
                                        <InputField 
                                            label="Background Color"
                                            value={(section as any).backgroundColor || ''} 
                                            onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].backgroundColor = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }}
                                            placeholder="e.g. #f3f4f6 or transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Enable Button</label>
                                            <ToggleSwitch 
                                                checked={(section as any).buttonEnabled !== false} 
                                                onChange={(val) => {
                                                    const newSections = { ...settings.homepage.sections };
                                                    (newSections as any)[key].buttonEnabled = val;
                                                    setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                                }} 
                                            />
                                        </div>
                                        <InputField 
                                            label="Replace Section Image URL"
                                            value={(section as any).imageReplace || ''} 
                                            onChange={(e) => {
                                                const newSections = { ...settings.homepage.sections };
                                                (newSections as any)[key].imageReplace = e.target.value;
                                                setSettings({ ...settings, homepage: { ...settings.homepage, sections: newSections } });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'navigation' && (
                <div className="space-y-8 max-w-5xl">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 mb-6">
                        <strong>Note:</strong> To reorder items, please contact the developer. Currently, you can edit labels and destination pages.
                    </div>

                    {/* Header Menu */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Header Menu</h3>
                        <div className="space-y-4">
                            {settings.navigation.headerMenu.map((item, index) => (
                                <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex gap-4 mb-2">
                                        <InputField 
                                            label="Label" 
                                            value={item.label} 
                                            onChange={(e) => {
                                                const newMenu = [...settings.navigation.headerMenu];
                                                newMenu[index].label = e.target.value;
                                                setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                            }} 
                                        />
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link To</label>
                                            <select 
                                                value={item.page} 
                                                onChange={(e) => {
                                                    const newMenu = [...settings.navigation.headerMenu];
                                                    newMenu[index].page = e.target.value as any;
                                                    setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white"
                                            >
                                                <option value="home">Home</option><option value="about">About</option><option value="programs-overview">Programs</option><option value="initiatives">Initiatives</option><option value="gallery">Gallery</option><option value="media-reports">Media</option><option value="get-involved">Get Involved</option><option value="blog">Blog</option><option value="contact">Contact</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Submenu Items */}
                                    {'subItems' in item && item.subItems && (
                                        <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4 space-y-3">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Dropdown Items</p>
                                            {item.subItems.map((subItem, subIndex) => (
                                                <div key={subItem.id} className="flex gap-4">
                                                    <input 
                                                        type="text" 
                                                        value={subItem.label} 
                                                        onChange={(e) => {
                                                            const newMenu = [...settings.navigation.headerMenu];
                                                            (newMenu[index] as any).subItems[subIndex].label = e.target.value;
                                                            setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                        }}
                                                        className="flex-1 px-3 py-1 text-sm border rounded"
                                                    />
                                                    <select 
                                                        value={subItem.page} 
                                                        onChange={(e) => {
                                                            const newMenu = [...settings.navigation.headerMenu];
                                                            (newMenu[index] as any).subItems[subIndex].page = e.target.value as any;
                                                            setSettings({ ...settings, navigation: { ...settings.navigation, headerMenu: newMenu } });
                                                        }}
                                                        className="flex-1 px-3 py-1 text-sm border rounded bg-white"
                                                    >
                                                        <option value="about">About</option><option value="mission-vision">Mission</option><option value="core-values">Values</option><option value="founder-message">Founder</option><option value="governance">Governance</option><option value="sports">Sports</option><option value="education">Education</option><option value="culture">Culture</option><option value="impact-stories">Impact</option><option value="media-highlights">Media Highlights</option><option value="media-reports">Reports</option><option value="courses">Courses</option><option value="events">Events</option><option value="awards">Awards</option><option value="records">Records</option><option value="donate">Donate</option><option value="volunteer">Volunteer</option><option value="membership">Membership</option><option value="careers">Careers</option>
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Footer Links</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {['footerAboutLinks', 'footerWorkLinks', 'footerInvolvedLinks', 'footerResourceLinks', 'footerPolicyLinks'].map((sectionKey) => (
                                <div key={sectionKey} className="border rounded-lg p-4 bg-gray-50">
                                    <h4 className="font-bold text-gray-700 mb-3 capitalize">{sectionKey.replace('footer', '').replace('Links', '')} Section</h4>
                                    <div className="space-y-2">
                                        {(settings.navigation as any)[sectionKey].map((link: NavItem, i: number) => (
                                            <div key={link.id} className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    value={link.label} 
                                                    onChange={(e) => {
                                                        const newNav = { ...settings.navigation };
                                                        (newNav as any)[sectionKey][i].label = e.target.value;
                                                        setSettings({ ...settings, navigation: newNav });
                                                    }}
                                                    className="flex-1 px-2 py-1 text-sm border rounded"
                                                />
                                                <select 
                                                    value={link.page} 
                                                    onChange={(e) => {
                                                        const newNav = { ...settings.navigation };
                                                        (newNav as any)[sectionKey][i].page = e.target.value;
                                                        setSettings({ ...settings, navigation: newNav });
                                                    }}
                                                    className="flex-1 px-2 py-1 text-sm border rounded bg-white w-24"
                                                >
                                                    <option value="privacy-policy">Privacy</option><option value="terms-and-conditions">Terms</option><option value="disclaimer">Disclaimer</option><option value="copyright-policy">Copyright</option><option value="editorial-policy">Editorial</option><option value="fact-check-policy">Fact Check</option><option value="comment-policy">Comment</option><option value="ethical-use-policy">Ethical</option>
                                                    <option value="about">About</option><option value="contact">Contact</option><option value="blog">Blog</option><option value="gallery">Gallery</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'seo' && (
                <div className="space-y-8 max-w-4xl">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <GlobeAltIcon className="h-5 w-5 text-masa-blue"/> Global SEO & Social Sharing
                        </h3>
                        <div className="space-y-6">
                            <InputField label="OG Title" name="seo.ogTitle" value={settings.seo?.ogTitle} onChange={handleNestedChange} helpText="Default title for social media shares." />
                            <TextareaField label="OG Description" name="seo.ogDescription" value={settings.seo?.ogDescription} onChange={handleNestedChange} rows={3} helpText="Default description for social media shares." />
                            <InputField label="OG Image URL" name="seo.ogImage" value={settings.seo?.ogImage} onChange={handleNestedChange} helpText="Default image for social media shares (1200x630 recommended)." />
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <SelectField label="Twitter Card Type" name="seo.twitterCard" value={settings.seo?.twitterCard} onChange={handleNestedChange}>
                                    <option value="summary">Summary</option>
                                    <option value="summary_large_image">Summary with Large Image</option>
                                </SelectField>
                                <InputField label="Twitter Site Handle" name="seo.twitterSite" value={settings.seo?.twitterSite} onChange={handleNestedChange} placeholder="@username" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Search Engine Control</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">XML Sitemap</label>
                                    <p className="text-xs text-gray-500">Automatically generate sitemap.xml for search engines.</p>
                                </div>
                                <ToggleSwitch checked={settings.seo?.sitemapEnabled} onChange={val => handleSettingsChange('seo', 'sitemapEnabled', val)} />
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <label className="font-bold block mb-2">Robots.txt Editor</label>
                                <TextareaField label="" name="seo.robotsTxt" value={settings.seo?.robotsTxt} onChange={handleNestedChange} rows={5} />
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <label className="font-bold block mb-2">Global Schema Markup (JSON-LD)</label>
                                <TextareaField label="" name="seo.schemaMarkup" value={settings.seo?.schemaMarkup} onChange={handleNestedChange} rows={8} placeholder='{ "@context": "https://schema.org", "@type": "Organization", ... }' />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'scripts' && (
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Verification & Analytics</h3>
                        <p className="text-sm text-gray-500 mb-6">Connect your site to third-party services. Enter IDs or verification codes below.</p>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google Analytics</label>
                                    <InputField label="" name="scripts.googleAnalyticsId" value={settings.scripts.googleAnalyticsId} onChange={handleNestedChange} placeholder="G-XXXXXXXXXX" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableAnalytics} onChange={val => handleSettingsChange('scripts', 'enableAnalytics', val)} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google Search Console</label>
                                    <InputField label="" name="scripts.googleSearchConsole" value={settings.scripts.googleSearchConsole} onChange={handleNestedChange} placeholder="Enter verification code from meta tag" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableGoogleSearchConsole} onChange={val => handleSettingsChange('scripts', 'enableGoogleSearchConsole', val)} />
                            </div>
                             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Meta (Facebook) Pixel</label>
                                    <InputField label="" name="scripts.facebookPixelId" value={settings.scripts.facebookPixelId} onChange={handleNestedChange} placeholder="Enter your Pixel ID" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enablePixel} onChange={val => handleSettingsChange('scripts', 'enablePixel', val)} />
                            </div>
                             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Google AdSense</label>
                                    <InputField label="" name="scripts.googleAdsenseCode" value={settings.scripts.googleAdsenseCode} onChange={handleNestedChange} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                                </div>
                                <ToggleSwitch checked={settings.scripts.enableAdsense} onChange={val => handleSettingsChange('scripts', 'enableAdsense', val)} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Custom Code Injection</h3>
                        <p className="text-sm text-gray-500 mb-6">Advanced: Add custom scripts, styles, or meta tags. Use with caution.</p>
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Global Header (`&lt;head&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomHead} onChange={val => handleSettingsChange('scripts', 'enableCustomHead', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customHead" value={settings.scripts.customHead} onChange={handleNestedChange} rows={5} helpText="For meta tags, verification codes, analytics, or custom CSS."/>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Body Start (`&lt;body&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomBodyStart} onChange={val => handleSettingsChange('scripts', 'enableCustomBodyStart', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customBodyStart" value={settings.scripts.customBodyStart} onChange={handleNestedChange} rows={5} helpText="For tracking pixels or widgets that need to load immediately."/>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold">Footer (end of `&lt;body&gt;`)</label>
                                    <ToggleSwitch checked={settings.scripts.enableCustomBodyEnd} onChange={val => handleSettingsChange('scripts', 'enableCustomBodyEnd', val)} />
                                </div>
                                <TextareaField label="" name="scripts.customBodyEnd" value={settings.scripts.customBodyEnd} onChange={handleNestedChange} rows={5} helpText="For deferred scripts, live chat widgets, or other integrations."/>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'appearance' && (
                <div className="space-y-8 max-w-4xl">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Typography Control</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField 
                                label="Heading Font Size (Desktop)" 
                                value={settings.appearance.typography.headingDesktop} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, typography: { ...settings.appearance.typography, headingDesktop: e.target.value } } })} 
                                placeholder="e.g. 4.5rem"
                            />
                            <InputField 
                                label="Heading Font Size (Mobile)" 
                                value={settings.appearance.typography.headingMobile} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, typography: { ...settings.appearance.typography, headingMobile: e.target.value } } })} 
                                placeholder="e.g. 2.5rem"
                            />
                            <InputField 
                                label="Paragraph Font Size" 
                                value={settings.appearance.typography.paragraph} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, typography: { ...settings.appearance.typography, paragraph: e.target.value } } })} 
                                placeholder="e.g. 1.125rem"
                            />
                            <InputField 
                                label="Button Font Size" 
                                value={settings.appearance.typography.button} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, typography: { ...settings.appearance.typography, button: e.target.value } } })} 
                                placeholder="e.g. 1rem"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Global Button Styling</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField 
                                label="Button Padding" 
                                value={settings.appearance.buttons.padding} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, buttons: { ...settings.appearance.buttons, padding: e.target.value } } })} 
                                placeholder="e.g. 1rem 2rem"
                            />
                            <InputField 
                                label="Button Border Radius" 
                                value={settings.appearance.buttons.borderRadius} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, buttons: { ...settings.appearance.buttons, borderRadius: e.target.value } } })} 
                                placeholder="e.g. 9999px or 0.5rem"
                            />
                            <SelectField 
                                label="Default Button Alignment" 
                                value={settings.appearance.buttons.alignment} 
                                onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, buttons: { ...settings.appearance.buttons, alignment: e.target.value as any } } })}
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </SelectField>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Custom CSS</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                <div>
                                    <label className="font-bold">Enable Custom CSS</label>
                                    <p className="text-xs text-gray-500">Apply custom styles to the entire website.</p>
                                </div>
                                <ToggleSwitch checked={settings.appearance.enableCustomCss} onChange={val => handleSettingsChange('appearance', 'enableCustomCss', val)} />
                            </div>
                            {settings.appearance.enableCustomCss && (
                                <TextareaField 
                                    label="CSS Code" 
                                    name="appearance.customCss" 
                                    value={settings.appearance.customCss} 
                                    onChange={handleNestedChange} 
                                    rows={10} 
                                    placeholder="/* Add your custom CSS here */"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'roles' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Role Permissions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Role</th>
                                    {['blogs', 'comments', 'courses', 'events', 'gallery', 'forms', 'users', 'backup', 'settings', 'buttons', 'pages', 'media', 'sliders', 'navigation', 'redirects', 'donations', 'logs', 'trash'].map(v => <th key={v} className="px-6 py-3">{v}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {(['Super Admin', 'Admin / Manager', 'Editor', 'Content Creator', 'Volunteer Coordinator', 'Accountant / Finance'] as const).map(role => (
                                    <tr key={role} className="bg-white border-b">
                                        <td className="px-6 py-4 font-medium text-gray-900">{role}</td>
                                        {['blogs', 'comments', 'courses', 'events', 'gallery', 'forms', 'users', 'backup', 'settings', 'buttons', 'pages', 'media', 'sliders', 'navigation', 'redirects', 'donations', 'logs', 'trash'].map(v => (
                                            <td key={v} className="px-6 py-4">
                                                <input type="checkbox" checked={settings.rolePermissions[role]?.includes(v)} onChange={(e) => {
                                                    const newPermissions = e.target.checked 
                                                        ? [...(settings.rolePermissions[role] || []), v]
                                                        : (settings.rolePermissions[role] || []).filter(p => p !== v);
                                                    handleSettingsChange('rolePermissions', role, newPermissions);
                                                }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsModule;
