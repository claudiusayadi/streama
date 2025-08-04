'use client';

import { Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import type { Movie } from '../lib/api';
import { Card, CardContent } from './ui/card';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card
      className="transition-transform cursor-pointer hover:scale-105 hover:shadow-lg"
      onClick={() => onClick(movie.id)}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute flex items-center px-2 py-1 space-x-1 text-xs text-white rounded-full top-2 right-2 bg-black/70">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {movie.title}
          </h3>

          <div className="flex items-center mb-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(movie.release_date).getFullYear()}
          </div>

          <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
        </div>
      </CardContent>
    </Card>
  );
};
