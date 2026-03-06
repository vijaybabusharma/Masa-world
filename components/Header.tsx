
import React, { useState, useEffect } from 'react';
import { Page, NavItem, DropdownNavItem, MenuItem, SmartButton, PaymentLink } from '../types';
import { MenuIcon, XIcon, ChevronDownIcon, SearchIcon } from './icons/UiIcons';
import { HeartIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';
import { handleSmartButtonClick } from '../utils/buttonHelper';
import { getAssetUrl } from '../utils/assetHelper';
import SearchOverlay from './SearchOverlay';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
}

function isDropdown(item: MenuItem): item is DropdownNavItem {
    return 'subItems' in item && Array.isArray((item as DropdownNavItem).subItems);
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const [navItems, setNavItems] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const [donateBtn, setDonateBtn] = useState<SmartButton | null>(null);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);

  const [logo, setLogo] = useState<string>('');
  const [siteName, setSiteName] = useState<string>('');

  useEffect(() => {
    const loadSettings = () => {
        const settings = ContentManager.getSettings();
        setNavItems(settings.navigation.headerMenu);
        setLogo(settings.general.siteLogo || '');
        setSiteName(settings.general.siteName || '');
        if (settings.buttons && settings.buttons.zones) {
            setDonateBtn(settings.buttons.zones['header_donate']);
            setPaymentLinks(settings.buttons.paymentLinks);
        }
    };
    loadSettings();
    window.addEventListener('masa-settings-updated', loadSettings);
    return () => window.removeEventListener('masa-settings-updated', loadSettings);
  }, []);

  const handleNavClick = (page: Page) => {
    navigateTo(page);
    setIsMenuOpen(false);
    setOpenMobileSubMenu(null);
  };

  const onSmartBtnClick = (btn: SmartButton) => {
      handleSmartButtonClick(btn, paymentLinks, navigateTo);
      setIsMenuOpen(false);
  };

  const toggleMobileSubMenu = (label: string) => {
    setOpenMobileSubMenu(prev => prev === label ? null : label);
  };

  const isPageInDropdown = (item: DropdownNavItem, page: Page) => {
    return item.subItems.some(sub => sub.page === page);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 h-16`}>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigateTo('home')} className="flex-shrink-0 focus:outline-none">
              <img 
                src={getAssetUrl(logo || "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png")} 
                alt={siteName || "MASA World Foundation"} 
                className={`h-10 w-auto transition-all duration-300`}
              />
            </button>
          </div>

          {/* Desktop Navigation & Donate Button */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = isDropdown(item) 
                    ? currentPage === item.page || isPageInDropdown(item, currentPage)
                    : currentPage === item.page;

                const linkClasses = isActive
                    ? 'text-masa-orange font-semibold'
                    : 'text-gray-700 hover:text-masa-orange';
                
                return isDropdown(item) ? (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item.page)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 ${linkClasses}`}
                    >
                      {item.label}
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible border border-gray-100/50 transform origin-top scale-95 group-hover:scale-100">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-6 py-3 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-masa-orange transition-all duration-200"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 ${linkClasses}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {donateBtn && donateBtn.visible && (
                <button 
                    onClick={() => onSmartBtnClick(donateBtn)} 
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 active:scale-95 bg-masa-orange text-white hover:bg-orange-600 shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-0.5`}
                >
                    <HeartIcon className="h-4 w-4" />
                    <span>{donateBtn.label}</span>
                </button>
            )}

            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-masa-blue hover:bg-gray-100 rounded-full transition-all"
                aria-label="Search"
            >
                <SearchIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-masa-blue"
                aria-label="Search"
            >
                <SearchIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 focus:outline-none transition-colors duration-300 text-gray-700 hover:text-masa-orange`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl z-40 animate-fade-in">
          <div className="px-6 pt-8 pb-32 space-y-4">
            {navItems.map((item) => (
              isDropdown(item) ? (
                <div key={item.id} className="border-b border-gray-50 pb-4">
                  <button
                    onClick={() => toggleMobileSubMenu(item.label)}
                    className={`w-full text-left py-4 rounded-xl text-base font-semibold transition-all ${
                      currentPage === item.page || isPageInDropdown(item, currentPage) ? 'text-masa-orange' : 'text-masa-charcoal'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${openMobileSubMenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileSubMenu === item.label && (
                    <div className="mt-2 space-y-2 pl-4 border-l-2 border-orange-100">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left py-3 text-sm font-medium text-gray-500 hover:text-masa-orange transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left py-4 rounded-xl text-base font-semibold border-b border-gray-50 last:border-0 transition-all ${
                    currentPage === item.page ? 'text-masa-orange' : 'text-masa-charcoal'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            
            {/* Mobile Donate Button */}
            {donateBtn && donateBtn.visible && (
                <div className="pt-8">
                    <button 
                        onClick={() => onSmartBtnClick(donateBtn)} 
                        className="w-full bg-masa-orange text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                    >
                        <HeartIcon className="h-5 w-5" />
                        <span>{donateBtn.label}</span>
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        navigateTo={navigateTo} 
      />
    </header>
  );
};

export default Header;
