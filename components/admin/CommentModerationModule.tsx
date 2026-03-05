import React, { useState, useEffect } from 'react';
import { Comment } from '../../types';
import { ContentManager } from '../../utils/contentManager';
import { ModuleHeader } from './AdminComponents';
import { TrashIcon, CheckCircleIcon, XCircleIcon, ChatBubbleLeftIcon } from '../icons/FeatureIcons';

const CommentModerationModule: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Comment['status'] | 'All'>('All');

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        setLoading(true);
        const data = await ContentManager.getComments();
        setComments(data);
        setLoading(false);
    };

    const handleStatusUpdate = async (id: string, status: Comment['status']) => {
        await ContentManager.updateCommentStatus(id, status);
        loadComments();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Permanently delete this comment?')) {
            await ContentManager.deleteComment(id);
            loadComments();
        }
    };

    const filteredComments = filter === 'All' ? comments : comments.filter(c => c.status === filter);

    return (
        <div className="animate-fade-in-up space-y-6">
            <ModuleHeader title="Comment Moderation" />

            <div className="flex gap-4 border-b">
                {['All', 'Pending', 'Approved', 'Spam', 'Trash'].map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilter(s as any)}
                        className={`pb-2 px-4 font-bold transition-colors ${filter === s ? 'border-b-2 border-masa-blue text-masa-blue' : 'text-gray-500'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="divide-y">
                    {filteredComments.map(comment => (
                        <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-masa-blue/10 flex items-center justify-center text-masa-blue font-bold">
                                        {comment.authorName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{comment.authorName}</div>
                                        <div className="text-xs text-gray-500">{comment.authorEmail} • {new Date(comment.timestamp).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {comment.status !== 'Approved' && (
                                        <button 
                                            onClick={() => handleStatusUpdate(comment.id, 'Approved')}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                                            title="Approve"
                                        >
                                            <CheckCircleIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                    {comment.status !== 'Spam' && (
                                        <button 
                                            onClick={() => handleStatusUpdate(comment.id, 'Spam')}
                                            className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                                            title="Mark as Spam"
                                        >
                                            <XCircleIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(comment.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        title="Delete Permanently"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border text-gray-700 text-sm italic">
                                "{comment.content}"
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                    comment.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                    comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {comment.status}
                                </span>
                                <div className="text-[10px] text-gray-400">Post ID: {comment.postId}</div>
                            </div>
                        </div>
                    ))}
                    {filteredComments.length === 0 && !loading && (
                        <div className="p-12 text-center text-gray-500">
                            <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p className="italic">No comments found in this category.</p>
                        </div>
                    )}
                    {loading && (
                        <div className="p-12 text-center text-gray-500 italic">Loading comments...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentModerationModule;
