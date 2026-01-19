
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const TermsAndConditionsPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Terms & Conditions">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using the MASA World Foundation website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website.</p>

            <h3>2. Eligibility</h3>
            <p>You must be at least 13 years of age to use this website. If you are a minor, you must have the consent of a parent or legal guardian.</p>

            <h3>3. Prohibited Activities</h3>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul>
                <li>Using the website for any illegal or unauthorized purpose.</li>
                <li>Submitting false, misleading, or inaccurate information.</li>
                <li>Attempting to interfere with the proper working of the site, including hacking or spamming.</li>
                <li>Misusing any content, logos, or intellectual property of MASA World Foundation.</li>
            </ul>

            <h3>4. Intellectual Property</h3>
            <p>The content, logos, graphics, and other materials on this website are the intellectual property of MASA World Foundation and are protected by copyright and other intellectual property laws. You may use the content only for non-commercial, personal, or educational purposes, provided you give appropriate credit.</p>

            <h3>5. Modifications to Service</h3>
            <p>MASA World Foundation reserves the right to modify or discontinue, temporarily or permanently, the website, its content, programs, or policies with or without prior notice.</p>

            <h3>6. Limitation of Liability</h3>
            <p>In no event shall MASA World Foundation be liable for any direct, indirect, incidental, or consequential damages arising out of your use of or inability to use the website.</p>

            <h3>7. Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of India.</p>

            <h3>8. Contact Us</h3>
            <p>If you have any questions or concerns about these Terms & Conditions, please contact us at: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default TermsAndConditionsPage;