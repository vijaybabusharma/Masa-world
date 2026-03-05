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
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl mb-1 ${
            isActive 
                ? 'bg-masa-orange text-white shadow-[0_4px_20px_rgba(249,115,22,0.3)] translate-x-1' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        {label}
    </button>
);

export const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string, helpText?: string }> = ({ label, helpText, ...props }) => (
    <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input 
            {...props} 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-masa-orange focus:ring-4 focus:ring-masa-orange/10 outline-none transition-all duration-300 bg-white text-sm font-medium" 
        />
        {helpText && <p className="text-[10px] text-gray-400 font-medium italic ml-1">{helpText}</p>}
    </div>
);

export const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, helpText?: string }> = ({ label, helpText, ...props }) => (
    <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <textarea 
            {...props} 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-masa-orange focus:ring-4 focus:ring-masa-orange/10 outline-none transition-all duration-300 bg-white text-sm font-medium min-h-[120px]" 
        />
        {helpText && <p className="text-[10px] text-gray-400 font-medium italic ml-1">{helpText}</p>}
    </div>
);

export const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode, helpText?: string }> = ({ label, children, helpText, ...props }) => (
    <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <div className="relative">
            <select 
                {...props} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-masa-orange focus:ring-4 focus:ring-masa-orange/10 outline-none transition-all duration-300 bg-white text-sm font-medium appearance-none cursor-pointer pr-10"
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
        {helpText && <p className="text-[10px] text-gray-400 font-medium italic ml-1">{helpText}</p>}
    </div>
);

export const ModuleHeader: React.FC<{ title: string, onAction?: () => void, actionLabel?: string }> = ({ title, onAction, actionLabel }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">{title}</h1>
            <div className="h-1 w-12 bg-masa-orange mt-2 rounded-full"></div>
        </div>
        {onAction && actionLabel && (
            <button 
                onClick={onAction} 
                className="bg-masa-orange text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-masa-orange/20 hover:bg-orange-600 hover:-translate-y-0.5 transition-all active:scale-95"
            >
                <PlusIcon className="h-4 w-4"/> {actionLabel}
            </button>
        )}
    </div>
);
