import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Navigation} from '../nav';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
