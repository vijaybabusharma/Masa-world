import React from 'react';
import { PlusIcon } from '../icons/FeatureIcons';

export const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
        type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`${checked ? 'bg-masa-blue' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-masa-orange focus:ring-offset-2`}
    >
        <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
    </button>
);

export const SidebarItem: React.FC<{ id: string; label: string; icon: any; isActive: boolean; onClick: () => void }> = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
            isActive ? 'bg-masa-blue text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
    >
        <Icon className="h-5 w-5" />
        {label}
    </button>
);

export const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <input {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none" />
    </div>
);

export const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, helpText?: string }> = ({ label, helpText, ...props }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <textarea {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none font-mono text-sm" />
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
);

export const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, children, ...props }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
        <select {...props} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-blue outline-none bg-white">
            {children}
        </select>
    </div>
);

export const ModuleHeader: React.FC<{ title: string, onAction?: () => void, actionLabel?: string }> = ({ title, onAction, actionLabel }) => (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {onAction && actionLabel && (
            <button onClick={onAction} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-green-700 transition-colors"><PlusIcon className="h-4 w-4"/> {actionLabel}</button>
        )}
    </div>
);
