import React, { useState, useRef } from "react";
import {
  Mic,
  Menu,
  ArrowLeft,
  Paperclip,
  X,
  Plus,
  SendHorizontal,
} from "lucide-react";
import SuggestionPills from "./SuggestionPills";
import ProductCard from "./chat/components/ProductCard";
import ProductCardSkeleton from "./chat/components/ProductCardSkeleton";
import ProductDetailsPopup from "./chat/components/ProductDetailsPopup";
import BottomInput from "./chat/components/BottomInput";
import LoadingOverlay from "./chat/components/LoadingOverlay";
import { Product } from "./chat/types";
import WebResultsCarousel from "./chat/components/WebResultsCarousel";
import RightSideTabs from "./ui/RightSideTabs";
import InputBtn from "./ui/InputBtn";
import { motion, AnimatePresence } from "framer-motion";
import UploadImageCarosel from "./chat/components/UploadImageCarosel";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { toast } from "sonner";

interface ChatInterfaceProps {
  onMenuClick: () => void;
}

const PRODUCT_COLORS = [
  { name: "Gray", value: "bg-gray-400" },
  { name: "Blue", value: "bg-blue-400" },
  { name: "Brown", value: "bg-yellow-900" },
];

const SIZES = ["S", "M", "L", "XL", "28"];
const GENDERS = ["Man", "Woman", "Unisex"];

const ChatInterface = ({ onMenuClick }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedChatImage, setSelectedChatImage] = useState<File[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWebSearching, setIsWebSearching] = useState(false);
  const [webSearchResults, setWebSearchResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isProductsVisible, setIsProductsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<"AI Search" | "Web Search">(
    "AI Search"
  );

  const isTyping = chatQuery.trim() !== "";

  const images = [
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
    "https://i.postimg.cc/cLtWGhG9/shoes-removebg-preview.png",
  ];

  // Mock product data
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "White T-shirt",
      description: "Classic cotton tee",
      price: "49.3",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "M",
      gender: "Man",
      color: PRODUCT_COLORS[0].value,
    },
    {
      id: 2,
      name: "Outer Hodie Flannel",
      description: "Warm and stylish",
      price: "112.4",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "XL",
      gender: "Unisex",
      color: PRODUCT_COLORS[1].value,
    },
    {
      id: 3,
      name: "Denim Longslave",
      description: "Denim shirt for all occasions",
      price: "49.3",
      image:
        "https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "M",
      gender: "Man",
      color: PRODUCT_COLORS[2].value,
    },
    {
      id: 4,
      name: "Wide Leg Dress Pants",
      description: "Comfortable and chic",
      price: "28.2",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "28",
      gender: "Woman",
      color: PRODUCT_COLORS[0].value,
    },
    {
      id: 4,
      name: "Wide Leg Dress Pants",
      description: "Comfortable and chic",
      price: "28.2",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "28",
      gender: "Woman",
      color: PRODUCT_COLORS[0].value,
    },
    {
      id: 4,
      name: "Wide Leg Dress Pants",
      description: "Comfortable and chic",
      price: "28.2",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "28",
      gender: "Woman",
      color: PRODUCT_COLORS[0].value,
    },
    {
      id: 4,
      name: "Wide Leg Dress Pants",
      description: "Comfortable and chic",
      price: "28.2",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      sold: 12,
      available: 12,
      size: "28",
      gender: "Woman",
      color: PRODUCT_COLORS[0].value,
    },
  ];

  // Add static web search results
  const staticWebResults = [
    {
      favicon: "https://www.aliveshoes.com/favicon.ico",
      title: "Aliveshoes",
      subtitle: "sdsdsds | A Custom Shoe concept by Luca Botticelli ...",
      url: "https://www.aliveshoes.com/",
    },
    {
      favicon:
        "https://m.media-amazon.com/images/G/01/imdb/images/favicon-2165806970._CB484110913_.ico",
      title: "IMDb",
      subtitle: "Sdsdsdsdsdsds (2019) - IMDb",
      url: "https://www.imdb.com/title/tt1234567/",
    },
    {
      favicon: "https://gaana.com/favicon.ico",
      title: "Gaana",
      subtitle: "Best sdsdsd MP3 Songs on Gaana.com",
      url: "https://gaana.com/",
    },
    {
      favicon: "https://soundcloud.com/favicon.ico",
      title: "soundcloud",
      subtitle: "Sdsdsds - Giorgi Mekhrishvili - SoundCloud",
      url: "https://soundcloud.com/",
    },
  ];

  const handleSearch = () => {
    if (inputValue.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setShowProducts(true);
        setIsSearching(false);
      }, 300);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBack = () => {
    setShowProducts(false);
    setInputValue("");
    setSelectedImage(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const handleChatImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // toast.error("Already uploaded file!");
    const file = event.target.files?.[0];

    console.log(selectedChatImage.find((prev) => prev.name === file.name));
    if (file && file.type.startsWith("image/")) {
      if (selectedChatImage.find((prev) => prev.name === file.name)) {
        console.log("hiiiiiiiiiii");
        return toast.error("Already uploaded file!");
      }
      setSelectedChatImage((prev) => [...prev, file]);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleChatAttachClick = () => {
    chatFileInputRef.current?.click();
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  interface RemoveChatSelectedImageProps {
    file: File;
  }

  const removeChatSelectedImage = (file: File): void => {
    setSelectedChatImage(selectedChatImage.filter((prev) => prev !== file));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsVisible(true);
    // Simulate web search
    setIsWebSearching(true);
    setTimeout(() => {
      setWebSearchResults([
        {
          title: `${product.name} - Best Substitutes and Alternatives`,
          url: "https://example.com/substitutes",
          snippet: `Find the best substitutes for ${product.name}. Discover alternative ingredients that work just as well in your recipes.`,
        },
        {
          title: `How to Replace ${product.name} in Cooking`,
          url: "https://example.com/cooking-tips",
          snippet: `Learn how to substitute ${product.name} with common household ingredients. Perfect for when you're missing this ingredient.`,
        },
        {
          title: `${product.name} - Nutritional Information and Benefits`,
          url: "https://example.com/nutrition",
          snippet: `Complete nutritional profile of ${product.name}. Understand its health benefits and dietary considerations.`,
        },
      ]);
      setIsWebSearching(false);
    }, 1000);
  };

  const closeProductPopup = () => {
    // setSelectedProduct(null);
    setIsVisible(false);
    setWebSearchResults([]);
  };

  console.log(selectedChatImage);

  return (
    <div className="flex-1 flex bg-white min-h-screen relative overflow-hidden font-mono">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden z-20 font-mono"
      >
        <Menu size={20} className="text-gray-600 font-mono" />
      </button>

      {!showProducts ? (
        // Initial centered state
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-mono">
          <div className="max-w-2xl w-full text-center font-mono">
            {/* Avatar */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto font-mono">
              <div className="text-white text-xl sm:text-2xl font-mono">✨</div>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-3 font-mono">
              Hello, Adigun
            </h1>

            <p className="text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base font-mono">
              Which ingredient do you need a substitute for?
            </p>

            {/* Suggestion Pills */}
            <SuggestionPills />

            {/* Input Section */}
            <div className="mt-12 sm:mt-16 font-mono">
              <p className="text-xs text-gray-500 mb-4 px-4 font-mono">
                Sub AI may occasionally make mistakes. Please cross-check its
                results for accuracy.
              </p>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden font-mono"
              />

              <div className="relative max-w-xl mx-auto font-mono">
                <input
                  type="text"
                  placeholder="Enter missing ingredient or search products..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-20 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white shadow-sm text-sm sm:text-base font-mono"
                />

                {/* Attach button */}
                <button
                  onClick={handleAttachClick}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors font-mono"
                  title="Attach image"
                >
                  <Paperclip size={18} className="text-gray-500 font-mono" />
                </button>

                {/* Mic button */}
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors font-mono"
                >
                  <Mic size={18} className="text-gray-500 font-mono" />
                </button>
              </div>

              {/* Selected image preview */}
              {selectedImage && (
                <div className="mt-4 max-w-xl mx-auto font-mono">
                  <div className="relative inline-block font-mono">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="h-20 w-20 object-cover rounded-lg border border-gray-200 font-mono"
                    />
                    <button
                      onClick={removeSelectedImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors font-mono"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    {selectedImage.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Split layout: Chat on left, Products on right
        <div className="sm:flex sm:flex-1 w-full font-mono bg-gray-50">
          {/* Left side - Chat/Search Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sm:w-1/2 w-full flex flex-col relative bg-gray-50 pb-4 font-mono"
          >
            {/* Chat Messages Area */}
            <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto space-y-4 font-mono">
              {/* Long Message */}
              <div className="mt-auto"></div>
              <div className="bg-[#f1f3f5] rounded-lg p-4 border border-gray-200 font-mono ml-auto max-w-[90%]">
                <p className="text-gray-800 text-sm leading-relaxed font-mono">
                  Hi, Can you do a research and write a detailed research paper
                  for me? The topic is "The role of AI in enhancing the accuracy
                  of medical diagnostics"
                </p>
              </div>
              <div className=" bg-white rounded-lg p-4 border border-gray-200 font-mono mr-auto max-w-[90%]">
                <p className="text-gray-800 text-sm leading-relaxed font-mono">
                  Medical diagnostics form the cornerstone of effective
                  healthcare. Accurate and timely diagnosis is crucial for
                  treatment planning and disease management. Traditionally,
                  diagnostics depend on human interpretation—be it radiology,
                  pathology, or clinical symptoms. However, human error,
                  fatigue, and variability in expertise often affect diagnostic
                  precision. AI, especially machine learning (ML) and deep
                  learning (DL), has shown significant promise in augmenting
                  human capabilities in diagnostics. By learning from vast
                  amounts of medical data—such as imaging, lab results, and
                  patient history—AI systems can support or even outperform
                  human diagnosticians in certain tasks.
                </p>
              </div>

              <div className="bg-[#f1f3f5] rounded-lg p-4 border border-gray-200 font-mono ml-auto max-w-[90%]">
                <p className="text-gray-800 text-sm leading-relaxed font-mono">
                  Thank you so much, Fyndora 😊
                </p>
              </div>
              <div className=" bg-white rounded-lg p-4 border border-gray-200 font-mono mr-auto max-w-[90%]">
                <p className="text-gray-800 text-sm leading-relaxed font-mono">
                  You're very welcome! 😊
                </p>
              </div>
            </div>

            <div className="mx-4 relative z-10">
              {selectedChatImage.length > 0 && (
                <div className="bg-white p-4 absolute bottom-12 rounded-xl border border-gray-200 max-w-full mb-1">
                  <Swiper
                    slidesPerView={
                      selectedChatImage.length >= 4
                        ? 4
                        : selectedChatImage.length
                    }
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="max-w-full my-swiper"
                  >
                    {selectedChatImage.map((file) => (
                      <SwiperSlide key={file.name} className="max-w-fit">
                        <div className="relative h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <button
                            onClick={() => removeChatSelectedImage(file)}
                            className="absolute top-1 right-1 bg-black p-1 rounded-full hover:bg-gray-800"
                          >
                            <X className="w-4 h-4 text-gray-50" />
                          </button>

                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="object-contain h-full w-full"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              <div className="mt-0 sm:mt-0 font-mono ">
                <input
                  type="file"
                  ref={chatFileInputRef}
                  onChange={handleChatImageUpload}
                  accept="image/*"
                  className="hidden font-mono"
                />

                <div className="relative max-w-full mx-auto font-mono ">
                  <input
                    type="text"
                    placeholder="Ask for anything"
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border border-gray-300 outline-none 
              bg-white shadow-sm text-sm sm:text-base placeholder-gray-400 transition-all pr-14 ${
                isTyping ? "pr-24" : "pr-14"
              }`}
                  />

                  {/* Attach icon */}
                  <button
                    onClick={handleChatAttachClick}
                    className={`absolute top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 ${
                      isTyping ? "right-16" : "right-4"
                    }`}
                    title="Attach image"
                  >
                    <Plus size={18} />
                  </button>

                  {/* Send icon */}
                  <button
                    // onClick={handleSend}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 shadow transition-all duration-200 ${
                      isTyping
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-90 pointer-events-none"
                    }`}
                    title="Send message"
                  >
                    <SendHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Products Section */}

          <AnimatePresence>
            {isProductsVisible && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
                className="sm:w-1/2 w-full flex absolute left-0 top-0 bottom-0 sm:top-0 sm:right-0 sm:relative flex-col gap-4 p-4 sm:m-4 sm:shadow-sm z-50 rounded-xl bg-white sm:border border-gray-200 font-mono 
             sm:h-[calc(100vh-2rem)] h-[calc(100vh-0rem)] max:sm:h-auto sm:max-h-screen overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-white ">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 font-mono">
                    Agent that you are creating
                  </h2>

                  <button
                    onClick={() => setIsProductsVisible(false)}
                    className="p-1 sm:p-2 block sm:hidden  hover:bg-gray-100 rounded-full transition-colors group"
                  >
                    <X
                      size={18}
                      className="text-gray-600 group-hover:text-gray-900"
                    />
                  </button>
                </div>

                <RightSideTabs />

                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4">
                    {isSearching
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <ProductCardSkeleton key={i} />
                        ))
                      : mockProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={handleProductClick}
                          />
                        ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
                className="absolute top-[-1rem] right-[-1rem] left-[-1rem] bottom-[-1rem] 
                     p-4 pb-2.5 m-4 shadow-sm rounded-xl bg-white border border-gray-200 
                     font-mono z-50"
              >
                <ProductDetailsPopup
                  product={selectedProduct}
                  isWebSearching={isWebSearching}
                  webSearchResults={webSearchResults}
                  onClose={closeProductPopup}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {isSearching && <LoadingOverlay />}

      {/* Background decoration - hidden on mobile */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-gray-200 rounded-full opacity-20 hidden lg:block font-mono"></div>
    </div>
  );
};

export default ChatInterface;
