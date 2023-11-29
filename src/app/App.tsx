import {Query, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Navigation} from '../nav';
import {Dimensions, View} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
