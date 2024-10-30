import React from 'react';
import { Settings, Home, User } from 'lucide-react';
import { getUser, logout } from '../utils/mockAuth';

export default function Navbar() {
  const user = getUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">NewsHub</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Home className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              {user && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user.name}
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {user.isPremium ? 'Premium User' : 'Free User'}
                  </div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}