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
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            try {
                // 1. Store in Local Storage (Simulating Database)
                const storageKey = `masa_${type}_submissions`;
                const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
                const timestamp = new Date().toLocaleString();
                const newSubmission = { ...data, id: Date.now(), timestamp };

                if (type === 'volunteer') {
                    const year = new Date().getFullYear();
                    const randomNumber = Math.floor(1000 + Math.random() * 9000);
                    newSubmission.volunteerId = `MASA-VOL-${year}-${randomNumber}`;
                }

                // 2. Trigger Admin Notification Email (masaworldfoundation@gmail.com)
                let adminSubject = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Submission Received`;
                if (type === 'career') adminSubject = 'New Careers / Internship Application Received';
                if (type === 'contact' && data.subject === 'Careers & Internships') adminSubject = 'New CAREERS & INTERNSHIPS INQUIRY Received';
                if (type === 'gallery') adminSubject = `New Gallery Submission for '${data.category}'`;
                if (type === 'enrollment') adminSubject = `New Course Enrollment: ${data.courseName}`;

                const formatLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                let detailsBlock = Object.entries(data)
                    .filter(([key]) => key !== 'consent' && key !== 'file')
                    .map(([key, value]) => `${formatLabel(key)}: ${value}`)
                    .join('\n');

                const adminBody = `
Hello Admin,
A new ${type.toUpperCase()} submission has been received on the MASA World Foundation website.
--- SUBMISSION DETAILS ---
Date: ${timestamp}
Form Type: ${type}
${detailsBlock}
--------------------------
Please log in to the admin dashboard to review the full details.
— Website Notification System`;
                
                sendEmail('masaworldfoundation@gmail.com', adminSubject, adminBody);

                // 3. Trigger User Auto-Response Email
                if (data.email) {
                    let userBody = `
Dear ${data.fullName || 'Supporter'},
Thank you for connecting with MASA World Foundation.
We have received your ${type} details. Our team will review them and get in touch with you shortly.
Warm regards,
MASA World Foundation`;
                    
                    if (type === 'membership') {
                        const memberId = generateMemberId();
                        newSubmission.memberId = memberId;
                        userBody = `
Dear ${data.fullName || 'Supporter'},
Thank you for becoming a member! Your Member ID is: ${memberId}.
A confirmation email with your digital ID card is on its way.
Warm regards,
MASA World Foundation`;
                    }
                    // ... other email templates
                     if (type === 'enrollment') {
                        userBody = `
Dear ${data.fullName},
Congratulations! Your enrollment for the course "${data.courseName}" has been confirmed.
Our team will share the schedule and access details shortly.
Warm regards,
MASA World Foundation`;
                    }

                    let subject = "Thank you for connecting with us";
                    if (type === 'volunteer') subject = "Volunteer Application Received";
                    if (type === 'donation') subject = "Thank You for Your Donation";
                    if (type === 'membership') subject = "Membership Confirmation & Digital ID";
                    if (type === 'career') subject = "Application Received – MASA World Foundation";
                    if (type === 'enrollment') subject = "Enrollment Successful - MASA Academy";
                    
                    sendEmail(data.email, subject, userBody);
                }

                localStorage.setItem(storageKey, JSON.stringify([newSubmission, ...existingData]));
                logAnalyticsEvent('form_submission', { type: type });
                resolve(newSubmission);

            } catch (error) {
                console.error("Submission Error", error);
                resolve(null);
            }
        }, 1500);
    });
};

// Admin Data Fetchers
export const getSubmissions = (type: string) => {
    return JSON.parse(localStorage.getItem(`masa_${type}_submissions`) || '[]');
};

export const getStats = () => {
    return {
        volunteers: JSON.parse(localStorage.getItem('masa_volunteer_submissions') || '[]').length,
        donations: JSON.parse(localStorage.getItem('masa_donation_submissions') || '[]').length,
        members: JSON.parse(localStorage.getItem('masa_membership_submissions') || '[]').length,
        queries: JSON.parse(localStorage.getItem('masa_contact_submissions') || '[]').length,
        careers: JSON.parse(localStorage.getItem('masa_career_submissions') || '[]').length,
        gallery: JSON.parse(localStorage.getItem('masa_gallery_submissions') || '[]').length,
        enrollments: JSON.parse(localStorage.getItem('masa_enrollment_submissions') || '[]').length,
        pledges: JSON.parse(localStorage.getItem('masa_pledge_submissions') || '[]').length,
        countries: 12, // Mock fallback
    };
};