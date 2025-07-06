import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange, productCounts }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['grains', 'vegetables']));

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (categoryId) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }
    onCategoryChange(Array.from(newSelected));
  };

  const renderSubcategories = (subcategories, parentId) => {
    if (!subcategories || subcategories.length === 0) return null;

    return (
      <div className="ml-4 mt-2 space-y-1">
        {subcategories.map((subcategory) => (
          <label
            key={subcategory.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-secondary-50 cursor-pointer transition-micro"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(subcategory.id)}
                onChange={() => handleCategorySelect(subcategory.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-primary">{subcategory.name}</span>
            </div>
            <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
              {productCounts[subcategory.id] || 0}
            </span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Categories</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={() => onCategoryChange([])}
            className="text-xs text-primary hover:text-primary-700 transition-micro"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="border border-border-light rounded-lg">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-secondary-50 transition-micro"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center space-x-2">
                <Icon name={category.icon} size={16} className="text-text-secondary" />
                <span className="font-medium text-text-primary">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
                  {productCounts[category.id] || 0}
                </span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-text-secondary transition-transform ${
                    expandedCategories.has(category.id) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {expandedCategories.has(category.id) && (
              <div className="px-3 pb-3">
                <label className="flex items-center justify-between p-2 rounded-md hover:bg-secondary-50 cursor-pointer transition-micro">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategorySelect(category.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm font-medium text-text-primary">All {category.name}</span>
                  </div>
                </label>
                {renderSubcategories(category.subcategories, category.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;