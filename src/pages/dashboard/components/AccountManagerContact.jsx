import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountManagerContact = () => {
  const accountManager = {
    name: "Priya Sharma",
    designation: "Senior Account Manager",
    phone: "+91 98765 43210",
    email: "priya.sharma@wholesalehub.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    availability: "Available",
    responseTime: "Usually responds within 2 hours",
    languages: ["English", "Hindi", "Gujarati"]
  };

  const quickActions = [
    {
      label: "Schedule Call",
      icon: "Phone",
      action: "call"
    },
    {
      label: "Send Message",
      icon: "MessageCircle",
      action: "message"
    },
    {
      label: "Request Quote",
      icon: "FileText",
      action: "quote"
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Your Account Manager</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs text-success font-medium">{accountManager.availability}</span>
        </div>
      </div>

      {/* Manager Profile */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary-100">
          <img
            src={accountManager.avatar}
            alt={accountManager.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{accountManager.name}</h4>
          <p className="text-sm text-text-secondary">{accountManager.designation}</p>
          <p className="text-xs text-text-muted mt-1">{accountManager.responseTime}</p>
          
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="Languages" size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted">
              {accountManager.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={16} className="text-text-muted" />
          <span className="text-sm text-text-primary font-data">{accountManager.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Mail" size={16} className="text-text-muted" />
          <span className="text-sm text-text-primary">{accountManager.email}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        {quickActions.map((action) => (
          <Button
            key={action.action}
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="w-full justify-start"
            iconName={action.icon}
            iconPosition="left"
          >
            {action.label}
          </Button>
        ))}
      </div>

      {/* Support Hours */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Clock" size={14} className="text-text-muted" />
          <span className="text-xs font-medium text-text-primary">Support Hours</span>
        </div>
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 7:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Emergency only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagerContact;