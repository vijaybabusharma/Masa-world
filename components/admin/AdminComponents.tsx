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
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-all duration-300 rounded-xl mb-1.5 group relative overflow-hidden ${
            isActive 
                ? 'bg-gradient-to-r from-masa-orange to-orange-600 text-white shadow-lg shadow-orange-500/30 translate-x-1' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
        }`}
    >
        {isActive && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
        <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 text-gray-500 group-hover:text-masa-orange'}`} />
        <span className="relative z-10 tracking-wide">{label}</span>
        {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-fade-in-up">
        <div className="relative">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 uppercase leading-none">{title}</h1>
            <div className="h-1.5 w-16 bg-gradient-to-r from-masa-orange to-masa-blue mt-3 rounded-full"></div>
        </div>
        {onAction && actionLabel && (
            <button 
                onClick={onAction} 
                className="group relative bg-masa-orange text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <PlusIcon className="h-4 w-4 transition-transform group-hover:rotate-90"/> 
                <span className="relative z-10">{actionLabel}</span>
            </button>
        )}
    </div>
);
