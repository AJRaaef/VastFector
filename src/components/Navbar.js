import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingCart,
  User,
  Settings,
  Home,
  BarChart3,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Heart,
  ChevronDown,
  Sparkles,
  Package,
  Tag,
  TrendingUp,
  Store,
  ShoppingBag,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  Filter,
  Globe,
  Gift,
  Award
} from 'lucide-react';

const Navbar = () => {
  const { logout, user } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const cartCount = getCartCount();

  const mainNavLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/shop', label: 'Shop', icon: <Store className="w-4 h-4" /> },
    { path: '/categories', label: 'Categories', icon: <Package className="w-4 h-4" /> },
    { path: '/deals', label: 'Deals', icon: <Tag className="w-4 h-4" /> },
    { path: '/trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const userNavLinks = [
    { path: '/cart', label: 'Cart', icon: <ShoppingCart className="w-4 h-4" />, badge: cartCount },
    { path: '/wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" />, badge: 5 },
    { path: '/notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: notifications },
  ];

  const userMenuLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { path: '/orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const quickLinks = [
    { label: 'New Arrivals', icon: <Sparkles className="w-4 h-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { label: 'Best Sellers', icon: <Award className="w-4 h-4" />, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { label: 'Flash Deals', icon: <Zap className="w-4 h-4" />, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 animate-pulse">
                <Gift className="w-4 h-4" />
                <span className="font-medium">Limited Time: Get 20% off with code</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-bold">WELCOME20</span>
              </div>
              <button className="ml-4 flex items-center gap-1 text-xs hover:text-primary-200 transition-colors">
                Shop Now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100/50' 
          : 'bg-white/90 backdrop-blur-lg border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary-700 bg-clip-text text-transparent">
                    Shop<span className="text-primary-600">Hub</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Premium Shopping</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center ml-10 space-x-1">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive(link.path)
                        ? 'text-primary-600 bg-primary-50 shadow-sm'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                    {isActive(link.path) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-primary-700 rounded-t-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products, brands, and categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder:text-gray-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <div className="w-px h-4 bg-gray-300" />
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Navigation Icons */}
              <div className="hidden md:flex items-center space-x-2">
                {userNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors group"
                  >
                    {link.icon}
                    {link.badge && link.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        {link.badge > 9 ? '9+' : link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name?.split(' ')[0] || 'Welcome'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.tier || 'Premium Member'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden animate-scaleIn">
                    {/* User Info */}
                    <div className="p-5 bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{user?.name || 'User'}</p>
                          <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                          <p className="text-xs text-primary-600 font-medium mt-1">
                            ⭐ Premium Member
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-100">
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <p className="text-2xl font-bold text-primary-600">{cartCount}</p>
                        <p className="text-xs text-gray-600">Items</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <p className="text-2xl font-bold text-green-600">5</p>
                        <p className="text-xs text-gray-600">Orders</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <p className="text-2xl font-bold text-purple-600">12</p>
                        <p className="text-xs text-gray-600">Wishlist</p>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="p-2">
                      {userMenuLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 group"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                            {link.icon}
                          </div>
                          <span className="text-sm font-medium flex-1">{link.label}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                        </Link>
                      ))}
                    </div>

                    {/* Quick Links */}
                    <div className="p-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2">
                        {quickLinks.map((link, index) => (
                          <button
                            key={index}
                            className="flex flex-col items-center p-3 bg-gray-50 hover:bg-white rounded-xl transition-all hover:shadow-md"
                          >
                            <div className={`p-2 ${link.color} rounded-lg mb-2`}>
                              {link.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-700">{link.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setTimeout(handleLogout, 300);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-slideDown">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all"
                    autoFocus
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* User Info */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
                      ⭐ Premium
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1 mb-6">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium flex-1">{link.label}</span>
                    {isActive(link.path) && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700" />
                    )}
                  </Link>
                ))}
              </div>

              {/* User Navigation */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {userNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  >
                    {link.icon}
                    <span className="text-xs font-medium mt-2">{link.label}</span>
                    {link.badge && link.badge > 0 && (
                      <span className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center shadow-md">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* User Menu Links */}
              <div className="space-y-1 mb-6">
                {userMenuLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {link.icon}
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className={`p-2 ${link.color} rounded-lg mb-2`}>
                      {link.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(handleLogout, 300);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;