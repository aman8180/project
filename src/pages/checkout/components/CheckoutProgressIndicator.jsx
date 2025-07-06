import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgressIndicator = ({ currentStep, completedSteps }) => {
  const steps = [
    {
      id: 'address',
      label: 'Delivery Address',
      icon: 'MapPin'
    },
    {
      id: 'billing',
      label: 'Billing Info',
      icon: 'FileText'
    },
    {
      id: 'payment',
      label: 'Payment Method',
      icon: 'Wallet'
    },
    {
      id: 'review',
      label: 'Review & Place Order',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (currentStep === stepId) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-micro ${
                  status === 'completed'
                    ? 'bg-success-600 border-success-600 text-success-foreground'
                    : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-surface border-border text-text-muted'
                }`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`text-xs mt-2 text-center font-medium ${
                  status === 'completed' || status === 'current'
                    ? 'text-text-primary' :'text-text-muted'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {!isLast && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  completedSteps.includes(step.id)
                    ? 'bg-success-600' :'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgressIndicator;