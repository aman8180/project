import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(product.minimumOrderQuantity || 1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateBulkPrice = (quantity) => {
    if (!product.bulkPricing || product.bulkPricing.length === 0) {
      return product.price;
    }

    const applicableTier = product.bulkPricing
      .filter(tier => quantity >= tier.minQuantity)
      .sort((a, b) => b.minQuantity - a.minQuantity)[0];

    return applicableTier ? applicableTier.price : product.price;
  };

  const getCurrentPrice = () => {
    return calculateBulkPrice(selectedQuantity);
  };

  const getTotalPrice = () => {
    return getCurrentPrice() * selectedQuantity;
  };

  const getSavingsPercentage = () => {
    if (!product.bulkPricing || product.bulkPricing.length === 0) return 0;
    const currentPrice = getCurrentPrice();
    const originalPrice = product.price;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || product.minimumOrderQuantity || 1;
    setSelectedQuantity(Math.max(value, product.minimumOrderQuantity || 1));
  };

  const handleAddToCart = async () => {
    if (selectedQuantity < (product.minimumOrderQuantity || 1)) {
      return;
    }

    setIsAddingToCart(true);
    
    try {
      await onAddToCart({
        ...product,
        quantity: selectedQuantity,
        unitPrice: getCurrentPrice(),
        totalPrice: getTotalPrice()
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const getStockStatusInfo = () => {
    switch (product.stockStatus) {
      case 'in_stock':
        return { icon: 'CheckCircle', color: 'text-success', label: 'In Stock' };
      case 'low_stock':
        return { icon: 'AlertTriangle', color: 'text-warning', label: 'Low Stock' };
      case 'out_of_stock':
        return { icon: 'XCircle', color: 'text-error', label: 'Out of Stock' };
      case 'pre_order':
        return { icon: 'Clock', color: 'text-secondary', label: 'Pre-Order' };
      default:
        return { icon: 'CheckCircle', color: 'text-success', label: 'Available' };
    }
  };

  const stockInfo = getStockStatusInfo();
  const isOutOfStock = product.stockStatus === 'out_of_stock';
  const savingsPercentage = getSavingsPercentage();

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-48 bg-secondary-50">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              <Icon name="Star" size={12} className="mr-1" />
              Best Seller
            </span>
          )}
          {savingsPercentage > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
              {savingsPercentage}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-secondary-50"
        >
          <Icon name="Eye" size={16} className="text-text-secondary" />
        </button>

        {/* Stock Status */}
        <div className="absolute bottom-3 right-3">
          <div className={`flex items-center space-x-1 px-2 py-1 bg-surface rounded-full ${stockInfo.color}`}>
            <Icon name={stockInfo.icon} size={12} />
            <span className="text-xs font-medium">{stockInfo.label}</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-micro">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-data font-bold text-text-primary">
                {formatCurrency(getCurrentPrice())}
              </span>
              <span className="text-sm text-text-secondary ml-1">per {product.unit}</span>
            </div>
            {savingsPercentage > 0 && (
              <span className="text-sm text-text-muted line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Bulk Pricing Tiers */}
          {product.bulkPricing && product.bulkPricing.length > 0 && (
            <div className="bg-primary-50 p-2 rounded-md">
              <p className="text-xs text-primary font-medium mb-1">Bulk Pricing:</p>
              <div className="space-y-1">
                {product.bulkPricing.slice(0, 2).map((tier, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      {tier.minQuantity}+ {product.unit}s
                    </span>
                    <span className="text-primary font-medium">
                      {formatCurrency(tier.price)} each
                    </span>
                  </div>
                ))}
                {product.bulkPricing.length > 2 && (
                  <p className="text-xs text-primary">+{product.bulkPricing.length - 2} more tiers</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Minimum Order Info */}
        {product.minimumOrderQuantity && product.minimumOrderQuantity > 1 && (
          <div className="flex items-center space-x-2 text-xs text-text-secondary bg-secondary-50 p-2 rounded-md">
            <Icon name="Info" size={12} />
            <span>Min. order: {product.minimumOrderQuantity} {product.unit}s</span>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Quantity</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min={product.minimumOrderQuantity || 1}
              max={product.availableQuantity || 999}
              value={selectedQuantity}
              onChange={handleQuantityChange}
              disabled={isOutOfStock}
              className="w-20 px-2 py-1 border border-border rounded text-sm text-center focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-secondary-100 disabled:text-text-muted"
            />
            <span className="text-sm text-text-secondary">{product.unit}s</span>
          </div>
          
          {selectedQuantity > 1 && (
            <div className="text-sm text-text-secondary">
              Total: <span className="font-data font-semibold text-text-primary">
                {formatCurrency(getTotalPrice())}
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={isOutOfStock ? "outline" : "primary"}
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart || selectedQuantity < (product.minimumOrderQuantity || 1)}
          loading={isAddingToCart}
          className="w-full"
          iconName={isOutOfStock ? "AlertCircle" : "ShoppingCart"}
          iconPosition="left"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;