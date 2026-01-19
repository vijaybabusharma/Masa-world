
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const PrivacyPolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Privacy Policy">
            <h3>1. Our Commitment to Privacy</h3>
            <p>MASA World Foundation is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you interact with our website.</p>

            <h3>2. What Data We Collect</h3>
            <p>We may collect the following types of personal data:</p>
            <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and location when you fill out forms (e.g., for volunteering, membership, contact, pledges).</li>
                <li><strong>Technical Data:</strong> We may use cookies and analytics tools to collect non-personal information like your browser type and IP address to improve our website's functionality.</li>
            </ul>

            <h3>3. Purpose of Data Collection</h3>
            <p>We collect your data for the following purposes:</p>
            <ul>
                <li><strong>Communication:</strong> To respond to your inquiries and send you updates about our work, events, and newsletters.</li>
                <li><strong>Program Management:</strong> To process your applications for volunteering, membership, or events.</li>
                <li><strong>Certificates & Reports:</strong> To generate and deliver digital certificates for pledges and send impact reports to supporters.</li>
                <li><strong>Impact Tracking:</strong> To analyze our reach and the effectiveness of our programs.</li>
            </ul>

            <h3>4. Data Protection and Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. We will never sell, trade, or rent your personal information to third parties.</p>

            <h3>5. Third-Party Services</h3>
            <p>We may use third-party services for functions like sending emails, processing donations (if applicable), or sending WhatsApp messages. These services are contractually obligated to protect your data and use it only for the purposes we specify.</p>

            <h3>6. User Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request that we correct any inaccurate or incomplete data.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal data from our systems.</li>
            </ul>

            <h3>7. Contact for Privacy Concerns</h3>
            <p>To exercise any of these rights or if you have questions about our privacy practices, please contact us at: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default PrivacyPolicyPage;