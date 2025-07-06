import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      name: 'GST Compliant',
      icon: 'Shield',
      description: 'Registered GST Provider'
    },
    {
      id: 2,
      name: 'Secure Payments',
      icon: 'Lock',
      description: 'SSL Encrypted Transactions'
    },
    {
      id: 3,
      name: 'Business Verified',
      icon: 'CheckCircle',
      description: 'Government Verified Entity'
    },
    {
      id: 4,
      name: 'ISO Certified',
      icon: 'Award',
      description: 'Quality Management System'
    }
  ];

  const paymentGateways = [
    {
      id: 1,
      name: 'Razorpay',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=40&fit=crop&crop=center',
      alt: 'Razorpay Payment Gateway'
    },
    {
      id: 2,
      name: 'Paytm',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=40&fit=crop&crop=center',
      alt: 'Paytm Business'
    },
    {
      id: 3,
      name: 'UPI',
      logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=120&h=40&fit=crop&crop=center',
      alt: 'UPI Payments'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'FSSAI Licensed',
      number: 'LIC-12345678901234',
      icon: 'FileText'
    },
    {
      id: 2,
      name: 'GST Registration',
      number: 'GSTIN: 27ABCDE1234F1Z5',
      icon: 'Building'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 text-center">
          Trusted by 10,000+ Businesses
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {trustBadges.map((badge) => (
            <div key={badge.id} className="flex items-center space-x-3 p-3 bg-success-50 rounded-md">
              <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center">
                <Icon name={badge.icon} size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{badge.name}</p>
                <p className="text-xs text-text-secondary">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-heading font-medium text-text-primary mb-4 text-center">
          Secure Payment Partners
        </h4>
        <div className="flex items-center justify-center space-x-6">
          {paymentGateways.map((gateway) => (
            <div key={gateway.id} className="flex items-center justify-center p-2 bg-secondary-50 rounded border">
              <div className="w-20 h-8 overflow-hidden rounded">
                <Image
                  src={gateway.logo}
                  alt={gateway.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-heading font-medium text-text-primary mb-4 text-center">
          Business Certifications
        </h4>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center space-x-3 p-3 bg-primary-50 rounded-md">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Icon name={cert.icon} size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{cert.name}</p>
                <p className="text-xs text-text-secondary font-data">{cert.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-secondary mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-1">
              Your Data is Protected
            </h5>
            <p className="text-xs text-text-secondary leading-relaxed">
              We use bank-grade encryption to protect your business information and transaction data. 
              Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Support */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-text-secondary">
          <Icon name="Phone" size={16} />
          <span className="text-sm">24/7 Business Support: +91-9876543210</span>
        </div>
        <div className="inline-flex items-center space-x-2 text-text-secondary mt-2">
          <Icon name="Mail" size={16} />
          <span className="text-sm">support@wholesalehub.com</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;