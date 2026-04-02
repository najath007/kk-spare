import React from 'react';
import { FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import './ProductCard.css';

export default function ProductCard({ product, isCompatible, onAddToCart, onViewDetails }) {
  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image-container">
        {product.badge && <span className={`badge product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-type">{product.type}</span>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
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
