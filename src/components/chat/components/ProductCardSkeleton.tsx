import React from 'react';

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col h-full animate-pulse font-mono">
    <div className="w-full flex justify-center mb-3 font-mono">
      <div className="h-24 w-24 bg-gray-200 rounded-md font-mono" />
    </div>
    <div className="flex-1 flex flex-col font-mono">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 font-mono" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-2 font-mono" />
      <div className="flex flex-col gap-2 mb-2 font-mono">
        <div className="h-3 bg-gray-100 rounded w-1/2 font-mono" />
        <div className="h-3 bg-gray-100 rounded w-1/3 font-mono" />
        <div className="h-3 bg-gray-100 rounded w-1/4 font-mono" />
      </div>
      <div className="mt-auto flex items-center justify-between font-mono">
        <div className="h-4 w-12 bg-gray-200 rounded font-mono" />
        <div className="h-6 w-16 bg-gray-100 rounded-full font-mono" />
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton; 