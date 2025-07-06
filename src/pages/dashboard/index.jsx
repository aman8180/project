import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import QuickReorderSection from './components/QuickReorderSection';
import RecommendedProducts from './components/RecommendedProducts';
import OrderStatusWidget from './components/OrderStatusWidget';
import AccountManagerContact from './components/AccountManagerContact';
import BulkDiscountCalculator from './components/BulkDiscountCalculator';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    if (!authStatus) {
      navigate('/login');
      return;
    }
    
    setIsAuthenticated(authStatus);
    
    // Load user profile
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Set default profile for demo
      const defaultProfile = {
        name: 'Rajesh Kumar',
        email: 'rajesh@samplebusiness.com',
        company: 'Kumar Restaurant Chain',
        role: 'Procurement Manager',
        tier: 'Gold',
        creditLimit: 500000,
        usedCredit: 125000
      };
      setUserProfile(defaultProfile);
      localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }

    // Load cart items
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [navigate]);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedCart = cartItems.map((cartItem, index) => 
        index === existingItemIndex 
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      // Add new item to cart
      updatedCart = [...cartItems, item];
    }

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Show success feedback (you could implement a toast notification here)
    console.log(`Added ${item.quantity} ${item.unit} of ${item.name} to cart`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock metrics data
  const metricsData = [
    {
      title: 'Current Month Orders',
      value: 24,
      subtitle: 'Orders placed this month',
      icon: 'ShoppingBag',
      trend: 'up',
      trendValue: '+12% from last month',
      color: 'primary'
    },
    {
      title: 'Total Savings',
      value: 45600,
      subtitle: 'Bulk discount savings',
      icon: 'TrendingUp',
      trend: 'up',
      trendValue: '+₹8,200 this month',
      color: 'success'
    },
    {
      title: 'Pending Orders',
      value: 3,
      subtitle: 'Orders awaiting delivery',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Available Credit',
      value: userProfile ? (userProfile.creditLimit - userProfile.usedCredit) : 375000,
      subtitle: `of ${formatCurrency(userProfile?.creditLimit || 500000)} limit`,
      icon: 'CreditCard',
      color: 'accent'
    }
  ];

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                {getGreeting()}, {userProfile.name}!
              </h1>
              <p className="text-text-secondary mt-1">
                Welcome back to your wholesale dashboard
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{userProfile.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">{userProfile.tier} Member</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-3">
              <Button
                variant="outline"
                iconName="FileText"
                iconPosition="left"
                onClick={() => navigate('/order-history')}
              >
                Order History
              </Button>
              <Button
                variant="primary"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/product-catalog')}
              >
                New Order
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              icon={metric.icon}
              trend={metric.trend}
              trendValue={metric.trendValue}
              color={metric.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Reorder Section */}
            <QuickReorderSection onAddToCart={handleAddToCart} />
            
            {/* Recommended Products */}
            <RecommendedProducts onAddToCart={handleAddToCart} />
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="space-y-6">
            {/* Order Status Updates */}
            <OrderStatusWidget />
            
            {/* Account Manager Contact */}
            <AccountManagerContact />
            
            {/* Bulk Discount Calculator */}
            <BulkDiscountCalculator />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate('/order-history')}
            className="flex-1"
            iconName="FileText"
            iconPosition="left"
          >
            Orders
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/product-catalog')}
            className="flex-1"
            iconName="Plus"
            iconPosition="left"
          >
            New Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;