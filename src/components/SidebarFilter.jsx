import React, { useState, useEffect } from 'react';
import './SidebarFilter.css';

export default function SidebarFilter({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedBrandFilter, 
  setSelectedBrandFilter 
}) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories').then(r => r.json()).then(setCategories);
    fetch('http://localhost:5000/api/brands').then(r => r.json()).then(data => setBrands(data.map(b => b.name)));
  }, []);

  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <ul className="filter-list">
          <li 
            className={`filter-item ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            <span>All Parts</span>
          </li>
          {categories.map(cat => (
            <li 
              key={cat.name} 
              className={`filter-item ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span>{cat.name}</span>
              <span className="count">({cat.part_count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section mt-4">
        <h3 className="filter-title">Filter by Brand</h3>
        <ul className="filter-list">
          <li 
            className={`filter-item ${!selectedBrandFilter ? 'active' : ''}`}
            onClick={() => setSelectedBrandFilter(null)}
          >
            <span>All Brands</span>
          </li>
          {brands.map(brand => (
            <li 
              key={brand} 
              className={`filter-item ${selectedBrandFilter === brand ? 'active' : ''}`}
              onClick={() => setSelectedBrandFilter(brand)}
            >
              <span>{brand}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="promo-banner mt-4">
        <h4>Wholesale Orders</h4>
        <p>Get bulk discounts on OEM parts.</p>
        <button className="btn btn-secondary mt-2">Contact Sales</button>
      </div>
      
      <div className="promo-banner expert-chat mt-2">
        <h4>Need Help?</h4>
        <p>Chat with a mechanic.</p>
        <button className="btn btn-primary mt-2">Live Chat</button>
      </div>
    </aside>
  );
}
