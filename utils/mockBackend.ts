
// This file simulates a backend server, database, and email service.

const generateMemberId = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `MASA-MEM-${year}-${randomNumber}`;
};

export const sendEmail = (to: string, subject: string, body: string, attachment?: { fileName: string, mimeType: string, content: string }) => {
    console.log(`%c[EMAIL SENT]`, 'color: green; font-weight: bold;');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: \n${body}`);
    if (attachment) {
        console.log(`Attachment: ${attachment.fileName} (${attachment.mimeType}, ${attachment.content.length} base64 chars)`);
    }
    console.log('--------------------------------------------------');
};

export const sendOtp = (contact: string) => {
    const otp = '123456'; // Mock OTP for predictability
    console.log(`%c[OTP SENT]`, 'color: #FF8C00; font-weight: bold;');
    console.log(`To: ${contact}`);
    console.log(`OTP: ${otp} (for simulation)`);
    console.log('--------------------------------------------------');
    return otp;
};

export const verifyOtp = (otp: string) => {
    console.log(`%c[OTP VERIFICATION]`, 'color: #FF8C00; font-weight: bold;');
    const isValid = otp === '123456';
    console.log(`Received: ${otp}, Valid: ${isValid}`);
    console.log('--------------------------------------------------');
    return isValid;
};

export const sendWhatsApp = (to: string, message: string) => {
    console.log(`%c[WHATSAPP SENT]`, 'color: #25D366; font-weight: bold;');
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------------------');
};

export const logAnalyticsEvent = (eventName: string, params: any) => {
    console.log(`%c[ANALYTICS] ${eventName}`, 'color: blue; font-weight: bold;', params);
    // In a real app, this would be: gtag('event', eventName, params);
};

// Generic submission handler
export const submitForm = async (type: 'volunteer' | 'donation' | 'membership' | 'partnership' | 'nomination' | 'contact' | 'career' | 'gallery' | 'enrollment', data: any): Promise<any> => {
    console.log(`[MOCK SUBMISSION] Type: ${type}`, data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    logAnalyticsEvent('form_submission', { type: type });
    return { message: 'Submission successful (Mock)', id: `mock-${Date.now()}` };
};

// Admin Data Fetchers
export const getSubmissions = async (type: string) => {
    console.log(`[MOCK FETCH] Getting submissions for ${type}`);
    return [];
};

export const getStats = async () => {
    // Return mock stats for static build
    return {
        volunteers: 1250, 
        donations: 450, 
        members: 320, 
        queries: 85, 
        careers: 12, 
        gallery: 45, 
        enrollments: 890, 
        pledges: 150, 
        countries: 12
    };
};
