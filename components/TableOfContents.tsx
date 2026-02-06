
import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from './icons/UiIcons';

interface TocHeading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TocHeading[];
    activeId: string | null;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, activeId, isCollapsed, onToggleCollapse }) => {
    return (
        <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden lg:block animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-masa-charcoal">On this page</h3>
                <button onClick={onToggleCollapse} className="text-gray-500 hover:text-masa-blue p-1 rounded-full hover:bg-gray-100">
                    {isCollapsed ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
                </button>
            </div>
            {!isCollapsed && (
                <nav>
                    <ul className="space-y-2 border-l-2 border-gray-100 max-h-80 overflow-y-auto pr-2">
                        {headings.map(heading => (
                            <li key={heading.id}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`block border-l-2 py-1 transition-all duration-200 text-sm ${
                                        heading.level === 3 ? 'pl-8' : 'pl-4'
                                    } ${
                                        activeId === heading.id
                                            ? 'border-masa-orange text-masa-orange font-bold'
                                            : 'border-transparent text-gray-500 hover:text-masa-charcoal hover:border-gray-300'
                                    }`}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </aside>
    );
};

export default TableOfContents;
