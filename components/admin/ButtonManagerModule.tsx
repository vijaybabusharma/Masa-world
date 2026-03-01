import React, { useState } from 'react';
import { GlobalSettings } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader, InputField, SelectField, ToggleSwitch } from './AdminComponents';
import { TrashIcon } from '../icons/FeatureIcons';

const ButtonManagerModule: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>(ContentManager.getSettings());
    const [activeTab, setActiveTab] = useState<'links' | 'zones'>('links');

    const handleSave = () => {
        ContentManager.saveSettings(settings);
        alert('Button settings saved!');
    };

    const addPaymentLink = () => {
        const newLink: any = { id: `pl-${Date.now()}`, name: 'New Link', url: '', provider: 'Razorpay', active: true };
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: [...settings.buttons.paymentLinks, newLink] } });
    };

    const updatePaymentLink = (index: number, field: string, value: any) => {
        const newLinks = [...settings.buttons.paymentLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: newLinks } });
    };

    const removePaymentLink = (index: number) => {
        const newLinks = settings.buttons.paymentLinks.filter((_, i) => i !== index);
        setSettings({ ...settings, buttons: { ...settings.buttons, paymentLinks: newLinks } });
    };

    const updateZone = (zoneId: string, field: string, value: any) => {
        setSettings({
            ...settings,
            buttons: {
                ...settings.buttons,
                zones: {
                    ...settings.buttons.zones,
                    [zoneId]: { ...(settings.buttons.zones as any)[zoneId], [field]: value }
                }
            }
        });
    };

    const updateFloatingButton = (field: string, value: any) => {
        setSettings({
            ...settings,
            buttons: {
                ...settings.buttons,
                floatingButton: { ...settings.buttons.floatingButton, [field]: value }
            }
        });
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Button & Payment Manager" />
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button onClick={() => setActiveTab('links')} className={`pb-2 font-bold ${activeTab === 'links' ? 'text-masa-blue border-b-2 border-masa-blue' : 'text-gray-500'}`}>Payment Links</button>
                <button onClick={() => setActiveTab('zones')} className={`pb-2 font-bold ${activeTab === 'zones' ? 'text-masa-blue border-b-2 border-masa-blue' : 'text-gray-500'}`}>Button Placement</button>
            </div>

            {activeTab === 'links' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Payment Links</h3>
                            <button onClick={addPaymentLink} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold hover:bg-green-200">+ Add Link</button>
                        </div>
                        <div className="space-y-4">
                            {settings.buttons.paymentLinks.map((link, index) => (
                                <div key={link.id} className="p-4 bg-gray-50 rounded-lg border relative group">
                                    <button onClick={() => removePaymentLink(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><TrashIcon className="h-4 w-4"/></button>
                                    <div className="grid md:grid-cols-2 gap-4 mb-2">
                                        <InputField label="Name (Internal)" value={link.name} onChange={e => updatePaymentLink(index, 'name', e.target.value)} />
                                        <SelectField label="Provider" value={link.provider} onChange={e => updatePaymentLink(index, 'provider', e.target.value)}>
                                            <option value="Razorpay">Razorpay</option>
                                            <option value="Stripe">Stripe</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Other">Other</option>
                                        </SelectField>
                                    </div>
                                    <InputField label="Payment URL" value={link.url} onChange={e => updatePaymentLink(index, 'url', e.target.value)} placeholder="https://..." />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'zones' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-4">Button Zones</h3>
                        <div className="space-y-6">
                            {Object.entries(settings.buttons.zones).map(([key, btn]: [string, any]) => (
                                <div key={key} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-sm uppercase text-gray-500">{key.replace('_', ' ')}</span>
                                        <ToggleSwitch checked={btn.visible} onChange={val => updateZone(key, 'visible', val)} />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <InputField label="Label" value={btn.label} onChange={e => updateZone(key, 'label', e.target.value)} />
                                        <SelectField label="Action Type" value={btn.actionType} onChange={e => updateZone(key, 'actionType', e.target.value)}>
                                            <option value="link">Page Link</option>
                                            <option value="payment">Payment Link</option>
                                        </SelectField>
                                        {btn.actionType === 'payment' ? (
                                            <SelectField label="Payment Link" value={btn.target} onChange={e => updateZone(key, 'target', e.target.value)}>
                                                <option value="">Select a link...</option>
                                                {settings.buttons.paymentLinks.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                            </SelectField>
                                        ) : (
                                            <InputField label="Target URL / Page" value={btn.target} onChange={e => updateZone(key, 'target', e.target.value)} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Floating Action Button</h3>
                            <ToggleSwitch checked={settings.buttons.floatingButton.visible} onChange={val => updateFloatingButton('visible', val)} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <InputField label="Label" value={settings.buttons.floatingButton.label} onChange={e => updateFloatingButton('label', e.target.value)} />
                            <SelectField label="Position" value={settings.buttons.floatingButton.position} onChange={e => updateFloatingButton('position', e.target.value)}>
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                            </SelectField>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <SelectField label="Action Type" value={settings.buttons.floatingButton.actionType} onChange={e => updateFloatingButton('actionType', e.target.value)}>
                                <option value="link">Page Link</option>
                                <option value="payment">Payment Link</option>
                            </SelectField>
                            {settings.buttons.floatingButton.actionType === 'payment' ? (
                                <SelectField label="Payment Link" value={settings.buttons.floatingButton.target} onChange={e => updateFloatingButton('target', e.target.value)}>
                                    <option value="">Select a link...</option>
                                    {settings.buttons.paymentLinks.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </SelectField>
                            ) : (
                                <InputField label="Target URL / Page" value={settings.buttons.floatingButton.target} onChange={e => updateFloatingButton('target', e.target.value)} />
                            )}
                        </div>
                    </div>
                </div>
            )}
             <div className="flex justify-end mt-6">
                <button onClick={handleSave} className="bg-masa-blue text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-900 transition-all transform hover:scale-105">Save All Button Settings</button>
            </div>
        </div>
    );
};

export default ButtonManagerModule;
