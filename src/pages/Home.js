import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Grid, List, X, ChevronDown, 
  TrendingUp, Star, Zap, Shield, Truck, Sparkles,
  RefreshCw, ShoppingBag, Flame, Clock, Trophy,
  ArrowRight, Tag, Percent, ChevronRight, ShieldCheck,
  ThumbsUp, Award, Truck as TruckIcon, Package,
  ShoppingCart, Heart, Eye, CheckCircle, User
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Navbar from '../components/Navbar';
import { products, categories } from '../data/products';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDeal, setActiveDeal] = useState(0);

  // Trending products (filter by sales and rating)
  const trendingProducts = products
    .filter(p => p.sales > 100 || p.rating >= 4.5)
    .sort((a, b) => (b.sales * b.rating) - (a.sales * a.rating))
    .slice(0, 8);

  // Daily deals (simulated)
  const dailyDeals = [
    { id: 1, title: 'Flash Sale', discount: '70% OFF', timeLeft: '02:15:30', color: 'from-red-500 to-orange-500' },
    { id: 2, title: 'Weekend Special', discount: '50% OFF', timeLeft: '01:45:20', color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Clearance', discount: '60% OFF', timeLeft: '03:30:45', color: 'from-blue-500 to-cyan-500' },
  ];

  // Featured categories with icons
  const featuredCategories = [
    { name: 'Electronics', icon: '💻', count: 45, color: 'bg-blue-50 text-blue-600', popular: true },
    { name: 'Fashion', icon: '👕', count: 82, color: 'bg-pink-50 text-pink-600', popular: true },
    { name: 'Home & Kitchen', icon: '🏠', count: 67, color: 'bg-green-50 text-green-600' },
    { name: 'Beauty', icon: '💄', count: 53, color: 'bg-purple-50 text-purple-600', trending: true },
    { name: 'Sports', icon: '⚽', count: 38, color: 'bg-orange-50 text-orange-600' },
    { name: 'Books', icon: '📚', count: 91, color: 'bg-indigo-50 text-indigo-600' },
  ];

  // Stats for dashboard
  const stats = [
    { label: 'Total Products', value: products.length, change: '+12%', icon: <Package className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Active Users', value: '2.4K', change: '+8%', icon: <User className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'Today\'s Sales', value: '$8,426', change: '+23%', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Conversion Rate', value: '4.8%', change: '+2.1%', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-orange-500' },
  ];

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      if (priceRange.min) {
        filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
      }

      if (priceRange.max) {
        filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
      }

      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'popular':
          filtered.sort((a, b) => b.sales - a.sales);
          break;
        default:
          filtered.sort((a, b) => {
            const aScore = (a.rating * 2) + (a.sales / 100);
            const bScore = (b.rating * 2) + (b.sales / 100);
            return bScore - aScore;
          });
          break;
      }

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const sortOptions = [
    { value: 'default', label: 'Featured', icon: '🔥' },
    { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
    { value: 'price-high', label: 'Price: High to Low', icon: '💎' },
    { value: 'rating', label: 'Top Rated', icon: '⭐' },
    { value: 'name', label: 'Name: A to Z', icon: '🔤' },
    { value: 'popular', label: 'Most Popular', icon: '📈' },
    { value: 'trending', label: 'Trending', icon: '🚀' },
  ];

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange({ min: '', max: '' });
    setSortBy('default');
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const getCategoryCount = (category) => {
    if (category === 'All') return products.length;
    return products.filter(p => p.category === category).length;
  };

  // Rotate deals
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeal((prev) => (prev + 1) % dailyDeals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section with Stats */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse border border-white/30">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Now • {trendingProducts.length}+ Hot Items</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Shop Smarter,
                <span className="block text-primary-200">Live Better</span>
              </h1>
              
              <p className="text-xl text-primary-200 mb-8 max-w-xl leading-relaxed">
                Discover curated products with premium quality. 
                <span className="block mt-2 font-semibold">Free shipping • 30-day returns • 24/7 support</span>
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20`}>
                        {stat.icon}
                      </div>
                      <span className="text-sm text-primary-200">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-300 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What are you looking for today? Search products, brands, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-36 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white to-gray-100 text-primary-700 px-6 py-2.5 rounded-xl font-semibold hover:from-gray-100 hover:to-white transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Search className="w-4 h-4" />
                  Explore Now
                </button>
              </form>
            </div>
            
            {/* Daily Deals Carousel */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Clock className="w-6 h-6 text-red-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Flash Deals</h3>
                      <p className="text-primary-200 text-sm">Limited time offers</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {dailyDeals.map((deal, index) => (
                      <button
                        key={deal.id}
                        onClick={() => setActiveDeal(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === activeDeal ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {dailyDeals.map((deal, index) => (
                    <div
                      key={deal.id}
                      className={`absolute inset-0 bg-gradient-to-br ${deal.color} p-8 flex flex-col justify-between rounded-2xl transition-all duration-500 ${
                        index === activeDeal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div>
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                          {deal.title}
                        </span>
                        <h4 className="text-4xl font-bold mb-2">{deal.discount}</h4>
                        <p className="text-white/80">On selected items</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span className="font-mono text-lg">{deal.timeLeft}</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                          Shop Now
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <TruckIcon className="w-5 h-5 text-green-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Free Delivery</p>
                        <p className="text-sm text-primary-200">On orders $50+</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-semibold">2-Year Warranty</p>
                        <p className="text-sm text-primary-200">On all products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-600">Browse our most popular collections</p>
          </div>
          <button className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View All Categories
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <div
              key={category.name}
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
              {category.popular && (
                <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              {category.trending && (
                <span className="absolute top-3 right-3 bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Trending
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
              </div>
              <p className="text-gray-600">Most popular products this week</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
                <ShoppingCart className="w-4 h-4" />
                View All Trending
              </button>
            </div>
          </div>
          
          {/* Trending Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trendingProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    TRENDING
                  </span>
                </div>
                <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-gray-400 text-sm">({product.sales})</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                      )}
                    </div>
                    <button className="p-3 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-colors group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header with Stats */}
            <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-primary-600">{filteredProducts.length}</span> of {products.length} products
                    </p>
                    {searchTerm && (
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
                        "{searchTerm}"
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory !== 'All' || priceRange.min || priceRange.max || sortBy !== 'default') && (
                    <button
                      onClick={handleClearAll}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Clear All
                    </button>
                  )}

                  {/* Mobile Filter */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  {/* View Toggle */}
                  <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm min-w-[180px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <span className="font-medium">
                          {sortOptions.find(opt => opt.value === sortBy)?.label}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isSortOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={() => setIsSortOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-scaleIn">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setIsSortOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm ${
                                sortBy === option.value 
                                  ? 'text-primary-600 bg-primary-50' 
                                  : 'text-gray-700'
                              }`}
                            >
                              <span className="text-lg">{option.icon}</span>
                              <span className="font-medium">{option.label}</span>
                              {sortBy === option.value && (
                                <CheckCircle className="ml-auto w-5 h-5 text-primary-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Quick Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:shadow-lg'
                  }`}
                >
                  {category === 'All' && <ShoppingBag className="w-4 h-4" />}
                  {category === 'Electronics' && '💻'}
                  {category === 'Furniture' && '🪑'}
                  {category === 'Stationery' && '📚'}
                  {category === 'Accessories' && '🎒'}
                  {category}
                  <span className={`text-xs ${selectedCategory === category ? 'text-white/80' : 'text-gray-500'}`}>
                    ({getCategoryCount(category)})
                  </span>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your criteria. Try adjusting your search or filters.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleClearAll}
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
                    >
                      Clear All Filters
                    </button>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}

              {/* Load More */}
              {!isLoading && filteredProducts.length > 0 && filteredProducts.length < products.length && (
                <div className="text-center mt-12">
                  <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                    Load More Products ({products.length - filteredProducts.length} remaining)
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands</h3>
            <p className="text-gray-600">Why customers choose us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">98% Satisfaction</h4>
              <p className="text-gray-600 text-sm">Based on customer reviews</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Curated product selection</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600 text-sm">SSL encrypted checkout</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Fast Delivery</h4>
              <p className="text-gray-600 text-sm">2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;