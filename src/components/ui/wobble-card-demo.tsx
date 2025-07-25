import React from 'react';
import { WobbleCard } from './wobble-card';

export const WobbleCardDemo = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Basic Wobble Card */}
        <WobbleCard>
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4">Wobble Card</h3>
            <p className="text-gray-300 mb-4">
              This card responds to mouse movement with a smooth wobble effect.
              Move your mouse over it to see the magic!
            </p>
            <div className="mt-auto">
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </WobbleCard>

        {/* Card with Icon */}
        <WobbleCard>
          <div className="flex flex-col h-full">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Interactive Design</h3>
            <p className="text-gray-300 mb-4">
              Built with Framer Motion for smooth animations and React for the best developer experience.
            </p>
            <div className="mt-auto">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </WobbleCard>

        {/* Stats Card */}
        <WobbleCard>
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4">Performance</h3>
            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Speed</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Reliability</span>
                  <span>99%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-auto text-center">
              <span className="text-3xl font-bold">⚡</span>
            </div>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
}; 