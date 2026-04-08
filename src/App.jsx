import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import TrackOrderPage from './pages/TrackOrderPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import { getCart, addToCart, BASE } from './api';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  
  const [wishlistItemIds, setWishlistItemIds] = useState([]);

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
    setCartCount(0);
  };
  
  const refreshCart = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const data = await getCart();
      if (data && data.items) {
        setCartCount(data.items.reduce((sum, i) => sum + i.quantity, 0));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshWishlist = async () => {
    if (!user) { setWishlistItemIds([]); return; }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE}/wishlist`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch wishlist');
      const data = await res.json();
      if (Array.isArray(data)) {
        setWishlistItemIds(data.map(item => item.id));
      } else {
        setWishlistItemIds([]);
      }
    } catch (e) {
      console.error(e);
      setWishlistItemIds([]);
    }
  };

  useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, [user]);

  const handleToggleWishlist = async (productId, currentStatus) => {
    if (!user) { setIsAuthModalOpen(true); return; }
    const token = localStorage.getItem('token');
    try {
      if (currentStatus) {
        await fetch(`${BASE}/wishlist/${productId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        setWishlistItemIds(prev => prev.filter(id => id !== productId));
      } else {
        await fetch(`${BASE}/wishlist/${productId}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
        setWishlistItemIds(prev => [...prev, productId]);
      }
    } catch (err) { console.error(err); }
  };

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async (product) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    try {
      await addToCart(product.id, 1);
      refreshCart();
      setCartDrawerOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (product) => {
    fetch(`${BASE}/products/${product.id}`)
      .then(r => r.json())
      .then(data => setSelectedProduct(data));
  };

  if (isAdminView && user?.role === 'admin') {
    return (
      <div className="app-wrapper">
        <Header 
          user={user}
          cartCount={cartCount}
          onCartClick={() => setCartDrawerOpen(true)}
          isAuthModalOpen={isAuthModalOpen}
          setIsAuthModalOpen={setIsAuthModalOpen}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          isAdminView={isAdminView}
          onAdminToggle={() => setIsAdminView(false)}
        />
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Header 
        user={user}
        cartCount={cartCount}
        onCartClick={() => setCartDrawerOpen(true)}
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        isAdminView={isAdminView}
        onAdminToggle={() => setIsAdminView(true)}
      />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} wishlistItemIds={wishlistItemIds} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/category/:categoryId" element={<CategoryPage searchQuery={searchQuery} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} wishlistItemIds={wishlistItemIds} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/track-order" element={<TrackOrderPage user={user} />} />
        <Route path="/wishlist" element={<WishlistPage user={user} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} wishlistItemIds={wishlistItemIds} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/profile" element={<ProfilePage user={user} onProfileUpdate={setUser} />} />
      </Routes>

      <Footer />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          user={user}
        />
      )}

      <CartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        user={user}
        refreshCart={refreshCart}
      />
    </div>
  );
}

export default App;
