import { NavigationContainer } from '@react-navigation/native';
import { ReactNode, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Navigation } from '../nav';
import useInitalizeApp from './useInitializeApp';

type Props = {
  children: ReactNode;
};

const AppContent = () => {
  const [isInitializing, initialRoute] = useInitalizeApp();

  useEffect(() => {
    if (!isInitializing && initialRoute) {
      RNBootSplash.hide({fade: true});
    }
  }, [isInitializing, initialRoute]);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Navigation initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default AppContent;
