import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConfirmationMessage from './components/ConfirmationMessage';
import OrderDetails from './components/OrderDetails';
import ActionButtons from './components/ActionButtons';
import RecommendedProducts from './components/RecommendedProducts';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load order data
    const loadOrderData = () => {
      try {
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const order = orderHistory.find(o => o.id === orderId);
        
        if (order) {
          setOrderData(order);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [orderId, navigate]);

  const handleContinueShopping = () => {
    navigate('/product-catalog');
  };

  const handleViewOrderDetails = () => {
    // Navigate to order details page (if exists) or dashboard
    navigate('/dashboard');
  };

  const handleDownloadInvoice = () => {
    // Mock invoice download
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,Invoice for Order ${orderId}`;
    element.download = `Invoice_${orderId}.txt`;
    element.click();
  };

  const handleTrackDelivery = () => {
    // Navigate to tracking page or show tracking modal
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-4">Order Not Found</h1>
            <p className="text-text-secondary mb-8">{error}</p>
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Confirmation Message */}
        <ConfirmationMessage orderData={orderData} />

        {/* Order Details */}
        <OrderDetails orderData={orderData} />

        {/* Action Buttons */}
        <ActionButtons
          onContinueShopping={handleContinueShopping}
          onViewOrderDetails={handleViewOrderDetails}
          onDownloadInvoice={handleDownloadInvoice}
          onTrackDelivery={handleTrackDelivery}
        />

        {/* Recommended Products */}
        <RecommendedProducts />

        {/* Business Information */}
        <div className="mt-8 bg-secondary-50 border border-secondary-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Account Manager</h3>
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium">Name:</span> Rajesh Kumar
                </p>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium">Phone:</span> +91 98765 43210
                </p>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium">Email:</span> rajesh@wholesalemart.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Business Hours</h3>
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-text-secondary">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-sm text-text-secondary">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;