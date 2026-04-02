import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BikeModelSelector from './components/BikeModelSelector';
import SidebarFilter from './components/SidebarFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]); // local cart array (items with product + quantity)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userObj, token) => setUser(userObj);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };
  
  // Filtering States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState(null);
  const [selectedBike, setSelectedBike] = useState({ brand: '', model: '', year: '' });
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery)         params.set('search', searchQuery);
    if (selectedCategory)    params.set('category', selectedCategory);
    if (selectedBrandFilter) params.set('brand', selectedBrandFilter);
    if (selectedBike.brand)  params.set('brand', selectedBike.brand);
    if (selectedBike.model)  params.set('model', selectedBike.model);
    if (selectedBike.year)   params.set('year', selectedBike.year);

    fetch(`http://localhost:5000/api/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [searchQuery, selectedCategory, selectedBrandFilter, selectedBike]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleFindParts = (bike) => {
    // Scroll to products
    setSelectedBike(bike);
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDetails = (product) => {
    fetch(`http://localhost:5000/api/products/${product.id}`)
      .then(r => r.json())
      .then(data => setSelectedProduct(data));
  };

  return (
    <div className="app-wrapper">
      <Header 
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      <Navigation />
      <Hero />
      
      <div className="container" id="shop-section">
        <BikeModelSelector onFindParts={handleFindParts} />

        <div className="main-layout" style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
          <div className="sidebar-column" style={{ width: '280px', flexShrink: 0 }}>
            <SidebarFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrandFilter={selectedBrandFilter}
              setSelectedBrandFilter={setSelectedBrandFilter}
            />
          </div>
          
          <div className="products-column" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--color-hash-dark)' }}>
                {selectedCategory ? `${selectedCategory} Parts` : 'All Parts'}
                {selectedBike.brand && <span style={{ fontSize: '1rem', color: 'var(--color-success)', marginLeft: '1rem' }}> (Filtered for {selectedBike.year} {selectedBike.brand} {selectedBike.model})</span>}
              </h2>
              <span style={{ color: 'var(--color-hash-light)', fontWeight: 600 }}>{products.length} items found</span>
            </div>

            {loading 
              ? <p style={{ color: 'var(--color-hash-light)', padding: '2rem' }}>Loading parts...</p>
              : <ProductGrid products={products} selectedBike={selectedBike} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />
            }
          </div>
        </div>
      </div>

      <Footer />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
}

export default App;
