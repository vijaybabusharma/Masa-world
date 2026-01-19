
import React from 'react';
import { QrCodeIcon } from './icons/FeatureIcons';
import { translations } from '../utils/translations';

interface PledgeCertificateProps {
    name: string;
    pledgeTitle: string;
    certId: string;
    date: string;
}

const PledgeCertificate: React.FC<PledgeCertificateProps> = ({ name, pledgeTitle, certId, date }) => {
    const t = translations.en.certificate;

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto border-4 border-masa-blue aspect-[4/3] p-4 flex flex-col relative text-masa-charcoal">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <svg className="w-48 h-48" viewBox="0 0 100 100">
                     <text x="50" y="55" fontFamily="sans-serif" fontSize="30" fontWeight="bold" textAnchor="middle" fill="#1F2937">MASA</text>
                </svg>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold">MASA<span className="text-masa-orange">WORLD</span> FOUNDATION</h1>
                    <p className="text-sm font-semibold text-masa-blue">{t.title}</p>
                </div>

                {/* Body */}
                <div className="flex-grow flex flex-col justify-center items-center text-center px-2">
                    <p className="text-sm">{t.proudlyCertifyThat}</p>
                    <p className="text-2xl font-bold my-1 border-b-2 border-masa-orange px-4">{name}</p>
                    <p className="text-xs mt-1">{t.hasTakenPledge}</p>
                    <p className="font-bold text-base text-masa-blue mt-1">'{pledgeTitle}'</p>
                    <p className="text-xs mt-1 leading-tight">{t.commitmentText}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end text-xs mt-2">
                    <div className="text-left">
                        <p className="font-bold">Vijay Babu Sharma</p>
                        <p className="border-t border-gray-400">{t.founder}</p>
                    </div>
                    <div className="text-center">
                         <div className="w-16 h-16 bg-white border-2 border-gray-300 p-0.5 rounded-md flex items-center justify-center">
                            <QrCodeIcon className="h-14 w-14 text-gray-800" />
                         </div>
                         <p className="mt-1 text-[10px]">{certId}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">{date}</p>
                        <p className="border-t border-gray-400">{t.dateOfPledge}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PledgeCertificate;
