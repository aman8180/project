import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 text-primary hover:text-primary-700 transition-micro"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} color="white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-heading font-bold text-text-primary">
                WholesaleHub
              </h1>
              <p className="text-xs text-text-secondary">
                B2B Grocery Platform
              </p>
            </div>
          </button>

          {/* Trust Indicators */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Shield" size={16} />
              <span className="text-sm font-medium">GST Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Lock" size={16} />
              <span className="text-sm font-medium">Secure Login</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Verified Business</span>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-text-secondary">
              New to WholesaleHub?
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegisterClick}
              iconName="UserPlus"
              iconPosition="left"
            >
              Register Business
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;