
import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const ToolbarButton: React.FC<{ 
    cmd: string; 
    arg?: string; 
    icon: React.ReactNode; 
    title: string;
}> = ({ cmd, arg, icon, title }) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent loss of focus from the editor
        document.execCommand(cmd, false, arg);
    };

    return (
        <button
            onMouseDown={handleMouseDown}
            className="p-2 text-gray-600 hover:text-masa-blue hover:bg-blue-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-masa-blue"
            title={title}
            aria-label={title}
            type="button"
        >
            {icon}
        </button>
    );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // Sync external value changes to innerHTML only if different to avoid cursor jumping
    useEffect(() => {
        if (contentRef.current && contentRef.current.innerHTML !== value) {
            if (value === '' && contentRef.current.innerHTML === '<br>') return;
            contentRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (contentRef.current) {
            onChange(contentRef.current.innerHTML);
        }
    };

    const insertImage = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt("Enter Image URL");
        if (url) document.execCommand("insertImage", false, url);
    };

    const insertLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt("Enter Link URL");
        if (url) document.execCommand("createLink", false, url);
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-full focus-within:border-masa-blue focus-within:ring-1 focus-within:ring-masa-blue transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="formatBlock" arg="H2" title="Heading 2" icon={<span className="font-bold text-sm">H2</span>} />
                    <ToolbarButton cmd="formatBlock" arg="H3" title="Heading 3" icon={<span className="font-bold text-sm">H3</span>} />
                    <ToolbarButton cmd="formatBlock" arg="P" title="Paragraph" icon={<span className="font-bold text-sm">P</span>} />
                </div>
                
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="bold" title="Bold" icon={<strong className="font-serif">B</strong>} />
                    <ToolbarButton cmd="italic" title="Italic" icon={<em className="font-serif">I</em>} />
                    <ToolbarButton cmd="underline" title="Underline" icon={<span className="underline font-serif">U</span>} />
                    <ToolbarButton cmd="strikeThrough" title="Strike" icon={<span className="line-through font-serif">S</span>} />
                </div>

                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="insertUnorderedList" title="Bullet List" icon={<span>• List</span>} />
                    <ToolbarButton cmd="insertOrderedList" title="Numbered List" icon={<span>1. List</span>} />
                    <ToolbarButton cmd="formatBlock" arg="BLOCKQUOTE" title="Quote" icon={<span>“Quote”</span>} />
                </div>

                <div className="flex gap-1">
                    <button onMouseDown={insertLink} className="p-2 text-gray-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-masa-blue" title="Link" aria-label="Insert Link">🔗</button>
                    <button onMouseDown={insertImage} className="p-2 text-gray-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-masa-blue" title="Image" aria-label="Insert Image">🖼️</button>
                    <ToolbarButton cmd="removeFormat" title="Clear Formatting" icon={<span>❌</span>} />
                </div>
            </div>

            {/* Editor Area */}
            <div
                ref={contentRef}
                className="flex-grow p-6 outline-none overflow-y-auto prose max-w-none text-gray-800 min-h-[400px]"
                contentEditable
                onInput={handleInput}
                placeholder={placeholder}
                style={{ minHeight: '400px' }} 
                role="textbox"
                aria-multiline="true"
                aria-label="Rich Text Editor"
            />
        </div>
    );
};
