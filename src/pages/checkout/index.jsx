import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import BillingInformationSection from './components/BillingInformationSection';
import PaymentMethodSection from './components/PaymentMethodSection';
import DeliveryInstructionsSection from './components/DeliveryInstructionsSection';
import OrderSummarySection from './components/OrderSummarySection';
import CheckoutProgressIndicator from './components/CheckoutProgressIndicator';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('address');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Form states
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [billingInfo, setBillingInfo] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState(null);

  // Mock data
  const [orderItems] = useState([
    {
      id: 1,
      name: 'Basmati Rice Premium',
      quantity: 10,
      unit: '25kg bags',
      unitPrice: 2500,
      originalPrice: 2800,
      discount: 300,
      total: 25000,
      gst: 5
    },
    {
      id: 2,
      name: 'Wheat Flour Grade A',
      quantity: 5,
      unit: '50kg bags',
      unitPrice: 1800,
      originalPrice: 2000,
      discount: 200,
      total: 9000,
      gst: 5
    },
    {
      id: 3,
      name: 'Cooking Oil Refined',
      quantity: 8,
      unit: '15L containers',
      unitPrice: 1200,
      originalPrice: 1300,
      discount: 100,
      total: 9600,
      gst: 12
    }
  ]);

  const [creditTerms] = useState({
    approved: true,
    limit: 500000,
    available: 450000,
    days: 30,
    dueDate: '15/02/2024'
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if cart has items
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) {
      navigate('/shopping-cart');
      return;
    }

    // Set initial address if available
    const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
    if (savedAddresses.length > 0) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault) || savedAddresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [navigate]);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 'address':
        return selectedAddress !== null;
      case 'billing':
        return true; // Billing can be same as delivery
      case 'payment':
        return selectedPaymentMethod !== null;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    const steps = ['address', 'billing', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep);
      
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
    }
  };

  const handlePreviousStep = () => {
    const steps = ['address', 'billing', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateCurrentStep()) return;

    setIsProcessingOrder(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `WH${Date.now()}`;
      
      // Save order to localStorage (mock)
      const orderData = {
        id: orderId,
        items: orderItems,
        address: selectedAddress,
        billing: billingInfo,
        payment: selectedPaymentMethod,
        instructions: deliveryInstructions,
        deliverySlot: selectedDeliverySlot,
        status: 'confirmed',
        date: new Date().toISOString(),
        total: orderItems.reduce((sum, item) => sum + item.total, 0)
      };

      const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      localStorage.setItem('orderHistory', JSON.stringify([orderData, ...existingOrders]));

      // Clear cart
      localStorage.removeItem('cartItems');

      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Order processing failed:', error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const getDeliveryCharge = () => {
    return selectedDeliverySlot?.charge || 0;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'address':
        return 'Delivery Address';
      case 'billing':
        return 'Billing Information';
      case 'payment':
        return 'Payment Method';
      case 'review':
        return 'Review Your Order';
      default:
        return 'Checkout';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'address':
        return (
          <DeliveryAddressSection
            selectedAddress={selectedAddress}
            onAddressSelect={setSelectedAddress}
            onAddressAdd={(address) => {
              // Save to localStorage
              const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
              localStorage.setItem('savedAddresses', JSON.stringify([...savedAddresses, address]));
              setSelectedAddress(address);
            }}
          />
        );
      case 'billing':
        return (
          <BillingInformationSection
            billingInfo={billingInfo}
            onBillingUpdate={setBillingInfo}
          />
        );
      case 'payment':
        return (
          <PaymentMethodSection
            selectedMethod={selectedPaymentMethod}
            onMethodSelect={setSelectedPaymentMethod}
            creditTerms={creditTerms}
          />
        );
      case 'review':
        return (
          <div className="space-y-6">
            <DeliveryInstructionsSection
              instructions={deliveryInstructions}
              onInstructionsUpdate={setDeliveryInstructions}
              deliverySlot={selectedDeliverySlot}
              onSlotSelect={setSelectedDeliverySlot}
            />
            
            {/* Order Review Summary */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order Review</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Delivery Address</h4>
                    <div className="text-sm text-text-secondary">
                      <p>{selectedAddress?.businessName}</p>
                      <p>{selectedAddress?.address}</p>
                      <p>{selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Payment Method</h4>
                    <div className="text-sm text-text-secondary">
                      <p>{selectedPaymentMethod?.name}</p>
                      <p>{selectedPaymentMethod?.description}</p>
                    </div>
                  </div>
                </div>

                {selectedDeliverySlot && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Delivery Time</h4>
                    <div className="text-sm text-text-secondary">
                      <p>{selectedDeliverySlot.label} - {selectedDeliverySlot.time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/shopping-cart')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Cart
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Checkout</h1>
          <p className="text-text-secondary mt-2">Complete your wholesale order</p>
        </div>

        {/* Progress Indicator */}
        <CheckoutProgressIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Steps */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">{getStepTitle()}</h2>
              {renderCurrentStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 'address'}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>

              {currentStep === 'review' ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={!validateCurrentStep() || isProcessingOrder}
                  loading={isProcessingOrder}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {isProcessingOrder ? 'Processing Order...' : 'Place Order'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextStep}
                  disabled={!validateCurrentStep()}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummarySection
              orderItems={orderItems}
              deliveryCharge={getDeliveryCharge()}
              onOrderUpdate={() => {}}
              isCollapsed={isOrderSummaryCollapsed}
              onToggleCollapse={() => setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)}
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-secondary-50 border border-secondary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-success-600" />
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">Secure Checkout</h4>
              <p className="text-sm text-text-secondary">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;