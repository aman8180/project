import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import RegistrationSteps from './components/RegistrationSteps';
import BusinessInformationForm from './components/BusinessInformationForm';
import ContactDetailsForm from './components/ContactDetailsForm';
import VerificationDocumentsForm from './components/VerificationDocumentsForm';
import AccountSetupForm from './components/AccountSetupForm';
import WholesaleBenefits from './components/WholesaleBenefits';
import RegistrationSuccess from './components/RegistrationSuccess';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Business Information
    companyName: '',
    gstNumber: '',
    businessType: '',
    businessAddress: '',
    pincode: '',
    city: '',
    state: '',
    
    // Contact Details
    contactPersonName: '',
    designation: '',
    mobileNumber: '',
    email: '',
    alternateNumber: '',
    whatsappNumber: '',
    openingTime: '09:00',
    closingTime: '18:00',
    
    // Verification Documents
    gstCertificate: '',
    businessLicense: '',
    panCard: '',
    addressProof: '',
    
    // Account Setup
    password: '',
    confirmPassword: '',
    marketingEmails: false
  });

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Load saved form data if exists
    const savedFormData = localStorage.getItem('registrationFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const savedStep = localStorage.getItem('registrationStep');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, [navigate]);

  // Auto-save form data
  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key])) {
      localStorage.setItem('registrationFormData', JSON.stringify(formData));
      localStorage.setItem('registrationStep', currentStep.toString());
    }
  }, [formData, currentStep]);

  const handleNext = (stepErrors) => {
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (stepErrors) => {
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Clear saved form data
        localStorage.removeItem('registrationFormData');
        localStorage.removeItem('registrationStep');
        
        setIsCompleted(true);
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInformationForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ContactDetailsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <VerificationDocumentsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <AccountSetupForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Business Information';
      case 2:
        return 'Contact Details';
      case 3:
        return 'Verification Documents';
      case 4:
        return 'Account Setup';
      default:
        return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us about your business to get started with wholesale pricing';
      case 2:
        return 'Provide your contact information for account management';
      case 3:
        return 'Upload required documents for business verification';
      case 4:
        return 'Create your account credentials and review terms';
      default:
        return '';
    }
  };

  if (isCompleted) {
    return (
      <>
        <Helmet>
          <title>Registration Successful - WholesaleHub</title>
          <meta name="description" content="Your wholesale account has been created successfully. Start browsing our product catalog while we verify your documents." />
        </Helmet>
        <div className="min-h-screen bg-background">
          <HeaderNavigation />
          <main className="pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <RegistrationSuccess formData={formData} />
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register for Wholesale Account - WholesaleHub</title>
        <meta name="description" content="Create your wholesale account to access bulk pricing, minimum order benefits, and streamlined B2B grocery ordering." />
        <meta name="keywords" content="wholesale registration, B2B account, bulk pricing, grocery wholesale, business account" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="lg:col-span-2">
                <div className="bg-surface border border-border rounded-lg shadow-elevation-1 p-6 lg:p-8">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                          Create Wholesale Account
                        </h1>
                        <p className="text-text-secondary mt-2">
                          Join thousands of businesses saving on bulk grocery orders
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <Button
                          variant="ghost"
                          onClick={handleLoginRedirect}
                          iconName="LogIn"
                          iconPosition="left"
                          size="sm"
                        >
                          Already have an account?
                        </Button>
                      </div>
                    </div>
                    
                    <RegistrationSteps currentStep={currentStep} totalSteps={4} />
                  </div>

                  {/* Step Content */}
                  <div className="mb-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                        {getStepTitle()}
                      </h2>
                      <p className="text-text-secondary">
                        {getStepDescription()}
                      </p>
                    </div>

                    {/* Loading Overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-surface bg-opacity-75 flex items-center justify-center z-50 rounded-lg">
                        <div className="text-center">
                          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
                          <p className="text-text-primary font-medium">Creating your account...</p>
                          <p className="text-text-secondary text-sm">This may take a few moments</p>
                        </div>
                      </div>
                    )}

                    {/* Form Content */}
                    <div className="relative">
                      {renderCurrentStep()}
                    </div>

                    {/* Global Error */}
                    {errors.submit && (
                      <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon name="AlertCircle" size={16} className="text-error" />
                          <p className="text-error text-sm">{errors.submit}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Login Link */}
                  <div className="sm:hidden text-center pt-6 border-t border-border">
                    <p className="text-text-secondary text-sm mb-2">
                      Already have an account?
                    </p>
                    <Button
                      variant="ghost"
                      onClick={handleLoginRedirect}
                      iconName="LogIn"
                      iconPosition="left"
                      size="sm"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>

              {/* Benefits Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <WholesaleBenefits />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;