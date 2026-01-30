
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { sendEmail, sendWhatsApp } from './mockBackend';

/**
 * Generates a PDF from an HTML element and simulates sending it via email and WhatsApp.
 * This function does NOT trigger a download.
 */
export const generateAndDeliverCertificate = async (
    element: HTMLElement,
    certificateData: any
) => {
    try {
        const canvas = await html2canvas(element, { scale: 3 }); // Higher scale for better quality
        const imgData = canvas.toDataURL('image/png');

        // A4 size in points: 841.89 x 595.28 for landscape
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const fileName = `MASA_Pledge_Certificate_${certificateData.fullName.replace(/\s/g, '_')}.pdf`;

        // 1. Generate Blob for download link and Base64 for email
        const pdfBlob = pdf.output('blob');
        const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 part

        // 2. Simulate Email with PDF attachment
        const emailSubject = `Your MASA Pledge Certificate: ${certificateData.pledgeTitle}`;
        const emailBody = `
Dear ${certificateData.fullName},

Thank you for your commitment! Please find your official A4 PDF pledge certificate attached to this email.

Certificate ID: ${certificateData.certificateId}
Pledge: ${certificateData.pledgeTitle}

We appreciate you being part of our community.

Warm regards,
MASA World Foundation`;
        sendEmail(certificateData.email, emailSubject, emailBody, {
            fileName,
            mimeType: 'application/pdf',
            content: pdfBase64,
        });

        // 3. Simulate WhatsApp with a temporary download link
        if (certificateData.mobile) {
            const downloadUrl = URL.createObjectURL(pdfBlob);
            const whatsappMessage = `Hello ${certificateData.fullName}! Thank you for taking the "${certificateData.pledgeTitle}" pledge. Download your official PDF certificate here: ${downloadUrl}`;
            sendWhatsApp(certificateData.mobile, whatsappMessage);
        }

        return { success: true };

    } catch (error) {
        console.error("Error generating or delivering certificate:", error);
        return { success: false, error };
    }
};

/**
 * Generates a PDF from an HTML element and triggers a browser download.
 */
export const downloadCertificate = async (element: HTMLElement, certificateData: any) => {
    try {
        const canvas = await html2canvas(element, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const fileName = `MASA_Pledge_Certificate_${certificateData.fullName.replace(/\s/g, '_')}.pdf`;
        pdf.save(fileName);
        return { success: true };
    } catch (error) {
        console.error("Error downloading certificate:", error);
        return { success: false, error };
    }
};
