import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecommendedProducts = () => {
  const navigate = useNavigate();

  const recommendedProducts = [
    {
      id: 1,
      name: 'Premium Cooking Oil',
      price: 1200,
      unit: '15L Container',
      discount: 10,
      image: '/assets/images/no_image.png'
    },
    {
      id: 2,
      name: 'Organic Pulses Mix',
      price: 800,
      unit: '10kg Bag',
      discount: 15,
      image: '/assets/images/no_image.png'
    },
    {
      id: 3,
      name: 'Spices Combo Pack',
      price: 500,
      unit: '5kg Pack',
      discount: 20,
      image: '/assets/images/no_image.png'
    }
  ];

  const handleQuickReorder = () => {
    // Navigate to product catalog with reorder filter
    navigate('/product-catalog?reorder=true');
  };

  const handleAddToCart = (product) => {
    // Mock add to cart functionality
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const cartItem = {
      ...product,
      quantity: 1,
      total: product.price
    };
    
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Show success message or notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="mt-8">
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Recommended for Your Business
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickReorder}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Quick Reorder
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-secondary-50 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Package" size={32} className="text-secondary-400" />
              </div>
              
              <h3 className="font-medium text-text-primary mb-2">{product.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{product.unit}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-semibold text-text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.discount > 0 && (
                    <span className="ml-2 text-sm text-success-600">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(product)}
                iconName="Plus"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/product-catalog')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;