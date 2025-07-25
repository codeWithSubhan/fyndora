
import React from 'react';
import { ArrowRight } from 'lucide-react';

const SuggestionPills = () => {
  const topSuggestions = [
    'Carrot', 'Cheese', 'Eggs', 'Onions', 'Butter'
  ];
  
  const bottomSuggestions = [
    'Milk', 'Bell pepper', 'Almond', 'Check history'
  ];

  const PillButton = ({ children, hasArrow = false }: { children: React.ReactNode; hasArrow?: boolean }) => (
    <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all duration-200 hover:scale-105 font-mono">
      {children}
      {hasArrow && <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] font-mono" />}
    </button>
  );

  return (
    <div className="space-y-4 font-mono">
      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-mono">Some past prompts:</p>
      
      {/* Top row */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 font-mono">
        {topSuggestions.map((suggestion, index) => (
          <PillButton key={index} hasArrow>
            {suggestion}
          </PillButton>
        ))}
      </div>
      
      {/* Bottom row */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 font-mono">
        {bottomSuggestions.slice(0, -1).map((suggestion, index) => (
          <PillButton key={index} hasArrow>
            {suggestion}
          </PillButton>
        ))}
        <PillButton>
          {bottomSuggestions[bottomSuggestions.length - 1]}
        </PillButton>
      </div>
    </div>
  );
};

export default SuggestionPills;
