import React, { useState } from 'react';
import { Search, Paperclip } from 'lucide-react';

interface BottomInputProps {
  placeholder?: string;
  setInputValue: (value: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const BottomInput: React.FC<BottomInputProps> = ({ 
  placeholder = "Ask for more substitutes or recipes...",
  setInputValue,
  handleSearch,
  handleKeyPress
}) => {
  return (
    <div className="border-t border-gray-200 bg-white p-4 font-mono">
      <div className="relative max-w-2xl mx-auto font-mono">
        <input
          type="text"
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-20 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm font-mono"
        />
        
        {/* Attach button */}
        <button className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors font-mono">
          <Paperclip size={18} className="text-gray-500 font-mono" />
        </button>
        
        {/* Search button */}
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors font-mono" onClick={handleSearch}>
          <Search size={18} className="text-gray-500 font-mono" />
        </button>
      </div>
    </div>
  );
};

export default BottomInput; 