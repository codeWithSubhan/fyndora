import React, { useEffect, useState } from "react";
import {
  X,
  ExternalLink,
  Globe,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Product, WebSearchResult } from "../types";
import { cn } from "../../../lib/utils";

interface ProductDetailsPopupProps {
  product: Product | null;
  isWebSearching: boolean;
  webSearchResults: WebSearchResult[];
  onClose: () => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({
  product,
  isWebSearching,
  webSearchResults,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
    }
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    // setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!product) return null;

  return (
    <div className="overflow-auto h-full relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-white ">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 font-mono">
          Product Details
        </h2>

        <button
          onClick={handleClose}
          className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <X size={18} className="text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>

      <div className="md:flex md:gap-8  text-xs sm:text-sm">
        <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-48 sm:h-64 sm:w-64 object-contain rounded-xl bg-gray-50 group-hover:scale-105 transition-transform duration-300"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/256x256?text=Image")
            }
          />
        </div>

        <div className="w-full md:w-1/2 space-y-3 font-mono">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-500">{product.description}</p>

          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-green-600">${product.price}</span>
            <span className="text-gray-400 line-through text-sm">$59.16</span>
          </div>

          <div className="text-xs text-yellow-500">⭐ 4.2 (128 reviews)</div>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
            <div>
              <p className="font-semibold">Size</p>
              <p>M</p>
            </div>
            <div>
              <p className="font-semibold">Gender</p>
              <p>Man</p>
            </div>
            <div>
              <p className="font-semibold">Color</p>
              <p className="capitalize">gray-400</p>
            </div>
            <div>
              <p className="font-semibold">Available</p>
              <p>12 units</p>
            </div>
            <div>
              <p className="font-semibold">Sold</p>
              <p>12 units</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
              <ShoppingCart size={14} /> Add to Cart
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition">
              <Heart size={14} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
