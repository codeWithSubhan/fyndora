import React from 'react';
import { Sparkles } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center bg-[#18191A] rounded-lg p-4 gap-4 w-full max-w-lg mx-auto shadow-lg relative font-mono">
      {/* Image thumbnail */}
      <img
        src={URL.createObjectURL(file)}
        alt="Selected"
        className="h-12 w-12 object-cover rounded-md border border-gray-700 font-mono"
      />
      {/* Info and progress */}
      <div className="flex-1 font-mono">
        <div className="text-white text-lg mb-1 font-mono">{file.name || 'Image'}</div>
        <div className="flex items-center gap-2 mb-2 font-mono">
          <Sparkles size={16} className="text-gray-300 font-mono" />
          <span className="text-gray-300 text-sm font-mono">Answer</span>
        </div>
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden font-mono">
          <div className="h-1 bg-white rounded-full transition-all font-mono" style={{ width: '20%' }} />
        </div>
      </div>
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors font-mono"
        title="Remove image"
      >
        ×
      </button>
    </div>
  );
};

export default ImagePreview; 