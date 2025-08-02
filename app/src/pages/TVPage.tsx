import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { TVCard } from '../components/TVCard';
import { Button } from '../components/ui/button';
import { tvApi } from '../lib/api';

interface TVPageProps {
  onShowClick: (id: number) => void;
}

export const TVPage: React.FC<TVPageProps> = ({ onShowClick }) => {
  const [activeCategory, setActiveCategory] = useState<
    'popular' | 'top_rated' | 'airing_today' | 'on_the_air'
  >('popular');

  const { data: popularShows, isLoading: popularLoading } = useQuery({
    queryKey: ['tv', 'popular'],
    queryFn: () => tvApi.getPopular(),
    enabled: activeCategory === 'popular',
  });

  const { data: topRatedShows, isLoading: topRatedLoading } = useQuery({
    queryKey: ['tv', 'top_rated'],
    queryFn: () => tvApi.getTopRated(),
    enabled: activeCategory === 'top_rated',
  });

  const { data: airingTodayShows, isLoading: airingTodayLoading } = useQuery({
    queryKey: ['tv', 'airing_today'],
    queryFn: () => tvApi.getAiringToday(),
    enabled: activeCategory === 'airing_today',
  });

  const { data: onTheAirShows, isLoading: onTheAirLoading } = useQuery({
    queryKey: ['tv', 'on_the_air'],
    queryFn: () => tvApi.getOnTheAir(),
    enabled: activeCategory === 'on_the_air',
  });

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'popular':
        return popularShows?.data.results || [];
      case 'top_rated':
        return topRatedShows?.data.results || [];
      case 'airing_today':
        return airingTodayShows?.data.results || [];
      case 'on_the_air':
        return onTheAirShows?.data.results || [];
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
      case 'airing_today':
        return airingTodayLoading;
      case 'on_the_air':
        return onTheAirLoading;
      default:
        return false;
    }
  };

  const shows = getCurrentData();
  const isLoading = getCurrentLoading();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">TV Shows</h1>

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
            variant={activeCategory === 'airing_today' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('airing_today')}
          >
            Airing Today
          </Button>
          <Button
            variant={activeCategory === 'on_the_air' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('on_the_air')}
          >
            On The Air
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading TV shows...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {shows.map((show) => (
            <TVCard key={show.id} show={show} onClick={onShowClick} />
          ))}
        </div>
      )}
    </div>
  );
};
