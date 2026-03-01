import React from 'react';
import { ModuleHeader } from './AdminComponents';

const BackupRestoreModule: React.FC = () => {
    const handleBackup = () => {
        // In a real app, this should fetch data from the server API
        // For now, we'll backup localStorage as a fallback/demo
        const data: Record<string, any> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                data[key] = localStorage.getItem(key);
            }
        }
        
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `masa_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (!window.confirm("Are you sure? This will overwrite all current website data.")) return;
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const data = JSON.parse(text);
                    
                    // In a real app, we would send this data to the server API to restore
                    // For now, we restore to localStorage
                    Object.keys(data).forEach(key => {
                        if (typeof data[key] === 'string') {
                            localStorage.setItem(key, data[key]);
                        }
                    });
                    
                    alert('Restore successful! The page will now reload.');
                    window.location.reload();
                } catch (err) {
                    alert('Invalid backup file.');
                    console.error(err);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <ModuleHeader title="Backup & Restore" />
            <div className="bg-white p-6 rounded-lg border space-y-6">
                <div>
                    <h3 className="font-bold">Backup</h3>
                    <p className="text-sm text-gray-600 mb-2">Download a JSON file of all website content and settings.</p>
                    <button onClick={handleBackup} className="bg-masa-blue text-white font-bold py-2 px-4 rounded">Download Backup</button>
                </div>
                <div>
                    <h3 className="font-bold text-red-600">Restore</h3>
                    <p className="text-sm text-gray-600 mb-2">Upload a backup file. This will overwrite all existing data.</p>
                    <input type="file" accept=".json" onChange={handleRestore} />
                </div>
            </div>
        </div>
    );
};

export default BackupRestoreModule;
