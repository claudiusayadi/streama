'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAppStore } from '../store/app-store';
import { Layout } from './Layout';
import { MoviesPageComponent } from './movie';
import { TVPageComponent } from './tv';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const StreamaApp: React.FC = () => {
  const { appState, setMoviesPage, setTVPage, getActiveTab } = useAppStore();

  const handleTabChange = (tab: 'movies' | 'tv') => {
    if (tab === 'movies') {
      setMoviesPage();
    } else {
      setTVPage();
    }
  };

  const renderContent = () => {
    switch (appState.page) {
      case 'movies':
        return <MoviesPageComponent />;
      case 'tv':
        return <TVPageComponent />;
      case 'movie-detail':
        // This will be handled by Next.js routing
        return <MoviesPageComponent />;
      case 'tv-detail':
        // This will be handled by Next.js routing
        return <TVPageComponent />;
      default:
        return <MoviesPageComponent />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout activeTab={getActiveTab()} onTabChange={handleTabChange}>
        {renderContent()}
      </Layout>
    </QueryClientProvider>
  );
};
