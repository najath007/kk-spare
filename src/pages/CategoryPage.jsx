import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryHero from '../components/CategoryHero';
import ProductGrid from '../components/ProductGrid';
import { BASE } from '../api';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';

export default function CategoryPage({ searchQuery, onAddToCart, onViewDetails, wishlistItemIds, onToggleWishlist }) {
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
  }, [categoryId, searchQuery]);

  return (
    <div className="category-page">
      <Helmet>
        <title>Buy {categoryId.toUpperCase()} Spare Parts | KK Spare Parts</title>
        <meta name="description" content={`Explore our wide selection of ${categoryId} parts. Guaranteed fitment for your motorcycle.`} />
      </Helmet>
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
          : <ProductGrid products={products} selectedBike={{brand: '', model: '', year: ''}} onAddToCart={onAddToCart} onViewDetails={onViewDetails} wishlistItemIds={wishlistItemIds} onToggleWishlist={onToggleWishlist} />
        }
      </div>
    </div>
  );
}
