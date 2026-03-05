
import React, { useState, useEffect } from 'react';
import { NavigationProps, Page, SocialLink, NavItem, SmartButton, PaymentLink } from '../types';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './icons/SocialIcons';
import { EnvelopeIcon, MapPinIcon, ArrowRightIcon, PhoneIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';
import { handleSmartButtonClick } from '../utils/buttonHelper';

const Footer: React.FC<NavigationProps> = ({ navigateTo }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [navLinks, setNavLinks] = useState({
    about: [] as NavItem[],
    work: [] as NavItem[],
    involved: [] as NavItem[],
    resources: [] as NavItem[],
    policies: [] as NavItem[],
  });
  const [finalCta, setFinalCta] = useState<SmartButton | null>(null);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);

  useEffect(() => {
      const loadSettings = () => {
          const settings = ContentManager.getSettings();
          setSocialLinks(settings.social || []);
          setNavLinks({
              about: settings.navigation.footerAboutLinks || [],
              work: settings.navigation.footerWorkLinks || [],
              involved: settings.navigation.footerInvolvedLinks || [],
              resources: settings.navigation.footerResourceLinks || [],
              policies: settings.navigation.footerPolicyLinks || [],
          });
          if (settings.buttons && settings.buttons.zones) {
              setFinalCta(settings.buttons.zones['final_cta']);
              setPaymentLinks(settings.buttons.paymentLinks);
          }
      };
      loadSettings();
      window.addEventListener('masa-settings-updated', loadSettings);
      return () => window.removeEventListener('masa-settings-updated', loadSettings);
  }, []);
  
  const onSmartBtnClick = (btn: SmartButton) => {
      handleSmartButtonClick(btn, paymentLinks, navigateTo);
  };

  const getSocialIcon = (platform: string) => {
      switch(platform) {
          case 'facebook': return <FacebookIcon />;
          case 'twitter': return <TwitterIcon />;
          case 'instagram': return <InstagramIcon />;
          case 'linkedin': return <LinkedInIcon />;
          case 'youtube': return <YouTubeIcon />;
          case 'whatsapp': return <WhatsAppIcon />;
          default: return null;
      }
  };

  const renderLinkList = (links: NavItem[]) => (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.id}>
          <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-[10px] font-semibold text-left uppercase tracking-widest">
            {link.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="relative bg-[#050505] text-white border-t border-white/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-masa-orange/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-masa-blue/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Top Section: High Impact CTA */}
      {finalCta && finalCta.visible && (
        <div className="relative border-b border-white/5">
          <div className="container mx-auto px-6 py-20 md:py-28">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              <div className="max-w-3xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-masa-orange/10 border border-masa-orange/20 text-masa-orange text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-masa-orange animate-pulse"></span>
                  Join the Movement
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
                  Ready to make a <br />
                  <span className="text-masa-orange italic serif">difference?</span>
                </h2>
                <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join our global community of changemakers and help us build a better future for youth worldwide.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button 
                  onClick={() => onSmartBtnClick(finalCta)}
                  className="group relative h-24 w-24 md:h-32 md:w-32 bg-masa-orange text-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] active:scale-95"
                >
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
                  <span className="relative z-10 text-xs font-black uppercase tracking-widest text-center leading-tight">
                    {finalCta.label.split(' ').join('\n')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container relative mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <button 
                onClick={() => navigateTo('home')} 
                className="flex items-center gap-4 group"
              >
                <div className="bg-white p-2 rounded-xl shadow-2xl transition-transform group-hover:rotate-6">
                  <img 
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png" 
                    alt="MASA Logo" 
                    className="h-8 w-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-black tracking-tighter uppercase">
                  Masa<span className="text-masa-orange">World</span>
                </h3>
              </button>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
                Empowering youth and building stronger nations through sports, education, and culture. A global movement for positive change.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Follow the Impact</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.filter(l => l.enabled && ['facebook', 'instagram', 'linkedin', 'youtube', 'twitter'].includes(l.platform)).map(link => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
                  >
                    <div className="w-5 h-5">
                      {getSocialIcon(link.platform)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-masa-orange">Platform</h4>
            <ul className="space-y-4">
              {[
                { label: 'About MASA', page: 'about' },
                { label: 'Mission & Vision', page: 'mission-vision' },
                { label: 'Programs', page: 'programs-overview' },
                { label: 'Initiatives', page: 'initiatives' },
                { label: 'Blog', page: 'blog' },
                { label: 'Contact', page: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => navigateTo(link.page as any)} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-bold flex items-center group"
                  >
                    <span className="h-1 w-0 bg-masa-orange mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Community Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-masa-orange">Community</h4>
            <ul className="space-y-4">
              {[
                { label: 'Volunteer', page: 'volunteer' },
                { label: 'Membership', page: 'membership' },
                { label: 'Donate', page: 'donate' },
                { label: 'Careers', page: 'careers' },
                { label: 'Events', page: 'events' },
                { label: 'Gallery', page: 'gallery' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => navigateTo(link.page as any)} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-bold flex items-center group"
                  >
                    <span className="h-1 w-0 bg-masa-orange mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="lg:col-span-4 space-y-10">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-masa-orange">Get in Touch</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-masa-orange/10 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-5 w-5 text-masa-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Location</p>
                    <p className="text-sm text-gray-300 font-bold">
                      MASA World Foundation HQ<br />
                      New Delhi, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-masa-orange/10 flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-5 w-5 text-masa-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Email</p>
                    <a href="mailto:contact@masaworld.org" className="text-sm text-gray-300 font-bold hover:text-masa-orange transition-colors">
                      contact@masaworld.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Masa World Foundation
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            {[
              { label: 'Privacy Policy', page: 'privacy-policy' },
              { label: 'Terms & Conditions', page: 'terms-and-conditions' },
              { label: 'Disclaimer', page: 'disclaimer' },
              { label: 'Editorial Policy', page: 'editorial-policy' },
              { label: 'Ethical Use', page: 'ethical-use-policy' },
            ].map((link, idx) => (
              <button 
                key={idx}
                onClick={() => navigateTo(link.page as any)} 
                className="text-gray-500 hover:text-white transition-colors duration-300 text-sm font-medium"
                aria-label={`View ${link.label}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigateTo('admin-login')} 
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm font-medium"
              aria-label="Admin Access"
            >
              Admin
            </button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-gray-500 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
