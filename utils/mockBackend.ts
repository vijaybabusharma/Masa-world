
// This file simulates a backend server, database, and email service.

const generateMemberId = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `MASA-MEM-${year}-${randomNumber}`;
};

const generateCertificateId = () => {
    return `MASA-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const sendEmail = (to: string, subject: string, body: string) => {
    console.log(`%c[EMAIL SENT]`, 'color: green; font-weight: bold;');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: \n${body}`);
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
export const submitForm = (type: 'volunteer' | 'donation' | 'membership' | 'partnership' | 'nomination' | 'contact' | 'career' | 'gallery' | 'pledge' | 'enrollment', data: any) => {
    
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

    if (type === 'pledge') {
        const certId = generateCertificateId();
        newSubmission.certificateId = certId;
        // Store for immediate retrieval in same session if needed
        sessionStorage.setItem('last_pledge', JSON.stringify(newSubmission));
    }

    // 2. Trigger Admin Notification Email (masaworldfoundation@gmail.com)
    let adminSubject = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Submission Received`;
    if (type === 'career') adminSubject = 'New Careers / Internship Application Received';
    if (type === 'contact' && data.subject === 'Careers & Internships') adminSubject = 'New CAREERS & INTERNSHIPS INQUIRY Received';
    if (type === 'gallery') adminSubject = `New Gallery Submission for '${data.category}'`;
    if (type === 'pledge') adminSubject = `New Pledge Taken: ${data.pledgeTitle}`;
    if (type === 'enrollment') adminSubject = `New Course Enrollment: ${data.courseName}`;

    // Dynamically build the email body from all data keys
    const formatLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    let detailsBlock = Object.entries(data)
        .filter(([key]) => key !== 'consent' && key !== 'file') // Exclude internal or large fields
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
Please log in to the admin dashboard to review the full details and take necessary action.

— Website Notification System
    `;
    
    // REQUIREMENT: Send email to admin
    sendEmail('masaworldfoundation@gmail.com', adminSubject, adminBody);

    // 3. Trigger User Auto-Response Email
    // Only if a valid email is present in the data
    if (data.email) {
        let userBody = `
Dear ${data.fullName || 'Supporter'},

Thank you for connecting with MASA World Foundation.

We have successfully received your ${type} details. Our team will review them and get in touch with you shortly.

Your support helps us strengthen communities through sports, education, and cultural initiatives.

Warm regards,
MASA World Foundation
        `;
        
        if (type === 'membership') {
            const memberId = generateMemberId();
            newSubmission.memberId = memberId;
            userBody = `
Dear ${data.fullName || 'Supporter'},

Thank you for becoming a member of MASA World Foundation! Welcome to our global family.

Your Member ID is: ${memberId}

You can now log in to your Member Dashboard to view your status and download your Digital Member ID Card. 
A copy of your ID card will also be sent to you via a separate email shortly.

Warm regards,
MASA World Foundation
        `;
        }
        
        if (type === 'gallery') {
            userBody = `
Dear ${data.fullName},

Thank you for sharing your moments with us!

We have received your submission for the "${data.category}" gallery. Our team will review it shortly. If selected, it will appear in our public gallery.

We appreciate you being an active part of our community.

Warm regards,
MASA World Foundation
            `;
        }

        if (type === 'career') {
            userBody = `
Dear ${data.fullName || 'Applicant'},

Thank you for your interest in working with MASA World Foundation.
We have successfully received your application.
Our team will review your profile and reach out if there is a matching opportunity.

Warm regards,
MASA World Foundation
    `;
        }

        if (type === 'pledge') {
            userBody = `
Dear ${data.fullName},

Congratulations on taking the "${data.pledgeTitle}" pledge!

Your commitment towards a better society is commendable.
You can download your pledge certificate using the Certificate ID: ${newSubmission.certificateId} from our website.

Warm regards,
MASA World Foundation
            `;
        }

        if (type === 'enrollment') {
            userBody = `
Dear ${data.fullName},

Congratulations! Your enrollment for the course "${data.courseName}" has been confirmed.

Course Details:
Mode: ${data.mode}
Fee Paid: ${data.fee}

Our team will share the schedule and access details shortly via email/WhatsApp.

Welcome to MASA Academy.

Warm regards,
MASA World Foundation
            `;
        }

        localStorage.setItem(storageKey, JSON.stringify([newSubmission, ...existingData]));

        let subject = "Thank you for connecting with us";
        if (type === 'volunteer') subject = "Volunteer Application Received";
        if (type === 'donation') subject = "Thank You for Your Donation";
        if (type === 'membership') subject = "Membership Confirmation & Digital ID";
        if (type === 'career') subject = "Application Received – MASA World Foundation";
        if (type === 'gallery') subject = "We've Received Your Gallery Submission!";
        if (type === 'pledge') subject = "Your Pledge Certificate - MASA World Foundation";
        if (type === 'enrollment') subject = "Enrollment Successful - MASA Academy";
        
        sendEmail(data.email, subject, userBody);
    }

    // 4. Log Analytics
    logAnalyticsEvent('form_submission', { type: type });

    return true;
};

// Admin Data Fetchers
export const getSubmissions = (type: string) => {
    return JSON.parse(localStorage.getItem(`masa_${type}_submissions`) || '[]');
};

export const verifyCertificate = (certId: string) => {
    const pledges = JSON.parse(localStorage.getItem('masa_pledge_submissions') || '[]');
    return pledges.find((p: any) => p.certificateId === certId);
};

export const getCertificatesByContact = (contact: string) => {
    const pledges = JSON.parse(localStorage.getItem('masa_pledge_submissions') || '[]');
    return pledges.filter((p: any) => p.email === contact || p.mobile === contact || p.phone === contact).map((p: any) => ({
        id: p.certificateId,
        title: p.pledgeTitle,
        type: 'Pledge Certificate',
        date: p.timestamp.split(',')[0]
    }));
};

export const getStats = () => {
    const pledges = JSON.parse(localStorage.getItem('masa_pledge_submissions') || '[]');
    const uniqueCountries = new Set(pledges.map((p: any) => p.country)).size;

    return {
        volunteers: JSON.parse(localStorage.getItem('masa_volunteer_submissions') || '[]').length,
        donations: JSON.parse(localStorage.getItem('masa_donation_submissions') || '[]').length,
        members: JSON.parse(localStorage.getItem('masa_membership_submissions') || '[]').length,
        queries: JSON.parse(localStorage.getItem('masa_contact_submissions') || '[]').length,
        careers: JSON.parse(localStorage.getItem('masa_career_submissions') || '[]').length,
        gallery: JSON.parse(localStorage.getItem('masa_gallery_submissions') || '[]').length,
        enrollments: JSON.parse(localStorage.getItem('masa_enrollment_submissions') || '[]').length,
        pledges: pledges.length,
        countries: uniqueCountries > 0 ? uniqueCountries : 12, // Mock fallback
    };
};
