import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import HeaderNavigation from '../../components/ui/HeaderNavigation';

import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 50000 },
    availability: [],
    bulkDiscount: false,
    minimumOrder: false
  });

  // Mock data
  const mockCategories = [
    {
      id: 'grains',
      name: 'Grains & Cereals',
      icon: 'Wheat',
      subcategories: [
        { id: 'rice', name: 'Rice' },
        { id: 'wheat', name: 'Wheat' },
        { id: 'barley', name: 'Barley' },
        { id: 'oats', name: 'Oats' }
      ]
    },
    {
      id: 'vegetables',
      name: 'Fresh Vegetables',
      icon: 'Carrot',
      subcategories: [
        { id: 'onions', name: 'Onions' },
        { id: 'potatoes', name: 'Potatoes' },
        { id: 'tomatoes', name: 'Tomatoes' },
        { id: 'leafy_greens', name: 'Leafy Greens' }
      ]
    },
    {
      id: 'pulses',
      name: 'Pulses & Lentils',
      icon: 'Bean',
      subcategories: [
        { id: 'dal_toor', name: 'Toor Dal' },
        { id: 'dal_moong', name: 'Moong Dal' },
        { id: 'chickpeas', name: 'Chickpeas' },
        { id: 'kidney_beans', name: 'Kidney Beans' }
      ]
    },
    {
      id: 'oils',
      name: 'Cooking Oils',
      icon: 'Droplets',
      subcategories: [
        { id: 'sunflower_oil', name: 'Sunflower Oil' },
        { id: 'mustard_oil', name: 'Mustard Oil' },
        { id: 'coconut_oil', name: 'Coconut Oil' },
        { id: 'olive_oil', name: 'Olive Oil' }
      ]
    },
    {
      id: 'spices',
      name: 'Spices & Seasonings',
      icon: 'Pepper',
      subcategories: [
        { id: 'turmeric', name: 'Turmeric' },
        { id: 'cumin', name: 'Cumin' },
        { id: 'coriander', name: 'Coriander' },
        { id: 'garam_masala', name: 'Garam Masala' }
      ]
    }
  ];

  const mockBrands = [
    { id: 'brand_1', name: 'FreshHarvest', logo: null },
    { id: 'brand_2', name: 'GoldenGrain', logo: null },
    { id: 'brand_3', name: 'PurePulse', logo: null },
    { id: 'brand_4', name: 'NatureFresh', logo: null },
    { id: 'brand_5', name: 'OrganicChoice', logo: null },
    { id: 'brand_6', name: 'FarmSelect', logo: null },
    { id: 'brand_7', name: 'QualityFirst', logo: null },
    { id: 'brand_8', name: 'BulkBest', logo: null },
    { id: 'brand_9', name: 'WholesalePro', logo: null },
    { id: 'brand_10', name: 'TradeMark', logo: null }
  ];

  const mockProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice 25kg',
      brand: 'GoldenGrain',
      category: 'Grains & Cereals',
      price: 2800,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium quality aged basmati rice perfect for bulk cooking and catering needs.',
      stockStatus: 'in_stock',
      availableQuantity: 500,
      minimumOrderQuantity: 5,
      isBestSeller: true,
      bulkPricing: [
        { minQuantity: 10, price: 2700 },
        { minQuantity: 25, price: 2600 },
        { minQuantity: 50, price: 2500 }
      ]
    },
    {
      id: 2,
      name: 'Organic Wheat Flour 50kg',
      brand: 'OrganicChoice',
      category: 'Grains & Cereals',
      price: 2200,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Stone-ground organic wheat flour ideal for commercial baking and food service.',
      stockStatus: 'in_stock',
      availableQuantity: 300,
      minimumOrderQuantity: 2,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 5, price: 2100 },
        { minQuantity: 10, price: 2000 },
        { minQuantity: 20, price: 1900 }
      ]
    },
    {
      id: 3,
      name: 'Fresh Onions 50kg',
      brand: 'FreshHarvest',
      category: 'Fresh Vegetables',
      price: 1200,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Farm-fresh red onions sourced directly from farmers for restaurants and hotels.',
      stockStatus: 'in_stock',
      availableQuantity: 1000,
      minimumOrderQuantity: 10,
      isBestSeller: true,
      bulkPricing: [
        { minQuantity: 25, price: 1150 },
        { minQuantity: 50, price: 1100 },
        { minQuantity: 100, price: 1050 }
      ]
    },
    {
      id: 4,
      name: 'Premium Cooking Oil 15L',
      brand: 'PurePulse',
      category: 'Cooking Oils',
      price: 1800,
      unit: 'L',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Refined sunflower oil perfect for deep frying and commercial cooking applications.',
      stockStatus: 'low_stock',
      availableQuantity: 50,
      minimumOrderQuantity: 2,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 5, price: 1750 },
        { minQuantity: 10, price: 1700 },
        { minQuantity: 20, price: 1650 }
      ]
    },
    {
      id: 5,
      name: 'Toor Dal 25kg',
      brand: 'QualityFirst',
      category: 'Pulses & Lentils',
      price: 4200,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium quality toor dal (pigeon peas) ideal for bulk cooking and meal preparation.',
      stockStatus: 'in_stock',
      availableQuantity: 200,
      minimumOrderQuantity: 5,
      isBestSeller: true,
      bulkPricing: [
        { minQuantity: 10, price: 4100 },
        { minQuantity: 25, price: 4000 },
        { minQuantity: 50, price: 3900 }
      ]
    },
    {
      id: 6,
      name: 'Fresh Potatoes 50kg',
      brand: 'NatureFresh',
      category: 'Fresh Vegetables',
      price: 900,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Grade A potatoes perfect for restaurants, hotels, and catering businesses.',
      stockStatus: 'in_stock',
      availableQuantity: 800,
      minimumOrderQuantity: 10,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 25, price: 850 },
        { minQuantity: 50, price: 800 },
        { minQuantity: 100, price: 750 }
      ]
    },
    {
      id: 7,
      name: 'Turmeric Powder 5kg',
      brand: 'FarmSelect',
      category: 'Spices & Seasonings',
      price: 1500,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Pure turmeric powder with high curcumin content for commercial food preparation.',
      stockStatus: 'in_stock',
      availableQuantity: 100,
      minimumOrderQuantity: 2,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 5, price: 1450 },
        { minQuantity: 10, price: 1400 },
        { minQuantity: 20, price: 1350 }
      ]
    },
    {
      id: 8,
      name: 'Sugar 50kg',
      brand: 'BulkBest',
      category: 'Sweeteners',
      price: 2800,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Refined white sugar suitable for bakeries, restaurants, and food processing units.',
      stockStatus: 'out_of_stock',
      availableQuantity: 0,
      minimumOrderQuantity: 5,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 10, price: 2750 },
        { minQuantity: 25, price: 2700 },
        { minQuantity: 50, price: 2650 }
      ]
    },
    {
      id: 9,
      name: 'Fresh Tomatoes 25kg',
      brand: 'FreshHarvest',
      category: 'Fresh Vegetables',
      price: 1800,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Vine-ripened tomatoes perfect for restaurants and food service establishments.',
      stockStatus: 'pre_order',
      availableQuantity: 0,
      minimumOrderQuantity: 5,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 10, price: 1750 },
        { minQuantity: 25, price: 1700 },
        { minQuantity: 50, price: 1650 }
      ]
    },
    {
      id: 10,
      name: 'Moong Dal 25kg',
      brand: 'WholesalePro',
      category: 'Pulses & Lentils',
      price: 3800,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium quality moong dal (green gram) ideal for bulk cooking and catering.',
      stockStatus: 'in_stock',
      availableQuantity: 150,
      minimumOrderQuantity: 5,
      isBestSeller: true,
      bulkPricing: [
        { minQuantity: 10, price: 3700 },
        { minQuantity: 25, price: 3600 },
        { minQuantity: 50, price: 3500 }
      ]
    },
    {
      id: 11,
      name: 'Coconut Oil 10L',
      brand: 'TradeMark',
      category: 'Cooking Oils',
      price: 2200,
      unit: 'L',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Pure coconut oil extracted using traditional methods for authentic taste.',
      stockStatus: 'in_stock',
      availableQuantity: 80,
      minimumOrderQuantity: 2,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 5, price: 2150 },
        { minQuantity: 10, price: 2100 },
        { minQuantity: 20, price: 2050 }
      ]
    },
    {
      id: 12,
      name: 'Cumin Seeds 2kg',
      brand: 'OrganicChoice',
      category: 'Spices & Seasonings',
      price: 1200,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Whole cumin seeds with intense aroma perfect for commercial spice blending.',
      stockStatus: 'in_stock',
      availableQuantity: 60,
      minimumOrderQuantity: 1,
      isBestSeller: false,
      bulkPricing: [
        { minQuantity: 5, price: 1150 },
        { minQuantity: 10, price: 1100 },
        { minQuantity: 20, price: 1050 }
      ]
    }
  ];

  const mockProductCounts = {
    categories: {
      'grains': 3,
      'vegetables': 3,
      'pulses': 2,
      'oils': 2,
      'spices': 2,
      'rice': 1,
      'wheat': 1,
      'onions': 1,
      'potatoes': 1,
      'tomatoes': 1,
      'dal_toor': 1,
      'dal_moong': 1,
      'sunflower_oil': 1,
      'coconut_oil': 1,
      'turmeric': 1,
      'cumin': 1
    },
    brands: {
      'brand_1': 3,
      'brand_2': 1,
      'brand_3': 1,
      'brand_4': 1,
      'brand_5': 2,
      'brand_6': 1,
      'brand_7': 1,
      'brand_8': 1,
      'brand_9': 1,
      'brand_10': 1
    }
  };

  useEffect(() => {
    // Initialize filters from URL search params
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      // Filter products based on search query
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(mockProducts);
    }
    
    setLoading(false);
  }, [searchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to products
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filteredProducts = [...mockProducts];

    // Apply category filter
    if (currentFilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const categoryMatch = currentFilters.categories.some(categoryId => {
          const category = mockCategories.find(cat => cat.id === categoryId);
          if (category) {
            return product.category === category.name;
          }
          // Check subcategories
          return mockCategories.some(cat => 
            cat.subcategories?.some(sub => sub.id === categoryId)
          );
        });
        return categoryMatch;
      });
    }

    // Apply brand filter
    if (currentFilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return currentFilters.brands.some(brandId => {
          const brand = mockBrands.find(b => b.id === brandId);
          return brand && product.brand === brand.name;
        });
      });
    }

    // Apply price range filter
    if (currentFilters.priceRange.min > 0 || currentFilters.priceRange.max < 50000) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= currentFilters.priceRange.min && 
        product.price <= currentFilters.priceRange.max
      );
    }

    // Apply availability filter
    if (currentFilters.availability.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        currentFilters.availability.includes(product.stockStatus)
      );
    }

    // Apply bulk discount filter
    if (currentFilters.bulkDiscount) {
      filteredProducts = filteredProducts.filter(product => 
        product.bulkPricing && product.bulkPricing.length > 0
      );
    }

    // Apply minimum order filter
    if (currentFilters.minimumOrder) {
      filteredProducts = filteredProducts.filter(product => 
        product.minimumOrderQuantity && product.minimumOrderQuantity > 1
      );
    }

    setProducts(filteredProducts);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    
    let sortedProducts = [...products];
    
    switch (newSortBy) {
      case 'price_low_high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'bulk_savings':
        sortedProducts.sort((a, b) => {
          const aSavings = a.bulkPricing ? a.bulkPricing.length : 0;
          const bSavings = b.bulkPricing ? b.bulkPricing.length : 0;
          return bSavings - aSavings;
        });
        break;
      case 'popularity':
        sortedProducts.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        // relevance - keep original order
        break;
    }
    
    setProducts(sortedProducts);
  };

  const handleAddToCart = async (product) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      existingCart[existingItemIndex].quantity += product.quantity;
      existingCart[existingItemIndex].totalPrice = 
        existingCart[existingItemIndex].unitPrice * existingCart[existingItemIndex].quantity;
    } else {
      // Add new item
      existingCart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
        unit: product.unit
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleLoadMore = async () => {
    // Simulate loading more products
    await new Promise(resolve => setTimeout(resolve, 1000));
    setHasMore(false);
  };

  return (
    <>
      <HeaderNavigation />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              categories={mockCategories}
              brands={mockBrands}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              productCounts={mockProductCounts}
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileFilterOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Filters & Sort
                </Button>
              </div>

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Wholesale Product Catalog
                </h1>
                <p className="text-text-secondary">
                  Browse our extensive collection of wholesale grocery products with bulk pricing and minimum order quantities designed for businesses.
                </p>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default ProductCatalog;