import React from "react";

interface WebResultCardProps {
  favicon: string;
  title: string;
  subtitle: string;
  url: string;
}

const WebResultCard: React.FC<WebResultCardProps> = ({ favicon, title, subtitle, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer font-mono"
  >
    <div className="flex items-center gap-2">
      <img 
        src={favicon} 
        alt={`${title} favicon`} 
        className="w-4 h-4 flex-shrink-0"
        onError={(e) => { 
          e.currentTarget.style.display = 'none'; 
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900 truncate font-mono">{title}</div>
        <div className="text-xs text-gray-500 truncate font-mono">{subtitle}</div>
      </div>
    </div>
  </a>
);

export default WebResultCard; 