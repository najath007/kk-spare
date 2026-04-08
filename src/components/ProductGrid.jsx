import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, selectedBike, onAddToCart, onViewDetails, wishlistItemIds, onToggleWishlist }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No parts found.</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => {
        // We pass down a boolean to show the green badge if a bike is selected
        // We know the product is compatible if it made it to this grid (handled by App.js),
        // but we only show the badge if a bike was actually strictly selected
        const showBadge = !!(selectedBike && selectedBike.brand);
        
        return (
          <ProductCard 
            key={product.id} 
            product={product} 
            isCompatible={showBadge}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            isWishlisted={wishlistItemIds?.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        );
      })}
    </div>
  );
}
