'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '../../components/layout';
import { MoviesPageComponent } from '../../components/movie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function MoviesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MoviesPageComponent />
      </Layout>
    </QueryClientProvider>
  );
}
