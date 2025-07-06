import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderDetails = ({ orderData }) => {
  const calculateSubtotal = () => {
    return orderData?.items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;
  };

  const calculateGST = () => {
    return orderData?.items?.reduce((sum, item) => {
      const gstAmount = (item.total || 0) * ((item.gst || 0) / 100);
      return sum + gstAmount;
    }, 0) || 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Order Items */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Order Items</h2>
        
        <div className="space-y-4">
          {orderData?.items?.map((item, index) => (
            <div key={item.id || index} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">{item.name}</h3>
                <p className="text-sm text-text-secondary mt-1">
                  {item.quantity} × {item.unit} @ ₹{item.unitPrice?.toLocaleString('en-IN')} each
                </p>
                {item.discount > 0 && (
                  <p className="text-sm text-success-600 mt-1">
                    Discount: ₹{item.discount?.toLocaleString('en-IN')}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">
                  ₹{item.total?.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-text-secondary">
                  GST: {item.gst}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Subtotal:</span>
              <span className="font-medium text-text-primary">
                ₹{calculateSubtotal().toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">GST:</span>
              <span className="font-medium text-text-primary">
                ₹{calculateGST().toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-lg font-semibold text-text-primary">Total:</span>
              <span className="text-lg font-bold text-text-primary">
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Delivery Address
          </h3>
          <div className="space-y-1 text-sm text-text-secondary">
            <p className="font-medium text-text-primary">{orderData?.address?.businessName}</p>
            <p>{orderData?.address?.address}</p>
            <p>{orderData?.address?.city}, {orderData?.address?.state} - {orderData?.address?.pincode}</p>
            <p>Phone: {orderData?.address?.phone}</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Payment Information
          </h3>
          <div className="space-y-1 text-sm text-text-secondary">
            <p className="font-medium text-text-primary">{orderData?.payment?.name}</p>
            <p>{orderData?.payment?.description}</p>
            <p className="text-success-600 font-medium">Payment Status: Confirmed</p>
            <p>Due Date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;