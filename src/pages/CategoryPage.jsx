import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryHero from '../components/CategoryHero';
import ProductGrid from '../components/ProductGrid';
import { BASE } from '../api';
import { FaArrowLeft } from 'react-icons/fa';

export default function CategoryPage({ searchQuery, onAddToCart, onViewDetails }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    
    // We treat the categoryId from the URL as the category filter.
    if (categoryId) params.set('category', categoryId.toUpperCase());
    if (searchQuery) params.set('search', searchQuery);

    fetch(`${BASE}/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [categoryId, searchQuery]);

  return (
    <div className="category-page">
      <CategoryHero categoryName={categoryId} />
      
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/" style={{ color: 'var(--color-hash-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
            <FaArrowLeft /> Back to Shop
          </Link>
        </div>

        <div className="products-header">
          <h2 className="products-title">
            <span style={{ textTransform: 'capitalize' }}>{categoryId}</span> Products
          </h2>
          <span className="items-count">{products.length} items found</span>
        </div>

        {loading 
          ? <p style={{ color: 'var(--color-hash-light)', padding: '2rem', textAlign: 'center' }}>Loading parts...</p>
          : <ProductGrid products={products} selectedBike={{brand: '', model: '', year: ''}} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
        }
      </div>
    </div>
  );
}
