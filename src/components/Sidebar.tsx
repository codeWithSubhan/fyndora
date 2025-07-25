
import React, { useState } from 'react';
import { X, MessageSquare, Settings, HelpCircle, User, LogOut, Rss, Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isProductSectionOpen, setIsProductSectionOpen] = useState(false);

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } font-mono`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 font-mono">
          <h2 className="text-lg font-semibold text-gray-800 font-mono">Sub AI</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full lg:hidden font-mono"
          >
            <X size={20} className="text-gray-600 font-mono" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 font-mono">
          <div className="space-y-2 font-mono">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 font-mono">
              History
            </div>

            {/* Chat history items */}
            <div className="space-y-1 font-mono">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                <div className="flex items-center gap-2 font-mono">
                  <MessageSquare size={16} className="text-gray-400 font-mono" />
                  <span className="text-sm text-gray-700 truncate font-mono">Substitute for eggs</span>
                </div>
              </button>


            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="border-t border-gray-200 p-4 font-mono">
          {/* <button
            onClick={() => setIsProductSectionOpen(!isProductSectionOpen)}
            className="w-full flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono"
          >
            <div className="flex items-center gap-2">
              <Package size={16} className="text-gray-400 font-mono" />
              <span>Products</span>
            </div>
            <ChevronRight 
              size={16} 
              className={`text-gray-400 font-mono transition-transform duration-200 ${
                isProductSectionOpen ? 'rotate-90' : ''
              }`} 
            />
          </button> */}
          
          {/* Product Items with slide animation */}
          {/* <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isProductSectionOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className={`transform transition-transform duration-300 ease-in-out ${
              isProductSectionOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="pt-2 space-y-1">
                <button className="w-full text-left p-2 pl-8 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <span className="text-sm text-gray-600">Electronics</span>
                </button>
                <button className="w-full text-left p-2 pl-8 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <span className="text-sm text-gray-600">Food & Grocery</span>
                </button>
                <button className="w-full text-left p-2 pl-8 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <span className="text-sm text-gray-600">Health & Beauty</span>
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-4 font-mono">
          {isAuthenticated && user ? (
            <div className="space-y-3 font-mono">
              {/* User info */}
              <div className="flex items-center gap-3 p-2 font-mono">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full font-mono"
                />
                <div className="flex-1 min-w-0 font-mono">
                  <p className="text-sm font-medium text-gray-900 truncate font-mono">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate font-mono">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1 font-mono">
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <Rss size={16} className="text-gray-400 font-mono" />
                  Feeds
                </button>
                
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <Settings size={16} className="text-gray-400 font-mono" />
                  Settings
                </button>

                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                  <HelpCircle size={16} className="text-gray-400 font-mono" />
                  Help & Support
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-mono"
                >
                  <LogOut size={16} className="text-red-400 font-mono" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1 font-mono">
              {/* <Link
                to="/login"
                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono"
              >
                <Rss size={16} className="text-gray-400 font-mono" />
                Feeds
              </Link> */}
              <Link
                to="/login"
                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono"
              >
                <User size={16} className="text-gray-400 font-mono" />
                Sign In
              </Link>

              <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                <Settings size={16} className="text-gray-400 font-mono" />
                Settings
              </button>

              <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-mono">
                <HelpCircle size={16} className="text-gray-400 font-mono" />
                Help & Support
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
