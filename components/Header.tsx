
import React, { useState, useEffect } from 'react';
import { Page, NavItem, DropdownNavItem, MenuItem } from '../types';
import { MenuIcon, XIcon, ChevronDownIcon } from './icons/UiIcons';
import { HeartIcon } from './icons/FeatureIcons';
import { ContentManager } from '../utils/contentManager';

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
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const loadNav = () => {
        const settings = ContentManager.getSettings();
        setNavItems(settings.navigation.headerMenu);
    };
    loadNav();
    window.addEventListener('masa-settings-updated', loadNav);
    return () => window.removeEventListener('masa-settings-updated', loadNav);
  }, []);

  const handleNavClick = (page: Page) => {
    navigateTo(page);
    setIsMenuOpen(false);
    setOpenMobileSubMenu(null);
  };

  const toggleMobileSubMenu = (label: string) => {
    setOpenMobileSubMenu(prev => prev === label ? null : label);
  };

  const isPageInDropdown = (item: DropdownNavItem, page: Page) => {
    return item.subItems.some(sub => sub.page === page);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white shadow-none'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigateTo('home')} className="flex-shrink-0 focus:outline-none">
              <img 
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/AMq4Dg7v0wH5yKM1/masa-logo-3d-png-m2W40Q8zKOtLb3Xj.png" 
                alt="MASA World Foundation" 
                className="h-12 w-auto" 
                onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/logo.svg') {
                        target.src = '/logo.svg'; 
                    }
                }} 
              />
            </button>
          </div>

          {/* Desktop Navigation & Donate Button */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => (
                isDropdown(item) ? (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item.page)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                        currentPage === item.page || isPageInDropdown(item, currentPage)
                          ? 'text-masa-orange font-semibold'
                          : 'text-gray-700 hover:text-masa-orange'
                      }`}
                    >
                      {item.label}
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible border border-gray-100">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-masa-orange transition-colors"
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
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      currentPage === item.page
                        ? 'text-masa-orange font-semibold'
                        : 'text-gray-700 hover:text-masa-orange'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            <button 
                onClick={() => navigateTo('donate')} 
                className="bg-masa-orange text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5 active:scale-95"
            >
                <HeartIcon className="h-4 w-4" />
                <span>Donate</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-masa-orange focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto shadow-xl z-40">
          <div className="px-4 pt-4 pb-20 space-y-2">
            {navItems.map((item) => (
              isDropdown(item) ? (
                <div key={item.id} className="border-b border-gray-50 pb-2">
                  <button
                    onClick={() => toggleMobileSubMenu(item.label)}
                    className={`w-full text-left px-4 py-3 rounded-md text-base font-medium flex justify-between items-center ${
                      currentPage === item.page || isPageInDropdown(item, currentPage) ? 'text-masa-orange bg-orange-50' : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${openMobileSubMenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileSubMenu === item.label && (
                    <div className="pl-6 pr-2 pt-2 pb-2 space-y-1 bg-gray-50 rounded-b-lg">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-white hover:text-masa-orange transition-colors"
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
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium flex items-center gap-2 border-b border-gray-50 last:border-0 ${
                    currentPage === item.page ? 'text-masa-orange bg-orange-50' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            
            {/* Mobile Donate Button */}
            <div className="pt-6 px-4">
                <button 
                    onClick={() => handleNavClick('donate')} 
                    className="w-full bg-masa-orange text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 shadow-md transition-colors duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                    <HeartIcon className="h-5 w-5" />
                    <span>Donate Now</span>
                </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
