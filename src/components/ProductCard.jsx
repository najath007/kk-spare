import React from 'react';
import { FaCartPlus, FaCheckCircle, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import './ProductCard.css';

export default function ProductCard({ product, isCompatible, onAddToCart, onViewDetails, isWishlisted, onToggleWishlist }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= rating ? <FaStar key={i} color="#f59e0b" /> : <FaRegStar key={i} color="#d1d5db" />);
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image-container">
        {onToggleWishlist && (
          <button 
            className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id, isWishlisted); }}
          >
            <FaHeart />
          </button>
        )}
        {product.badge && <span className={`badge product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-type">{product.type}</span>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-ratings-compact" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            {renderStars(Math.round(product.average_rating || 0))}
            <span style={{ color: '#6b7280', marginLeft: '0.25rem' }}>({product.total_reviews || 0})</span>
        </div>
        
        {isCompatible && (
          <div className="compatibility-badge">
            <FaCheckCircle className="icon-success" /> Exact Fit For Your Bike
          </div>
        )}

        <div className="product-footer">
          <div className="product-price">₹{product.price}</div>
          <button 
            className="btn btn-primary add-cart-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <FaCartPlus /> 
          </button>
        </div>
      </div>
    </div>
  );
}
