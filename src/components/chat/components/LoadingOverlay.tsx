import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Finding substitutes..." 
}) => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-30">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay; 