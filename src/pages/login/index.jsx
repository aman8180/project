import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';


const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <LoginForm />
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Phone" size={16} />
                <span className="text-sm">Business Helpline: +91-9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Mail" size={16} />
                <span className="text-sm">support@wholesalehub.com</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-text-muted">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Business Terms</span>
              <span>•</span>
              <span>GST Compliance</span>
            </div>
            
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} WholesaleHub. All rights reserved. 
              Registered under Indian Companies Act.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;