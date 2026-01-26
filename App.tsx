
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import InitiativesPage from './pages/InitiativesPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import VolunteerPage from './pages/VolunteerPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import TrainingsPage from './pages/TrainingsPage';
import AwardsPage from './pages/AwardsPage';
import RecordsPage from './pages/RecordsPage';
import ConferencesPage from './pages/ConferencesPage';
import FounderMessagePage from './pages/FounderMessagePage';
import TrustSection from './components/TrustSection';
import MediaReportsPage from './pages/MediaReportsPage';
import MembershipPage from './pages/MembershipPage';
import SportsPage from './pages/SportsPage';
import EducationPage from './pages/EducationPage';
import CulturePage from './pages/CulturePage';
import CoursesPage from './pages/CoursesPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CareersPage from './pages/CareersPage';
import MissionVisionPage from './pages/MissionVisionPage';
import CoreValuesPage from './pages/CoreValuesPage';
import GovernancePage from './pages/GovernancePage';
import GlobalImpactPage from './pages/GlobalImpactPage';
import { Page } from './types';
import { logAnalyticsEvent } from './utils/mockBackend';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Import new policy pages
import DisclaimerPage from './pages/DisclaimerPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CopyrightPolicyPage from './pages/CopyrightPolicyPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';
import FactCheckPolicyPage from './pages/FactCheckPolicyPage';
import CommentPolicyPage from './pages/CommentPolicyPage';
import EthicalUsePolicyPage from './pages/EthicalUsePolicyPage';

// Import new interactive pages
import PledgePlatformPage from './pages/PledgePlatformPage';
import CertificateDownloaderPage from './pages/CertificateDownloaderPage';
import NgoHelpDeskPage from './pages/NgoHelpDeskPage';

// Import enhancements
import AccessibilityWidget from './components/AccessibilityWidget';
import LiveActivityToast from './components/LiveActivityToast';
import GlobalScriptManager from './components/GlobalScriptManager';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = useCallback((page: Page, anchor?: string) => {
    const doScroll = () => {
      if (anchor) {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    if (currentPage !== page) {
      setCurrentPage(page);
      setTimeout(doScroll, 100); 
    } else {
      doScroll();
    }
  }, [currentPage]);

  // Analytics Tracking
  useEffect(() => {
      logAnalyticsEvent('page_view', { page: currentPage });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigateTo={navigateTo} />;
      case 'about': return <AboutPage navigateTo={navigateTo} />;
      case 'initiatives': return <InitiativesPage navigateTo={navigateTo} />;
      case 'gallery': return <GalleryPage navigateTo={navigateTo} />;
      case 'blog': return <BlogPage />;
      case 'media-reports': return <MediaReportsPage navigateTo={navigateTo} />;
      case 'membership': return <MembershipPage navigateTo={navigateTo} />;
      case 'get-involved': return <GetInvolvedPage navigateTo={navigateTo} />;
      case 'volunteer': return <VolunteerPage navigateTo={navigateTo} />;
      case 'donate': return <DonatePage navigateTo={navigateTo} />;
      case 'contact': return <ContactPage navigateTo={navigateTo} />;
      case 'events': return <EventsPage navigateTo={navigateTo} />;
      case 'trainings': return <TrainingsPage navigateTo={navigateTo} />;
      case 'awards': return <AwardsPage navigateTo={navigateTo} />;
      case 'records': return <RecordsPage navigateTo={navigateTo} />;
      case 'conferences': return <ConferencesPage navigateTo={navigateTo} />;
      case 'founder-message': return <FounderMessagePage />;
      case 'sports': return <SportsPage navigateTo={navigateTo} />;
      case 'education': return <EducationPage navigateTo={navigateTo} />;
      case 'culture': return <CulturePage navigateTo={navigateTo} />;
      case 'courses': return <CoursesPage navigateTo={navigateTo} />;
      case 'careers': return <CareersPage navigateTo={navigateTo} />;
      case 'mission-vision': return <MissionVisionPage navigateTo={navigateTo} />;
      case 'core-values': return <CoreValuesPage navigateTo={navigateTo} />;
      case 'governance': return <GovernancePage navigateTo={navigateTo} />;
      case 'global-impact': return <GlobalImpactPage navigateTo={navigateTo} />;
      
      // New Interactive Pages
      case 'pledge-platform': return <PledgePlatformPage navigateTo={navigateTo} />;
      case 'certificate-downloader': return <CertificateDownloaderPage navigateTo={navigateTo} />;
      case 'ngo-help-desk': return <NgoHelpDeskPage navigateTo={navigateTo} />;

      // Thank You Pages
      case 'thank-you-volunteer': return <ThankYouPage navigateTo={navigateTo} type="volunteer" />;
      case 'thank-you-donate': return <ThankYouPage navigateTo={navigateTo} type="donate" />;
      case 'thank-you-membership': return <ThankYouPage navigateTo={navigateTo} type="membership" />;
      case 'thank-you-career': return <ThankYouPage navigateTo={navigateTo} type="career" />;
      case 'thank-you-contact': return <ThankYouPage navigateTo={navigateTo} type="contact" />;
      case 'thank-you-event': return <ThankYouPage navigateTo={navigateTo} type="event" />;
      
      // Admin
      case 'admin-dashboard': return <AdminDashboardPage />;
      case 'admin-login': return <AdminDashboardPage />; // Alias

      // Member login and dashboard
      case 'login': return <LoginPage navigateTo={navigateTo} />;
      case 'dashboard': return <DashboardPage navigateTo={navigateTo} />;

      // Policy Pages
      case 'disclaimer': return <DisclaimerPage navigateTo={navigateTo} />;
      case 'terms-and-conditions': return <TermsAndConditionsPage navigateTo={navigateTo} />;
      case 'privacy-policy': return <PrivacyPolicyPage navigateTo={navigateTo} />;
      case 'copyright-policy': return <CopyrightPolicyPage navigateTo={navigateTo} />;
      case 'editorial-policy': return <EditorialPolicyPage navigateTo={navigateTo} />;
      case 'fact-check-policy': return <FactCheckPolicyPage navigateTo={navigateTo} />;
      case 'comment-policy': return <CommentPolicyPage navigateTo={navigateTo} />;
      case 'ethical-use-policy': return <EthicalUsePolicyPage navigateTo={navigateTo} />;

      default: return <HomePage navigateTo={navigateTo} />;
    }
  };

  // Hide header/footer for Admin Dashboard
  const isDashboard = currentPage === 'admin-dashboard' || currentPage === 'admin-login';

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-masa-charcoal">
      <GlobalScriptManager />
      {!isDashboard && <Header navigateTo={navigateTo} currentPage={currentPage} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isDashboard && <TrustSection navigateTo={navigateTo} />}
      {!isDashboard && <Footer navigateTo={navigateTo} />}
      
      <ScrollToTopButton />
      <AccessibilityWidget />
      <LiveActivityToast />
    </div>
  );
};

export default App;
