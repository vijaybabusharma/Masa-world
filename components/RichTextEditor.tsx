
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
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const insertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                const caption = prompt("Enter image caption (optional):");
                let html = `<img src="${data.url}" alt="${caption || ''}" style="max-width: 100%; height: auto; border-radius: 8px;" />`;
                if (caption) {
                    html = `<figure style="text-align: center; margin: 1rem 0;">${html}<figcaption style="color: #666; font-size: 0.875rem; margin-top: 0.5rem;">${caption}</figcaption></figure>`;
                }
                document.execCommand("insertHTML", false, html);
            }
        } catch (err) {
            console.error('Image upload failed', err);
            alert('Failed to upload image');
        }
        
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const insertYoutube = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt("Enter YouTube Video URL:");
        if (url) {
            const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
            if (videoId) {
                const html = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe></div><br/>`;
                document.execCommand("insertHTML", false, html);
            } else {
                alert("Invalid YouTube URL");
            }
        }
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
                    <ToolbarButton cmd="formatBlock" arg="H1" title="Heading 1" icon={<span className="font-bold text-sm">H1</span>} />
                    <ToolbarButton cmd="formatBlock" arg="H2" title="Heading 2" icon={<span className="font-bold text-sm">H2</span>} />
                    <ToolbarButton cmd="formatBlock" arg="H3" title="Heading 3" icon={<span className="font-bold text-sm">H3</span>} />
                    <ToolbarButton cmd="formatBlock" arg="P" title="Paragraph" icon={<span className="font-bold text-sm">P</span>} />
                </div>
                
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="bold" title="Bold" icon={<strong className="font-serif">B</strong>} />
                    <ToolbarButton cmd="italic" title="Italic" icon={<em className="font-serif">I</em>} />
                    <ToolbarButton cmd="underline" title="Underline" icon={<span className="underline font-serif">U</span>} />
                    <ToolbarButton cmd="hiliteColor" arg="yellow" title="Highlight" icon={<span className="bg-yellow-200 font-serif px-1">H</span>} />
                </div>

                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="justifyLeft" title="Align Left" icon={<span>⇤</span>} />
                    <ToolbarButton cmd="justifyCenter" title="Align Center" icon={<span>↔</span>} />
                    <ToolbarButton cmd="justifyRight" title="Align Right" icon={<span>⇥</span>} />
                    <ToolbarButton cmd="justifyFull" title="Justify" icon={<span>≡</span>} />
                </div>

                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-1">
                    <ToolbarButton cmd="insertUnorderedList" title="Bullet List" icon={<span>• List</span>} />
                    <ToolbarButton cmd="insertOrderedList" title="Numbered List" icon={<span>1. List</span>} />
                    <ToolbarButton cmd="formatBlock" arg="BLOCKQUOTE" title="Quote" icon={<span>“Quote”</span>} />
                </div>

                <div className="flex gap-1">
                    <button onMouseDown={insertLink} className="p-2 text-gray-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-masa-blue" title="Link" aria-label="Insert Link">🔗</button>
                    <button onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }} className="p-2 text-gray-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-masa-blue" title="Image" aria-label="Insert Image">🖼️</button>
                    <input type="file" ref={fileInputRef} onChange={insertImage} accept="image/*" className="hidden" />
                    <button onMouseDown={insertYoutube} className="p-2 text-gray-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-masa-blue" title="YouTube Video" aria-label="Insert YouTube">▶️</button>
                    <ToolbarButton cmd="removeFormat" title="Clear Formatting" icon={<span>❌</span>} />
                </div>
            </div>

            {/* Editor Area */}
            <div
                ref={contentRef}
                className="flex-grow p-6 outline-none overflow-y-auto prose max-w-none text-gray-800 min-h-[400px] editor-placeholder"
                contentEditable
                onInput={handleInput}
                data-placeholder={placeholder}
                style={{ minHeight: '400px' }} 
                role="textbox"
                aria-multiline="true"
                aria-label="Rich Text Editor"
            />
            <style>{`
                .editor-placeholder[contentEditable=true]:empty:before {
                    content: attr(data-placeholder);
                    color: #a0aec0; /* Tailwind gray-500 */
                    pointer-events: none;
                    display: block; /* or inline-block */
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
