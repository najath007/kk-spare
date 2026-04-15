import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-about" id="about-us">
        <h3>About Us</h3>
        <p>
          Welcome to <strong>KK Spare Parts</strong>, your trusted destination for premium motorcycle parts and accessories.
          Located in the heart of Velluvambram, Malappuram, Kerala, we are dedicated to serving riders with top-quality
          components to keep their machines running smoothly. Whether you need OEM replacements or aftermarket upgrades,
          our extensive inventory and commitment to excellence ensure you get exactly what you need.
        </p>
      </div>

      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo-text">KK <span>Spare Parts</span></div>
          <p className="footer-tagline">The Rider's Choice.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Shop</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-links">
            <li>123456789</li>
            <li>support@kkspareparts.com</li>
            <li>Velluvambram, Malappuram, Kerala</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        &copy; {new Date().getFullYear()} KK Spare Parts. All rights reserved.
      </div>
    </footer>
  );
}
