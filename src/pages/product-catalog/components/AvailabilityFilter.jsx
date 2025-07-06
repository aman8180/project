import React from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityFilter = ({ 
  availabilityFilters, 
  onAvailabilityChange, 
  bulkDiscountFilter, 
  onBulkDiscountChange,
  minimumOrderFilter,
  onMinimumOrderChange 
}) => {
  const availabilityOptions = [
    { id: 'in_stock', label: 'In Stock', icon: 'CheckCircle', color: 'text-success' },
    { id: 'low_stock', label: 'Low Stock', icon: 'AlertTriangle', color: 'text-warning' },
    { id: 'out_of_stock', label: 'Out of Stock', icon: 'XCircle', color: 'text-error' },
    { id: 'pre_order', label: 'Pre-Order Available', icon: 'Clock', color: 'text-secondary' }
  ];

  const handleAvailabilityToggle = (optionId) => {
    const newFilters = new Set(availabilityFilters);
    if (newFilters.has(optionId)) {
      newFilters.delete(optionId);
    } else {
      newFilters.add(optionId);
    }
    onAvailabilityChange(Array.from(newFilters));
  };

  const handleClearAll = () => {
    onAvailabilityChange([]);
    onBulkDiscountChange(false);
    onMinimumOrderChange(false);
  };

  const hasActiveFilters = availabilityFilters.length > 0 || bulkDiscountFilter || minimumOrderFilter;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Availability & Offers</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:text-primary-700 transition-micro"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Stock Availability */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Stock Status</h4>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary-50 cursor-pointer transition-micro"
            >
              <input
                type="checkbox"
                checked={availabilityFilters.includes(option.id)}
                onChange={() => handleAvailabilityToggle(option.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <Icon name={option.icon} size={16} className={option.color} />
              <span className="text-sm text-text-primary">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bulk Offers */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Bulk Benefits</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 p-3 rounded-lg border border-border-light hover:bg-secondary-50 cursor-pointer transition-micro">
            <input
              type="checkbox"
              checked={bulkDiscountFilter}
              onChange={(e) => onBulkDiscountChange(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className="flex items-center space-x-2">
              <Icon name="Percent" size={16} className="text-accent" />
              <div>
                <span className="text-sm font-medium text-text-primary">Bulk Discount Available</span>
                <p className="text-xs text-text-secondary">Products with quantity-based pricing</p>
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-lg border border-border-light hover:bg-secondary-50 cursor-pointer transition-micro">
            <input
              type="checkbox"
              checked={minimumOrderFilter}
              onChange={(e) => onMinimumOrderChange(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={16} className="text-primary" />
              <div>
                <span className="text-sm font-medium text-text-primary">Minimum Order Met</span>
                <p className="text-xs text-text-secondary">Products meeting minimum quantity</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-accent-50 p-3 rounded-lg border border-accent-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Active Filters</span>
          </div>
          <div className="space-y-1">
            {availabilityFilters.length > 0 && (
              <p className="text-xs text-text-secondary">
                Stock: {availabilityFilters.length} filter{availabilityFilters.length !== 1 ? 's' : ''}
              </p>
            )}
            {bulkDiscountFilter && (
              <p className="text-xs text-text-secondary">Bulk discounts enabled</p>
            )}
            {minimumOrderFilter && (
              <p className="text-xs text-text-secondary">Minimum order filter active</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityFilter;