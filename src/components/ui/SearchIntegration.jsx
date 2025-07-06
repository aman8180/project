import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchIntegration = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(isMobile);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, name: 'Basmati Rice 25kg', category: 'Grains', price: 2500 },
    { id: 2, name: 'Wheat Flour 50kg', category: 'Flour', price: 1800 },
    { id: 3, name: 'Cooking Oil 15L', category: 'Oil', price: 1200 },
    { id: 4, name: 'Sugar 50kg', category: 'Sweeteners', price: 2200 },
    { id: 5, name: 'Dal Toor 25kg', category: 'Pulses', price: 3500 },
    { id: 6, name: 'Onion 50kg', category: 'Vegetables', price: 800 },
    { id: 7, name: 'Potato 50kg', category: 'Vegetables', price: 600 },
    { id: 8, name: 'Tomato 25kg', category: 'Vegetables', price: 1500 },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        if (!isMobile && !searchQuery) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchQuery, isMobile]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    performSearch(suggestion.name);
  };

  const performSearch = (query) => {
    // Navigate to product catalog with search query
    navigate(`/product-catalog?search=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  const handleSearchIconClick = () => {
    if (!isMobile) {
      if (!isExpanded) {
        setIsExpanded(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 150);
      } else if (searchQuery.trim()) {
        performSearch(searchQuery.trim());
      }
    }
  };

  const handleInputFocus = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              className="w-full pl-10 pr-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon 
                name={isLoading ? 'Loader2' : 'Search'} 
                size={16} 
                className={`text-text-muted ${isLoading ? 'animate-spin' : ''}`}
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-micro"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </form>

        {/* Mobile Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-2 max-h-64 overflow-y-auto z-search-overlay">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center justify-between p-3 hover:bg-secondary-50 transition-micro border-b border-border-light last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Package" size={16} className="text-text-muted" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-text-primary">
                      {suggestion.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {suggestion.category}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-data font-medium text-primary">
                  {formatCurrency(suggestion.price)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-full' : 'w-10'
        }`}>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              className={`transition-all duration-300 ${
                isExpanded 
                  ? 'w-full pl-10 pr-10 opacity-100' :'w-0 pl-0 pr-0 opacity-0 border-transparent'
              }`}
            />
            {isExpanded && searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-micro"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleSearchIconClick}
            className={`flex items-center justify-center w-10 h-10 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-micro ${
              isExpanded ? 'ml-2' : ''
            }`}
          >
            <Icon 
              name={isLoading ? 'Loader2' : 'Search'} 
              size={18} 
              className={isLoading ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </form>

      {/* Desktop Suggestions */}
      {showSuggestions && suggestions.length > 0 && isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-2 max-h-80 overflow-y-auto z-search-overlay">
          <div className="p-2">
            <div className="text-xs text-text-muted mb-2 px-2">
              {suggestions.length} {suggestions.length === 1 ? 'result' : 'results'} found
            </div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-secondary-50 transition-micro"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Package" size={16} className="text-text-muted" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-text-primary">
                      {suggestion.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      in {suggestion.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-data font-medium text-primary">
                    {formatCurrency(suggestion.price)}
                  </span>
                  <p className="text-xs text-text-muted">per unit</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchIntegration;