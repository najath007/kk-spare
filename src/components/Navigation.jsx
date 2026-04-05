import React, { useState, useEffect } from 'react';
import './Navigation.css';
import { BASE } from '../api';

export default function Navigation() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${BASE}/categories`)
      .then(r => r.json())
      .then(setCategories);
  }, []);

  return (
    <nav className="main-nav">
      <div className="container nav-container">
        <ul className="nav-list">
          {categories.map((cat, idx) => (
            <li key={idx} className="nav-item">
              <a href={`#${cat.name.toLowerCase()}`}>{cat.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
