import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StrictMode, useState} from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import AppContent from './AppContent';
import ErrorBoundary from 'react-native-error-boundary';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
const queryClient = new QueryClient();

export default function App() {
  const [isErrorVisible, setisErrorVisible] = useState(false);

  return (
    <StrictMode>
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
    </StrictMode>
  );
}
