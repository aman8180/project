import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfirmationMessage = ({ orderData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEstimatedDeliveryDate = () => {
    const orderDate = new Date(orderData?.date);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Add 3 days for delivery
    return formatDate(deliveryDate);
  };

  return (
    <div className="text-center py-12">
      {/* Success Icon */}
      <div className="mx-auto mb-6 w-20 h-20 bg-success-100 rounded-full flex items-center justify-center">
        <Icon name="CheckCircle" size={48} className="text-success-600" />
      </div>

      {/* Main Message */}
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        Order Placed Successfully!
      </h1>
      
      <p className="text-lg text-text-secondary mb-6">
        Thank you for your wholesale order. We've received your order and will begin processing it shortly.
      </p>

      {/* Order Summary */}
      <div className="bg-surface border border-border rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Order Number:</span>
            <span className="font-semibold text-text-primary">{orderData?.id}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Order Date:</span>
            <span className="font-semibold text-text-primary">
              {formatDate(orderData?.date)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Estimated Delivery:</span>
            <span className="font-semibold text-success-600">
              {getEstimatedDeliveryDate()}
            </span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Total Amount:</span>
              <span className="font-bold text-lg text-text-primary">
                ₹{orderData?.total?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-accent-50 border border-accent-200 rounded-lg p-4 max-w-2xl mx-auto">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-0.5" />
          <div className="text-left">
            <h3 className="font-semibold text-text-primary mb-2">What's Next?</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• GST invoice will be generated within 24 hours</li>
              <li>• Order tracking details will be sent to your registered email</li>
              <li>• Our team will contact you for delivery confirmation</li>
              <li>• Payment due within 30 days as per credit terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;