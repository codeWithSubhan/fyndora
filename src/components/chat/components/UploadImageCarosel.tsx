import React, { useState } from "react";
import { Product } from "../types";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const UploadImageCarosel: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-2 pb-2.5 shadow-sm flex flex-col w-full max-w-xs mx-auto font-sans relative"
      style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
    >
      {/* Heart Circle Button */}
      <div className="absolute top-3.5 right-3">
        <button
          //   onClick={() => setLiked(!liked)}
          className="w-8 h-8 bg-gray-50 rounded-full border border-gray-300 flex items-center justify-center transition hover:bg-gray-100"
        >
          <Heart
          // className={`w-4 h-4 transition ${
          //   liked ? "fill-red-500 text-red-500" : "text-gray-400"
          // }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-32 mb-4">
        <img
          // src={product.image}
          src="https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png"
          //   alt={product.name}
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
          {/* {product.name} */}
        </div>
        <span className="text-gray-500 text-sm mb-4">$180.00</span>

        <button
          className="mt-auto  w-full rounded-full py-2 font-medium text-sm transition bg-[#2c2c2c] text-white hover:bg-neutral-700"
          style={{ cursor: "pointer" }}
          //   onClick={() => onProductClick(product)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default UploadImageCarosel;
