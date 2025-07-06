import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickReorderSection = ({ onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const recentItems = [
    {
      id: 1,
      name: "Basmati Rice Premium",
      brand: "India Gate",
      lastOrderDate: "15/11/2024",
      lastQuantity: 50,
      unit: "kg",
      price: 2500,
      minQuantity: 25,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Refined Sunflower Oil",
      brand: "Fortune",
      lastOrderDate: "12/11/2024",
      lastQuantity: 20,
      unit: "L",
      price: 1800,
      minQuantity: 15,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Wheat Flour",
      brand: "Aashirvaad",
      lastOrderDate: "10/11/2024",
      lastQuantity: 100,
      unit: "kg",
      price: 3200,
      minQuantity: 50,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Toor Dal",
      brand: "Organic India",
      lastOrderDate: "08/11/2024",
      lastQuantity: 25,
      unit: "kg",
      price: 4500,
      minQuantity: 10,
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop"
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

  const handleQuantityChange = (itemId, value) => {
    const numValue = parseInt(value) || 0;
    setQuantities(prev => ({
      ...prev,
      [itemId]: numValue
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || item.lastQuantity;
    if (quantity >= item.minQuantity) {
      onAddToCart({
        ...item,
        quantity: quantity
      });
      // Reset quantity after adding
      setQuantities(prev => ({
        ...prev,
        [item.id]: item.minQuantity
      }));
    }
  };

  const handleQuickAdd = (item) => {
    setQuantities(prev => ({
      ...prev,
      [item.id]: item.lastQuantity
    }));
    handleAddToCart(item);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Quick Reorder</h2>
          <p className="text-sm text-text-secondary mt-1">Reorder your frequently purchased items</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="History"
          iconPosition="left"
          onClick={() => {}}
        >
          View All History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentItems.map((item) => {
          const currentQuantity = quantities[item.id] || item.minQuantity;
          const isValidQuantity = currentQuantity >= item.minQuantity;
          
          return (
            <div key={item.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
              <div className="aspect-square w-full mb-3 overflow-hidden rounded-md bg-secondary-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div>
                  <h3 className="font-medium text-text-primary text-sm line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-text-secondary">{item.brand}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Last: {item.lastOrderDate}</span>
                  <span>{item.lastQuantity} {item.unit}</span>
                </div>

                <div className="text-sm font-data font-semibold text-primary">
                  {formatCurrency(item.price)}
                  <span className="text-xs text-text-muted font-normal ml-1">
                    per {item.unit}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={currentQuantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min={item.minQuantity}
                      className="flex-1 text-sm"
                      placeholder={`Min ${item.minQuantity}`}
                    />
                    <span className="text-xs text-text-secondary">{item.unit}</span>
                  </div>
                  
                  {!isValidQuantity && (
                    <p className="text-xs text-error">
                      Minimum {item.minQuantity} {item.unit} required
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleQuickAdd(item)}
                    className="flex-1"
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Same as Last
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => handleAddToCart(item)}
                    disabled={!isValidQuantity}
                    className="flex-1"
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Add
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

export default QuickReorderSection;