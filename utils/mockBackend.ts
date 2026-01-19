// This file simulates a backend server, database, and email service.

const generateMemberId = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `MASA-MEM-${year}-${randomNumber}`;
};

const generateCertificateId = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `MASA-PLEDGE-${year}-${randomNumber}`;
}

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
export const submitForm = (type: 'volunteer' | 'donation' | 'membership' | 'partnership' | 'nomination' | 'contact' | 'career' | 'pledge' | 'gallery', data: any) => {
    
    // 1. Store in Local Storage (Simulating Database)
    const storageKey = `masa_${type}_submissions`;
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newSubmission = { ...data, id: Date.now(), timestamp: new Date().toLocaleString() };

    if (type === 'volunteer') {
        const year = new Date().getFullYear();
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        newSubmission.volunteerId = `MASA-VOL-${year}-${randomNumber}`;
    }

    // 2. Trigger Admin Notification Email
    let adminSubject = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Submission Received`;
    if (type === 'career') adminSubject = 'New Careers / Internship Application Received';
    if (type === 'contact' && data.subject === 'Careers & Internships') adminSubject = 'New CAREERS & INTERNSHIPS INQUIRY Received';
    if (type === 'pledge') adminSubject = `New Pledge Taken – ${data.pledgeTitle}`;
    if (type === 'gallery') adminSubject = `New Gallery Submission for '${data.category}'`;


    const adminBody = `
Hello Admin,

A new ${type} submission has been received on the MASA World Foundation website.

Details:
Name: ${data.fullName || 'N/A'} ${data.participantType ? `(${data.participantType})` : ''}
${data.organizationName ? `Organization: ${data.organizationName}` : ''}
Email: ${data.email || 'N/A'}
Phone: ${data.mobile || data.phone || 'N/A'}
${type === 'pledge' ? `Pledge: ${data.pledgeTitle}` : ''}
${type === 'gallery' ? `Category: ${data.category}\nDescription: ${data.description}` : ''}
${type === 'contact' ? `Subject: ${data.subject || 'N/A'}` : ''}
Type: ${type.toUpperCase()}
Date & Time: ${newSubmission.timestamp}

Please log in to the admin dashboard to review and take action.

— Website Notification System
    `;
    sendEmail('masaworldfoundation@gmail.com', adminSubject, adminBody);

    // 3. Trigger User Auto-Response Email
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

    if (type === 'pledge') {
        const certId = generateCertificateId();
        newSubmission.certificateId = certId;
        userBody = `
Dear ${data.fullName},

Thank you for taking the ${data.pledgeTitle} with MASA World Foundation.

Your commitment strengthens our collective mission towards social responsibility and global impact.

Please find your digital certificate attached.
You may also download it anytime from our website.

Together, we create real change.

Warm regards,
MASA World Foundation
www.masaworld.org
        `;
        // Simulate WhatsApp message if consent is given
        if (data.consent && data.mobile) {
            const waMessage = `Thank you ${data.fullName} for taking the '${data.pledgeTitle}' with MASA World Foundation.\n\nYour pledge certificate is ready: [Simulated Download Link for Cert ID: ${certId}]\n\nTogether, we build a better future.`;
            sendWhatsApp(data.mobile, waMessage);
        }
        // Store last pledge in session storage for thank you page
        sessionStorage.setItem('last_pledge', JSON.stringify(newSubmission));
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

    localStorage.setItem(storageKey, JSON.stringify([newSubmission, ...existingData]));

    if (data.email) {
        let subject = "Thank you for connecting with us";
        if (type === 'volunteer') subject = "Volunteer Application Received";
        if (type === 'donation') subject = "Thank You for Your Donation";
        if (type === 'membership') subject = "Membership Confirmation & Digital ID";
        if (type === 'career') subject = "Application Received – MASA World Foundation";
        if (type === 'pledge') subject = `Your Pledge Certificate – MASA World Foundation`;
        if (type === 'gallery') subject = "We've Received Your Gallery Submission!";
        
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

export const getStats = () => {
    const allPledges = JSON.parse(localStorage.getItem('masa_pledge_submissions') || '[]');
    const countries = [...new Set(allPledges.map((p: any) => p.country))].length;
    return {
        volunteers: JSON.parse(localStorage.getItem('masa_volunteer_submissions') || '[]').length,
        donations: JSON.parse(localStorage.getItem('masa_donation_submissions') || '[]').length,
        members: JSON.parse(localStorage.getItem('masa_membership_submissions') || '[]').length,
        queries: JSON.parse(localStorage.getItem('masa_contact_submissions') || '[]').length,
        careers: JSON.parse(localStorage.getItem('masa_career_submissions') || '[]').length,
        pledges: allPledges.length,
        countries: countries,
        gallery: JSON.parse(localStorage.getItem('masa_gallery_submissions') || '[]').length,
    };
};

export const verifyCertificate = (certId: string) => {
    const pledges = getSubmissions('pledge');
    return pledges.find((p: any) => p.certificateId === certId);
};

export const getCertificatesByContact = (contact: string) => {
    const results: any[] = [];
    const lowerContact = contact.toLowerCase();

    const check = (item: any) => {
        const emailMatch = item.email && item.email.toLowerCase() === lowerContact;
        const phoneMatch = (item.mobile && item.mobile === lowerContact) || (item.phone && item.phone === lowerContact);
        return emailMatch || phoneMatch;
    };

    // Check Pledges
    getSubmissions('pledge').forEach((p: any) => {
        if (check(p)) {
            results.push({
                type: 'Pledge',
                title: p.pledgeTitle,
                date: p.timestamp,
                id: p.certificateId,
            });
        }
    });

    // Check Memberships
    getSubmissions('membership').forEach((m: any) => {
        if (check(m)) {
            results.push({
                type: 'Membership',
                title: `${m.membershipType} Member`,
                date: m.timestamp,
                id: m.memberId,
            });
        }
    });

    // Check Volunteers
    getSubmissions('volunteer').forEach((v: any) => {
         if (check(v)) {
             results.push({
                type: 'Volunteer',
                title: `Volunteer Certificate of Appreciation`,
                date: v.timestamp,
                id: v.volunteerId,
             });
         }
    });

    return results;
};
