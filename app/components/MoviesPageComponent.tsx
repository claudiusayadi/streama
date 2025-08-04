'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { moviesApi } from '../lib/api';
import { useAppStore } from '../store/app-store';
import { MovieCard } from './MovieCard';
import { Pagination } from './pagination';
import { Button } from './ui/button';

export const MoviesPageComponent: React.FC = () => {
  const router = useRouter();
  const { getMoviePage, setMoviePageNumber } = useAppStore();

  const [activeCategory, setActiveCategory] = useState<
    'popular' | 'top_rated' | 'new' | 'upcoming'
  >('popular');

  const currentPage = getMoviePage(activeCategory);

  const { data: popularMovies, isLoading: popularLoading } = useQuery({
    queryKey: ['movies', 'popular', currentPage],
    queryFn: () => moviesApi.getPopular(currentPage),
    enabled: activeCategory === 'popular',
  });

  const { data: topRatedMovies, isLoading: topRatedLoading } = useQuery({
    queryKey: ['movies', 'top_rated', currentPage],
    queryFn: () => moviesApi.getTopRated(currentPage),
    enabled: activeCategory === 'top_rated',
  });

  const { data: newMovies, isLoading: newLoading } = useQuery({
    queryKey: ['movies', 'new', currentPage],
    queryFn: () => moviesApi.getNew(currentPage),
    enabled: activeCategory === 'new',
  });

  const { data: upcomingMovies, isLoading: upcomingLoading } = useQuery({
    queryKey: ['movies', 'upcoming', currentPage],
    queryFn: () => moviesApi.getUpcoming(currentPage),
    enabled: activeCategory === 'upcoming',
  });

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'popular':
        return {
          results: popularMovies?.data.results || [],
          pagination: popularMovies?.data || null,
        };
      case 'top_rated':
        return {
          results: topRatedMovies?.data.results || [],
          pagination: topRatedMovies?.data || null,
        };
      case 'new':
        return {
          results: newMovies?.data.results || [],
          pagination: newMovies?.data || null,
        };
      case 'upcoming':
        return {
          results: upcomingMovies?.data.results || [],
          pagination: upcomingMovies?.data || null,
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

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handlePageChange = (page: number) => {
    setMoviePageNumber(activeCategory, page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
    // Reset to page 1 when changing categories
    setMoviePageNumber(category, 1);
  };

  const { results: movies, pagination } = getCurrentData();
  const isLoading = getCurrentLoading();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Movies</h1>

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
            {pagination.total_results.toLocaleString()} movies)
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading movies...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
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
