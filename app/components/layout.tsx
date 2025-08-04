'use client';

import { Film, Star, Tv } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = (): 'movies' | 'tv' => {
    if (pathname?.startsWith('/tv')) {
      return 'tv';
    }
    return 'movies';
  };

  const handleTabChange = (tab: 'movies' | 'tv') => {
    router.push(`/${tab}`);
  };

  const activeTab = getActiveTab();
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center mb-8 space-x-2">
            <Star className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Streama</h1>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleTabChange('movies')}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors',
                activeTab === 'movies'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <Film className="w-5 h-5" />
              <span className="font-medium">Movies</span>
            </button>

            <button
              onClick={() => handleTabChange('tv')}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors',
                activeTab === 'tv'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <Tv className="w-5 h-5" />
              <span className="font-medium">TV Shows</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-full p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
