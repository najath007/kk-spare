import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-hash-dark)', color: 'white', padding: '3rem 0', marginTop: '4rem' }}>
      <div className="container" id="about-us" style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>About Us</h3>
        <p style={{ color: '#cbd5e1', lineHeight: '1.6', maxWidth: '800px' }}>
          Welcome to <strong>KK Spare Parts</strong>, your trusted destination for premium motorcycle parts and accessories. 
          Located in the heart of Velluvambram, Malappuram, Kerala, we are dedicated to serving riders with top-quality 
          components to keep their machines running smoothly. Whether you need OEM replacements or aftermarket upgrades, 
          our extensive inventory and commitment to excellence ensure you get exactly what you need.
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', borderTop: '1px solid #475569', paddingTop: '2rem' }}>
        <div>
          <h2 className="logo-text" style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
            KK <span style={{ color: 'var(--color-accent)' }}>Spare Parts</span><span className="logo-slant"></span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>The Rider's Choice.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Contact Us</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
            <li>123456789</li>
            <li>support@kkspareparts.com</li>
            <li>Velluvambram, Malappuram, Kerala</li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid #475569', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center', color: '#cbd5e1', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} KK Spare Parts. All rights reserved.
      </div>
    </footer>
  );
}
