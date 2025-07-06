import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Business Information', icon: 'Building2' },
    { id: 2, title: 'Contact Details', icon: 'Phone' },
    { id: 3, title: 'Verification Documents', icon: 'FileCheck' },
    { id: 4, title: 'Account Setup', icon: 'UserCheck' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                currentStep > step.id 
                  ? 'bg-success text-success-foreground border-success' 
                  : currentStep === step.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-surface text-text-muted border-border'
              }`}>
                {currentStep > step.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className={`text-xs mt-2 text-center max-w-20 ${
                currentStep >= step.id ? 'text-text-primary font-medium' : 'text-text-muted'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;