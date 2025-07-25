import React, { useState } from "react";
import { Product } from "../types";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  // Mocked values for demo UI
  const rating = 3.5;
  const orders = 188;
  const total = 2815.33;

  const [liked, setLiked] = useState<boolean>(false);

  return (
    // <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col w-full max-w-xs mx-auto font-sans" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
    //   {/* Product Image */}
    //   <div className="w-full flex justify-center mb-4">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="h-32 w-32 object-contain rounded-lg bg-gray-50"
    //       onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Image')}
    //     />
    //   </div>
    //   {/* Product Name */}
    //   <div className="font-semibold text-gray-900 text-base mb-1 truncate">{product.name}</div>
    //   {/* Rating */}
    //   <div className="flex items-center mb-4">
    //     <span className="text-yellow-500 text-base mr-1">★ ★ ★ ★</span>
    //     <span className="text-gray-400 text-base">★</span>
    //     <span className="text-gray-500 text-sm ml-2">(3.4)</span>
    //   </div>
    //   {/* Contact for pricing button */}
    //   <button
    //     className="mt-auto w-full border border-gray-300 rounded-full py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium text-sm transition"
    //     style={{ cursor: 'pointer' }}
    //     onClick={() => onProductClick(product)}
    //   >
    //     Details
    //   </button>
    // </div>
    // <div className="max-w-sm bg-white rounded-3xl shadow-md p-4">
    <div
      className="bg-white border border-gray-200 rounded-2xl p-2 pb-2.5 shadow-sm flex flex-col w-full max-w-xs mx-auto font-sans relative"
      style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
    >
      {/* Heart Circle Button */}
      <div className="absolute top-3.5 right-3">
        <button
          onClick={() => setLiked(!liked)}
          className="w-8 h-8 bg-gray-50 rounded-full border border-gray-300 flex items-center justify-center transition hover:bg-gray-100"
        >
          <Heart
            className={`w-4 h-4 transition ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-32 mb-4">
        <img
          // src={product.image}
          src="https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png"
          alt={product.name}
          className="h-full w-full object-contain rounded-lg bg-gray-50"
          onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/80x80?text=Image")
          }
        />
      </div>

      {/* Indicators */}
      {/* <div className="flex justify-center space-x-1 my-2">
        <span className="w-2 h-2 rounded-full bg-green-300"></span>
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="w-2 h-2 rounded-full bg-green-300"></span>
      </div> */}

      {/* Text Content */}
      <div className="space-y-1">
        <div className="font-semibold text-gray-900 text-base mb-1 truncate">
          {product.name}
        </div>
        <span className="text-gray-500 text-sm mb-4">$180.00</span>

        <button
          className="mt-auto  w-full rounded-full py-2 font-medium text-sm transition bg-[#2c2c2c] text-white hover:bg-neutral-700"
          style={{ cursor: "pointer" }}
          onClick={() => onProductClick(product)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
