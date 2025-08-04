import { create } from 'zustand';

type AppState =
  | { page: 'movies' }
  | { page: 'tv' }
  | { page: 'movie-detail'; movieId: string }
  | { page: 'tv-detail'; showId: string };

type MovieCategory = 'trending' | 'popular' | 'top_rated' | 'new' | 'upcoming';
type TVCategory = 'trending' | 'popular' | 'top_rated' | 'new' | 'upcoming';

interface PaginationState {
  movies: Record<MovieCategory, number>;
  tv: Record<TVCategory, number>;
}

interface AppStore {
  appState: AppState;
  pagination: PaginationState;

  // Navigation actions
  setMoviesPage: () => void;
  setTVPage: () => void;
  setMovieDetail: (movieId: number) => void;
  setTVDetail: (showId: number) => void;
  getActiveTab: () => 'movies' | 'tv';

  // Pagination actions
  setMoviePageNumber: (category: MovieCategory, page: number) => void;
  setTVPageNumber: (category: TVCategory, page: number) => void;
  getMoviePage: (category: MovieCategory) => number;
  getTVPage: (category: TVCategory) => number;
  resetPagination: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  appState: { page: 'movies' },
  pagination: {
    movies: {
      trending: 1,
      popular: 1,
      top_rated: 1,
      new: 1,
      upcoming: 1,
    },
    tv: {
      trending: 1,
      popular: 1,
      top_rated: 1,
      new: 1,
      upcoming: 1,
    },
  },

  // Navigation actions
  setMoviesPage: () => set({ appState: { page: 'movies' } }),

  setTVPage: () => set({ appState: { page: 'tv' } }),

  setMovieDetail: (movieId: number) =>
    set({ appState: { page: 'movie-detail', movieId: movieId.toString() } }),

  setTVDetail: (showId: number) =>
    set({ appState: { page: 'tv-detail', showId: showId.toString() } }),

  getActiveTab: () => {
    const { appState } = get();
    if (appState.page === 'tv' || appState.page === 'tv-detail') {
      return 'tv';
    }
    return 'movies';
  },

  // Pagination actions
  setMoviePageNumber: (category: MovieCategory, page: number) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        movies: {
          ...state.pagination.movies,
          [category]: page,
        },
      },
    })),

  setTVPageNumber: (category: TVCategory, page: number) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        tv: {
          ...state.pagination.tv,
          [category]: page,
        },
      },
    })),

  getMoviePage: (category: MovieCategory) => get().pagination.movies[category],

  getTVPage: (category: TVCategory) => get().pagination.tv[category],

  resetPagination: () =>
    set(() => ({
      pagination: {
        movies: {
          trending: 1,
          popular: 1,
          top_rated: 1,
          new: 1,
          upcoming: 1,
        },
        tv: {
          trending: 1,
          popular: 1,
          top_rated: 1,
          new: 1,
          upcoming: 1,
        },
      },
    })),
}));
