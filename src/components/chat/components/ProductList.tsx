import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto font-mono">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
        : products.map((product) => (
            <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
          ))}
    </div>
  );
};

export default ProductList; 