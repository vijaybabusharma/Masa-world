import { SmartButton, PaymentLink, Page } from '../types';
import { logAnalyticsEvent } from './mockBackend';

export const handleSmartButtonClick = (
    btn: SmartButton, 
    paymentLinks: PaymentLink[], 
    navigateTo: (page: Page) => void
) => {
    logAnalyticsEvent('button_click', { 
        button_id: btn.id, 
        label: btn.label, 
        action_type: btn.actionType, 
        target: btn.target 
    });

    if (btn.actionType === 'link') {
        navigateTo(btn.target as Page);
    } else if (btn.actionType === 'payment') {
        const link = paymentLinks.find(l => l.id === btn.target);
        if (link && link.url) {
            // Log payment initiation
            logAnalyticsEvent('payment_initiated', { 
                payment_link_id: link.id, 
                provider: link.provider 
            });
            window.open(link.url, '_blank');
        } else {
            alert('Payment link not configured.');
        }
    } else if (btn.actionType === 'scroll') {
         const element = document.getElementById(btn.target);
         if (element) {
             element.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
    }
};
