import {NavigationContainer} from '@react-navigation/native';
import {ReactNode, useEffect, useRef, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Navigation} from '../nav';
import useInitalizeApp, {useInitialize} from './useInitializeApp';
import {getInitialRoute} from './boot';
import {RootNavNames} from '../nav/types';

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
