import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import {Navigation} from '../nav';
import AppContent from './AppContent';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppContent>
          <Navigation />
        </AppContent>
      </QueryClientProvider>
    </StrictMode>
  );
}
