import React from 'react';
import { FaTimes, FaCartPlus, FaShieldAlt } from 'react-icons/fa';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart, onViewDetails }) {
  if (!product) return null;

  // Find related products
  const relatedProducts = product.boughtTogether || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes size={24} /></button>
        
        <div className="modal-grid">
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>
          
          <div className="modal-info-col">
            <div className="modal-meta">
              <span className="badge hot">{product.type}</span>
              <span className="badge category">{product.category}</span>
            </div>
            
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">₹{product.price}</div>
            
            <p className="modal-stock">
              Stock available: <span className="highlight">{product.stock} units</span>
            </p>

            <div className="modal-warranty">
              <FaShieldAlt className="icon-accent" /> Warranty: {product.warranty}
            </div>

            <div className="modal-compatibility">
              <h4>Compatibility:</h4>
              <ul>
                {product.compatibility.map((comp, idx) => (
                  <li key={idx}>
                    <strong>{comp.brand}</strong>: {comp.models.join(', ')} ({comp.years[0]} - {comp.years[comp.years.length - 1]})
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className="btn btn-primary modal-add-btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="modal-related">
            <h3>Often Bought Together</h3>
            <div className="related-chips">
              {relatedProducts.map(rp => (
                <div key={rp.id} className="related-chip" onClick={() => onViewDetails(rp)}>
                  <img src={rp.image} alt={rp.name} />
                  <div className="related-detail">
                    <span className="related-name">{rp.name}</span>
                    <span className="related-price">₹{rp.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
