import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5134/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for our API responses
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
}

export interface TVDetail extends TVShow {
  number_of_episodes: number;
  number_of_seasons: number;
  genres: Array<{ id: number; name: string }>;
  created_by: Array<{ id: number; name: string }>;
}

// API functions
export const moviesApi = {
  getPopular: () => api.get<{ results: Movie[] }>('/movies/popular'),
  getTopRated: () => api.get<{ results: Movie[] }>('/movies/top-rated'),
  getNowPlaying: () => api.get<{ results: Movie[] }>('/movies/now-playing'),
  getUpcoming: () => api.get<{ results: Movie[] }>('/movies/upcoming'),
  getById: (id: string) => api.get<MovieDetail>(`/movies/${id}`),
  search: (query: string) =>
    api.get<{ results: Movie[] }>(`/movies/search?query=${query}`),
};

export const tvApi = {
  getPopular: () => api.get<{ results: TVShow[] }>('/tv/popular'),
  getTopRated: () => api.get<{ results: TVShow[] }>('/tv/top-rated'),
  getAiringToday: () => api.get<{ results: TVShow[] }>('/tv/airing-today'),
  getOnTheAir: () => api.get<{ results: TVShow[] }>('/tv/on-the-air'),
  getById: (id: string) => api.get<TVDetail>(`/tv/${id}`),
  search: (query: string) =>
    api.get<{ results: TVShow[] }>(`/tv/search?query=${query}`),
};

export default api;
