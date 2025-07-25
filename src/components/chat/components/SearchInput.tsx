import React, { useRef } from 'react';
import { Mic, Paperclip } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onImageUpload: (file: File) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onImageUpload,
  placeholder = "Enter missing ingredient or search products...",
  className = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  return (
    <div className={`relative ${className} font-mono`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden font-mono"
      />
      
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        onClick={onSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors font-mono"
      >
        <Mic size={18} className="text-gray-500 font-mono" />
      </button>
    </div>
  );
};

export default SearchInput; 