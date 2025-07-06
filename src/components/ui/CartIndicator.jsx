import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CartIndicator = ({ items = [], onCartUpdate, onNavigateToCart }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const count = items.reduce((total, item) => total + (item.quantity || 0), 0);
    const total = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    
    setCartCount(count);
    setCartTotal(total);
  }, [items]);

  // Listen for cart updates from localStorage
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      onCartUpdate?.(savedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [onCartUpdate]);

  const handleCartClick = async () => {
    setIsLoading(true);
    
    // Simulate loading state for cart navigation
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToCart();
    }, 150);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMouseEnter = () => {
    if (cartCount > 0) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCartClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isLoading}
        className={`relative p-2 rounded-md transition-micro ${
          cartCount > 0
            ? 'text-primary hover:text-primary-700 hover:bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Icon 
          name={isLoading ? 'Loader2' : 'ShoppingCart'} 
          size={20} 
          className={isLoading ? 'animate-spin' : ''}
        />
        
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>

      {/* Desktop Tooltip */}
      {showTooltip && cartCount > 0 && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation-2 p-4 z-50 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Cart Summary</span>
              <Icon name="ShoppingCart" size={16} className="text-text-secondary" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
              <span className="font-data font-medium text-text-primary">
                {formatCurrency(cartTotal)}
              </span>
            </div>

            {items.length > 0 && (
              <div className="pt-2 border-t border-border-light">
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary truncate flex-1 mr-2">
                        {item.name || `Item ${index + 1}`}
                      </span>
                      <span className="text-text-primary font-medium">
                        {item.quantity}x
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <div className="text-xs text-text-muted text-center pt-1">
                      +{items.length - 3} more items
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={handleCartClick}
              className="w-full mt-3"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Cart
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Cart Total Display */}
      <div className="md:hidden">
        {cartCount > 0 && (
          <div className="absolute top-full right-0 mt-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-data">
            {formatCurrency(cartTotal)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartIndicator;