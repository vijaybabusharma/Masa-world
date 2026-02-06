
import React, { useState, useEffect } from 'react';
import { NavigationProps, Page, SocialLink, NavItem } from '../types';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './icons/SocialIcons';
import { EnvelopeIcon, MapPinIcon, ArrowRightIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';

const Footer: React.FC<NavigationProps> = ({ navigateTo }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [navLinks, setNavLinks] = useState({
    about: [] as NavItem[],
    work: [] as NavItem[],
    involved: [] as NavItem[],
    resources: [] as NavItem[],
    policies: [] as NavItem[],
  });

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

  const renderLinkList = (links: NavItem[]) => (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.id}>
          <button onClick={() => navigateTo(link.page)} className="text-gray-300 hover:text-masa-orange transition-colors duration-300 text-sm text-left">
            {link.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 xl:gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-2 xl:col-span-3">
            <button onClick={() => navigateTo('home')} className="text-left">
                <h3 className="text-2xl font-bold">MASA<span className="text-masa-orange">WORLD</span></h3>
            </button>
            <p className="mt-4 text-gray-400 text-sm">A global movement dedicated to empowering youth and building stronger nations by providing holistic development opportunities.</p>
             <div className="flex mt-6 space-x-4">
                {socialLinks.filter(l => l.enabled).map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${link.platform}`} className="text-gray-400 hover:text-masa-orange transition-colors">
                        {getSocialIcon(link.platform)}
                    </a>
                ))}
             </div>
          </div>

          {/* Link Columns */}
          <div className="xl:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">About Us</h4>
                {renderLinkList(navLinks.about)}
              </div>
              
              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Our Work</h4>
                {renderLinkList(navLinks.work)}
              </div>

              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Get Involved</h4>
                {renderLinkList(navLinks.involved)}
              </div>
              
              <div className="col-span-1">
                <h4 className="font-semibold tracking-wider uppercase text-gray-400 text-sm mb-4">Resources</h4>
                {renderLinkList(navLinks.resources)}
              </div>
          </div>
          
          {/* New Contact Block */}
          <div className="md:col-span-2 xl:col-span-3 bg-masa-blue/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h4 className="font-semibold tracking-wider uppercase text-gray-300 text-sm mb-4">Connect With Us</h4>
            <p className="text-gray-300 text-sm mb-6">Have a question or a proposal? We'd love to hear from you.</p>
            <div className="mb-6">
                <a href="mailto:masaworldfoundation@gmail.com" className="group flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                    <EnvelopeIcon className="w-6 h-6 text-masa-orange flex-shrink-0" />
                    <span className="font-medium group-hover:underline break-all">masaworldfoundation@gmail.com</span>
                </a>
            </div>

            {/*
              BUTTON STYLE VARIATIONS
              To change the button style, copy a `className` string from an option below and replace the one on the <button> element.

              1. Solid with Soft Glow (Currently Active):
                 A bold, confident CTA with an elevated feel.
                 className="group w-full bg-masa-orange text-white py-3 px-6 rounded-full font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"

              2. Outline with Fill Animation:
                 A modern, high-contrast style for a clean look.
                 className="group w-full bg-transparent border-2 border-masa-orange text-masa-orange py-3 px-6 rounded-full font-bold hover:bg-masa-orange hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"

              3. Gradient for a Premium Feel:
                 A subtle gradient that adds depth and a modern touch.
                 className="group w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"

              4. Minimal Flat Style:
                 A clean, flat style with a simple color shift on hover.
                 className="group w-full bg-transparent text-masa-orange py-3 px-6 rounded-full font-bold transition-colors duration-300 flex items-center justify-center gap-2 hover:text-orange-400"
            */}
            <button 
                onClick={() => navigateTo('contact')} 
                className="group w-full bg-masa-orange text-white py-3 px-6 rounded-full font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
                <span>Send a Message</span>
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0 text-center md:text-left">&copy; {new Date().getFullYear()} Masa World Foundation. All Rights Reserved.</p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
             {navLinks.policies.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.page)} className="hover:text-masa-orange transition-colors duration-200 text-xs py-1">
                    {link.label}
                </button>
             ))}
             <button onClick={() => navigateTo('admin-login')} className="hover:text-masa-orange transition-colors duration-200 text-xs py-1">Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;