import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Layout } from './components/Layout';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { MoviesPage } from './pages/MoviesPage';
import { TVDetailPage } from './pages/TVDetailPage';
import { TVPage } from './pages/TVPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

type AppState =
  | { page: 'movies' }
  | { page: 'tv' }
  | { page: 'movie-detail'; movieId: string }
  | { page: 'tv-detail'; showId: string };

function App() {
  const [appState, setAppState] = useState<AppState>({ page: 'movies' });

  const handleTabChange = (tab: 'movies' | 'tv') => {
    setAppState({ page: tab });
  };

  const handleMovieClick = (movieId: number) => {
    setAppState({ page: 'movie-detail', movieId: movieId.toString() });
  };

  const handleShowClick = (showId: number) => {
    setAppState({ page: 'tv-detail', showId: showId.toString() });
  };

  const handleBackToMovies = () => {
    setAppState({ page: 'movies' });
  };

  const handleBackToTV = () => {
    setAppState({ page: 'tv' });
  };

  const renderContent = () => {
    switch (appState.page) {
      case 'movies':
        return <MoviesPage onMovieClick={handleMovieClick} />;
      case 'tv':
        return <TVPage onShowClick={handleShowClick} />;
      case 'movie-detail':
        return (
          <MovieDetailPage
            movieId={appState.movieId}
            onBack={handleBackToMovies}
          />
        );
      case 'tv-detail':
        return (
          <TVDetailPage showId={appState.showId} onBack={handleBackToTV} />
        );
      default:
        return <MoviesPage onMovieClick={handleMovieClick} />;
    }
  };

  const getActiveTab = (): 'movies' | 'tv' => {
    if (appState.page === 'tv' || appState.page === 'tv-detail') {
      return 'tv';
    }
    return 'movies';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout activeTab={getActiveTab()} onTabChange={handleTabChange}>
        {renderContent()}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
