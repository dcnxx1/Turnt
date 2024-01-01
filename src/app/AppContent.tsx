import { NavigationContainer } from '@react-navigation/native';
import { ReactNode, useEffect, useRef } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Navigation } from '../nav';
import useInitalizeApp from './useIntializeApp';

type Props = {
  children: ReactNode;
};

const AppContent = () => {
  const [isIntializing, initialRoute] = useInitalizeApp();
  const epochRef = useRef(Date.now());

  useEffect(() => {
    const elapsedTime = Date.now() - epochRef.current;
    if (!isIntializing) {
      setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, Math.max(100, 100 - elapsedTime));
    }
  }, [epochRef, isIntializing, initialRoute]);

  return (
    <NavigationContainer>
      <Navigation initialRoute={'HomeStack'} />
    </NavigationContainer>
  );
};

export default AppContent;
