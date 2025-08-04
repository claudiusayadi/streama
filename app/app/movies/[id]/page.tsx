'use client';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Layout } from '../../../components/layout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { moviesApi } from '../../../lib/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function MovieDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [movieId, setMovieId] = useState<string>('');

  // Handle async params
  useEffect(() => {
    params.then((resolvedParams) => {
      setMovieId(resolvedParams.id);
    });
  }, [params]);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => moviesApi.getById(movieId),
    enabled: !!movieId, // Only run query when movieId is available
  });

  const handleBack = () => {
    router.push('/movies');
  };

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
        <Button onClick={handleBack} variant="outline">
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
      <div className="mb-6">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
      </div>

      <div className="relative mb-8">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={backdropUrl}
            alt={movieData.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                <Image
                  src={posterUrl}
                  alt={movieData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {movieData.title}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{movieData.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(movieData.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{movieData.runtime} min</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {movieData.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {movieData.overview}
            </p>
          </div>

          {movieData.production_companies.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-4">
                {movieData.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    {company.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        width={50}
                        height={30}
                        className="object-contain"
                      />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MovieDetailContent params={params} />
      </Layout>
    </QueryClientProvider>
  );
}
