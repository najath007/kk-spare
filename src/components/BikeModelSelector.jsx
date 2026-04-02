import React, { useState, useEffect } from 'react';
import { FaMotorcycle, FaSearch } from 'react-icons/fa';
import './BikeModelSelector.css';

export default function BikeModelSelector({ onFindParts }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const YEARS = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'];

  useEffect(() => {
    fetch('http://localhost:5000/api/brands').then(r => r.json()).then(data => setBrands(data.map(b => b.name)));
  }, []);

  const handleBrandChange = (e) => {
    const selected = e.target.value;
    setBrand(selected);
    setModel('');
    setYear('');
    if (selected) {
      fetch(`http://localhost:5000/api/brands/${selected}/models`)
        .then(r => r.json())
        .then(data => setModels(data.map(m => m.name)));
    } else {
      setModels([]);
    }
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
    setYear('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brand && model && year) {
      onFindParts({ brand, model, year });
    }
  };

  return (
    <div className="bike-selector-container">
      <div className="bike-selector-header">
        <FaMotorcycle size={24} className="icon-accent" />
        <h2>Find Parts For Your Bike</h2>
      </div>
      <form onSubmit={handleSubmit} className="bike-selector-form">
        <div className="select-group">
          <label>1. Select Brand</label>
          <select value={brand} onChange={handleBrandChange} required>
            <option value="">Choose Brand...</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="select-group">
          <label>2. Select Model</label>
          <select value={model} onChange={handleModelChange} disabled={!brand} required>
            <option value="">Choose Model...</option>
            {brand && models.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>3. Select Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} disabled={!model} required>
            <option value="">Choose Year...</option>
            {model && YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!brand || !model || !year}>
          <FaSearch /> Find My Parts
        </button>
      </form>
    </div>
  );
}
