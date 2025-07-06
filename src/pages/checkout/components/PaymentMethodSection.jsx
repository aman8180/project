import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const PaymentMethodSection = ({ selectedMethod, onMethodSelect, creditTerms }) => {
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Credit Terms',
      description: 'Pay within approved credit period',
      icon: 'CreditCard',
      available: creditTerms?.approved || false,
      details: creditTerms?.approved ? `${creditTerms.days} days credit limit` : 'Not available'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI ID or QR code',
      icon: 'Smartphone',
      available: true,
      details: 'Instant payment confirmation'
    },
    {
      id: 'neft',
      name: 'NEFT/RTGS',
      description: 'Bank transfer for large amounts',
      icon: 'Building2',
      available: true,
      details: 'Suitable for bulk orders above ₹50,000'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Pay using business cards',
      icon: 'CreditCard',
      available: true,
      details: 'Secure payment processing'
    }
  ];

  const handleMethodSelect = (method) => {
    onMethodSelect(method);
  };

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Wallet" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-micro ${
              !method.available
                ? 'border-border bg-secondary-50 opacity-50 cursor-not-allowed'
                : selectedMethod?.id === method.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
            }`}
            onClick={() => method.available && handleMethodSelect(method)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={method.available ? 'text-primary' : 'text-text-muted'} 
                />
                <div className="flex-1">
                  <h4 className={`font-medium ${method.available ? 'text-text-primary' : 'text-text-muted'}`}>
                    {method.name}
                  </h4>
                  <p className={`text-sm ${method.available ? 'text-text-secondary' : 'text-text-muted'} mb-1`}>
                    {method.description}
                  </p>
                  <p className={`text-xs ${method.available ? 'text-text-muted' : 'text-text-muted'}`}>
                    {method.details}
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod?.id === method.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedMethod?.id === method.id && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Details Forms */}
      {selectedMethod?.id === 'upi' && (
        <div className="border border-border rounded-lg p-4 bg-secondary-50">
          <h4 className="font-medium text-text-primary mb-4">UPI Payment Details</h4>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter UPI ID (e.g., business@paytm)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Info" size={16} />
              <span>You will be redirected to your UPI app to complete the payment</span>
            </div>
          </div>
        </div>
      )}

      {selectedMethod?.id === 'card' && (
        <div className="border border-border rounded-lg p-4 bg-secondary-50">
          <h4 className="font-medium text-text-primary mb-4">Card Payment Details</h4>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
              maxLength={19}
              className="font-data"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardChange('expiry', formatExpiry(e.target.value))}
                maxLength={5}
                className="font-data"
              />
              <Input
                type="text"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                className="font-data"
              />
            </div>
            <Input
              type="text"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={(e) => handleCardChange('name', e.target.value)}
            />
          </div>
        </div>
      )}

      {selectedMethod?.id === 'neft' && (
        <div className="border border-border rounded-lg p-4 bg-secondary-50">
          <h4 className="font-medium text-text-primary mb-4">Bank Transfer Details</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Account Name:</span>
                <p className="font-medium text-text-primary">WholesaleHub Pvt Ltd</p>
              </div>
              <div>
                <span className="text-text-secondary">Account Number:</span>
                <p className="font-data font-medium text-text-primary">1234567890123456</p>
              </div>
              <div>
                <span className="text-text-secondary">IFSC Code:</span>
                <p className="font-data font-medium text-text-primary">HDFC0001234</p>
              </div>
              <div>
                <span className="text-text-secondary">Bank Name:</span>
                <p className="font-medium text-text-primary">HDFC Bank</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-warning-700 bg-warning-50 p-3 rounded-lg">
              <Icon name="AlertTriangle" size={16} />
              <span>Please use your order number as reference while making the transfer</span>
            </div>
          </div>
        </div>
      )}

      {selectedMethod?.id === 'credit' && creditTerms?.approved && (
        <div className="border border-border rounded-lg p-4 bg-success-50">
          <h4 className="font-medium text-text-primary mb-4">Credit Terms</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Credit Limit:</span>
              <span className="font-data font-medium text-text-primary">₹{creditTerms.limit?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Available Credit:</span>
              <span className="font-data font-medium text-success-700">₹{creditTerms.available?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Payment Terms:</span>
              <span className="font-medium text-text-primary">{creditTerms.days} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Due Date:</span>
              <span className="font-medium text-text-primary">{creditTerms.dueDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSection;