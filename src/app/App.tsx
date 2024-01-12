import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import AppContent from './AppContent';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
}
