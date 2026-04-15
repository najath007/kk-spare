import React from 'react';
import './CategoryHero.css';

export default function CategoryHero({ categoryName }) {
  // Format exactly how they want it: "PREMIUM TYRES"
  const formattedName = (categoryName || '').toUpperCase();
  
  return (
    <div className="category-hero-section">
      <div className="category-hero-background">
        <div className="category-hero-overlay"></div>
        <div className="container category-hero-content">
          <h1 className="category-hero-title title-slant">
            <span className="hero-label">PREMIUM</span><br/><span className="highlight">{formattedName}</span>
          </h1>
          <p className="category-hero-subtitle">
            Browse our full selection of high-quality {categoryName} parts for all major brands. Built for performance and reliability.
          </p>
        </div>
      </div>
    </div>
  );
}
