'use client';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ArrowLeft, Calendar, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Layout } from '../../../components/Layout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { tvApi } from '../../../lib/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function TVDetailContent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const showId = params.id;

  const {
    data: show,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tv', showId],
    queryFn: () => tvApi.getById(showId),
  });

  const handleBack = () => {
    router.push('/tv');
  };

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
        <Button onClick={handleBack} variant="outline">
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
      <div className="mb-6">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to TV Shows
        </Button>
      </div>

      <div className="relative mb-8">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={backdropUrl}
            alt={showData.name}
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
                  alt={showData.name}
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
              {showData.name}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{showData.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(showData.first_air_date).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <Tv className="h-4 w-4 mr-1" />
                <span>
                  {showData.number_of_seasons} seasons,{' '}
                  {showData.number_of_episodes} episodes
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {showData.genres.map((genre) => (
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
            <p className="text-gray-600 leading-relaxed">{showData.overview}</p>
          </div>

          {showData.created_by.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Created By
              </h2>
              <div className="flex flex-wrap gap-4">
                {showData.created_by.map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <span>{creator.name}</span>
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

export default function TVDetailPage({ params }: { params: { id: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TVDetailContent params={params} />
      </Layout>
    </QueryClientProvider>
  );
}
