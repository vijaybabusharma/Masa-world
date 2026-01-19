
import React from 'react';
import { NavigationProps } from '../types';
import PolicyPageLayout from '../components/PolicyPageLayout';

const DisclaimerPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    return (
        <PolicyPageLayout navigateTo={navigateTo} title="Disclaimer">
            <h3>1. General Information</h3>
            <p>The information provided on the MASA World Foundation website is for general informational and public awareness purposes only. MASA World Foundation is a registered non-profit organization dedicated to social development through youth empowerment, sports, education, and culture.</p>
            
            <h3>2. No Guarantees</h3>
            <p>While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, programs, or related graphics contained on the website for any purpose.</p>

            <h3>3. No Liability</h3>
            <p>MASA World Foundation, its board members, employees, and volunteers will not be held responsible or liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of this website or the information contained within it. We are not responsible for any misuse of information by any third party.</p>

            <h3>4. External Links</h3>
            <p>Through this website, you may be able to link to other websites which are not under the control of MASA World Foundation. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. These links are provided for reference and convenience only.</p>

            <h3>5. Voluntary Participation</h3>
            <p>All participation in MASA World Foundation’s programs, events, pledges, or volunteering activities is entirely voluntary. Participants assume all risks associated with their involvement.</p>

            <h3>6. Donations</h3>
            <p>All donations made to MASA World Foundation are subject to our internal policies and the applicable laws of India. We are not responsible for any errors made by donors during the transaction process.</p>
        </PolicyPageLayout>
    );
};

export default DisclaimerPage;