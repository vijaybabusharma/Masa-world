
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/UiIcons';
import { SparklesIcon } from './icons/FeatureIcons';
import { GoogleGenAI } from "@google/genai";

interface AiImageGeneratorModalProps {
  onClose: () => void;
  onSubmitToGallery: (base64Data: string) => void;
}

const AiImageGeneratorModal: React.FC<AiImageGeneratorModalProps> = ({ onClose, onSubmitToGallery }) => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: {
                    imageConfig: { aspectRatio },
                },
            });

            let imageFound = false;
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setGeneratedImage(part.inlineData.data);
                    imageFound = true;
                    break;
                }
            }
            if (!imageFound) {
                throw new Error("No image was generated. The prompt might have been blocked.");
            }
        } catch (e) {
            console.error(e);
            setError('Failed to generate image. This may be due to a safety policy violation or network issue. Please try a different prompt.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10">
                    <XIcon className="h-6 w-6" />
                </button>
                <div className="p-8">
                    <div className="text-center mb-6">
                        <SparklesIcon className="h-10 w-10 mx-auto text-masa-orange mb-2" />
                        <h3 className="text-2xl font-bold">Generate Image with AI</h3>
                        <p className="text-gray-500">Describe the image you want to create.</p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-masa-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 font-semibold text-gray-700">Generating your vision...</p>
                        </div>
                    ) : generatedImage ? (
                        <div className="text-center">
                            <img src={`data:image/png;base64,${generatedImage}`} alt="AI generated" className="rounded-lg shadow-md mb-6 mx-auto max-h-80" />
                             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={handleGenerate} className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                    Regenerate
                                </button>
                                <button onClick={() => onSubmitToGallery(generatedImage)} className="flex-1 bg-masa-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors">
                                    Submit to Gallery
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-4">
                            <div>
                                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                                <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="mt-1 block w-full input-field" placeholder="e.g., A group of children planting trees in a sunny field"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {['1:1', '16:9', '9:16'].map(ratio => (
                                        <button key={ratio} type="button" onClick={() => setAspectRatio(ratio)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${aspectRatio === ratio ? 'bg-masa-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                            {ratio}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="w-full bg-masa-orange text-white py-3 px-4 rounded-md font-semibold transition-colors hover:bg-orange-600">
                                Generate Image
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {/* FIX: Replaced non-standard 'jsx' style tag with a standard style tag. */}
            <style>{`
                .input-field { border: 1px solid #D1D5DB; border-radius: 0.375rem; padding: 0.5rem 0.75rem; }
                .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-color: #F97316; border-color: var(--tw-ring-color); }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default AiImageGeneratorModal;
