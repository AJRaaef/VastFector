import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, Trash2, Plus, Minus, Tag,
  Truck, Shield, CreditCard, Lock, ArrowRight,
  X, Check, Percent, Package, AlertCircle,
  ShoppingBag, ArrowLeft, Gift, Star, Heart,
  Clock, ChevronRight, Zap, Sparkles, Award,
  ShieldCheck, RotateCcw, TruckIcon, CheckCircle,
  CreditCardIcon, Smartphone, Globe, Wallet
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems = [], 
    savedItems = [],
    coupons,
    activeCoupon,
    removeFromCart, 
    updateQuantity, 
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    getCartTotal,
    getCartCount,
    getItemCount,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
    calculateShipping,
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showAnimations, setShowAnimations] = useState({});

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
    triggerAnimation(item.id);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
      triggerAnimation(item.id);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const triggerAnimation = (id) => {
    setShowAnimations(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setShowAnimations(prev => ({ ...prev, [id]: false })), 300);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const result = applyCoupon(couponCode);
    if (result.success) {
      setCouponSuccess(`🎉 ${result.coupon.discount}% off applied!`);
      setCouponError('');
      setCouponCode('');
      setTimeout(() => setCouponSuccess(''), 3000);
    } else {
      setCouponError(result.message);
      setCouponSuccess('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  // Calculate totals
  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const shipping = useMemo(() => calculateShipping(subtotal), [calculateShipping, subtotal]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const discount = useMemo(() => calculateDiscount(subtotal), [calculateDiscount, subtotal]);
  const total = useMemo(() => {
    return Math.max(0, subtotal + shipping + tax - discount);
  }, [subtotal, shipping, tax, discount]);

  const cartCount = useMemo(() => getCartCount(), [getCartCount]);

  // Progress towards free shipping
  const shippingProgress = useMemo(() => {
    const threshold = 100;
    return Math.min(100, (subtotal / threshold) * 100);
  }, [subtotal]);

  // Recommended products based on cart items
  const recommendedProducts = useMemo(() => [
    { id: 101, name: 'USB-C Fast Charger', price: 29.99, image: 'https://images.unsplash.com/photo-1594736797933-d1001bb9a682?w=400&h=400&fit=crop', rating: 4.7 },
    { id: 102, name: 'Premium Phone Case', price: 34.99, image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w-400&h=400&fit=crop', rating: 4.5 },
    { id: 103, name: 'Wireless Earbuds', price: 89.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8 },
  ], []);

  const paymentMethods = [
    { icon: <CreditCardIcon className="w-6 h-6" />, name: 'Credit Card' },
    { icon: <Smartphone className="w-6 h-6" />, name: 'Mobile Pay' },
    { icon: <Wallet className="w-6 h-6" />, name: 'Digital Wallet' },
    { icon: <Globe className="w-6 h-6" />, name: 'PayPal' },
  ];

  const securityFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Secure Payment',
      description: '256-bit SSL encryption',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Fast Delivery',
      description: '2-3 business days',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      title: '30-Day Returns',
      description: 'Hassle-free returns',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Best Price',
      description: 'Price match guarantee',
      color: 'from-orange-500 to-amber-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-white to-primary-50 border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
                    {cartCount}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-700 bg-clip-text text-transparent">
                  Your Shopping Cart
                </h1>
                <p className="text-gray-600 mt-1">Review your items and checkout securely</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              {cartCount > 0 && (
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartCount === 0 ? (
          // Empty Cart State
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <div className="text-center py-16">
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-xl">
                <ShoppingCart className="w-20 h-20 text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any amazing products yet. Let's find something special!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Shopping
                </Link>
                {savedItems.length > 0 && (
                  <button
                    onClick={() => setShowSavedItems(true)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    View Saved Items ({savedItems.length})
                  </button>
                )}
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Recommended for You</h3>
                  <p className="text-gray-600">Based on popular trends</p>
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts.map(product => (
                  <div 
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          Accessories
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{product.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-2xl font-bold text-primary-600 mb-4">${product.price}</p>
                      <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Header */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl">
                      <Package className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-500">Review and edit your items</span>
                        <span className="text-sm font-medium text-primary-600">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {savedItems.length > 0 && (
                      <button
                        onClick={() => setShowSavedItems(!showSavedItems)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-primary-600 hover:bg-primary-50 font-medium rounded-lg transition-colors"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        Saved ({savedItems.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Cart Items List */}
              {cartItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full lg:w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        {showAnimations[item.id] && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-pulse">
                            <CheckCircle className="w-12 h-12 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                {item.category}
                              </span>
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-semibold">{item.rating}</span>
                                </div>
                              )}
                              {item.stock < 10 && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                                  <AlertCircle className="w-3 h-3" />
                                  Only {item.stock} left
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                                <button
                                  onClick={() => handleDecrement(item)}
                                  disabled={item.quantity <= 1}
                                  className="px-5 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-6 py-3 font-bold text-lg min-w-[80px] text-center bg-gray-50">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleIncrement(item)}
                                  className="px-5 py-3 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <span className="text-2xl font-bold text-primary-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                          <button
                            onClick={() => saveForLater(item)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-primary-600 hover:bg-primary-50 font-medium rounded-lg transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            Save for later
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Shipping Progress */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200/50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Truck className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Free Shipping Available!</h3>
                      <p className="text-gray-600">
                        Add <span className="font-bold text-primary-600">${(100 - subtotal).toFixed(2)}</span> more to get free shipping
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000"
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                      <span className="font-bold text-primary-600">$100 for free shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div 
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24 animate-scaleIn"
                style={{ animationDelay: '200ms' }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary-600" />
                  Order Summary
                </h2>

                {/* Coupon Section */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      {activeCoupon && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {activeCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-6 py-4 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all duration-200"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  
                  {couponError && (
                    <p className="text-sm text-red-600 mb-2 animate-shake">{couponError}</p>
                  )}
                  
                  {couponSuccess && (
                    <div 
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl border border-green-200 animate-fadeIn"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">{couponSuccess}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-green-600">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  
                  {activeCoupon && (
                    <div className="flex justify-between items-center py-2 animate-fadeIn">
                      <span className="flex items-center gap-2 font-bold text-green-600">
                        <Percent className="w-4 h-4" />
                        Discount ({activeCoupon.discount}%)
                      </span>
                      <span className="font-bold text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t-2 border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">USD • Includes all taxes</p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="block w-full py-4 mb-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                >
                  <Lock className="w-5 h-5" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">We accept</p>
                  <div className="flex justify-center gap-4">
                    {paymentMethods.map((method, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors" title={method.name}>
                        {method.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security & Guarantee */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  {securityFeatures.map((feature, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-4 p-3 bg-white rounded-xl hover:shadow-md transition-all animate-slideIn"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl`}>
                        {React.cloneElement(feature.icon, { className: 'w-5 h-5 text-white' })}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;