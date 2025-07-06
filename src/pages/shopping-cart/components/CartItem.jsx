import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSaveForLater, onDuplicateOrder }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= item.minimumQuantity) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + item.bulkIncrement;
    handleQuantityChange(newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - item.bulkIncrement, item.minimumQuantity);
    handleQuantityChange(newQuantity);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || item.minimumQuantity;
    handleQuantityChange(value);
  };

  const calculateDiscount = () => {
    if (quantity >= item.tier3Quantity) {
      return item.tier3Discount;
    } else if (quantity >= item.tier2Quantity) {
      return item.tier2Discount;
    } else if (quantity >= item.tier1Quantity) {
      return item.tier1Discount;
    }
    return 0;
  };

  const getDiscountedPrice = () => {
    const discount = calculateDiscount();
    return item.unitPrice * (1 - discount / 100);
  };

  const getLineTotal = () => {
    return getDiscountedPrice() * quantity;
  };

  const getTierInfo = () => {
    if (quantity >= item.tier3Quantity) {
      return { tier: 'Tier 3', discount: item.tier3Discount, color: 'text-success' };
    } else if (quantity >= item.tier2Quantity) {
      return { tier: 'Tier 2', discount: item.tier2Discount, color: 'text-warning' };
    } else if (quantity >= item.tier1Quantity) {
      return { tier: 'Tier 1', discount: item.tier1Discount, color: 'text-primary' };
    }
    return null;
  };

  const tierInfo = getTierInfo();

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-secondary-50">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {item.category} • {item.brand}
              </p>
              
              {/* Availability Status */}
              <div className="flex items-center gap-2 mb-2">
                <Icon 
                  name={item.inStock ? 'CheckCircle' : 'AlertCircle'} 
                  size={16} 
                  className={item.inStock ? 'text-success' : 'text-warning'}
                />
                <span className={`text-sm ${item.inStock ? 'text-success' : 'text-warning'}`}>
                  {item.inStock ? `${item.stockQuantity} units available` : 'Limited stock'}
                </span>
              </div>

              {/* Tier Discount Badge */}
              {tierInfo && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-success-50 text-success rounded-full text-xs font-medium mb-2">
                  <Icon name="Tag" size={12} />
                  {tierInfo.tier} - {tierInfo.discount}% OFF Applied
                </div>
              )}
            </div>

            {/* Pricing Section */}
            <div className="text-right">
              <div className="flex flex-col items-end">
                {calculateDiscount() > 0 && (
                  <span className="text-sm text-text-muted line-through">
                    {formatCurrency(item.unitPrice)}
                  </span>
                )}
                <span className="text-lg font-semibold text-text-primary">
                  {formatCurrency(getDiscountedPrice())}
                </span>
                <span className="text-xs text-text-secondary">per {item.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Controls and Actions */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-primary">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= item.minimumQuantity}
                  className="px-3 py-2 border-0"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  min={item.minimumQuantity}
                  className="w-20 text-center border-0 border-l border-r border-border"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="px-3 py-2 border-0"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            <div className="text-xs text-text-muted">
              Min: {item.minimumQuantity} {item.unit}
            </div>
          </div>

          {/* Line Total */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="text-sm text-text-secondary">Total:</span>
            <span className="text-xl font-bold text-text-primary">
              {formatCurrency(getLineTotal())}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {isExpanded ? 'Less Details' : 'More Details'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSaveForLater(item.id)}
            iconName="Heart"
            iconPosition="left"
          >
            Save for Later
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicateOrder(item.id)}
            iconName="Copy"
            iconPosition="left"
          >
            Duplicate
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveItem(item.id)}
            iconName="Trash2"
            iconPosition="left"
            className="text-error hover:text-error hover:bg-error-50"
          >
            Remove
          </Button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Product Details</h4>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>SKU: {item.sku}</p>
                  <p>Weight: {item.weight}</p>
                  <p>Shelf Life: {item.shelfLife}</p>
                  <p>Storage: {item.storage}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Bulk Pricing Tiers</h4>
                <div className="space-y-1 text-sm">
                  <div className={`flex justify-between ${quantity >= item.tier1Quantity ? 'text-success font-medium' : 'text-text-secondary'}`}>
                    <span>{item.tier1Quantity}+ units:</span>
                    <span>{item.tier1Discount}% OFF</span>
                  </div>
                  <div className={`flex justify-between ${quantity >= item.tier2Quantity ? 'text-success font-medium' : 'text-text-secondary'}`}>
                    <span>{item.tier2Quantity}+ units:</span>
                    <span>{item.tier2Discount}% OFF</span>
                  </div>
                  <div className={`flex justify-between ${quantity >= item.tier3Quantity ? 'text-success font-medium' : 'text-text-secondary'}`}>
                    <span>{item.tier3Quantity}+ units:</span>
                    <span>{item.tier3Discount}% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;