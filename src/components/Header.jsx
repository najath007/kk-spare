import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaSearch, FaUserCircle, FaShoppingCart, FaTruck, FaHeart } from 'react-icons/fa';
import './Header.css';
import AuthModal from './AuthModal';

export default function Header({ user, cartCount, onCartClick, isAuthModalOpen, setIsAuthModalOpen, onLoginSuccess, onLogout, searchQuery, onSearchQueryChange, isAdminView, onAdminToggle }) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} title="Go to Home">
          <h1 className="logo-text">KK <span style={{ color: 'black' }}>Spare Parts</span><span className="logo-slant"><span className="number-design"></span></span></h1>
          <div className="tagline">The Rider's Choice Since 2000</div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Live search parts..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
          <button className="search-btn"><FaSearch /></button>
        </div>

        <div className="header-actions">
          
          <Link to="/track-order" className="track-order-link">
            <FaTruck className="icon-accent" /> <span className="action-label">Track Order</span>
          </Link>

          <div className="cart-container">
            <button className="cart-btn" onClick={onCartClick}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
            </button>
            <span className="cart-label">Cart</span>
          </div>

          <div className="auth-container">
            {user ? (
              <>
                <div className="auth-profile">
                  <Link to="/wishlist" className="header-icon-link" title="My Wishlist"><FaHeart style={{color: '#ef4444'}}/> <span className="action-label" style={{marginLeft: '4px'}}>Wishlist</span></Link>
                  <Link to="/track-order" className="my-orders-link"><span className="action-label">My Orders</span></Link>
                  <Link to="/profile" className="header-icon-link" title="My Account">
                    <FaUserCircle size={20} className="icon-accent" style={{marginRight: '6px'}}/>
                    <span className="action-label" style={{ fontWeight: '500' }}>{user.name}</span>
                  </Link>
                  {user.role === 'admin' && (
                    <button onClick={onAdminToggle} className="admin-toggle-btn">
                      {isAdminView ? 'Store' : 'Admin'}
                    </button>
                  )}
                </div>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="login-btn">
                <span className="action-label">Login / Register</span>
                <span className="login-icon-mobile"><FaUserCircle size={20} /></span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={(u, token) => {
            onLoginSuccess(u, token);
            setIsAuthModalOpen(false);
          }} 
        />
      )}
    </header>
  );
}
