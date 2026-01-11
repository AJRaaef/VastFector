import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Filter, X, ChevronUp, ChevronDown, 
  DollarSign, Star, Tag, Zap, Truck, Package,
  Check, Percent, Clock, Shield, RefreshCw,
  TrendingUp, Sparkles, Award, ShoppingBag
} from 'lucide-react';
import { products } from '../data/products';

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceRangeChange, 
  sortBy, 
  onSortChange,
  isOpen = false,
  onClose = () => {}
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    sort: true,
    features: false,
    brands: false
  });

  const [localPriceRange, setLocalPriceRange] = useState({
    min: priceRange.min || '',
    max: priceRange.max || ''
  });

  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 2000 });

  // Calculate category counts from actual products
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    categories.forEach(category => {
      if (category !== 'All') {
        counts[category] = products.filter(p => p.category === category).length;
      }
    });
    return counts;
  }, [categories]);

  // Get unique brands from products
  const productBrands = useMemo(() => {
    const brands = products.reduce((acc, product) => {
      if (product.brand && !acc.includes(product.brand)) {
        acc.push(product.brand);
      }
      return acc;
    }, []);
    return brands.sort();
  }, []);

  // Calculate price range from products
  useEffect(() => {
    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    setSliderValues({ min: minPrice, max: maxPrice });
    if (!localPriceRange.max) {
      setLocalPriceRange(prev => ({
        ...prev,
        max: maxPrice.toString()
      }));
    }
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleSliderChange = useCallback((type, value) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      const newMin = Math.min(numValue, sliderValues.max - 1);
      setLocalPriceRange(prev => ({ ...prev, min: newMin.toString() }));
    } else {
      const newMax = Math.max(numValue, sliderValues.min + 1);
      setLocalPriceRange(prev => ({ ...prev, max: newMax.toString() }));
    }
  }, [sliderValues]);

  const handlePriceBlur = useCallback(() => {
    onPriceRangeChange(localPriceRange);
  }, [localPriceRange, onPriceRangeChange]);

  const handleCategorySelect = useCallback((category) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  const handleRatingSelect = useCallback((rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  }, []);

  const handleBrandSelect = useCallback((brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  }, []);

  const handleFeatureSelect = useCallback((feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  }, []);

  const handleClearAll = useCallback(() => {
    onCategoryChange('All');
    setLocalPriceRange({ min: '', max: sliderValues.max.toString() });
    onPriceRangeChange({ min: '', max: sliderValues.max.toString() });
    setSelectedRatings([]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
    onSortChange('default');
  }, [onCategoryChange, onPriceRangeChange, onSortChange, sliderValues.max]);

  const handleApplyFilters = useCallback(() => {
    onPriceRangeChange(localPriceRange);
    onClose();
  }, [localPriceRange, onPriceRangeChange, onClose]);

  const sortOptions = [
    { value: 'default', label: 'Featured', icon: <Sparkles className="w-4 h-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { value: 'price-low', label: 'Price: Low to High', icon: <DollarSign className="w-4 h-4" />, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { value: 'price-high', label: 'Price: High to Low', icon: <DollarSign className="w-4 h-4" />, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'rating', label: 'Highest Rating', icon: <Star className="w-4 h-4" />, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { value: 'trending', label: 'Trending Now', icon: <TrendingUp className="w-4 h-4" />, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { value: 'name', label: 'Name: A to Z', icon: <Tag className="w-4 h-4" />, color: 'bg-gradient-to-r from-gray-500 to-gray-700' },
  ];

  const ratingOptions = [
    { value: 4.5, label: '4.5 & above', count: products.filter(p => p.rating >= 4.5).length },
    { value: 4, label: '4.0 & above', count: products.filter(p => p.rating >= 4).length },
    { value: 3.5, label: '3.5 & above', count: products.filter(p => p.rating >= 3.5).length },
    { value: 3, label: '3.0 & above', count: products.filter(p => p.rating >= 3).length },
  ];

  const featureOptions = [
    { id: 'free-shipping', label: 'Free Shipping', icon: <Truck className="w-4 h-4" /> },
    { id: 'fast-delivery', label: 'Fast Delivery', icon: <Clock className="w-4 h-4" /> },
    { id: 'best-seller', label: 'Best Seller', icon: <Award className="w-4 h-4" /> },
    { id: 'new-arrival', label: 'New Arrival', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'on-sale', label: 'On Sale', icon: <Percent className="w-4 h-4" /> },
    { id: 'warranty', label: 'With Warranty', icon: <Shield className="w-4 h-4" /> },
  ];

  const hasActiveFilters = useMemo(() => {
    return selectedCategory !== 'All' || 
           localPriceRange.min || 
           localPriceRange.max !== sliderValues.max.toString() ||
           selectedRatings.length > 0 ||
           selectedBrands.length > 0 ||
           selectedFeatures.length > 0 ||
           sortBy !== 'default';
  }, [selectedCategory, localPriceRange, sliderValues.max, selectedRatings, selectedBrands, selectedFeatures, sortBy]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full w-full lg:w-80 bg-white lg:bg-white/90 lg:backdrop-blur-sm 
        border-r border-gray-100 shadow-2xl lg:shadow-lg z-50
        transition-all duration-300 ease-out overflow-y-auto
        lg:translate-x-0 lg:relative lg:top-16 lg:h-[calc(100vh-4rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-white lg:bg-white/90 backdrop-blur-sm z-10 border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Filters & Sorting</h2>
                <p className="text-sm text-gray-500">Refine your shopping</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Clear all filters"
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Categories */}
          <div className="bg-gray-50/50 rounded-2xl p-4">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ShoppingBag className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                  Categories
                </h3>
              </div>
              {expandedSections.category ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              )}
            </button>
            
            {expandedSections.category && (
              <div className="space-y-2 animate-slideDown">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      selectedCategory === category
                        ? 'bg-white shadow-md border border-primary-100'
                        : 'hover:bg-white hover:shadow-sm hover:border hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full transition-all ${
                        selectedCategory === category 
                          ? 'bg-gradient-to-r from-primary-500 to-primary-700 scale-125' 
                          : 'bg-gray-300 group-hover:bg-primary-200'
                      }`} />
                      <span className={`text-sm font-medium ${
                        selectedCategory === category 
                          ? 'text-primary-700' 
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {category}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {categoryCounts[category] || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="bg-gray-50/50 rounded-2xl p-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  Price Range
                </h3>
              </div>
              {expandedSections.price ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-4 animate-slideDown">
                {/* Price Display */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Min</p>
                    <p className="text-lg font-bold text-gray-900">${localPriceRange.min || '0'}</p>
                  </div>
                  <div className="w-8 h-px bg-gray-300" />
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Max</p>
                    <p className="text-lg font-bold text-gray-900">${localPriceRange.max || sliderValues.max}</p>
                  </div>
                </div>

                {/* Slider */}
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                    style={{ 
                      left: `${((parseInt(localPriceRange.min) || 0) / sliderValues.max) * 100}%`, 
                      right: `${100 - ((parseInt(localPriceRange.max) || sliderValues.max) / sliderValues.max) * 100}%` 
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={sliderValues.max}
                    value={localPriceRange.min || 0}
                    onChange={(e) => handleSliderChange('min', e.target.value)}
                    onMouseUp={handlePriceBlur}
                    onTouchEnd={handlePriceBlur}
                    className="absolute top-1/2 w-full h-2 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <input
                    type="range"
                    min="0"
                    max={sliderValues.max}
                    value={localPriceRange.max || sliderValues.max}
                    onChange={(e) => handleSliderChange('max', e.target.value)}
                    onMouseUp={handlePriceBlur}
                    onTouchEnd={handlePriceBlur}
                    className="absolute top-1/2 w-full h-2 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>

                {/* Quick Price Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {[50, 100, 200, 500].map(price => (
                    <button
                      key={price}
                      onClick={() => {
                        setLocalPriceRange({ min: '0', max: price.toString() });
                        onPriceRangeChange({ min: '0', max: price.toString() });
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        localPriceRange.max === price.toString()
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      Under ${price}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="bg-gray-50/50 rounded-2xl p-4">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">
                  Customer Rating
                </h3>
              </div>
              {expandedSections.rating ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
              )}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-3 animate-slideDown">
                {ratingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRatingSelect(option.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedRatings.includes(option.value)
                        ? 'bg-white shadow-md border border-yellow-100'
                        : 'hover:bg-white hover:shadow-sm hover:border hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full transition-all ${
                        selectedRatings.includes(option.value)
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125'
                          : 'bg-gray-300'
                      }`} />
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(option.value)
                                ? 'text-yellow-400 fill-yellow-400'
                                : i < option.value
                                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${
                        selectedRatings.includes(option.value)
                          ? 'text-gray-900'
                          : 'text-gray-700'
                      }`}>
                        & above
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-gray-50/50 rounded-2xl p-4">
            <button
              onClick={() => toggleSection('features')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                  Features
                </h3>
              </div>
              {expandedSections.features ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              )}
            </button>
            
            {expandedSections.features && (
              <div className="grid grid-cols-2 gap-2 animate-slideDown">
                {featureOptions.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureSelect(feature.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                      selectedFeatures.includes(feature.id)
                        ? 'bg-white shadow-md border border-purple-100'
                        : 'hover:bg-white hover:shadow-sm hover:border hover:border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-2 ${
                      selectedFeatures.includes(feature.id)
                        ? 'bg-gradient-to-br from-purple-100 to-pink-100'
                        : 'bg-gray-100'
                    }`}>
                      {React.cloneElement(feature.icon, {
                        className: `w-4 h-4 ${
                          selectedFeatures.includes(feature.id)
                            ? 'text-purple-600'
                            : 'text-gray-500'
                        }`
                      })}
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      selectedFeatures.includes(feature.id)
                        ? 'text-purple-700'
                        : 'text-gray-700'
                    }`}>
                      {feature.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort By */}
          <div className="bg-gray-50/50 rounded-2xl p-4">
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Filter className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  Sort By
                </h3>
              </div>
              {expandedSections.sort ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              )}
            </button>
            
            {expandedSections.sort && (
              <div className="space-y-2 animate-slideDown">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                      sortBy === option.value
                        ? 'bg-white shadow-lg border-2 border-primary-200'
                        : 'hover:bg-white hover:shadow-md hover:border hover:border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${option.color} bg-opacity-20`}>
                      {React.cloneElement(option.icon, {
                        className: `w-4 h-4 ${
                          sortBy === option.value
                            ? option.color.includes('primary') ? 'text-primary-600' : 
                              option.color.includes('green') ? 'text-green-600' :
                              option.color.includes('blue') ? 'text-blue-600' :
                              option.color.includes('yellow') ? 'text-yellow-600' :
                              option.color.includes('red') ? 'text-red-600' :
                              option.color.includes('purple') ? 'text-purple-600' : 'text-gray-600'
                            : 'text-gray-500'
                        }`
                      })}
                    </div>
                    <span className={`text-sm font-medium flex-1 text-left ${
                      sortBy === option.value
                        ? 'text-gray-900'
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {option.label}
                    </span>
                    {sortBy === option.value && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 sticky bottom-0 bg-white pt-4 border-t border-gray-100">
            {hasActiveFilters && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-full border border-primary-100">
                      {selectedCategory}
                      <button 
                        onClick={() => onCategoryChange('All')}
                        className="ml-1 hover:text-primary-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(localPriceRange.min || localPriceRange.max !== sliderValues.max.toString()) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-100">
                      ${localPriceRange.min || '0'} - ${localPriceRange.max}
                      <button 
                        onClick={() => {
                          setLocalPriceRange({ min: '', max: sliderValues.max.toString() });
                          onPriceRangeChange({ min: '', max: sliderValues.max.toString() });
                        }}
                        className="ml-1 hover:text-green-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedRatings.map(rating => (
                    <span key={rating} className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full border border-yellow-100">
                      {rating}+ Stars
                      <button 
                        onClick={() => handleRatingSelect(rating)}
                        className="ml-1 hover:text-yellow-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleClearAll}
                className={`flex-1 py-3.5 border-2 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  hasActiveFilters
                    ? 'border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:shadow-md'
                    : 'border-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasActiveFilters}
              >
                <RefreshCw className="w-4 h-4" />
                Clear All
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Apply Filters
              </button>
            </div>
            
            {hasActiveFilters && (
              <p className="text-xs text-center text-gray-500 pt-2">
                {selectedCategory !== 'All' && `Category: ${selectedCategory} • `}
                {(localPriceRange.min || localPriceRange.max !== sliderValues.max.toString()) && `Price: $${localPriceRange.min || '0'}-$${localPriceRange.max} • `}
                {selectedRatings.length > 0 && `${selectedRatings.length} rating filter${selectedRatings.length > 1 ? 's' : ''}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;