import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import BrandFilter from './BrandFilter';
import AvailabilityFilter from './AvailabilityFilter';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({
  categories,
  brands,
  filters,
  onFiltersChange,
  productCounts,
  isOpen,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState('categories');

  const handleCategoryChange = (selectedCategories) => {
    onFiltersChange({
      ...filters,
      categories: selectedCategories
    });
  };

  const handlePriceRangeChange = (priceRange) => {
    onFiltersChange({
      ...filters,
      priceRange
    });
  };

  const handleBrandChange = (selectedBrands) => {
    onFiltersChange({
      ...filters,
      brands: selectedBrands
    });
  };

  const handleAvailabilityChange = (availability) => {
    onFiltersChange({
      ...filters,
      availability
    });
  };

  const handleBulkDiscountChange = (bulkDiscount) => {
    onFiltersChange({
      ...filters,
      bulkDiscount
    });
  };

  const handleMinimumOrderChange = (minimumOrder) => {
    onFiltersChange({
      ...filters,
      minimumOrder
    });
  };

  const handleClearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 50000 },
      availability: [],
      bulkDiscount: false,
      minimumOrder: false
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 50000) count++;
    if (filters.availability.length > 0) count++;
    if (filters.bulkDiscount) count++;
    if (filters.minimumOrder) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearAllFilters}
              className="text-sm text-primary hover:text-primary-700 transition-micro"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-secondary-50 rounded-md transition-micro"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Categories */}
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.categories}
          onCategoryChange={handleCategoryChange}
          productCounts={productCounts.categories}
        />

        {/* Price Range */}
        <PriceRangeFilter
          priceRange={filters.priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          minPrice={0}
          maxPrice={50000}
        />

        {/* Brands */}
        <BrandFilter
          brands={brands}
          selectedBrands={filters.brands}
          onBrandChange={handleBrandChange}
          productCounts={productCounts.brands}
        />

        {/* Availability & Offers */}
        <AvailabilityFilter
          availabilityFilters={filters.availability}
          onAvailabilityChange={handleAvailabilityChange}
          bulkDiscountFilter={filters.bulkDiscount}
          onBulkDiscountChange={handleBulkDiscountChange}
          minimumOrderFilter={filters.minimumOrder}
          onMinimumOrderChange={handleMinimumOrderChange}
        />
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden p-4 border-t border-border">
        <Button
          variant="primary"
          onClick={onClose}
          className="w-full"
          iconName="Check"
          iconPosition="left"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  // Desktop Sidebar
  if (!isOpen) {
    return (
      <div className="hidden lg:block w-80 bg-surface border-r border-border">
        {sidebarContent}
      </div>
    );
  }

  // Mobile Overlay
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-surface z-50 lg:relative lg:z-auto">
        {sidebarContent}
      </div>
    </>
  );
};

export default FilterSidebar;