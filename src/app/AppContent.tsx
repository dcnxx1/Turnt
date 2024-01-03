import {NavigationContainer} from '@react-navigation/native';
import {ReactNode, useEffect, useRef} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Navigation} from '../nav';
import useInitalizeApp from './useInitializeApp';

type Props = {
  children: ReactNode;
};

const AppContent = () => {
  const [isInitializing, initialRoute] = useInitalizeApp();
  const epochRef = useRef(Date.now());

  useEffect(() => {
    const elapsedTime = Date.now() - epochRef.current;
    if (!isInitializing && initialRoute) {
      setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, Math.max(100, 100 - elapsedTime));
    }
  }, [epochRef, isInitializing, initialRoute]);

  return (
    <NavigationContainer>
      <Navigation initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default AppContent;
