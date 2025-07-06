import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationToggle = ({ 
  isAuthenticated, 
  onAuthStateChange, 
  onNavigateToLogin, 
  onNavigateToRegister,
  isMobile = false 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Load user profile from localStorage or API
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      } else {
        // Default profile for demo
        setUserProfile({
          name: 'Business User',
          email: 'user@business.com',
          company: 'Sample Company',
          role: 'Procurement Manager'
        });
      }
    } else {
      setUserProfile(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setShowDropdown(false);
    onNavigateToLogin();
  };

  const handleRegister = () => {
    setShowDropdown(false);
    onNavigateToRegister();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('cartItems');
    onAuthStateChange(false);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Mobile Layout
  if (isMobile) {
    if (!isAuthenticated) {
      return (
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={handleLogin}
            className="w-full"
            iconName="LogIn"
            iconPosition="left"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            onClick={handleRegister}
            className="w-full"
            iconName="UserPlus"
            iconPosition="left"
          >
            Register
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
            {userProfile ? getInitials(userProfile.name) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {userProfile?.name || 'User'}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {userProfile?.company || 'Company'}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => {}}
            className="w-full justify-start"
            iconName="User"
            iconPosition="left"
          >
            Profile Settings
          </Button>
          <Button
            variant="ghost"
            onClick={() => {}}
            className="w-full justify-start"
            iconName="FileText"
            iconPosition="left"
          >
            Order History
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-error hover:text-error hover:bg-error-50"
            iconName="LogOut"
            iconPosition="left"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // Desktop Layout
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogin}
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleRegister}
          iconName="UserPlus"
          iconPosition="left"
        >
          Register
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleProfileClick}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-50 transition-micro"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
          {userProfile ? getInitials(userProfile.name) : 'U'}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-text-primary">
            {userProfile?.name || 'User'}
          </p>
          <p className="text-xs text-text-secondary">
            {userProfile?.role || 'User'}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation-2 py-2 z-50 animate-slide-down">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border-light">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                {userProfile ? getInitials(userProfile.name) : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {userProfile?.name || 'User'}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {userProfile?.email || 'user@example.com'}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {userProfile?.company || 'Company'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            >
              <Icon name="User" size={16} />
              <span>Profile Settings</span>
            </button>
            
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            >
              <Icon name="FileText" size={16} />
              <span>Order History</span>
            </button>
            
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            >
              <Icon name="Settings" size={16} />
              <span>Account Settings</span>
            </button>
            
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Support</span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-border-light pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-micro"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationToggle;