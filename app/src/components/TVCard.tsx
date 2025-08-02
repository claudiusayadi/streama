import { Calendar, Star } from 'lucide-react';
import React from 'react';
import type { TVShow } from '../lib/api';
import { Card, CardContent } from './ui/card';

interface TVCardProps {
  show: TVShow;
  onClick: (id: number) => void;
}

export const TVCard: React.FC<TVCardProps> = ({ show, onClick }) => {
  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card
      className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
      onClick={() => onClick(show.id)}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={show.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{show.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {show.name}
          </h3>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(show.first_air_date).getFullYear()}
          </div>

          <p className="text-sm text-gray-600 line-clamp-3">{show.overview}</p>
        </div>
      </CardContent>
    </Card>
  );
};
