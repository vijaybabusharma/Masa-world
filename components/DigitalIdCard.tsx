
import React from 'react';
import { QrCodeIcon, ShieldCheckIcon } from './icons/FeatureIcons';

interface DigitalIdCardProps {
    name: string;
    memberId: string;
    category: string;
    issueDate: string;
    validThru: string;
    photoUrl: string;
}

const DigitalIdCard: React.FC<DigitalIdCardProps> = ({ name, memberId, category, issueDate, validThru, photoUrl }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-xs mx-auto overflow-hidden border border-gray-100 aspect-[3/4.5] flex flex-col">
            {/* Header */}
            <div className="bg-masa-charcoal p-4 text-center text-white relative">
                 <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full"></div>
                <h2 className="text-xl font-bold">MASA<span className="text-masa-orange">WORLD</span></h2>
                <p className="text-xs opacity-80 font-medium">Global Community. Local Connections.</p>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col items-center flex-grow">
                {/* Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-masa-blue ring-offset-2 ring-offset-white mb-4 shadow-md">
                    <img src={photoUrl} alt={name} className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // prevent infinite loop if fallback fails
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1E3A8A&color=FFFFFF&size=128`;
                        }}
                    />
                </div>
                
                {/* Details */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-masa-charcoal">{name}</h3>
                    <p className="text-masa-orange font-semibold">{category}</p>
                </div>

                <div className="text-sm text-gray-600 mt-4 text-center">
                    <p><strong className="font-medium text-gray-800">Member ID:</strong> {memberId}</p>
                    <p><strong className="font-medium text-gray-800">Issued:</strong> {issueDate}</p>
                    <p><strong className="font-medium text-gray-800">Validity:</strong> {validThru}</p>
                </div>
            </div>

            {/* Footer / QR Code */}
            <div className="bg-gray-50 p-4 mt-auto flex items-center justify-between gap-4 border-t border-gray-200">
                <div className="text-center">
                    <QrCodeIcon className="h-16 w-16 text-gray-800" />
                    <p className="text-xs text-gray-500 mt-1">Verify</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-500">Registered Non-Profit</p>
                    <p className="text-xs text-gray-400">Govt. of India</p>
                </div>
            </div>
        </div>
    );
};

export default DigitalIdCard;
