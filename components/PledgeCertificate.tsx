
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
        <div className="bg-white w-full max-w-2xl mx-auto border-[10px] border-double border-masa-blue p-1 relative text-masa-charcoal aspect-[1.414/1] shadow-2xl print:shadow-none">
            <div className="h-full w-full border-2 border-masa-orange p-6 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <img src="/logo.svg" className="w-2/3" alt="" /> 
                </div>

                {/* Header */}
                <div className="text-center mt-2">
                    <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png" alt="MASA Logo" className="h-16 mx-auto mb-4" onError={(e) => { e.currentTarget.src = '/logo.svg'; }} />
                    <h1 className="text-3xl font-extrabold uppercase tracking-widest text-masa-blue font-serif">Certificate of Commitment</h1>
                    <div className="h-1 w-24 bg-masa-orange mx-auto my-2"></div>
                </div>

                {/* Body */}
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4 py-4">
                    <p className="text-lg text-gray-600 font-serif italic">{t.proudlyCertifyThat}</p>
                    <h2 className="text-3xl font-bold text-masa-charcoal font-serif border-b-2 border-gray-300 px-8 pb-1 capitalize">{name}</h2>
                    <p className="text-lg text-gray-600 font-serif italic">{t.hasTakenPledge}</p>
                    <h3 className="text-2xl font-bold text-masa-orange uppercase tracking-wide">{pledgeTitle}</h3>
                    <p className="text-gray-700 max-w-xl mx-auto leading-relaxed text-sm font-medium">
                        {t.commitmentText}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-8 pb-4 px-4">
                    <div className="text-center">
                        <div className="h-12 w-32 border-b border-gray-400 mb-2 flex items-end justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" className="h-8 opacity-60" alt="Signature" /> 
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Founder & Chairman</p>
                        <p className="text-[10px] text-gray-400">{t.founder}</p>
                    </div>

                    <div className="flex flex-col items-center">
                         <div className="bg-white p-1 border border-gray-200">
                            <QrCodeIcon className="h-16 w-16 text-masa-charcoal" />
                         </div>
                         <p className="text-[10px] font-mono mt-1 text-gray-500">ID: {certId}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-bold text-masa-charcoal font-serif">{date}</p>
                        <div className="h-px w-24 bg-gray-400 my-1 mx-auto"></div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.dateOfPledge}</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-masa-blue text-white text-center py-1 text-[10px] uppercase tracking-widest">
                    www.masaworld.org
                </div>
            </div>
        </div>
    );
};

export default PledgeCertificate;
