import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummarySection = ({ orderItems, deliveryCharge, onOrderUpdate, isCollapsed, onToggleCollapse }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const mockOrderItems = orderItems || [
    {
      id: 1,
      name: 'Basmati Rice Premium',
      quantity: 10,
      unit: '25kg bags',
      unitPrice: 2500,
      originalPrice: 2800,
      discount: 300,
      total: 25000,
      gst: 5
    },
    {
      id: 2,
      name: 'Wheat Flour Grade A',
      quantity: 5,
      unit: '50kg bags',
      unitPrice: 1800,
      originalPrice: 2000,
      discount: 200,
      total: 9000,
      gst: 5
    },
    {
      id: 3,
      name: 'Cooking Oil Refined',
      quantity: 8,
      unit: '15L containers',
      unitPrice: 1200,
      originalPrice: 1300,
      discount: 100,
      total: 9600,
      gst: 12
    }
  ];

  const subtotal = mockOrderItems.reduce((sum, item) => sum + item.total, 0);
  const totalDiscount = mockOrderItems.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
  const gstAmount = mockOrderItems.reduce((sum, item) => sum + ((item.total * item.gst) / 100), 0);
  const deliveryCharges = deliveryCharge || 0;
  const promoDiscount = appliedPromo?.discount || 0;
  const finalTotal = subtotal + gstAmount + deliveryCharges - promoDiscount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePromoApply = () => {
    // Mock promo code validation
    const promoCodes = {
      'BULK10': { discount: 1000, description: '₹1000 off on bulk orders' },
      'FIRST20': { discount: 2000, description: '₹2000 off for first-time buyers' },
      'SAVE500': { discount: 500, description: '₹500 instant discount' }
    };

    if (promoCodes[promoCode]) {
      setAppliedPromo({
        code: promoCode,
        ...promoCodes[promoCode]
      });
    } else {
      setAppliedPromo({ error: 'Invalid promo code' });
    }
  };

  const handlePromoRemove = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  return (
    <div className="bg-surface border border-border rounded-lg sticky top-24">
      {/* Mobile Toggle Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
          iconPosition="right"
        >
          {formatCurrency(finalTotal)}
        </Button>
      </div>

      {/* Order Summary Content */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        <div className="hidden md:block p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b border-border max-h-64 overflow-y-auto">
          <div className="space-y-4">
            {mockOrderItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-text-secondary">
                    {item.quantity} × {item.unit}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-data font-medium text-text-primary">
                      {formatCurrency(item.unitPrice)}
                    </span>
                    {item.originalPrice > item.unitPrice && (
                      <span className="text-xs text-text-muted line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-data font-medium text-text-primary">
                    {formatCurrency(item.total)}
                  </p>
                  {item.discount > 0 && (
                    <p className="text-xs text-success-600">
                      Save {formatCurrency(item.discount * item.quantity)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div className="p-6 border-b border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={appliedPromo && !appliedPromo.error}
            />
            {appliedPromo && !appliedPromo.error ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePromoRemove}
                iconName="X"
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePromoApply}
                disabled={!promoCode}
              >
                Apply
              </Button>
            )}
          </div>
          {appliedPromo && (
            <div className={`mt-2 text-sm ${appliedPromo.error ? 'text-error' : 'text-success-600'}`}>
              {appliedPromo.error || appliedPromo.description}
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal ({mockOrderItems.length} items)</span>
            <span className="font-data text-text-primary">{formatCurrency(subtotal)}</span>
          </div>
          
          {totalDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Bulk Discount</span>
              <span className="font-data text-success-600">-{formatCurrency(totalDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">GST</span>
            <span className="font-data text-text-primary">{formatCurrency(gstAmount)}</span>
          </div>

          {deliveryCharges > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Delivery Charges</span>
              <span className="font-data text-text-primary">{formatCurrency(deliveryCharges)}</span>
            </div>
          )}

          {promoDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Promo Discount ({appliedPromo.code})</span>
              <span className="font-data text-success-600">-{formatCurrency(promoDiscount)}</span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-text-primary">Total Amount</span>
              <span className="font-data font-bold text-lg text-primary">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Savings Summary */}
          {(totalDiscount + promoDiscount) > 0 && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={16} className="text-success-600" />
                <span className="text-sm font-medium text-success-800">
                  You're saving {formatCurrency(totalDiscount + promoDiscount)} on this order!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummarySection;