import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Button } from '../components/ui/button';
import { moviesApi } from '../lib/api';

interface MoviesPageProps {
  onMovieClick: (id: number) => void;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({ onMovieClick }) => {
  const [activeCategory, setActiveCategory] = useState<
    'popular' | 'top_rated' | 'now_playing' | 'upcoming'
  >('popular');

  const { data: popularMovies, isLoading: popularLoading } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => moviesApi.getPopular(),
    enabled: activeCategory === 'popular',
  });

  const { data: topRatedMovies, isLoading: topRatedLoading } = useQuery({
    queryKey: ['movies', 'top_rated'],
    queryFn: () => moviesApi.getTopRated(),
    enabled: activeCategory === 'top_rated',
  });

  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useQuery({
    queryKey: ['movies', 'now_playing'],
    queryFn: () => moviesApi.getNowPlaying(),
    enabled: activeCategory === 'now_playing',
  });

  const { data: upcomingMovies, isLoading: upcomingLoading } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => moviesApi.getUpcoming(),
    enabled: activeCategory === 'upcoming',
  });

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'popular':
        return popularMovies?.data.results || [];
      case 'top_rated':
        return topRatedMovies?.data.results || [];
      case 'now_playing':
        return nowPlayingMovies?.data.results || [];
      case 'upcoming':
        return upcomingMovies?.data.results || [];
      default:
        return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeCategory) {
      case 'popular':
        return popularLoading;
      case 'top_rated':
        return topRatedLoading;
      case 'now_playing':
        return nowPlayingLoading;
      case 'upcoming':
        return upcomingLoading;
      default:
        return false;
    }
  };

  const movies = getCurrentData();
  const isLoading = getCurrentLoading();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>

        <div className="flex space-x-2">
          <Button
            variant={activeCategory === 'popular' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('popular')}
          >
            Popular
          </Button>
          <Button
            variant={activeCategory === 'top_rated' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('top_rated')}
          >
            Top Rated
          </Button>
          <Button
            variant={activeCategory === 'now_playing' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('now_playing')}
          >
            Now Playing
          </Button>
          <Button
            variant={activeCategory === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('upcoming')}
          >
            Upcoming
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading movies...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </div>
      )}
    </div>
  );
};
