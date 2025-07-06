import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkDiscountCalculator = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calculatedDiscount, setCalculatedDiscount] = useState(null);

  const products = [
    {
      id: 'rice',
      name: 'Basmati Rice',
      basePrice: 100,
      unit: 'kg',
      tiers: [
        { min: 1, max: 24, discount: 0 },
        { min: 25, max: 49, discount: 5 },
        { min: 50, max: 99, discount: 10 },
        { min: 100, max: 199, discount: 15 },
        { min: 200, max: Infinity, discount: 20 }
      ]
    },
    {
      id: 'oil',
      name: 'Cooking Oil',
      basePrice: 120,
      unit: 'L',
      tiers: [
        { min: 1, max: 14, discount: 0 },
        { min: 15, max: 29, discount: 8 },
        { min: 30, max: 49, discount: 12 },
        { min: 50, max: 99, discount: 18 },
        { min: 100, max: Infinity, discount: 25 }
      ]
    },
    {
      id: 'flour',
      name: 'Wheat Flour',
      basePrice: 45,
      unit: 'kg',
      tiers: [
        { min: 1, max: 49, discount: 0 },
        { min: 50, max: 99, discount: 6 },
        { min: 100, max: 199, discount: 12 },
        { min: 200, max: 499, discount: 18 },
        { min: 500, max: Infinity, discount: 22 }
      ]
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

  const calculateDiscount = () => {
    if (!selectedProduct || !quantity || quantity <= 0) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(quantity);
    const tier = product.tiers.find(t => qty >= t.min && qty <= t.max);
    
    if (tier) {
      const baseTotal = product.basePrice * qty;
      const discountPercent = tier.discount;
      const discountAmount = (baseTotal * discountPercent) / 100;
      const finalTotal = baseTotal - discountAmount;

      setCalculatedDiscount({
        product: product.name,
        quantity: qty,
        unit: product.unit,
        basePrice: product.basePrice,
        baseTotal,
        discountPercent,
        discountAmount,
        finalTotal,
        savings: discountAmount
      });
    }
  };

  const handleReset = () => {
    setSelectedProduct('');
    setQuantity('');
    setCalculatedDiscount(null);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Bulk Discount Calculator</h3>
          <p className="text-sm text-text-secondary mt-1">Calculate savings on bulk orders</p>
        </div>
        <Icon name="Calculator" size={20} className="text-primary" />
      </div>

      <div className="space-y-4">
        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {formatCurrency(product.basePrice)}/{product.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Quantity
          </label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        {/* Calculate Button */}
        <Button
          variant="primary"
          onClick={calculateDiscount}
          disabled={!selectedProduct || !quantity}
          className="w-full"
          iconName="Calculator"
          iconPosition="left"
        >
          Calculate Discount
        </Button>

        {/* Results */}
        {calculatedDiscount && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h4 className="font-medium text-primary mb-3">Calculation Results</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Product:</span>
                <span className="text-text-primary font-medium">
                  {calculatedDiscount.product}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Quantity:</span>
                <span className="text-text-primary font-medium">
                  {calculatedDiscount.quantity} {calculatedDiscount.unit}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Price:</span>
                <span className="text-text-primary font-data">
                  {formatCurrency(calculatedDiscount.basePrice)}/{calculatedDiscount.unit}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal:</span>
                <span className="text-text-primary font-data">
                  {formatCurrency(calculatedDiscount.baseTotal)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Bulk Discount:</span>
                <span className="text-success font-medium">
                  {calculatedDiscount.discountPercent}% OFF
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Discount Amount:</span>
                <span className="text-success font-data">
                  -{formatCurrency(calculatedDiscount.discountAmount)}
                </span>
              </div>
              
              <div className="border-t border-primary-300 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-text-primary">Final Total:</span>
                  <span className="font-bold text-primary font-data text-lg">
                    {formatCurrency(calculatedDiscount.finalTotal)}
                  </span>
                </div>
              </div>
              
              <div className="bg-success-50 border border-success-200 rounded-md p-2 mt-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    You save {formatCurrency(calculatedDiscount.savings)}!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discount Tiers Info */}
        {selectedProduct && (
          <div className="mt-4 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
            <h5 className="text-sm font-medium text-text-primary mb-2">Discount Tiers</h5>
            <div className="space-y-1 text-xs">
              {products.find(p => p.id === selectedProduct)?.tiers.map((tier, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-text-secondary">
                    {tier.min}{tier.max === Infinity ? '+' : `-${tier.max}`} {products.find(p => p.id === selectedProduct)?.unit}
                  </span>
                  <span className="text-text-primary font-medium">
                    {tier.discount}% OFF
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset Button */}
        {calculatedDiscount && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Calculator
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkDiscountCalculator;