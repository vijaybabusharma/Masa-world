import React, { useState, useEffect, useMemo } from 'react';
import { UserRole } from '../../types';
import { AuthService } from '../../utils/authService';
import { ModuleHeader, InputField } from './AdminComponents';
import { TrashIcon, PhotoIcon, VideoCameraIcon, DocumentIcon, SearchIcon, FolderIcon } from '../icons/FeatureIcons';

interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'video' | 'document';
    size: string;
    uploadedAt: string;
    uploadedBy: string;
    date: string;
}

const MediaManagerModule: React.FC = () => {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [user, setUser] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    const loadFiles = async () => {
        try {
            const res = await fetch('/api/media');
            if (res.ok) {
                const data = await res.json();
                setFiles(data);
            }
        } catch (err) {
            console.error('Failed to load media', err);
        }
    };

    useEffect(() => {
        AuthService.checkSession().then(setUser);
        loadFiles();
    }, []);

    const canDelete = (role: string) => ['Super Admin', 'Admin / Manager'].includes(role);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/media/upload', {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    await loadFiles();
                } else {
                    const err = await res.json();
                    alert(err.message || 'Upload failed');
                }
            } catch (err) {
                console.error('Upload error', err);
                alert('Upload failed');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDelete = async (filename: string) => {
        if (!canDelete(user?.role)) {
            alert('Only Admins can delete files permanently.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this file permanently?')) {
            try {
                const res = await fetch(`/api/media/${filename}`, { method: 'DELETE' });
                if (res.ok) {
                    await loadFiles();
                }
            } catch (err) {
                console.error('Delete error', err);
            }
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileType = (name: string) => {
        const ext = name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
        if (['mp4', 'webm', 'ogg'].includes(ext || '')) return 'video';
        return 'document';
    };

    const filteredFiles = useMemo(() => {
        return files.filter(file => {
            const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
            const type = getFileType(file.name);
            const matchesType = selectedType === 'all' || type === selectedType;
            return matchesSearch && matchesType;
        });
    }, [files, searchQuery, selectedType]);

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <ModuleHeader title="Media Library" />
                <label className="bg-masa-blue text-white px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-opacity-90 transition-all shadow-md">
                    {uploading ? 'Uploading...' : 'Upload Media'}
                    <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search media files..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-masa-orange"
                    />
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setSelectedType('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedType === 'all' ? 'bg-masa-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setSelectedType('image')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedType === 'image' ? 'bg-masa-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Images
                    </button>
                    <button 
                        onClick={() => setSelectedType('document')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedType === 'document' ? 'bg-masa-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Documents
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map(file => {
                    const type = getFileType(file.name);
                    return (
                        <div key={file.id} className="group relative bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                                {type === 'image' ? (
                                    <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : type === 'video' ? (
                                    <VideoCameraIcon className="h-12 w-12 text-gray-400" />
                                ) : (
                                    <DocumentIcon className="h-12 w-12 text-gray-400" />
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-bold text-gray-800 truncate" title={file.name}>{file.name}</p>
                                <p className="text-[10px] text-gray-500 mt-1">{formatSize(Number(file.size) || 0)} • {new Date(file.date).toLocaleDateString()}</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleDelete(file.id)}
                                    className="bg-red-500 text-white p-1.5 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                                    title="Delete Permanently"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2">
                                <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded shadow-sm capitalize">
                                    {type}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredFiles.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <PhotoIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No media files found.</p>
                </div>
            )}
        </div>
    );
};

export default MediaManagerModule;