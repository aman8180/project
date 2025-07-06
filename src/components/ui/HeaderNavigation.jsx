import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

import CartIndicator from './CartIndicator';
import AuthenticationToggle from './AuthenticationToggle';
import SearchIntegration from './SearchIntegration';

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true
    },
    {
      label: 'Products',
      path: '/product-catalog',
      icon: 'Package',
      requiresAuth: false
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleAuthStateChange = (authState) => {
    setIsAuthenticated(authState);
    localStorage.setItem('isAuthenticated', authState.toString());
  };

  const handleCartUpdate = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-micro"
            >
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Icon name="Package" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                WholesaleHub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              if (item.requiresAuth && !isAuthenticated) return null;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Integration - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchIntegration />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Indicator */}
            <CartIndicator 
              items={cartItems} 
              onCartUpdate={handleCartUpdate}
              onNavigateToCart={() => handleNavigation('/shopping-cart')}
            />

            {/* Authentication Toggle */}
            <AuthenticationToggle
              isAuthenticated={isAuthenticated}
              onAuthStateChange={handleAuthStateChange}
              onNavigateToLogin={() => handleNavigation('/login')}
              onNavigateToRegister={() => handleNavigation('/register')}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-elevation-2">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchIntegration isMobile={true} />
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                if (item.requiresAuth && !isAuthenticated) return null;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-micro ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t border-border">
              <AuthenticationToggle
                isAuthenticated={isAuthenticated}
                onAuthStateChange={handleAuthStateChange}
                onNavigateToLogin={() => handleNavigation('/login')}
                onNavigateToRegister={() => handleNavigation('/register')}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNavigation;