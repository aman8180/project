import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ 
  cartItems, 
  minimumOrderThreshold, 
  onProceedToCheckout,
  estimatedDeliveryDate 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discount = calculateItemDiscount(item);
      const discountedPrice = item.unitPrice * (1 - discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const calculateItemDiscount = (item) => {
    if (item.quantity >= item.tier3Quantity) {
      return item.tier3Discount;
    } else if (item.quantity >= item.tier2Quantity) {
      return item.tier2Discount;
    } else if (item.quantity >= item.tier1Quantity) {
      return item.tier1Discount;
    }
    return 0;
  };

  const calculateTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      const discount = calculateItemDiscount(item);
      const savings = item.unitPrice * item.quantity * (discount / 100);
      return total + savings;
    }, 0);
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const getOrderProgress = () => {
    const currentTotal = calculateTotal();
    const progress = Math.min((currentTotal / minimumOrderThreshold) * 100, 100);
    return {
      progress,
      remaining: Math.max(minimumOrderThreshold - currentTotal, 0),
      qualified: currentTotal >= minimumOrderThreshold
    };
  };

  const orderProgress = getOrderProgress();

  const getNextTierSavings = () => {
    let potentialSavings = 0;
    cartItems.forEach(item => {
      const currentDiscount = calculateItemDiscount(item);
      let nextTierDiscount = 0;
      
      if (item.quantity < item.tier1Quantity) {
        nextTierDiscount = item.tier1Discount;
      } else if (item.quantity < item.tier2Quantity) {
        nextTierDiscount = item.tier2Discount;
      } else if (item.quantity < item.tier3Quantity) {
        nextTierDiscount = item.tier3Discount;
      }
      
      if (nextTierDiscount > currentDiscount) {
        const additionalSavings = item.unitPrice * item.quantity * ((nextTierDiscount - currentDiscount) / 100);
        potentialSavings += additionalSavings;
      }
    });
    
    return potentialSavings;
  };

  const potentialSavings = getNextTierSavings();

  return (
    <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>

      {/* Minimum Order Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Minimum Order Progress</span>
          <span className="text-sm text-text-secondary">
            {formatCurrency(minimumOrderThreshold)}
          </span>
        </div>
        
        <div className="w-full bg-secondary-100 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              orderProgress.qualified ? 'bg-success' : 'bg-primary'
            }`}
            style={{ width: `${orderProgress.progress}%` }}
          />
        </div>
        
        {orderProgress.qualified ? (
          <div className="flex items-center gap-2 text-success text-sm">
            <Icon name="CheckCircle" size={16} />
            <span>Minimum order requirement met!</span>
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            Add {formatCurrency(orderProgress.remaining)} more to qualify for wholesale pricing
          </p>
        )}
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal ({cartItems.length} items)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(calculateSubtotal())}
          </span>
        </div>

        {calculateTotalSavings() > 0 && (
          <div className="flex items-center justify-between text-success">
            <span className="flex items-center gap-1">
              <Icon name="Tag" size={16} />
              Bulk Discount Savings
            </span>
            <span className="font-medium">
              -{formatCurrency(calculateTotalSavings())}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">GST (18%)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(calculateGST())}
          </span>
        </div>

        <div className="border-t border-border-light pt-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-text-primary">Total</span>
            <span className="text-xl font-bold text-text-primary">
              {formatCurrency(calculateTotal())}
            </span>
          </div>
        </div>
      </div>

      {/* Potential Additional Savings */}
      {potentialSavings > 0 && (
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Unlock Additional Savings
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                Increase quantities to reach next bulk tier and save an additional {formatCurrency(potentialSavings)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estimated Delivery */}
      <div className="bg-secondary-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Truck" size={20} className="text-primary" />
          <div>
            <h4 className="text-sm font-medium text-text-primary">Estimated Delivery</h4>
            <p className="text-sm text-text-secondary">
              {estimatedDeliveryDate}
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={!orderProgress.qualified}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        {orderProgress.qualified ? 'Proceed to Checkout' : 'Minimum Order Required'}
      </Button>

      {/* Additional Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="FileText"
          iconPosition="left"
        >
          Create Order Template
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="Share2"
          iconPosition="left"
        >
          Share Cart
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="mt-6 pt-6 border-t border-border-light">
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Icon name="Shield" size={14} />
            <span>GST Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Lock" size={14} />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;