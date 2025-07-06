import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationSuccess = ({ formData }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Set temporary authentication for browsing
    localStorage.setItem('tempAccess', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: formData.contactPersonName,
      email: formData.email,
      company: formData.companyName,
      role: formData.designation,
      status: 'pending_verification'
    }));
    navigate('/product-catalog');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const verificationSteps = [
    {
      step: 1,
      title: 'Document Review',
      description: 'Our team will verify your uploaded documents',
      timeframe: '24-48 hours',
      status: 'pending'
    },
    {
      step: 2,
      title: 'Business Verification',
      description: 'We may contact you for additional verification',
      timeframe: '1-2 business days',
      status: 'upcoming'
    },
    {
      step: 3,
      title: 'Account Activation',
      description: 'Full wholesale access will be granted',
      timeframe: 'Upon verification',
      status: 'upcoming'
    }
  ];

  const tempAccess = [
    'Browse our complete product catalog',
    'View wholesale pricing tiers',
    'Add products to cart (checkout disabled)',
    'Access product specifications and bulk quantities'
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} color="white" />
      </div>

      {/* Success Message */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
          Registration Successful!
        </h1>
        <p className="text-lg text-text-secondary mb-2">
          Welcome to WholesaleHub, {formData.contactPersonName}!
        </p>
        <p className="text-text-secondary">
          Your wholesale account for <strong>{formData.companyName}</strong> has been created successfully.
        </p>
      </div>

      {/* Verification Timeline */}
      <div className="bg-surface border border-border rounded-lg p-6 text-left">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4 text-center">
          Verification Process
        </h2>
        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.status === 'pending' ?'bg-warning text-warning-foreground' :'bg-secondary-200 text-text-muted'
              }`}>
                {step.status === 'pending' ? (
                  <Icon name="Clock" size={16} />
                ) : (
                  <span className="text-sm font-medium">{step.step}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">{step.title}</h3>
                <p className="text-sm text-text-secondary mb-1">{step.description}</p>
                <span className="text-xs text-warning font-medium">{step.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temporary Access */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="Eye" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-800 mb-1">Browse While We Verify</h3>
            <p className="text-sm text-primary-700">
              You can explore our platform with limited access while your documents are being verified.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {tempAccess.map((access, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-primary-700">{access}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
        <h3 className="font-medium text-text-primary mb-3">We'll Keep You Updated</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Mail" size={16} className="text-secondary-600" />
            <span>Email updates to: {formData.email}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Phone" size={16} className="text-secondary-600" />
            <span>SMS updates to: +91 {formData.mobileNumber}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          onClick={handleContinue}
          iconName="ShoppingBag"
          iconPosition="right"
          className="sm:w-auto"
        >
          Browse Products
        </Button>
        <Button
          variant="outline"
          onClick={handleLogin}
          iconName="LogIn"
          iconPosition="left"
          className="sm:w-auto"
        >
          Go to Login
        </Button>
      </div>

      {/* Support Contact */}
      <div className="text-center pt-6 border-t border-border">
        <p className="text-sm text-text-secondary mb-2">
          Questions about your registration?
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <a 
            href="tel:+919876543210" 
            className="flex items-center space-x-1 text-primary hover:text-primary-700"
          >
            <Icon name="Phone" size={14} />
            <span>+91 98765 43210</span>
          </a>
          <a 
            href="mailto:support@wholesalehub.com" 
            className="flex items-center space-x-1 text-primary hover:text-primary-700"
          >
            <Icon name="Mail" size={14} />
            <span>support@wholesalehub.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;