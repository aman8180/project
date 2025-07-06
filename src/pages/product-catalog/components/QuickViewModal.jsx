import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setSelectedQuantity(product.minimumOrderQuantity || 1);
      setSelectedImageIndex(0);
    }
  }, [product, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

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
    setIsAddingToCart(true);
    
    try {
      await onAddToCart({
        ...product,
        quantity: selectedQuantity,
        unitPrice: getCurrentPrice(),
        totalPrice: getTotalPrice()
      });
      onClose();
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

  // Mock additional images
  const productImages = [
    product.image,
    `https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400`,
    `https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400`
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-50 rounded-md transition-micro"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-secondary-50 aspect-square">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.isBestSeller && (
                    <span className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                      <Icon name="Star" size={14} className="mr-1" />
                      Best Seller
                    </span>
                  )}
                  {savingsPercentage > 0 && (
                    <span className="inline-flex items-center px-3 py-1 bg-success text-success-foreground text-sm font-medium rounded-full">
                      {savingsPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-micro ${
                      selectedImageIndex === index
                        ? 'border-primary' :'border-border hover:border-border-dark'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{product.brand}</span>
                  <div className={`flex items-center space-x-1 ${stockInfo.color}`}>
                    <Icon name={stockInfo.icon} size={14} />
                    <span>{stockInfo.label}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl font-semibold text-text-primary">{product.name}</h1>
                <p className="text-text-secondary">{product.description}</p>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-data font-bold text-text-primary">
                    {formatCurrency(getCurrentPrice())}
                  </span>
                  <span className="text-text-secondary">per {product.unit}</span>
                  {savingsPercentage > 0 && (
                    <span className="text-lg text-text-muted line-through">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>

                {/* Bulk Pricing Table */}
                {product.bulkPricing && product.bulkPricing.length > 0 && (
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-primary mb-3">Bulk Pricing Tiers</h3>
                    <div className="space-y-2">
                      {product.bulkPricing.map((tier, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">
                            {tier.minQuantity}+ {product.unit}s
                          </span>
                          <span className="font-data font-medium text-primary">
                            {formatCurrency(tier.price)} each
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-primary">Quantity</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min={product.minimumOrderQuantity || 1}
                    max={product.availableQuantity || 999}
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    disabled={isOutOfStock}
                    className="w-24 px-3 py-2 border border-border rounded-md text-center focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-secondary-100 disabled:text-text-muted"
                  />
                  <span className="text-sm text-text-secondary">{product.unit}s</span>
                </div>

                {product.minimumOrderQuantity && product.minimumOrderQuantity > 1 && (
                  <p className="text-xs text-text-secondary">
                    Minimum order quantity: {product.minimumOrderQuantity} {product.unit}s
                  </p>
                )}

                {selectedQuantity > 1 && (
                  <div className="bg-secondary-50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Total Price:</span>
                      <span className="text-lg font-data font-semibold text-text-primary">
                        {formatCurrency(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <Button
                variant={isOutOfStock ? "outline" : "primary"}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                loading={isAddingToCart}
                className="w-full"
                iconName={isOutOfStock ? "AlertCircle" : "ShoppingCart"}
                iconPosition="left"
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>

              {/* Product Specifications */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-text-primary">Product Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-text-secondary">Category:</span>
                    <span className="ml-2 text-text-primary">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Brand:</span>
                    <span className="ml-2 text-text-primary">{product.brand}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Unit:</span>
                    <span className="ml-2 text-text-primary">{product.unit}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Available:</span>
                    <span className="ml-2 text-text-primary">{product.availableQuantity || 'In Stock'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;