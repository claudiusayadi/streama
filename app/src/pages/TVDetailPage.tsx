import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Star, Tv } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { tvApi } from '../lib/api';

interface TVDetailPageProps {
  showId: string;
  onBack: () => void;
}

export const TVDetailPage: React.FC<TVDetailPageProps> = ({
  showId,
  onBack,
}) => {
  const {
    data: show,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tv', showId],
    queryFn: () => tvApi.getById(showId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading TV show details...</div>
      </div>
    );
  }

  if (error || !show?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg text-gray-500 mb-4">
          Failed to load TV show details
        </div>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const showData = show.data;
  const backdropUrl = showData.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${showData.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  const posterUrl = showData.poster_path
    ? `https://image.tmdb.org/t/p/w500${showData.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div>
      <Button onClick={onBack} variant="outline" className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to TV Shows
      </Button>

      {/* Backdrop */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img
          src={backdropUrl}
          alt={showData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-4xl font-bold mb-2">{showData.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{showData.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(showData.first_air_date).getFullYear()}</span>
            </div>
            {showData.number_of_seasons && (
              <div className="flex items-center space-x-1">
                <Tv className="h-4 w-4" />
                <span>{showData.number_of_seasons} Seasons</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          <img
            src={posterUrl}
            alt={showData.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {showData.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {showData.number_of_seasons && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Seasons</h3>
                    <p className="text-gray-600">
                      {showData.number_of_seasons}
                    </p>
                  </div>
                )}
                {showData.number_of_episodes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Episodes</h3>
                    <p className="text-gray-600">
                      {showData.number_of_episodes}
                    </p>
                  </div>
                )}
              </div>

              {showData.genres && showData.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {showData.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {showData.created_by && showData.created_by.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Created By</h3>
                  <div className="flex flex-wrap gap-2">
                    {showData.created_by.map((creator) => (
                      <span key={creator.id} className="text-gray-600">
                        {creator.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
