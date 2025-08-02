import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { moviesApi } from '../lib/api';

interface MovieDetailPageProps {
  movieId: string;
  onBack: () => void;
}

export const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
  movieId,
  onBack,
}) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => moviesApi.getById(movieId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg text-gray-500 mb-4">
          Failed to load movie details
        </div>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const movieData = movie.data;
  const backdropUrl = movieData.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  const posterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div>
      <Button onClick={onBack} variant="outline" className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Movies
      </Button>

      {/* Backdrop */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img
          src={backdropUrl}
          alt={movieData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-4xl font-bold mb-2">{movieData.title}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{movieData.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(movieData.release_date).getFullYear()}</span>
            </div>
            {movieData.runtime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{movieData.runtime}m</span>
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
            alt={movieData.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {movieData.overview}
              </p>

              {movieData.genres && movieData.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movieData.genres.map((genre) => (
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

              {movieData.production_companies &&
                movieData.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Production Companies
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {movieData.production_companies
                        .slice(0, 5)
                        .map((company) => (
                          <div
                            key={company.id}
                            className="flex items-center space-x-2"
                          >
                            {company.logo_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                alt={company.name}
                                className="h-8 w-auto"
                              />
                            )}
                            <span className="text-sm text-gray-600">
                              {company.name}
                            </span>
                          </div>
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
