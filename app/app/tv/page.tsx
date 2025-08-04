'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '../../components/layout';
import { TVPageComponent } from '../../components/tv';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function TVPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TVPageComponent />
      </Layout>
    </QueryClientProvider>
  );
}
