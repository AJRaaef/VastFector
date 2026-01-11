import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem('savedItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupons, setCoupons] = useState([
    { code: 'SAVE10', discount: 10, type: 'percentage', minOrder: 0 },
    { code: 'SAVE20', discount: 20, type: 'percentage', minOrder: 100 },
    { code: 'FREESHIP', discount: 10, type: 'fixed', minOrder: 50, freeShipping: true },
    { code: 'WELCOME15', discount: 15, type: 'percentage', minOrder: 30 },
  ]);

  const [activeCoupon, setActiveCoupon] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = useCallback((product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity: 1,
        addedAt: new Date().toISOString()
      }]);
    }
  }, [cartItems]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }, [cartItems]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  }, [cartItems, removeFromCart]);

  const saveForLater = useCallback((product) => {
    const existingItem = savedItems.find(item => item.id === product.id);
    
    if (!existingItem) {
      setSavedItems([...savedItems, product]);
    }
    removeFromCart(product.id);
  }, [savedItems, removeFromCart]);

  const moveToCart = useCallback((product) => {
    addToCart(product);
    setSavedItems(savedItems.filter(item => item.id !== product.id));
  }, [savedItems, addToCart]);

  const removeSavedItem = useCallback((productId) => {
    setSavedItems(savedItems.filter(item => item.id !== productId));
  }, [savedItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const getItemCount = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const validateCoupon = useCallback((code) => {
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) return { valid: false, message: 'Invalid coupon code' };
    
    const subtotal = getCartTotal();
    if (subtotal < coupon.minOrder) {
      return { 
        valid: false, 
        message: `Minimum order of $${coupon.minOrder} required`
      };
    }
    
    return { valid: true, coupon };
  }, [coupons, getCartTotal]);

  const applyCoupon = useCallback((code) => {
    const validation = validateCoupon(code);
    if (validation.valid) {
      setActiveCoupon(validation.coupon);
      return { success: true, coupon: validation.coupon };
    }
    return { success: false, message: validation.message };
  }, [validateCoupon]);

  const removeCoupon = useCallback(() => {
    setActiveCoupon(null);
  }, []);

  const calculateDiscount = useCallback((subtotal) => {
    if (!activeCoupon) return 0;
    
    if (activeCoupon.type === 'percentage') {
      return subtotal * (activeCoupon.discount / 100);
    } else {
      return Math.min(activeCoupon.discount, subtotal);
    }
  }, [activeCoupon]);

  const calculateShipping = useCallback((subtotal) => {
    if (activeCoupon?.freeShipping || subtotal >= 100) return 0;
    return subtotal >= 50 ? 5 : 10;
  }, [activeCoupon]);

  return (
    <CartContext.Provider value={{
      cartItems,
      savedItems,
      coupons,
      activeCoupon,
      addToCart,
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
    }}>
      {children}
    </CartContext.Provider>
  );
};