'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { tvApi } from '../lib/api';
import { useAppStore } from '../store/app-store';
import { Pagination } from './pagination';
import { TVCard } from './tv-card';
import { Button } from './ui/button';

export const TVPageComponent: React.FC = () => {
  const router = useRouter();
  const { getTVPage, setTVPageNumber } = useAppStore();

  const [activeCategory, setActiveCategory] = useState<
    'popular' | 'top_rated' | 'new' | 'upcoming'
  >('popular');

  const currentPage = getTVPage(activeCategory);

  const { data: popularShows, isLoading: popularLoading } = useQuery({
    queryKey: ['tv', 'popular', currentPage],
    queryFn: () => tvApi.getPopular(currentPage),
    enabled: activeCategory === 'popular',
  });

  const { data: topRatedShows, isLoading: topRatedLoading } = useQuery({
    queryKey: ['tv', 'top_rated', currentPage],
    queryFn: () => tvApi.getTopRated(currentPage),
    enabled: activeCategory === 'top_rated',
  });

  const { data: newShows, isLoading: newLoading } = useQuery({
    queryKey: ['tv', 'new', currentPage],
    queryFn: () => tvApi.getNew(currentPage),
    enabled: activeCategory === 'new',
  });

  const { data: upcomingShows, isLoading: upcomingLoading } = useQuery({
    queryKey: ['tv', 'upcoming', currentPage],
    queryFn: () => tvApi.getUpcoming(currentPage),
    enabled: activeCategory === 'upcoming',
  });

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'popular':
        return {
          results: popularShows?.data.results || [],
          pagination: popularShows?.data || null,
        };
      case 'top_rated':
        return {
          results: topRatedShows?.data.results || [],
          pagination: topRatedShows?.data || null,
        };
      case 'new':
        return {
          results: newShows?.data.results || [],
          pagination: newShows?.data || null,
        };
      case 'upcoming':
        return {
          results: upcomingShows?.data.results || [],
          pagination: upcomingShows?.data || null,
        };
      default:
        return { results: [], pagination: null };
    }
  };

  const getCurrentLoading = () => {
    switch (activeCategory) {
      case 'popular':
        return popularLoading;
      case 'top_rated':
        return topRatedLoading;
      case 'new':
        return newLoading;
      case 'upcoming':
        return upcomingLoading;
      default:
        return false;
    }
  };

  const handleShowClick = (showId: number) => {
    router.push(`/tv/${showId}`);
  };

  const handlePageChange = (page: number) => {
    setTVPageNumber(activeCategory, page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
    // Reset to page 1 when changing categories
    setTVPageNumber(category, 1);
  };

  const { results: shows, pagination } = getCurrentData();
  const isLoading = getCurrentLoading();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">TV Shows</h1>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === 'popular' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('popular')}
          >
            Popular
          </Button>
          <Button
            variant={activeCategory === 'top_rated' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('top_rated')}
          >
            Top Rated
          </Button>
          <Button
            variant={activeCategory === 'new' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('new')}
          >
            New
          </Button>
          <Button
            variant={activeCategory === 'upcoming' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('upcoming')}
          >
            Upcoming
          </Button>
        </div>

        {pagination && (
          <div className="mt-4 text-sm text-gray-600">
            Showing page {pagination.page} of {pagination.total_pages}(
            {pagination.total_results.toLocaleString()} shows)
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading TV shows...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((show) => (
              <TVCard key={show.id} show={show} onClick={handleShowClick} />
            ))}
          </div>

          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.total_pages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
            />
          )}
        </>
      )}
    </div>
  );
};
