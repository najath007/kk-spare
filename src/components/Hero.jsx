import React from 'react';
import { FaBoxes, FaMotorcycle, FaShippingFast } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-background" style={{ backgroundImage: "url('/hero-banner.png')" }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h2 className="hero-title title-slant">RIDE HARD.<br/><span className="highlight">REPAIR FAST.</span></h2>
          <p className="hero-subtitle">Premium spare parts for all motorcycle brands. Quality guaranteed.</p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaBoxes size={30} className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">50K+</span>
                <span className="stat-label">Parts in Stock</span>
              </div>
            </div>
            <div className="stat-item">
              <FaMotorcycle size={30} className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">200+</span>
                <span className="stat-label">Trusted Brands</span>
              </div>
            </div>
            <div className="stat-item">
              <FaShippingFast size={30} className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">1-Day</span>
                <span className="stat-label">Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
