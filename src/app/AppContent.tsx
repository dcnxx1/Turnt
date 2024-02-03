import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {ReactNode, useEffect, useRef} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch} from 'react-redux';
import {Navigation} from '../nav';

import useInitalizeApp from './useInitializeApp';

type Props = {
  children: ReactNode;
};

const AppContent = () => {
  const [isInitializing, initialRoute] = useInitalizeApp();
  const routeNameRef = useRef<string>();
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);
  const dispatch = useDispatch();
  const activeSliceRef = useRef<'playlistSlice' | 'homeSlice'>();

  useEffect(() => {
    if (!isInitializing && initialRoute) {
      RNBootSplash.hide({fade: true});
    }
  }, [isInitializing, initialRoute]);

  if (!initialRoute) {
    return null;
  }

  const onNavigationStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    console.log({
      previousRouteName,
      currentRouteName,
    });
    if (
      previousRouteName === 'ProfileScreen' &&
      currentRouteName === 'FileSelectScreen'
    ) {
      // console.log('activeSliceRef :>>', activeSliceRef.current);
  
    }
    if (
      previousRouteName === 'FileSelectScreen' &&
      currentRouteName === 'ProfileScreen'
    ) {
      if (activeSliceRef.current) {
     
      }
    }
    routeNameRef.current = currentRouteName;
  };

  const onReady = () => {};

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onNavigationStateChange}>
      <Navigation initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default AppContent;
