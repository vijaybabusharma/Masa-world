
import React, { useState } from 'react';
import { Page } from '../types';
import { MenuIcon, XIcon, ChevronDownIcon } from './icons/UiIcons';
import { HeartIcon, SparklesIcon } from './icons/FeatureIcons';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
}

interface NavItem {
  label: string;
  page: Page;
}

interface DropdownNavItem {
    label: string;
    page: Page;
    subItems: NavItem[];
}

function isDropdown(item: NavItem | DropdownNavItem): item is DropdownNavItem {
    return 'subItems' in item && Array.isArray((item as DropdownNavItem).subItems);
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);

  const navItems: (NavItem | DropdownNavItem)[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Initiatives', page: 'initiatives' },
    { label: 'Events', page: 'events' },
    { label: 'NGO Help Desk', page: 'ngo-help-desk' },
    { 
      label: 'Get Involved', 
      page: 'get-involved',
      subItems: [
        { label: 'Overview', page: 'get-involved' },
        { label: 'Volunteer', page: 'volunteer' },
        { label: 'Become a Member', page: 'membership' },
        { label: 'Careers & Internships', page: 'careers' },
        { label: 'Partner With Us', page: 'contact' },
        { label: 'Pledge Platform', page: 'pledge-platform' }
      ]
    },
  ];

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
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigateTo('home')} className="flex-shrink-0">
              <img src="/logo.svg" alt="MASA World Foundation" className="h-10 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation & Donate Button */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => (
                isDropdown(item) ? (
                  <div key={item.label} className="relative group">
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.label}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-masa-orange"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      currentPage === item.page
                        ? 'text-masa-orange font-semibold'
                        : 'text-gray-700 hover:text-masa-orange'
                    }`}
                  >
                    {item.label === 'NGO Help Desk' && <SparklesIcon className="h-4 w-4" />}
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            <button 
                onClick={() => navigateTo('donate')} 
                className="bg-masa-orange text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5"
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
        <div className="lg:hidden bg-white border-t border-gray-100 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-1">
            {navItems.map((item) => (
              isDropdown(item) ? (
                <div key={item.label}>
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
                    <div className="pl-6 pt-2 pb-1 space-y-1">
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.label}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium flex items-center gap-2 ${
                    currentPage === item.page ? 'text-masa-orange bg-orange-50' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {item.label === 'NGO Help Desk' && <SparklesIcon className="h-5 w-5" />}
                  {item.label}
                </button>
              )
            ))}
            
            {/* Mobile Donate Button */}
            <div className="pt-6 px-2">
                <button 
                    onClick={() => handleNavClick('donate')} 
                    className="w-full bg-masa-orange text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 shadow-md transition-colors duration-300 flex items-center justify-center gap-2"
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
