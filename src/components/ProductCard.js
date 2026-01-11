import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCart, Star, Heart, Eye, Zap, 
  Check, Shield, TrendingUp, Tag 
} from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div 
        className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          {product.stock < 10 && (
            <div className="absolute top-2 left-2">
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
          {product.rating >= 4.5 && (
            <div className="absolute top-2 right-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Best Seller
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:text-red-500'}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-500 rounded-full hover:text-primary-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description || "Premium quality product with exceptional features and durability."}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{product.sales || 0} sold</span>
            <span className="text-sm text-gray-500">•</span>
            {product.stock > 20 ? (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                In Stock
              </span>
            ) : (
              <span className="text-sm text-amber-600 font-medium">Limited Stock</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.stock < 5 && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Almost sold out!
                </p>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isAdded
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Cart!
                </>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.stock < 10 && (
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Only {product.stock} left
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Best Seller
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full shadow-md transition-all ${
              isLiked 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-white text-gray-600 hover:text-red-500 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-primary-600 hover:bg-gray-50 transition-all">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Add Overlay */}
        {isHovered && product.stock > 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fadeIn">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        )}
        
        {/* Stock Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
          />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          {renderStars(product.rating)}
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description || "Premium quality product with exceptional features."}
        </p>
        
        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500 mt-1">{product.sales || 0} sold</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Tag className="w-4 h-4" />
              <span>{product.stock} in stock</span>
            </div>
            {product.stock < 5 && (
              <p className="text-xs text-amber-600 mt-1">Selling fast!</p>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isAdded
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-lg'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added Successfully!
            </>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
        
        {/* Additional Info */}
        {product.stock > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-green-600">
                <Zap className="w-3 h-3" />
                Fast delivery
              </span>
              <span className="text-gray-500">Free returns</span>
              <span className="text-gray-500">1-year warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;