import React from 'react';
import { WobbleCard } from './wobble-card';
import { Product } from '../chat/types';

interface WobbleProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const WobbleProductCard: React.FC<WobbleProductCardProps> = ({ 
  product, 
  onProductClick 
}) => {
  return (
    <WobbleCard className="h-auto w-auto max-w-xs">
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-32 object-contain rounded-lg bg-gray-50"
            onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Image')}
          />
        </div>
        
        {/* Product Name */}
        <div className="font-semibold text-gray-900 text-base mb-1 truncate">
          {product.name}
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-base mr-1">★ ★ ★ ★</span>
          <span className="text-gray-400 text-base">★</span>
          <span className="text-gray-500 text-sm ml-2">(3.4)</span>
        </div>
        
        {/* Contact for pricing button */}
        <button
          className="mt-auto w-full border border-gray-300 rounded-full py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium text-sm transition"
          style={{ cursor: 'pointer' }}
          onClick={() => onProductClick(product)}
        >
          Details
        </button>
      </div>
    </WobbleCard>
  );
}; 