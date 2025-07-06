import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  loading, 
  onAddToCart, 
  onQuickView, 
  onLoadMore, 
  hasMore,
  sortBy,
  onSortChange 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'price_low_high', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price_high_low', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'bulk_savings', label: 'Best Bulk Savings', icon: 'Percent' },
    { value: 'popularity', label: 'Most Popular', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' }
  ];

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderSkeletonCard = () => (
    <div className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-secondary-200"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-secondary-200 rounded w-16"></div>
          <div className="h-3 bg-secondary-200 rounded w-20"></div>
        </div>
        <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
        <div className="h-6 bg-secondary-200 rounded w-1/2"></div>
        <div className="h-16 bg-secondary-200 rounded"></div>
        <div className="h-10 bg-secondary-200 rounded"></div>
      </div>
    </div>
  );

  if (loading && products.length === 0) {
    return (
      <div className="space-y-6">
        {/* Skeleton Sort Bar */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-secondary-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-secondary-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              {renderSkeletonCard()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Package" size={32} className="text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Products Found</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our categories.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort and Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="Package" size={20} className="text-text-secondary" />
          <span className="text-text-primary font-medium">
            {products.length} Product{products.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-surface"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Load More Section */}
      {hasMore && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loadingMore}
            iconName="ChevronDown"
            iconPosition="right"
            className="px-8"
          >
            {loadingMore ? 'Loading More...' : 'Load More Products'}
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`loading-${index}`}>
              {renderSkeletonCard()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;