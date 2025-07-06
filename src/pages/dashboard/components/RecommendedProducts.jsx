import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecommendedProducts = ({ onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const recommendedProducts = [
    {
      id: 101,
      name: "Premium Cashews",
      brand: "Nutraj",
      category: "Dry Fruits",
      price: 8500,
      originalPrice: 9200,
      discount: 8,
      unit: "kg",
      minQuantity: 5,
      bulkDiscount: "15% off on 10kg+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Based on your spice purchases"
    },
    {
      id: 102,
      name: "Organic Turmeric Powder",
      brand: "24 Mantra",
      category: "Spices",
      price: 450,
      originalPrice: 520,
      discount: 13,
      unit: "kg",
      minQuantity: 2,
      bulkDiscount: "20% off on 10kg+",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Trending in your category"
    },
    {
      id: 103,
      name: "Himalayan Pink Salt",
      brand: "Tata Salt",
      category: "Salt & Seasonings",
      price: 280,
      originalPrice: 320,
      discount: 12,
      unit: "kg",
      minQuantity: 5,
      bulkDiscount: "25% off on 25kg+",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Frequently bought together"
    },
    {
      id: 104,
      name: "Basmati Rice 1121",
      brand: "Kohinoor",
      category: "Rice & Grains",
      price: 3200,
      originalPrice: 3600,
      discount: 11,
      unit: "kg",
      minQuantity: 25,
      bulkDiscount: "18% off on 100kg+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Similar to your recent orders"
    },
    {
      id: 105,
      name: "Cold Pressed Coconut Oil",
      brand: "Parachute",
      category: "Cooking Oil",
      price: 1850,
      originalPrice: 2100,
      discount: 12,
      unit: "L",
      minQuantity: 10,
      bulkDiscount: "22% off on 50L+",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Popular in your region"
    },
    {
      id: 106,
      name: "Organic Jaggery",
      brand: "Patanjali",
      category: "Sweeteners",
      price: 180,
      originalPrice: 210,
      discount: 14,
      unit: "kg",
      minQuantity: 10,
      bulkDiscount: "20% off on 50kg+",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
      inStock: true,
      reason: "Recommended for restaurants"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = parseInt(value) || 0;
    setQuantities(prev => ({
      ...prev,
      [productId]: numValue
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || product.minQuantity;
    if (quantity >= product.minQuantity) {
      onAddToCart({
        ...product,
        quantity: quantity
      });
      // Reset quantity after adding
      setQuantities(prev => ({
        ...prev,
        [product.id]: product.minQuantity
      }));
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Recommended for You</h2>
          <p className="text-sm text-text-secondary mt-1">Products selected based on your purchase history</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => {}}
        >
          View All Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map((product) => {
          const currentQuantity = quantities[product.id] || product.minQuantity;
          const isValidQuantity = currentQuantity >= product.minQuantity;
          
          return (
            <div key={product.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
              {/* Product Image */}
              <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-md bg-secondary-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm rounded-full p-1">
                  <Icon name="Heart" size={16} className="text-text-muted hover:text-error cursor-pointer transition-micro" />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-text-primary line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{product.brand}</p>
                  <p className="text-xs text-text-muted">{product.category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-sm font-medium text-text-primary">{product.rating}</span>
                  <span className="text-xs text-text-muted">(4.2k reviews)</span>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-data font-bold text-primary">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-text-muted line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted">per {product.unit}</p>
                  <p className="text-xs text-accent font-medium">{product.bulkDiscount}</p>
                </div>

                {/* Recommendation Reason */}
                <div className="bg-primary-50 border border-primary-200 rounded-md p-2">
                  <p className="text-xs text-primary font-medium">{product.reason}</p>
                </div>

                {/* Quantity Selection */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={currentQuantity}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      min={product.minQuantity}
                      className="flex-1 text-sm"
                      placeholder={`Min ${product.minQuantity}`}
                    />
                    <span className="text-sm text-text-secondary">{product.unit}</span>
                  </div>
                  
                  {!isValidQuantity && (
                    <p className="text-xs text-error">
                      Minimum {product.minQuantity} {product.unit} required
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                    className="flex-1"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={!isValidQuantity}
                    className="flex-1"
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProducts;