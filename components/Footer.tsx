
import React, { useState, useEffect } from 'react';
import { NavigationProps, Page, SocialLink, NavItem } from '../types';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './icons/SocialIcons';
import { EnvelopeIcon, MapPinIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';

const Footer: React.FC<NavigationProps> = ({ navigateTo }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [aboutLinks, setAboutLinks] = useState<NavItem[]>([]);
  const [involvedLinks, setInvolvedLinks] = useState<NavItem[]>([]);
  const [resourceLinks, setResourceLinks] = useState<NavItem[]>([]);
  const [policyLinks, setPolicyLinks] = useState<NavItem[]>([]);

  useEffect(() => {
      const loadSettings = () => {
          const settings = ContentManager.getSettings();
          setSocialLinks(settings.social || []);
          setAboutLinks(settings.navigation.footerAboutLinks || []);
          setInvolvedLinks(settings.navigation.footerInvolvedLinks || []);
          setResourceLinks(settings.navigation.footerResourceLinks || []);
          setPolicyLinks(settings.navigation.footerPolicyLinks || []);
      };
      loadSettings();
      window.addEventListener('masa-settings-updated', loadSettings);
      return () => window.removeEventListener('masa-settings-updated', loadSettings);
  }, []);
  
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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 xl:gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-2 xl:col-span-4">
            <h3 className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('home')}>MASA<span className="text-masa-orange">WORLD</span></h3>
            <p className="mt-4 text-gray-400 text-sm">A global movement dedicated to empowering youth and building stronger nations by providing holistic development opportunities through sports, education, and cultural exchange.</p>
             <div className="flex mt-6 space-x-4">
                {socialLinks.filter(l => l.enabled).map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${link.platform}`} className="text-gray-400 hover:text-masa-orange transition-colors">
                        {getSocialIcon(link.platform)}
                    </a>
                ))}
             </div>
          </div>

          {/* Link Columns */}
          <div className="xl:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">About Us</h4>
                <ul className="space-y-3">
                  {aboutLinks.map((link) => (
                    <li key={link.id}>
                      <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Get Involved</h4>
                <ul className="space-y-3">
                  {involvedLinks.map((link) => (
                    <li key={link.id}>
                      <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Resources</h4>
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.id}>
                      <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
          
          {/* New Contact Block */}
          <div className="md:col-span-2 xl:col-span-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Connect With Us</h4>
            <p className="text-gray-300 text-sm mb-6">Have a question or a proposal? We'd love to hear from you.</p>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg mb-4">
                <EnvelopeIcon className="w-5 h-5 text-masa-orange flex-shrink-0" />
                <a href="mailto:masaworldfoundation@gmail.com" className="text-white hover:text-masa-orange transition-colors text-sm break-all">masaworldfoundation@gmail.com</a>
            </div>
            <button onClick={() => navigateTo('contact')} className="w-full bg-masa-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md">
                Send a Message
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Masa World Foundation. All Rights Reserved.</p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
             {policyLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.page)} className="hover:text-masa-orange transition-colors duration-200 text-xs">
                    {link.label}
                </button>
             ))}
             <button onClick={() => navigateTo('admin-login')} className="hover:text-masa-orange transition-colors duration-200 text-xs">Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
