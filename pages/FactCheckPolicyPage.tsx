
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const FactCheckPolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Fact Check Policy">
            <h3>1. Commitment to Accuracy</h3>
            <p>Trust is the cornerstone of our work. MASA World Foundation is committed to ensuring that all data, statistics, and factual claims published on our website and associated platforms are accurate and reliable. Our Fact Check Policy is integral to our commitment to truth and accountability.</p>

            <h3>2. Verification Process</h3>
            <p>Before any data-driven content is published, we take the following steps to verify its accuracy:</p>
            <ul>
                <li><strong>Primary Source Verification:</strong> We prioritize data from our own field reports, surveys, and program records.</li>
                <li><strong>Cross-Checking:</strong> When using external data (e.g., from government reports or academic studies), we cross-check the information with at least one other credible source.</li>
                <li><strong>Partner Confirmation:</strong> Information related to collaborative projects is confirmed with our partner organizations before publication.</li>
                <li><strong>Internal Review:</strong> All reports and articles containing data are reviewed by a second team member to ensure accuracy.</li>
            </ul>

            <h3>3. Correction of Errors</h3>
            <p>Despite our best efforts, errors may occasionally occur. When an error is identified, we are committed to correcting it promptly and transparently. If the error is significant, we will issue a correction notice at the top of the relevant article or report.</p>

            <h3>4. Public Participation</h3>
            <p>We believe in accountability to our community. If you, as a reader, identify a potential inaccuracy in our content, we encourage you to report it. Please provide the specific information in question and, if possible, a link to the source of your counter-information.</p>

            <h3>5. How to Report Inaccuracies</h3>
            <p>To report a potential factual error, please email our team with the subject line "Fact Check Inquiry". Our team will investigate the claim and take appropriate action. Contact us at: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default FactCheckPolicyPage;