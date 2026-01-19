
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const CommentPolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Comment Policy">
            <h3>1. Encouraging Community Discussion</h3>
            <p>MASA World Foundation encourages open and respectful discussion on our blog and social media platforms. We believe that community engagement is vital for social change. However, to maintain a safe and constructive environment for all users, we have established the following guidelines.</p>

            <h3>2. Community Guidelines</h3>
            <p>Comments that violate the following guidelines may be moderated or removed without notice:</p>
            <ul>
                <li><strong>No Hate Speech or Abuse:</strong> Personal attacks, threats, harassment, or any form of hate speech directed at individuals or groups will not be tolerated.</li>
                <li><strong>No Misinformation or Spam:</strong> Spreading false information, spam, or promotional content is strictly prohibited.</li>
                <li><strong>Stay On Topic:</strong> Please keep comments relevant to the topic of the article or post.</li>
                <li><strong>Respect for Others:</strong> Disagreements are natural, but they must be expressed with respect and civility. Do not use abusive or offensive language.</li>
            </ul>

            <h3>3. Moderation Rights</h3>
            <p>MASA World Foundation reserves the right to moderate, edit, or remove any comments that violate our community guidelines. We also reserve the right to block users who repeatedly violate these rules.</p>

            <h3>4. User Responsibility</h3>
            <p>You are solely responsible for the content of your comments. By submitting a comment on our platforms, you agree that your comment's content does not violate any laws or the rights of any third party.</p>

            <h3>5. A Safe Space for All</h3>
            <p>Our goal is to create a community where everyone feels safe to share their thoughts and ideas. We thank you for helping us maintain a positive and productive environment.</p>

            <h3>6. Questions</h3>
            <p>If you have any questions about this policy, please contact us at: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default CommentPolicyPage;