import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PriceRangeFilter = ({ priceRange, onPriceRangeChange, minPrice = 0, maxPrice = 50000 }) => {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange.min);
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange.max);
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    setLocalMinPrice(priceRange.min);
    setLocalMaxPrice(priceRange.max);
  }, [priceRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalMinPrice(value);
    setIsAdjusting(true);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalMaxPrice(value);
    setIsAdjusting(true);
  };

  const handleMouseUp = () => {
    if (isAdjusting) {
      onPriceRangeChange({
        min: Math.min(localMinPrice, localMaxPrice),
        max: Math.max(localMinPrice, localMaxPrice)
      });
      setIsAdjusting(false);
    }
  };

  const handleReset = () => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
    onPriceRangeChange({ min: minPrice, max: maxPrice });
  };

  const presetRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹2,000', min: 500, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Above ₹10,000', min: 10000, max: 50000 }
  ];

  const handlePresetClick = (preset) => {
    setLocalMinPrice(preset.min);
    setLocalMaxPrice(preset.max);
    onPriceRangeChange({ min: preset.min, max: preset.max });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Price Range</h3>
        <button
          onClick={handleReset}
          className="text-xs text-primary hover:text-primary-700 transition-micro"
        >
          Reset
        </button>
      </div>

      {/* Price Range Display */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Min Price</p>
            <p className="text-lg font-data font-semibold text-text-primary">
              {formatCurrency(localMinPrice)}
            </p>
          </div>
          <Icon name="Minus" size={16} className="text-text-muted" />
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Max Price</p>
            <p className="text-lg font-data font-semibold text-text-primary">
              {formatCurrency(localMaxPrice)}
            </p>
          </div>
        </div>

        {/* Dual Range Slider */}
        <div className="relative">
          <div className="relative h-2 bg-secondary-200 rounded-full">
            <div
              className="absolute h-2 bg-primary rounded-full"
              style={{
                left: `${((localMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
                width: `${((localMaxPrice - localMinPrice) / (maxPrice - minPrice)) * 100}%`
              }}
            />
          </div>
          
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={100}
            value={localMinPrice}
            onChange={handleMinPriceChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          />
          
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={100}
            value={localMaxPrice}
            onChange={handleMaxPriceChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          />
        </div>
      </div>

      {/* Preset Price Ranges */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-primary">Quick Select</p>
        <div className="space-y-1">
          {presetRanges.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-micro ${
                localMinPrice === preset.min && localMaxPrice === preset.max
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;