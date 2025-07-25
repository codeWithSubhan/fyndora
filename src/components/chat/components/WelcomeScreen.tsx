import React from 'react';
import SuggestionPills from '../../SuggestionPills';
import SearchInput from './SearchInput';
import ImagePreview from './ImagePreview';

interface WelcomeScreenProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  onImageUpload: (file: File) => void;
  selectedImage: File | null;
  onRemoveImage: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  inputValue,
  onInputChange,
  onSearch,
  onImageUpload,
  selectedImage,
  onRemoveImage
}) => {
  return (
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
          Sub AI may occasionally make mistakes. Please cross-check its results for accuracy.
        </p>
        
        <div className="relative max-w-xl mx-auto font-mono">
          <SearchInput
            value={inputValue}
            onChange={onInputChange}
            onSearch={onSearch}
            onImageUpload={onImageUpload}
          />
        </div>
        
        {/* Selected image preview */}
        {selectedImage && (
          <ImagePreview file={selectedImage} onRemove={onRemoveImage} />
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen; 