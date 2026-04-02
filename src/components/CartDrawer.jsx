import React, { useEffect, useState } from 'react';
import { getCart, updateCart, removeFromCart, placeOrder } from '../api';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, user, refreshCart }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && user && !success) {
      loadCart();
    }
  }, [isOpen, user, success]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      if (data && data.items) {
        setItems(data.items);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) {
      await handleRemove(productId);
      return;
    }
    
    setItems(items.map(i => i.product_id === productId ? { ...i, quantity: newQty } : i));
    
    try {
      await updateCart(productId, newQty);
      loadCart();
      refreshCart();
    } catch (e) {
      loadCart();
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      loadCart();
      refreshCart();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    setOrdering(true);
    try {
      await placeOrder('COD');
      setSuccess(true);
      refreshCart();
      setItems([]);
      setTotal(0);
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setOrdering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="cart-drawer-close" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-drawer-content">
          {!user ? (
            <div className="cart-message">Please login to view your cart.</div>
          ) : success ? (
            <div className="success-message">
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for shopping with us!</p>
              <button 
                onClick={() => { setSuccess(false); onClose(); }} 
                className="checkout-btn" 
                style={{ marginTop: '1rem' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : loading && items.length === 0 ? (
            <div className="cart-message">Loading cart...</div>
          ) : items.length === 0 ? (
            <div className="cart-message">Your cart is empty.</div>
          ) : (
            <div>
              {items.map(item => (
                <div key={item.product_id} className="cart-item">
                  <img src={item.image || 'https://via.placeholder.com/70'} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">₹{item.price}</div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => handleUpdate(item.product_id, item.quantity, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleUpdate(item.product_id, item.quantity, 1)}>+</button>
                      <button className="remove-btn" onClick={() => handleRemove(item.product_id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user && !success && items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{Number(total || 0).toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout} 
              disabled={ordering}
            >
              {ordering ? 'Placing Order...' : 'Checkout (COD)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
