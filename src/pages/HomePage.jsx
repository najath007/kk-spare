import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BikeModelSelector from '../components/BikeModelSelector';
import SidebarFilter from '../components/SidebarFilter';
import ProductGrid from '../components/ProductGrid';
import { BASE } from '../api';

export default function HomePage({ searchQuery, onAddToCart, onViewDetails, wishlistItemIds, onToggleWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering States local to home page
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState(null);
  const [selectedBike, setSelectedBike] = useState({ brand: '', model: '', year: '' });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery)         params.set('search', searchQuery);
    if (selectedCategory)    params.set('category', selectedCategory);
    if (selectedBrandFilter) params.set('brand', selectedBrandFilter);
    if (selectedBike.brand)  params.set('brand', selectedBike.brand);
    if (selectedBike.model)  params.set('model', selectedBike.model);
    if (selectedBike.year)   params.set('year', selectedBike.year);
    if (priceRange.min)      params.set('minPrice', priceRange.min);
    if (priceRange.max)      params.set('maxPrice', priceRange.max);

    fetch(`${BASE}/products?${params}`)
       .then(r => {
        if (!r.ok) throw new Error('API Failed');
        return r.json();
      })
      .then(data => { 
        if (Array.isArray(data)) setProducts(data); 
        else setProducts([]);
        setLoading(false); 
      })
      .catch(() => { setProducts([]); setLoading(false); });
  }, [searchQuery, selectedCategory, selectedBrandFilter, selectedBike, priceRange]);

  const handleFindParts = (bike) => {
    // Scroll to products
    setSelectedBike(bike);
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetBike = () => {
    setSelectedBike({ brand: '', model: '', year: '' });
  };

  return (
    <>
      <Hero />
      <div className="container" id="shop-section">
        <BikeModelSelector onFindParts={handleFindParts} onReset={handleResetBike} />

        <div className="main-layout">
          <div className="sidebar-column">
            <SidebarFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrandFilter={selectedBrandFilter}
              setSelectedBrandFilter={setSelectedBrandFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
          
          <div className="products-column">
            <div className="products-header">
              <h2 className="products-title">
                {selectedCategory ? `${selectedCategory} Parts` : 'All Parts'}
                {selectedBike.brand && <span className="filtered-bike-label"> (Filtered for {selectedBike.year} {selectedBike.brand} {selectedBike.model})</span>}
              </h2>
              <span className="items-count">{products.length} items found</span>
            </div>

            {loading 
              ? <p style={{ color: 'var(--color-hash-light)', padding: '2rem' }}>Loading parts...</p>
              : <ProductGrid products={products} selectedBike={selectedBike} onAddToCart={onAddToCart} onViewDetails={onViewDetails} wishlistItemIds={wishlistItemIds} onToggleWishlist={onToggleWishlist} />
            }
          </div>
        </div>
      </div>
    </>
  );
}
