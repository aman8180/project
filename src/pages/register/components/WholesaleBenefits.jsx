import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WholesaleBenefits = () => {
  const benefits = [
    {
      icon: 'TrendingDown',
      title: 'Bulk Pricing',
      description: 'Save up to 30% on bulk orders above ₹10,000',
      highlight: '₹10,000+ orders'
    },
    {
      icon: 'Truck',
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹15,000',
      highlight: 'Free shipping'
    },
    {
      icon: 'Clock',
      title: 'Quick Processing',
      description: 'Orders processed within 24 hours',
      highlight: '24hr processing'
    },
    {
      icon: 'Shield',
      title: 'Quality Assured',
      description: 'Premium quality products with freshness guarantee',
      highlight: '100% quality'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Restaurant Chain',
      rating: 5,
      comment: `WholesaleHub has transformed our procurement process. We save ₹50,000+ monthly on grocery costs with their bulk pricing.`,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Priya Sharma',
      business: 'Sharma Catering Services',
      rating: 5,
      comment: `Excellent service and quality products. The minimum order requirement is very reasonable for our business needs.`,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const trustSignals = [
    { icon: 'Shield', text: 'GST Compliant' },
    { icon: 'Award', text: 'ISO Certified' },
    { icon: 'Users', text: '5000+ Businesses' },
    { icon: 'Star', text: '4.8/5 Rating' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Package" size={32} color="white" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Join WholesaleHub
        </h2>
        <p className="text-text-secondary">
          India's trusted B2B grocery platform for wholesale buyers
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Wholesale Benefits
        </h3>
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-surface border border-border rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary mb-1">{benefit.title}</h4>
                <p className="text-sm text-text-secondary mb-2">{benefit.description}</p>
                <span className="inline-block px-2 py-1 bg-accent-100 text-accent-800 text-xs font-medium rounded">
                  {benefit.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum Order Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-800 mb-2">Minimum Order Requirement</h3>
            <p className="text-sm text-primary-700 mb-3">
              To maintain wholesale pricing and ensure cost-effective delivery, we require a minimum order value of ₹10,000 per transaction.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-primary-700">Bulk pricing on all products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-primary-700">Priority order processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-primary-700">Dedicated account manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Trusted by Businesses
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-success-50 border border-success-200 rounded-lg">
              <Icon name={signal.icon} size={16} className="text-success" />
              <span className="text-sm font-medium text-success-800">{signal.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          What Our Customers Say
        </h3>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 bg-surface border border-border rounded-lg">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial.business}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-secondary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary mb-1">Need Help?</h3>
            <p className="text-sm text-text-secondary mb-2">
              Our team is here to assist you with the registration process.
            </p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-secondary-600" />
                <span className="text-sm text-text-primary">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-secondary-600" />
                <span className="text-sm text-text-primary">support@wholesalehub.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleBenefits;