import React from 'react';
import { FaPhoneAlt, FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import './Header.css';
import AuthModal from './AuthModal';

export default function Header({ user, cartCount, onCartClick, isAuthModalOpen, setIsAuthModalOpen, onLoginSuccess, onLogout, searchQuery, onSearchQueryChange, isAdminView, onAdminToggle }) {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
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
          <div className="contact-info">
            <FaPhoneAlt className="icon-accent" />
            <span>123456789</span>
          </div>

          <div className="cart-container" style={{ marginRight: '1rem' }}>
            <button className="cart-btn" onClick={onCartClick}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
            </button>
            <span className="cart-label">Cart</span>
          </div>

          <div className="auth-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-hash-dark)', fontWeight: 600 }}>
                  {user.role === 'admin' && (
                    <button 
                      onClick={onAdminToggle}
                      style={{ background: 'none', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {isAdminView ? 'Store View' : 'Admin Panel'}
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUserCircle size={20} className="icon-accent" />
                    <span>Hi, {user.name}</span>
                  </div>
                </div>
                <button 
                  onClick={onLogout} 
                  style={{ padding: '0.4rem 1rem', background: 'var(--color-hash-dark)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                style={{ padding: '0.5rem 1.5rem', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                Login / Register
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
