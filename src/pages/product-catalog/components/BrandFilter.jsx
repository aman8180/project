import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const BrandFilter = ({ brands, selectedBrands, onBrandChange, productCounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBrands = showAll ? filteredBrands : filteredBrands.slice(0, 8);

  const handleBrandSelect = (brandId) => {
    const newSelected = new Set(selectedBrands);
    if (newSelected.has(brandId)) {
      newSelected.delete(brandId);
    } else {
      newSelected.add(brandId);
    }
    onBrandChange(Array.from(newSelected));
  };

  const handleClearAll = () => {
    onBrandChange([]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Brands</h3>
        {selectedBrands.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:text-primary-700 transition-micro"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Brand Search */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} className="text-text-muted" />
        </div>
      </div>

      {/* Selected Brands Summary */}
      {selectedBrands.length > 0 && (
        <div className="bg-primary-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''} selected
            </span>
            <Icon name="Filter" size={16} className="text-primary" />
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedBrands.slice(0, 3).map((brandId) => {
              const brand = brands.find(b => b.id === brandId);
              return brand ? (
                <span
                  key={brandId}
                  className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                >
                  {brand.name}
                  <button
                    onClick={() => handleBrandSelect(brandId)}
                    className="ml-1 hover:bg-primary-700 rounded-full p-0.5 transition-micro"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ) : null;
            })}
            {selectedBrands.length > 3 && (
              <span className="text-xs text-primary">
                +{selectedBrands.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Brand List */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {displayedBrands.length > 0 ? (
          displayedBrands.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-secondary-50 cursor-pointer transition-micro"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => handleBrandSelect(brand.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-2">
                  {brand.logo && (
                    <div className="w-6 h-6 bg-secondary-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-text-secondary">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-text-primary">{brand.name}</span>
                </div>
              </div>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
                {productCounts[brand.id] || 0}
              </span>
            </label>
          ))
        ) : (
          <div className="text-center py-4">
            <Icon name="Search" size={24} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">No brands found</p>
          </div>
        )}
      </div>

      {/* Show More/Less Toggle */}
      {filteredBrands.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-primary hover:text-primary-700 transition-micro"
        >
          <span>{showAll ? 'Show Less' : `Show ${filteredBrands.length - 8} More`}</span>
          <Icon
            name="ChevronDown"
            size={16}
            className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default BrandFilter;