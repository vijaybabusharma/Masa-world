
import React from 'react';
import { PageContent, PageSection } from '../types';
import { motion } from 'motion/react';

interface DynamicPageProps {
    content: PageContent;
    navigateTo: (page: any) => void;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ content, navigateTo }) => {
    const renderSection = (section: PageSection) => {
        if (!section.visible) return null;

        switch (section.type) {
            case 'Hero':
                return (
                    <section key={section.id} className="relative py-20 bg-masa-blue text-white overflow-hidden">
                        <div className="container mx-auto px-6 relative z-10">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-3xl"
                            >
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{section.title}</h1>
                                <p className="text-xl opacity-90 mb-8 leading-relaxed">{section.content}</p>
                            </motion.div>
                        </div>
                        {section.image && (
                            <div className="absolute inset-0 z-0 opacity-20">
                                <img src={section.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                        )}
                    </section>
                );
            case 'Text':
                return (
                    <section key={section.id} className="py-16 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto">
                                {section.title && <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>}
                                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case 'Image':
                return (
                    <section key={section.id} className="py-12 bg-gray-50">
                        <div className="container mx-auto px-6">
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img src={section.image} alt={section.title || ''} className="w-full h-auto" referrerPolicy="no-referrer" />
                            </div>
                            {section.title && <p className="mt-4 text-center text-gray-500 italic">{section.title}</p>}
                        </div>
                    </section>
                );
            case 'Features':
                return (
                    <section key={section.id} className="py-16 bg-white">
                        <div className="container mx-auto px-6">
                            {section.title && <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{section.title}</h2>}
                            <div className="grid md:grid-cols-3 gap-8">
                                {section.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                                        <h3 className="text-xl font-bold text-masa-blue mb-4">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            default:
                return (
                    <div key={section.id} className="py-10 text-center border-y border-dashed">
                        <p className="text-gray-400 italic">Section type "{section.type}" rendering not implemented yet.</p>
                    </div>
                );
        }
    };

    return (
        <div className="dynamic-page">
            {content.sections.map(renderSection)}
            {content.sections.length === 0 && (
                <div className="container mx-auto px-6 py-40 text-center">
                    <h1 className="text-4xl font-bold text-gray-300 mb-4">Empty Page</h1>
                    <p className="text-gray-400">This page has no content yet. Add sections in the admin dashboard.</p>
                </div>
            )}
        </div>
    );
};

export default DynamicPage;
