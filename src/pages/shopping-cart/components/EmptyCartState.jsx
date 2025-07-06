import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmptyCartState = () => {
  const navigate = useNavigate();

  const popularItems = [
    {
      id: 1,
      name: "Basmati Rice Premium 25kg",
      image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
      price: 2500,
      category: "Grains",
      minQuantity: 5
    },
    {
      id: 2,
      name: "Cooking Oil Refined 15L",
      image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg",
      price: 1200,
      category: "Oil",
      minQuantity: 10
    },
    {
      id: 3,
      name: "Sugar Crystal 50kg",
      image: "https://images.pexels.com/photos/65882/pexels-photo-65882.jpeg",
      price: 2200,
      category: "Sweeteners",
      minQuantity: 3
    }
  ];

  const orderTemplates = [
    {
      id: 1,
      name: "Restaurant Essentials",
      items: 12,
      totalValue: 25000,
      lastUsed: "2 weeks ago"
    },
    {
      id: 2,
      name: "Monthly Grocery Stock",
      items: 8,
      totalValue: 18500,
      lastUsed: "1 month ago"
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

  const handleBrowseProducts = () => {
    navigate('/product-catalog');
  };

  const handleUseTemplate = (templateId) => {
    // Mock template loading
    console.log('Loading template:', templateId);
    navigate('/product-catalog');
  };

  return (
    <div className="bg-surface rounded-lg p-8 text-center">
      {/* Empty Cart Icon */}
      <div className="w-32 h-32 mx-auto mb-6 bg-secondary-50 rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={64} className="text-secondary-300" />
      </div>

      {/* Main Message */}
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        Your wholesale cart is empty
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        Start building your bulk order by browsing our extensive catalog of wholesale grocery items with competitive pricing.
      </p>

      {/* Primary Action */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleBrowseProducts}
        iconName="Package"
        iconPosition="left"
        className="mb-8"
      >
        Browse Products
      </Button>

      {/* Order Templates Section */}
      {orderTemplates.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Quick Start with Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orderTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-secondary-50 border border-border rounded-lg p-4 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">
                      {template.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {template.items} items • {formatCurrency(template.totalValue)}
                    </p>
                  </div>
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                
                <p className="text-xs text-text-muted mb-3">
                  Last used: {template.lastUsed}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleUseTemplate(template.id)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Items Section */}
      <div className="border-t border-border-light pt-8">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Popular Wholesale Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200"
            >
              <div className="w-full h-32 rounded-lg overflow-hidden mb-4 bg-secondary-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="font-medium text-text-primary mb-2 text-sm">
                {item.name}
              </h4>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(item.price)}
                </span>
                <span className="text-xs text-text-secondary">
                  Min: {item.minQuantity} units
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleBrowseProducts}
                iconName="Plus"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 pt-8 border-t border-border-light">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={16} />
            <span>Need help? Call us at +91-9876543210</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MessageCircle" size={16} />
            <span>Chat with our wholesale experts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartState;