import React from 'react';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  onContinueShopping, 
  onViewOrderDetails, 
  onDownloadInvoice, 
  onTrackDelivery 
}) => {
  return (
    <div className="mt-8 space-y-4">
      {/* Primary Action */}
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onContinueShopping}
          iconName="ShoppingCart"
          iconPosition="left"
          className="px-8 py-3"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={onViewOrderDetails}
          iconName="Eye"
          iconPosition="left"
        >
          View Order Details
        </Button>
        
        <Button
          variant="outline"
          onClick={onDownloadInvoice}
          iconName="Download"
          iconPosition="left"
        >
          Download Invoice
        </Button>
        
        <Button
          variant="outline"
          onClick={onTrackDelivery}
          iconName="Truck"
          iconPosition="left"
        >
          Track Delivery
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;