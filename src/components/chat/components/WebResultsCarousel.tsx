import React, { useState } from "react";
import WebResultCard from "./WebResultCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WebResult {
  favicon: string;
  title: string;
  subtitle: string;
  url: string;
}

interface WebResultsCarouselProps {
  results: WebResult[];
}

const WebResultsCarousel: React.FC<WebResultsCarouselProps> = ({ results }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3; // Number of items visible at once
  const maxIndex = Math.max(0, results.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="relative font-mono mt-5">
      <h2 className="text-lg font-bold text-gray-800 mb-1  font-mono">Related Keywords</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {canGoPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Right Arrow */}
        {canGoNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-1 py-1 font-mono transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(results.length / itemsPerView) * 100}%`
            }}
          >
            {results.map((result, idx) => (
              <div key={idx} className="flex-shrink-0" style={{ width: `${100 / results.length}%` }}>
                <WebResultCard {...result} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebResultsCarousel; 