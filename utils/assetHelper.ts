
/// <reference types="vite/client" />

export const getAssetUrl = (path: string | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    // If path starts with /, remove it to make it relative to base
    // This assumes the app is served from a subdirectory or root, and assets are relative to index.html
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // import.meta.env.BASE_URL is './' as configured in vite.config.ts
    // So this returns './uploads/file.png' or './logo.svg'
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
