
import React, { useState, useEffect } from 'react';
import { NavigationProps, Page, SocialLink, NavItem } from '../types';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from './icons/SocialIcons';
import { EnvelopeIcon, MapPinIcon, ArrowRightIcon } from './icons/FeatureIcons';
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
          case 'whatsapp': return <span className="font-bold text-sm">WA</span>;
          default: return null;
      }
  };

  return (
    <footer className="bg-masa-charcoal text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Logo and Mission (3 cols) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-3">
            <h3 className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('home')}>
              MASA<span className="text-masa-orange">WORLD</span>
            </h3>
            <p className="mt-2 text-gray-200 font-semibold text-sm">Global Community. Local Connections.</p>
            <p className="mt-4 text-gray-300 text-sm max-w-sm leading-relaxed">
              Empowering youth, honoring real heroes, and building a responsible society through grassroots action.
            </p>
            <div className="flex mt-6 space-x-4">
                {socialLinks.filter(l => l.enabled).map(link => (
                    <a 
                        key={link.id} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Follow us on ${link.platform}`} 
                        className="text-gray-300 hover:text-masa-orange transition-colors"
                    >
                        {getSocialIcon(link.platform)}
                    </a>
                ))}
             </div>
          </div>

          {/* Column 2: About Us (2 cols) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">About Us</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Get Involved (2 cols) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Get Involved</h4>
            <ul className="space-y-2">
              {involvedLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Resources (2 cols) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Dedicated Contact Section (3 cols) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-3">
            <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Contact Us</h4>
            <ul className="space-y-4">
               <li className="flex items-start">
                  <EnvelopeIcon className="w-5 h-5 text-masa-orange mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                      <a href="mailto:masaworldfoundation@gmail.com" className="text-white hover:text-masa-orange transition-colors text-sm font-medium">masaworldfoundation@gmail.com</a>
                  </div>
              </li>
              <li className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-masa-orange mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                      <p className="text-gray-300 text-sm">New Delhi, India</p>
                      <p className="text-gray-500 text-xs mt-0.5">Connecting Globally</p>
                  </div>
              </li>
              <li className="pt-2">
                  <button 
                    onClick={() => navigateTo('contact')} 
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center group"
                  >
                    Contact Form / Inquiries
                    <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform text-masa-orange" />
                  </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Masa World Foundation. All Rights Reserved.</p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
             {policyLinks.map((link) => (
                <button 
                    key={link.id} 
                    onClick={() => navigateTo(link.page)} 
                    className="hover:text-masa-orange transition-colors duration-200 text-xs"
                >
                    {link.label}
                </button>
             ))}
             <button 
                onClick={() => navigateTo('admin-login')} 
                className="hover:text-masa-orange transition-colors duration-200 text-xs"
             >
                Admin Login
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
