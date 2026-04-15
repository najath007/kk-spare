import React, { useState, useEffect } from 'react';
import { BASE } from '../api';
import { Helmet } from 'react-helmet-async';
import { FaBoxOpen, FaCheckCircle, FaShippingFast, FaHome } from 'react-icons/fa';
import './TrackOrderPage.css';

export default function TrackOrderPage({ user }) {
  const [guestOrderId, setGuestOrderId] = useState('');
  const [guestOrderData, setGuestOrderData] = useState(null);
  const [guestError, setGuestError] = useState('');
  const [guestLoading, setGuestLoading] = useState(false);

  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const steps = [
    { key: 'pending', label: 'Pending', icon: <FaBoxOpen /> },
    { key: 'confirmed', label: 'Confirmed', icon: <FaCheckCircle /> },
    { key: 'shipped', label: 'Shipped', icon: <FaShippingFast /> },
    { key: 'delivered', label: 'Delivered', icon: <FaHome /> }
  ];

  useEffect(() => {
    if (user) {
      setLoadingOrders(true);
      const token = localStorage.getItem('token');
      fetch(`${BASE}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setUserOrders(Array.isArray(data) ? data : []);
        setLoadingOrders(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingOrders(false);
      });
    }
  }, [user]);

  const handleGuestTrack = async (e) => {
    e.preventDefault();
    if (!guestOrderId.trim()) return;
    setGuestLoading(true);
    setGuestError('');
    setGuestOrderData(null);
    try {
      const res = await fetch(`${BASE}/orders/track/${guestOrderId}`);
      const data = await res.json();
      if (!res.ok) {
        setGuestError(data.message || 'Order not found');
      } else {
        setGuestOrderData(data);
      }
    } catch (err) {
      setGuestError('Failed to fetch order. Please check ID and try again.');
    } finally {
      setGuestLoading(false);
    }
  };

  const renderTimeline = (currentStatus) => {
    // Determine how many steps are completed based on status string
    let currentIdx = steps.findIndex(s => s.key === currentStatus?.toLowerCase());
    if (currentIdx === -1) {
      if (currentStatus?.toLowerCase() === 'cancelled') return (
        <div className="status-cancelled">❌ Order Cancelled</div>
      );
      currentIdx = 0; // fallback
    }

    return (
      <div className="timeline-container">
        {steps.map((step, idx) => {
          const isActive = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={step.key} className={`timeline-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="step-icon">{step.icon}</div>
              <div className="step-label">{step.label}</div>
              {idx < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          );
        })}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="track-order-page container">
        <Helmet>
          <title>Track Your Order | KK Spare Parts</title>
          <meta name="description" content="Enter your Order ID to see real-time updates on your KK Spare Parts shipment." />
        </Helmet>
        <div className="guest-tracker">
          <h2>Track Your Order</h2>
          <p className="subtitle">Enter your Order ID below to check its current status.</p>
          
          <form className="track-form" onSubmit={handleGuestTrack}>
            <input 
              type="text" 
              placeholder="e.g. 12" 
              value={guestOrderId}
              onChange={(e) => setGuestOrderId(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={guestLoading}>
              {guestLoading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {guestError && <div className="error-message">{guestError}</div>}
          
          {guestOrderData && (
            <div className="guest-result-card">
              <h3>Order #{guestOrderData.id}</h3>
              <div className="result-details">
                <p><strong>Date:</strong> {new Date(guestOrderData.created_at).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${parseFloat(guestOrderData.total_amount).toFixed(2)}</p>
                <p><strong>Status:</strong> <span className={`badge status-${guestOrderData.status}`}>{guestOrderData.status}</span></p>
              </div>
              <div className="guest-timeline">
                {renderTimeline(guestOrderData.status)}
              </div>
              <p className="login-prompt">Log in to view complete details, items, and your entire order history.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const activeOrders = userOrders.filter(o => !['delivered', 'cancelled'].includes(o.status?.toLowerCase()));
  const pastOrders = userOrders.filter(o => ['delivered', 'cancelled'].includes(o.status?.toLowerCase()));

  return (
    <div className="track-order-page container user-orders-view">
      <Helmet>
        <title>My Order History | KK Spare Parts</title>
        <meta name="description" content="View your order history and track ongoing shipments." />
      </Helmet>
      <div className="orders-header">
        <h2>My Order History</h2>
        <p>Track your ongoing shipments and review past orders.</p>
      </div>

      {loadingOrders ? (
        <p>Loading your orders...</p>
      ) : userOrders.length === 0 ? (
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <>
          {activeOrders.length > 0 && (
            <div className="orders-section">
              <h3 className="section-title">Active Orders</h3>
              <div className="orders-list">
                {activeOrders.map(order => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-card-header">
                      <div>
                        <h3>Order #{order.id}</h3>
                        <span className="order-date">Placed on {new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="order-total">
                        <span>Total</span>
                        <strong>${parseFloat(order.total_amount).toFixed(2)}</strong>
                      </div>
                    </div>
                    
                    <div className="order-timeline-wrapper">
                      {renderTimeline(order.status)}
                    </div>

                    <div className="order-items-list">
                      <h4>Items Ordered</h4>
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="ordered-item">
                          <img src={item.image} alt={item.name} className="item-thumbnail" />
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">Qty: {item.quantity} × ${item.unit_price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastOrders.length > 0 && (
            <div className="orders-section">
              <h3 className="section-title">Past Orders</h3>
              <div className="orders-list past-orders-list">
                {pastOrders.map(order => (
                  <div key={order.id} className="order-history-card compact-card">
                    <div className="order-card-header" style={{ marginBottom: '1rem', borderBottom: 'none', paddingBottom: 0 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                          <span className={`badge status-${order.status}`}>{order.status}</span>
                        </div>
                        <span className="order-date" style={{ display: 'block', marginTop: '0.2rem' }}>Placed on {new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="order-total">
                        <span>Total</span>
                        <strong>${parseFloat(order.total_amount).toFixed(2)}</strong>
                      </div>
                    </div>
                    
                    <div className="order-items-compact">
                      <strong>Items: </strong>
                      {order.items && order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.quantity}x {item.name}{idx < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
