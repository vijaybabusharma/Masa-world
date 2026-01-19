
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const EthicalUsePolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Ethical Use Policy">
            <h3>1. Purpose</h3>
            <p>This policy outlines the principles for the ethical use of MASA World Foundation's name, logo, programs, certificates, pledges, and reports. Our brand and assets represent our commitment to integrity, and their use must align with our core values.</p>

            <h3>2. Use of MASA Name and Logo</h3>
            <p>The MASA World Foundation name and logo are registered trademarks. They may not be used for any commercial purpose, fundraising, or event promotion without prior written permission from the foundation. Any authorized use must adhere strictly to our branding guidelines.</p>

            <h3>3. Use of Certificates and Pledges</h3>
            <p>Digital certificates issued for pledges or program participation are intended for personal use to signify a commitment or achievement. They may not be altered, used for fraudulent purposes, or to falsely represent an affiliation with MASA World Foundation.</p>

            <h3>4. Use of Reports and Data</h3>
            <p>Our reports and data may be used for educational or informational purposes with proper credit. They must not be used to mislead, defame, or for any purpose that contradicts our mission of social good.</p>

            <h3>5. Respect for Beneficiaries and Volunteers</h3>
            <p>Any interaction with our beneficiaries, volunteers, and community members must be conducted with the utmost respect and dignity. The privacy and safety of individuals featured in our stories and images must be honored.</p>

            <h3>6. Zero Tolerance Policy</h3>
            <p>MASA World Foundation has a zero-tolerance policy for:</p>
            <ul>
                <li><strong>Fraud and Corruption:</strong> Any attempt to misuse funds, assets, or our name for personal gain.</li>
                <li><strong>Discrimination and Exploitation:</strong> Any form of discrimination, harassment, or exploitation of beneficiaries, volunteers, or staff.</li>
                <li><strong>Unethical Behavior:</strong> Any action that harms our reputation, compromises our mission, or endangers our community.</li>
            </ul>

            <h3>7. Reporting Violations</h3>
            <p>If you witness any violation of this Ethical Use Policy, please report it immediately and confidentially to: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default EthicalUsePolicyPage;