import React from 'react';
import { Menu, Search, Bell, User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section - Menu & Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg max-w-md w-full">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none bg-transparent flex-1 text-sm text-gray-700 placeholder-gray-400 min-w-0"
            />
          </div>
          
          {/* Mobile Search Icon */}
          <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Settings - Hidden on mobile */}
          <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Help - Hidden on mobile */}
          <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 mx-1"></div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            
            {/* User Info - Hidden on small screens */}
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            
            {/* Logout Button */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={onLogout}
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};