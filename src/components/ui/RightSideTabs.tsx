import React, { useState } from "react";
import { Search, Globe } from "lucide-react";

const RightSideTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"logs" | "final">("final");

  return (
    <div className="flex space-x-6 border-b border-gray-200 text-sm font-medium ">
      {/* Ai Search Tab */}
      <button
        onClick={() => setActiveTab("logs")}
        className={`py-2 border-b-2 flex items-center gap-2 transition-colors duration-200 ${
          activeTab === "logs"
            ? "text-black border-black"
            : "text-gray-500 border-transparent hover:text-gray-700"
        }`}
      >
        <Search size={18} />
        Ai search
      </button>
      {/* Web Search Tab */}
      <button
        onClick={() => setActiveTab("final")}
        className={`py-2 border-b-2 flex items-center gap-2 transition-colors duration-200 ${
          activeTab === "final"
            ? "text-black border-black"
            : "text-gray-500 border-transparent hover:text-gray-700"
        }`}
      >
        <Globe size={18} />
        Web search
      </button>
    </div>
  );
};

export default RightSideTabs;
