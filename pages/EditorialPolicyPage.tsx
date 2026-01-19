
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const EditorialPolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Editorial Policy">
            <h3>1. Our Commitment</h3>
            <p>MASA World Foundation is committed to publishing content that is accurate, transparent, and driven by a sense of social responsibility. Our editorial policy guides all content creation, including blog posts, reports, and social media updates.</p>

            <h3>2. Content Sources</h3>
            <p>Our content is derived from a variety of credible sources:</p>
            <ul>
                <li><strong>Field Reports:</strong> First-hand information from our volunteers and program coordinators on the ground.</li>
                <li><strong>Partners:</strong> Verified information from our network of partner NGOs and institutions.</li>
                <li><strong>Beneficiaries:</strong> Stories and testimonials shared with consent.</li>
                <li><strong>Verified Contributors:</strong> Articles and insights from experts in the fields of sports, education, and social work.</li>
            </ul>

            <h3>3. Integrity and Transparency</h3>
            <p>We do not publish paid promotional content or misleading information. All our content is created to inform, educate, and inspire action for the public good. We maintain complete editorial independence from any external influences.</p>

            <h3>4. Non-Partisan Stance</h3>
            <p>MASA World Foundation is a non-political, non-religious, and non-discriminatory organization. Our content reflects this stance and aims to unite people for common social goals, avoiding divisive topics.</p>

            <h3>5. Review and Correction Mechanism</h3>
            <p>All content is reviewed for accuracy and clarity before publication. If any factual error is identified after publication, we are committed to correcting it promptly and transparently. Readers can report potential errors to our editorial team.</p>

            <h3>6. Contact</h3>
            <p>For any questions or concerns regarding our editorial content, please contact us at: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default EditorialPolicyPage;