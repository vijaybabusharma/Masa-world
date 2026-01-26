
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NavigationProps } from '../types';
import { GoogleGenAI, Modality } from '@google/genai';
import { 
    SparklesIcon, LightBulbIcon, CameraIcon, MicrophoneIcon, DocumentTextIcon, 
    GlobeIcon, UsersIcon, LaptopIcon, ArrowRightIcon, BriefcaseIcon, TrophyIcon, 
    HeartIcon, ShieldCheckIcon, PresentationChartBarIcon, CalendarDaysIcon, 
    CreditCardIcon, BellIcon, DocumentCheckIcon, HandshakeIcon, SearchIcon, 
    AcademicCapIcon, NewspaperIcon, SignalIcon, CheckIcon, EnvelopeIcon, ClockIcon
} from '../components/icons/FeatureIcons';
import { ChevronDownIcon, ChevronUpIcon } from '../components/icons/UiIcons';

// --- Types & Data Structure ---

type CategoryKey = 
    | 'Documentation' | 'Grants & Funding' | 'Reports & Compliance' 
    | 'Certificates & Receipts' | 'Forms & Data' | 'Content & Social' 
    | 'Translation' | 'Admin & HR' | 'Strategy & Insights' | 'Creative & Media';

interface ToolDef {
    id: string;
    name: string;
    icon: any;
    desc: string;
    instruction: string; // System instruction for the AI
    model?: string; // Override default model if needed
    isNew?: boolean;
    isPopular?: boolean;
}

const TOOL_CATEGORIES: Record<CategoryKey, ToolDef[]> = {
    'Documentation': [
        { id: 'doc_summarizer', name: 'Document Summarizer', icon: DocumentTextIcon, desc: 'Summarize long PDFs and reports instantly.', instruction: "You are an expert analyst. Summarize the provided document into key points, actionable insights, and executive summaries.", isPopular: true },
        { id: 'doc_ocr', name: 'OCR & Digitizer', icon: CameraIcon, desc: 'Extract text from scanned images/PDFs.', instruction: "Extract all readable text from the provided image or document. Format it cleanly as markdown." },
        { id: 'doc_formatter', name: 'Document Formatter', icon: DocumentCheckIcon, desc: 'Fix formatting and grammar.', instruction: "Proofread and format the provided text. Fix grammar, improve flow, and ensure professional formatting without changing the meaning." },
    ],
    'Grants & Funding': [
        { id: 'proposal', name: 'Proposal Generator', icon: BriefcaseIcon, desc: 'Draft comprehensive project proposals.', instruction: "You are an expert grant writer. Draft a detailed funding proposal including Executive Summary, Objectives, Methodology, Budget Narrative, and Impact Metrics.", isPopular: true },
        { id: 'grant_letter', name: 'Grant Cover Letter', icon: DocumentTextIcon, desc: 'Persuasive cover letters for applications.', instruction: "Write a persuasive cover letter for a grant application. Tone should be professional, passionate, and concise." },
        { id: 'donor_email', name: 'Donor Outreach', icon: HeartIcon, desc: 'Personalized emails for potential donors.', instruction: "Draft a warm, personalized email to a potential donor. Focus on impact, storytelling, and a clear call to action." },
        { id: 'budget_planner', name: 'Budget Narrative', icon: CreditCardIcon, desc: 'Explain financial needs clearly.', instruction: "Create a detailed budget narrative explaining line items for a project. Justify expenses clearly to a donor." },
        { id: 'crowdfunding', name: 'Crowdfunding Pitch', icon: UsersIcon, desc: 'Compelling story for online campaigns.', instruction: "Write a compelling crowdfunding campaign story. Use emotional hooks, clear goals, and urgency." },
    ],
    'Reports & Compliance': [
        { id: 'impact_report', name: 'Impact Report Builder', icon: PresentationChartBarIcon, desc: 'Turn data into impact stories.', instruction: "Create an Impact Report based on the provided data. Highlight key metrics, success stories, and future goals.", isPopular: true },
        { id: 'annual_report', name: 'Annual Report Drafter', icon: DocumentTextIcon, desc: 'Structure your yearly summary.', instruction: "Outline and draft sections for an NGO Annual Report. Focus on transparency, achievements, and financial overview." },
        { id: 'csr_report', name: 'CSR Compliance Report', icon: ShieldCheckIcon, desc: 'Format reports for corporate partners.', instruction: "Draft a CSR report for a corporate sponsor. Focus on alignment with their CSR goals, fund utilization, and beneficiary impact." },
        { id: 'policy_draft', name: 'Policy Architect', icon: ShieldCheckIcon, desc: 'Draft HR and operational policies.', instruction: "Draft a formal operational policy (e.g., HR, Child Protection, POSH) for an NGO. Ensure language is compliant and clear." },
    ],
    'Certificates & Receipts': [
        { id: 'certificate', name: 'Certificate Designer', icon: TrophyIcon, desc: 'Generate text/layout for certificates.', instruction: "Design the text layout for a certificate of appreciation/participation. Suggest fonts and placement.", model: 'gemini-3-pro-image-preview' },
        { id: 'receipt_gen', name: 'Donation Receipt', icon: CreditCardIcon, desc: 'Generate compliant donation receipts.', instruction: "Generate a formal donation receipt template including 80G/Tax exemption clauses, donor details, and gratitude." },
        { id: 'thank_you', name: 'Gratitude Generator', icon: HeartIcon, desc: 'Heartfelt thank you notes.', instruction: "Write a heartfelt thank you note to a volunteer, donor, or partner. Make it specific and warm." },
    ],
    'Forms & Data': [
        { id: 'form_builder', name: 'Form Builder', icon: DocumentCheckIcon, desc: 'Create survey/registration questions.', instruction: "Design a structured form or survey. List the questions, field types, and logical flow." },
        { id: 'data_clean', name: 'Data Cleaner', icon: SignalIcon, desc: 'Format and organize messy text data.', instruction: "Organize the provided messy text data into a clean, structured table or JSON format." },
        { id: 'survey_analysis', name: 'Survey Analyzer', icon: SearchIcon, desc: 'Extract insights from feedback.', instruction: "Analyze the provided survey responses. Identify common themes, sentiment, and actionable recommendations." },
    ],
    'Content & Social': [
        { id: 'social_post', name: 'Social Media Post', icon: BellIcon, desc: 'Captions & hashtags for engagement.', instruction: "Write engaging social media captions (Instagram/LinkedIn/Twitter) for an NGO post. Include relevant hashtags.", isPopular: true },
        { id: 'blog_writer', name: 'Blog Writer', icon: NewspaperIcon, desc: 'Articles about your cause.', instruction: "Write a comprehensive blog post about a social cause. Use engaging headings and an SEO-friendly structure." },
        { id: 'content_calendar', name: 'Content Calendar', icon: CalendarDaysIcon, desc: 'Plan a month of posts.', instruction: "Create a 4-week social media content calendar for an NGO. Suggest themes, post types, and captions." },
        { id: 'newsletter', name: 'Newsletter Creator', icon: EnvelopeIcon, desc: 'Weekly/Monthly community updates.', instruction: "Draft an engaging email newsletter. Include a catchy subject line, updates, spotlight story, and CTA." },
        { id: 'script_writer', name: 'Video Script Writer', icon: MicrophoneIcon, desc: 'Scripts for reels and impact videos.', instruction: "Write a script for a 60-second impact video or reel. Include visual cues and voiceover text." },
    ],
    'Translation': [
        { 
            id: 'universal_translator', 
            name: 'Universal Translator', 
            icon: GlobeIcon, 
            desc: 'English <-> Hindi & Regional languages.', 
            instruction: "You are a professional translator for the social impact sector. Translate the provided text accurately between English and Hindi, or into any requested Indian regional language (Tamil, Telugu, Marathi, Bengali, etc.). \n\nGuidelines:\n1. Maintain the emotional tone, dignity, and context of the original text.\n2. If the user does not specify a target language, detect the language and translate: Hindi -> English, English -> Hindi.\n3. Ensure terms related to NGOs, development, and government schemes are translated accurately.\n4. Output ONLY the translation unless asked for notes.",
            isNew: true,
            isPopular: true
        },
    ],
    'Admin & HR': [
        { id: 'job_desc', name: 'Job Description', icon: UsersIcon, desc: 'Draft roles for staff/volunteers.', instruction: "Draft a clear and appealing job description for an NGO role (volunteer or staff). Include responsibilities and required skills." },
        { id: 'interview_qs', name: 'Interview Questions', icon: UsersIcon, desc: 'Screen candidates effectively.', instruction: "Generate a list of interview questions for a potential candidate. Focus on skills, values, and cultural fit." },
        { id: 'meeting_minutes', name: 'Meeting Minutes', icon: ClockIcon, desc: 'Summarize team discussions.', instruction: "Convert rough meeting notes into formal Meeting Minutes with action items and owners." },
        { id: 'email_drafter', name: 'Formal Emailer', icon: EnvelopeIcon, desc: 'Professional correspondence.', instruction: "Draft a formal professional email for a specific situation (e.g., partnership inquiry, government request)." },
    ],
    'Strategy & Insights': [
        { id: 'strategy', name: 'Strategic Planner', icon: LightBulbIcon, desc: 'Deep dive into complex problems.', instruction: "You are a senior strategist. Analyze the problem and provide a strategic roadmap with phases, risks, and mitigation.", model: 'gemini-3-pro-preview', isNew: true },
        { id: 'swot', name: 'SWOT Analysis', icon: PresentationChartBarIcon, desc: 'Strengths, Weaknesses, Ops, Threats.', instruction: "Perform a SWOT analysis for the specific project or organization described." },
        { id: 'research', name: 'Research Hub', icon: SearchIcon, desc: 'Live data via Google Search.', instruction: "Research the topic using Google Search. Provide up-to-date facts, statistics, and sources.", model: 'gemini-3-flash-preview' },
    ],
    'Creative & Media': [
        { id: 'visual', name: 'Visual Studio', icon: CameraIcon, desc: 'Generate campaign images.', instruction: "Generate a high-quality image based on the prompt.", model: 'gemini-2.5-flash-image' },
        { id: 'video', name: 'Video Animator', icon: LaptopIcon, desc: 'Create video stories.', instruction: "Generate a video based on the prompt.", model: 'veo-3.1-fast-generate-preview', isNew: true },
        { id: 'transcribe', name: 'Audio Transcriber', icon: MicrophoneIcon, desc: 'Transcribe meetings/interviews.', instruction: "Transcribe the audio file accurately.", model: 'gemini-3-flash-preview' },
    ]
};

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-masa-charcoal py-16 text-white text-center border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/20">
                <SparklesIcon className="h-5 w-5 text-masa-orange mr-2" />
                <span className="font-bold text-sm">AI Utility Hub</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto font-light">{subtitle}</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheckIcon className="h-4 w-4" /> Built for NGOs • Data not stored • Secure
            </div>
        </div>
    </div>
);

interface Message {
    role: 'user' | 'model';
    content: string;
    image?: string;
    video?: string;
    audio?: string;
    isThinking?: boolean;
    fileName?: string;
}

const NgoHelpDeskPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [activeToolId, setActiveToolId] = useState<string>('proposal');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        'Documentation': true,
        'Grants & Funding': true,
        'Creative & Media': true // Default open interesting ones
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile toggle for sidebar
    
    // Chat & Logic State
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Derived Data
    const activeToolDef = useMemo(() => {
        for (const cat in TOOL_CATEGORIES) {
            const tool = TOOL_CATEGORIES[cat as CategoryKey].find(t => t.id === activeToolId);
            if (tool) return tool;
        }
        return TOOL_CATEGORIES['Grants & Funding'][0];
    }, [activeToolId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setSelectedFilePreview(reader.result as string);
                reader.readAsDataURL(file);
            } else {
                setSelectedFilePreview(null);
            }
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    };

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev => ({...prev, [cat]: !prev[cat]}));
    };

    const handleToolSelect = (toolId: string) => {
        setActiveToolId(toolId);
        setMessages([]);
        setIsMobileMenuOpen(false); // Close menu on mobile after selection
    };

    const handleSendMessage = async () => {
        if (!input.trim() && !selectedFile) return;

        const userMessage: Message = { 
            role: 'user', 
            content: input,
            image: selectedFilePreview || undefined,
            fileName: selectedFile?.name
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        const currentFile = selectedFile;
        setSelectedFile(null);
        setSelectedFilePreview(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            let responseText = '';
            let responseImage = '';
            let responseVideo = '';

            // 1. Image Generation Logic
            if (activeToolDef.id === 'visual' || activeToolDef.id === 'certificate') {
                const model = activeToolDef.model || 'gemini-2.5-flash-image';
                const prompt = activeToolDef.id === 'certificate' ? `Create a certificate design: ${userMessage.content}` : userMessage.content;
                
                if (currentFile) {
                    const base64Data = await fileToBase64(currentFile);
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash-image', // Edit mode
                        contents: {
                            parts: [
                                { inlineData: { mimeType: currentFile.type, data: base64Data } },
                                { text: prompt || "Edit this image" }
                            ]
                        }
                    });
                    for (const part of response.candidates?.[0]?.content?.parts || []) {
                        if (part.inlineData) responseImage = `data:image/png;base64,${part.inlineData.data}`;
                        else if (part.text) responseText += part.text;
                    }
                } else {
                    const response = await ai.models.generateContent({
                        model: model,
                        contents: { parts: [{ text: prompt }] },
                        config: { imageConfig: { aspectRatio: aspectRatio, imageSize: "1K" } }
                    });
                    for (const part of response.candidates?.[0]?.content?.parts || []) {
                        if (part.inlineData) responseImage = `data:image/png;base64,${part.inlineData.data}`;
                        else if (part.text) responseText += part.text;
                    }
                }
                if (!responseText && responseImage) responseText = "Image generated successfully.";
            }
            // 2. Video Generation Logic
            else if (activeToolDef.id === 'video') {
                const model = 'veo-3.1-fast-generate-preview';
                setMessages(prev => [...prev, { role: 'model', content: "Generating video... this may take 1-2 minutes.", isThinking: true }]);
                let operation;
                if (currentFile) {
                    const base64Data = await fileToBase64(currentFile);
                    operation = await ai.models.generateVideos({
                        model, prompt: userMessage.content || "Animate this",
                        image: { imageBytes: base64Data, mimeType: currentFile.type },
                        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
                    });
                } else {
                    operation = await ai.models.generateVideos({
                        model, prompt: userMessage.content,
                        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
                    });
                }
                while (!operation.done) {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    operation = await ai.operations.getVideosOperation({operation: operation});
                }
                setMessages(prev => prev.filter(m => !m.isThinking));
                const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
                if (videoUri) {
                    responseText = "Video generation complete.";
                    responseVideo = `${videoUri}&key=${process.env.API_KEY}`;
                } else {
                    responseText = "Video generation failed.";
                }
            }
            // 3. Audio Transcription
            else if (activeToolDef.id === 'transcribe') {
                if (currentFile) {
                    const base64Data = await fileToBase64(currentFile);
                    const response = await ai.models.generateContent({
                        model: 'gemini-3-flash-preview',
                        contents: {
                            parts: [
                                { inlineData: { mimeType: currentFile.type, data: base64Data } },
                                { text: "Transcribe this audio file verbatim." }
                            ]
                        }
                    });
                    responseText = response.text || "Transcription failed.";
                } else {
                    responseText = "Please upload an audio file to transcribe.";
                }
            }
            // 4. Research (Grounding)
            else if (activeToolDef.id === 'research') {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: userMessage.content,
                    config: { tools: [{ googleSearch: {} }] }
                });
                responseText = response.text || "No results found.";
                const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (chunks) {
                    responseText += "\n\n**Sources:**\n";
                    chunks.forEach((c: any) => { if (c.web) responseText += `- [${c.web.title}](${c.web.uri})\n`; });
                }
            }
            // 5. Strategy (Thinking)
            else if (activeToolDef.id === 'strategy') {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-pro-preview',
                    contents: userMessage.content,
                    config: {
                        thinkingConfig: { thinkingBudget: 16000 },
                        systemInstruction: activeToolDef.instruction
                    }
                });
                responseText = response.text || "Strategy generated.";
            }
            // 6. Default Text/File Processing (35+ tools)
            else {
                const model = activeToolDef.model || 'gemini-3-pro-preview';
                const parts: any[] = [];
                if (currentFile) {
                    const base64Data = await fileToBase64(currentFile);
                    parts.push({ inlineData: { mimeType: currentFile.type, data: base64Data } });
                }
                parts.push({ text: userMessage.content || `Perform the task: ${activeToolDef.instruction}` });

                const response = await ai.models.generateContent({
                    model,
                    contents: { parts },
                    config: { systemInstruction: activeToolDef.instruction }
                });
                responseText = response.text || "Task completed.";
            }

            setMessages(prev => [...prev, { 
                role: 'model', 
                content: responseText, 
                image: responseImage,
                video: responseVideo
            }]);

        } catch (error: any) {
            console.error(error);
            setMessages(prev => prev.filter(m => !m.isThinking));
            setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message || "Something went wrong. Please try again."}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <PageHeader title="NGO Help Desk" subtitle="A complete suite of 40+ AI tools to streamline operations, funding, and impact." />
            
            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row h-[85vh] min-h-[600px] relative">
                    
                    {/* MOBILE TOGGLE BUTTON */}
                    <button 
                        className="lg:hidden absolute top-4 right-4 z-20 p-2 bg-white rounded-md shadow-md border text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
                    </button>

                    {/* LEFT SIDEBAR: Tools Navigation */}
                    <div className={`
                        lg:w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full 
                        absolute lg:relative z-10 w-full lg:translate-x-0 transition-transform duration-300
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}>
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex justify-between items-center">
                            <div className="relative flex-grow mr-2">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search 40+ NGO tools..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-masa-orange outline-none text-sm"
                                />
                            </div>
                            {/* Close button on mobile */}
                            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-gray-500 hover:text-red-500">
                                <ChevronUpIcon className="h-5 w-5 rotate-90" />
                            </button>
                        </div>

                        {/* Tools List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-white lg:bg-transparent">
                            {Object.entries(TOOL_CATEGORIES).map(([catName, tools]) => {
                                const filteredTools = tools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()));
                                if (filteredTools.length === 0) return null;

                                const isExpanded = expandedCategories[catName] || searchQuery.length > 0;

                                return (
                                    <div key={catName} className="mb-2">
                                        <button 
                                            onClick={() => toggleCategory(catName)}
                                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-100 rounded-md"
                                        >
                                            {catName}
                                            {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                        </button>
                                        
                                        {isExpanded && (
                                            <div className="mt-1 space-y-1 pl-1">
                                                {filteredTools.map(tool => (
                                                    <button
                                                        key={tool.id}
                                                        onClick={() => handleToolSelect(tool.id)}
                                                        className={`w-full flex items-start p-2 rounded-lg transition-all text-left group ${activeToolId === tool.id ? 'bg-masa-blue text-white shadow-md' : 'hover:bg-white hover:shadow-sm text-gray-700'}`}
                                                    >
                                                        <div className={`p-1.5 rounded-md mr-3 mt-0.5 flex-shrink-0 ${activeToolId === tool.id ? 'bg-white/20' : 'bg-gray-200 group-hover:bg-blue-50'}`}>
                                                            <tool.icon className="h-4 w-4" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-sm truncate flex items-center">
                                                                {tool.name}
                                                                {tool.isNew && <span className="ml-2 px-1.5 py-0.5 bg-green-500 text-white text-[9px] rounded-full">NEW</span>}
                                                                {tool.isPopular && <span className="ml-2 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] rounded-full">HOT</span>}
                                                            </div>
                                                            <div className={`text-xs truncate ${activeToolId === tool.id ? 'text-blue-100' : 'text-gray-500'}`}>{tool.desc}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT WORKSPACE: Chat Interface */}
                    <div id="workspace" className="flex-1 flex flex-col bg-white relative w-full">
                        
                        {/* Tool Header */}
                        <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center gap-3 md:gap-4 pr-8">
                                <div className="p-2 bg-blue-50 rounded-lg text-masa-blue">
                                    <activeToolDef.icon className="h-6 w-6" />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-base md:text-lg font-bold text-gray-900 truncate">{activeToolDef.name}</h2>
                                    <p className="text-xs md:text-sm text-gray-500 truncate">{activeToolDef.desc}</p>
                                </div>
                            </div>
                            <div className="hidden sm:block text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border">
                                Model: {activeToolDef.model ? 'Specialized' : 'Gemini 3.0 Pro'}
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 opacity-60 px-4">
                                    <activeToolDef.icon className="h-12 w-12 md:h-16 md:w-16 mb-4 text-gray-300" />
                                    <p className="text-lg font-medium text-gray-600">Start using {activeToolDef.name}</p>
                                    <p className="text-sm max-w-sm mx-auto mt-2">Type your details below or upload a file to begin.</p>
                                </div>
                            )}
                            
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-masa-blue text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                                        {msg.fileName && (
                                            <div className="text-xs opacity-75 mb-2 flex items-center gap-1 bg-black/10 p-1 rounded w-fit">
                                                <BriefcaseIcon className="h-3 w-3" /> Attached: {msg.fileName}
                                            </div>
                                        )}
                                        {msg.image && msg.role === 'user' && (
                                            <img src={msg.image} alt="User upload" className="mb-2 rounded-lg max-h-48 border border-white/20" />
                                        )}
                                        {msg.image && msg.role === 'model' && (
                                            <img src={msg.image} alt="Generated" className="mb-2 rounded-lg w-full border border-gray-200" />
                                        )}
                                        {msg.video && (
                                            <div className="mb-2">
                                                <p className="text-xs font-bold mb-1">Video Generated:</p>
                                                <a href={msg.video} target="_blank" rel="noopener noreferrer" className="block bg-black/10 p-2 rounded text-blue-600 hover:underline text-sm truncate">
                                                    Download / View Video
                                                </a>
                                            </div>
                                        )}
                                        {msg.isThinking ? (
                                            <div className="flex items-center gap-2 text-sm italic text-gray-500">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                                Analyzing...
                                            </div>
                                        ) : (
                                            <div className="prose prose-sm max-w-none text-inherit">
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            {/* Toolbar */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <label className="cursor-pointer flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-masa-blue bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 transition-colors">
                                    <DocumentTextIcon className="h-4 w-4" />
                                    {selectedFile ? `File: ${selectedFile.name}` : "Upload File (Img/PDF/Audio)"}
                                    <input type="file" accept="image/*,application/pdf,audio/*,text/plain" onChange={handleFileChange} className="hidden" />
                                </label>
                                
                                {(activeToolDef.id === 'visual' || activeToolDef.id === 'video' || activeToolDef.id === 'certificate') && (
                                    <select 
                                        value={aspectRatio} 
                                        onChange={(e) => setAspectRatio(e.target.value)}
                                        className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 outline-none"
                                    >
                                        <option value="1:1">1:1 (Square)</option>
                                        <option value="16:9">16:9 (Landscape)</option>
                                        <option value="9:16">9:16 (Portrait)</option>
                                    </select>
                                )}
                            </div>

                            <div className="relative">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                                    placeholder={`Enter instructions for ${activeToolDef.name}...`}
                                    className="w-full pl-4 pr-14 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-masa-orange focus:border-transparent outline-none resize-none h-14 bg-gray-50 focus:bg-white transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || (!input.trim() && !selectedFile)}
                                    className="absolute right-2 top-2 bg-masa-charcoal text-white p-2.5 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 transition-colors shadow-sm"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <ArrowRightIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 text-center">
                                AI can make mistakes. Please verify important information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
            `}</style>
        </div>
    );
};

export default NgoHelpDeskPage;
