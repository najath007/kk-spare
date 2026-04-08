import React, { useState } from 'react';
import { FaTimes, FaCartPlus, FaShieldAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { BASE } from '../api';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart, onViewDetails, user }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  const relatedProducts = product.boughtTogether || [];
  const reviews = product.reviews || [];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${BASE}/products/${product.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rating, comment })
      });
      // Optionally just close and tell them thanks, or trigger re-fetch.
      alert('Review submitted successfully!');
      onClose(); // simple refresh flow by closing since product prop doesn't strictly mutate in-place easily 
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (ratingVal, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= ratingVal;
        stars.push(
          <span 
             key={i} 
             onClick={() => interactive && setRating(i)} 
             style={{ cursor: interactive ? 'pointer' : 'default', color: isFilled ? '#f59e0b' : '#d1d5db', fontSize: interactive ? '1.5rem' : '1rem' }}
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </span>
        );
    }
    return stars;
  };

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
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {renderStars(Math.round(product.average_rating || 0))}
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>({product.total_reviews || 0} Reviews)</span>
            </div>
            
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
                {product.compatibility && product.compatibility.map((comp, idx) => (
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
        
        <div className="modal-bottom-sections">
            <div className="modal-reviews-section">
                <h3>Customer Reviews</h3>
                {reviews.length === 0 ? <p style={{ color: 'var(--color-hash-light)' }}>No reviews yet.</p> : (
                  <div className="reviews-list">
                    {reviews.map(r => (
                      <div key={r.id} className="review-card">
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong>{r.user_name}</strong>
                            <div style={{ display: 'flex', gap: '2px' }}>{renderStars(r.rating)}</div>
                         </div>
                         <p style={{ margin: 0, color: 'var(--color-hash-dark)', fontSize: '0.95rem' }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {user ? (
                   <form className="write-review-form" onSubmit={handleReviewSubmit}>
                       <h4>Write a Review</h4>
                       <div style={{ display: 'flex', gap: '5px', marginBottom: '1rem' }}>{renderStars(rating, true)}</div>
                       <textarea 
                           placeholder="Share your experience..." 
                           required 
                           value={comment} 
                           onChange={e => setComment(e.target.value)}
                           rows="3"
                       ></textarea>
                       <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</button>
                   </form>
                ) : (
                   <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px' }}>
                       Login to write a review.
                   </div>
                )}
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
    </div>
  );
}
