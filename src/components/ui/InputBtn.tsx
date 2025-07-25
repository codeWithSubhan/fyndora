import React, { useRef, useState } from "react";
import {
  Mic,
  Menu,
  ArrowLeft,
  Paperclip,
  SendHorizontal,
  Plus,
} from "lucide-react";

export default function InputBtn({ placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    // if (inputValue.trim()) {
    //   setIsSearching(true);
    //   setTimeout(() => {
    //     setShowProducts(true);
    //     setIsSearching(false);
    //   }, 300);
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      //   setSelectedImage(file);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const isTyping = inputValue.trim() !== "";

  return (
    <div className="mt-0 sm:mt-0 font-mono ">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden font-mono"
      />

      <div className="relative max-w-full mx-auto font-mono ">
        <input
          type="text"
          placeholder="Ask for anything"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border border-gray-300 outline-none 
              bg-white shadow-sm text-sm sm:text-base placeholder-gray-400 transition-all pr-14 ${
                isTyping ? "pr-24" : "pr-14"
              }`}
        />

        {/* Attach icon */}
        <button
          onClick={handleAttachClick}
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
  );
}
