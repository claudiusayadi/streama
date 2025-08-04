import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5134/api/v1',
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

// Paginated response interface
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// API functions with pagination support
export const moviesApi = {
  getTrending: (page = 1) =>
    api.get<PaginatedResponse<Movie>>(`/movies/trending?page=${page}`),
  getPopular: (page = 1) =>
    api.get<PaginatedResponse<Movie>>(`/movies/popular?page=${page}`),
  getTopRated: (page = 1) =>
    api.get<PaginatedResponse<Movie>>(`/movies/top-rated?page=${page}`),
  getNew: (page = 1) =>
    api.get<PaginatedResponse<Movie>>(`/movies/new?page=${page}`),
  getUpcoming: (page = 1) =>
    api.get<PaginatedResponse<Movie>>(`/movies/upcoming?page=${page}`),
  getById: (id: string) => api.get<MovieDetail>(`/movies/${id}`),
  search: (query: string, page = 1) =>
    api.get<PaginatedResponse<Movie>>(
      `/movies/search?query=${query}&page=${page}`,
    ),
};

export const tvApi = {
  getTrending: (page = 1) =>
    api.get<PaginatedResponse<TVShow>>(`/tv/trending?page=${page}`),
  getPopular: (page = 1) =>
    api.get<PaginatedResponse<TVShow>>(`/tv/popular?page=${page}`),
  getTopRated: (page = 1) =>
    api.get<PaginatedResponse<TVShow>>(`/tv/top-rated?page=${page}`),
  getNew: (page = 1) =>
    api.get<PaginatedResponse<TVShow>>(`/tv/new?page=${page}`),
  getUpcoming: (page = 1) =>
    api.get<PaginatedResponse<TVShow>>(`/tv/upcoming?page=${page}`),
  getById: (id: string) => api.get<TVDetail>(`/tv/${id}`),
  search: (query: string, page = 1) =>
    api.get<PaginatedResponse<TVShow>>(
      `/tv/search?query=${query}&page=${page}`,
    ),
};

export default api;
