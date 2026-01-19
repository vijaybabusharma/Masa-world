
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const CopyrightPolicyPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Copyright Policy">
            <h3>1. Ownership of Content</h3>
            <p>All content on this website, including but not limited to text, images, videos, logos, graphics, and digital certificates, is the exclusive property of MASA World Foundation unless otherwise stated. This content is protected by international copyright laws.</p>

            <h3>2. Use of Content</h3>
            <p>No part of this website may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of MASA World Foundation.</p>

            <h3>3. Fair Use for Non-Commercial Purposes</h3>
            <p>You are permitted to use content from this website for "fair use" purposes, such as education, awareness, personal reference, or news reporting, provided that:</p>
            <ul>
                <li>The use is strictly non-commercial.</li>
                <li>You provide clear and prominent credit to "MASA World Foundation".</li>
                <li>If used online, you must link back to our website (www.masaworld.org) where possible.</li>
            </ul>

            <h3>4. Respect for Third-Party Copyrights</h3>
            <p>MASA World Foundation respects the intellectual property of others. If we use any third-party material, we do so with permission or in accordance with fair use principles, and we provide appropriate credit.</p>

            <h3>5. Reporting Copyright Violations</h3>
            <p>If you believe that your copyright-protected work has been used on our website in a way that constitutes copyright infringement, please notify us immediately. Provide the following information:</p>
            <ul>
                <li>Identification of the copyrighted work.</li>
                <li>The location of the infringing material on our website.</li>
                <li>Your contact information.</li>
                <li>A statement that you have a good-faith belief that the use is not authorized.</li>
            </ul>
            <p>Please send all copyright-related inquiries to: <strong>masaworldfoundation@gmail.com</strong></p>
        </PolicyPageLayout>
    );
};

export default CopyrightPolicyPage;