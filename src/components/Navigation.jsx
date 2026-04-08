import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
              <Link to={`/category/${cat.name.toLowerCase()}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
