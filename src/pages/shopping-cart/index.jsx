import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCartState from './components/EmptyCartState';
import BulkActionBar from './components/BulkActionBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const minimumOrderThreshold = 10000; // ₹10,000 minimum order
  const estimatedDeliveryDate = "3-5 business days";

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Basmati Rice Premium Grade A",
      category: "Grains & Cereals",
      brand: "Golden Harvest",
      image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
      unitPrice: 120,
      quantity: 50,
      minimumQuantity: 25,
      bulkIncrement: 5,
      unit: "kg",
      sku: "GH-BR-001",
      weight: "25kg per bag",
      shelfLife: "12 months",
      storage: "Cool, dry place",
      inStock: true,
      stockQuantity: 500,
      tier1Quantity: 25,
      tier1Discount: 5,
      tier2Quantity: 50,
      tier2Discount: 8,
      tier3Quantity: 100,
      tier3Discount: 12
    },
    {
      id: 2,
      name: "Refined Cooking Oil Sunflower",
      category: "Oils & Fats",
      brand: "Pure Gold",
      image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg",
      unitPrice: 80,
      quantity: 30,
      minimumQuantity: 15,
      bulkIncrement: 3,
      unit: "L",
      sku: "PG-SO-002",
      weight: "15L per container",
      shelfLife: "18 months",
      storage: "Room temperature",
      inStock: true,
      stockQuantity: 200,
      tier1Quantity: 15,
      tier1Discount: 3,
      tier2Quantity: 30,
      tier2Discount: 6,
      tier3Quantity: 60,
      tier3Discount: 10
    },
    {
      id: 3,
      name: "Wheat Flour All Purpose",
      category: "Flour & Grains",
      brand: "Miller\'s Best",
      image: "https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg",
      unitPrice: 35,
      quantity: 100,
      minimumQuantity: 50,
      bulkIncrement: 10,
      unit: "kg",
      sku: "MB-WF-003",
      weight: "50kg per bag",
      shelfLife: "6 months",
      storage: "Dry, ventilated area",
      inStock: true,
      stockQuantity: 300,
      tier1Quantity: 50,
      tier1Discount: 4,
      tier2Quantity: 100,
      tier2Discount: 7,
      tier3Quantity: 200,
      tier3Discount: 11
    },
    {
      id: 4,
      name: "Crystal Sugar Premium",
      category: "Sweeteners",
      brand: "Sweet Valley",
      image: "https://images.pexels.com/photos/65882/pexels-photo-65882.jpeg",
      unitPrice: 45,
      quantity: 40,
      minimumQuantity: 20,
      bulkIncrement: 5,
      unit: "kg",
      sku: "SV-CS-004",
      weight: "50kg per bag",
      shelfLife: "24 months",
      storage: "Dry place",
      inStock: true,
      stockQuantity: 150,
      tier1Quantity: 20,
      tier1Discount: 2,
      tier2Quantity: 40,
      tier2Discount: 5,
      tier3Quantity: 80,
      tier3Discount: 8
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems(mockCartItems);
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  };

  const handleSaveForLater = (itemId) => {
    // Mock save for later functionality
    console.log('Saving item for later:', itemId);
    handleRemoveItem(itemId);
  };

  const handleDuplicateOrder = (itemId) => {
    const itemToDuplicate = cartItems.find(item => item.id === itemId);
    if (itemToDuplicate) {
      const duplicatedItem = {
        ...itemToDuplicate,
        id: Date.now(), // Simple ID generation
        quantity: itemToDuplicate.minimumQuantity
      };
      const updatedItems = [...cartItems, duplicatedItem];
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(cartItems.map(item => item.id));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    const updatedItems = cartItems.filter(item => !selectedItems.includes(item.id));
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setSelectedItems([]);
  };

  const handleBulkSaveForLater = () => {
    // Mock bulk save for later
    console.log('Bulk saving items:', selectedItems);
    handleBulkRemove();
  };

  const handleCreateTemplate = (templateName) => {
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    const template = {
      id: Date.now(),
      name: templateName,
      items: selectedCartItems,
      createdAt: new Date().toISOString()
    };
    
    // Save template to localStorage
    const savedTemplates = JSON.parse(localStorage.getItem('orderTemplates') || '[]');
    savedTemplates.push(template);
    localStorage.setItem('orderTemplates', JSON.stringify(savedTemplates));
    
    console.log('Template created:', template);
    setSelectedItems([]);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/product-catalog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-text-secondary">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart - WholesaleHub</title>
        <meta name="description" content="Review and manage your wholesale grocery orders with bulk pricing and minimum order validation." />
      </Helmet>

      <HeaderNavigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Shopping Cart</h1>
              <p className="text-text-secondary">
                {cartItems.length > 0 
                  ? `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your wholesale cart`
                  : 'Your cart is empty'
                }
              </p>
            </div>
            
            {cartItems.length > 0 && (
              <div className="flex items-center gap-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Continue Shopping
                </Button>
                
                {/* Mobile Summary Toggle */}
                <Button
                  variant="primary"
                  onClick={() => setShowMobileSummary(!showMobileSummary)}
                  className="lg:hidden"
                  iconName="Receipt"
                  iconPosition="left"
                >
                  Order Summary
                </Button>
              </div>
            )}
          </div>

          {cartItems.length === 0 ? (
            <EmptyCartState />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Cart Content */}
              <div className="lg:col-span-8">
                {/* Bulk Action Bar */}
                <BulkActionBar
                  selectedItems={selectedItems}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkRemove={handleBulkRemove}
                  onBulkSaveForLater={handleBulkSaveForLater}
                  onCreateTemplate={handleCreateTemplate}
                  totalItems={cartItems.length}
                />

                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                      onDuplicateOrder={handleDuplicateOrder}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4">
                <div className={`${showMobileSummary ? 'block' : 'hidden'} lg:block`}>
                  <OrderSummary
                    cartItems={cartItems}
                    minimumOrderThreshold={minimumOrderThreshold}
                    onProceedToCheckout={handleProceedToCheckout}
                    estimatedDeliveryDate={estimatedDeliveryDate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Summary Overlay */}
      {showMobileSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileSummary(false)}
                iconName="X"
              />
            </div>
            
            <OrderSummary
              cartItems={cartItems}
              minimumOrderThreshold={minimumOrderThreshold}
              onProceedToCheckout={handleProceedToCheckout}
              estimatedDeliveryDate={estimatedDeliveryDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;