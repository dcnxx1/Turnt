import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Text } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AppContent from './AppContent';
const queryClient = new QueryClient();

export default function App() {
  const [isErrorVisible, setisErrorVisible] = useState(false);
  return (
    <ErrorBoundary
      onError={err => console.log('onError occured :>>', err)}
      FallbackComponent={() => (
        <View>
          <Text>Error fallback component!</Text>
        </View>
      )}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
