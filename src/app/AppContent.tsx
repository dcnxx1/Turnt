import {NavigationContainer} from '@react-navigation/native';
import {ReactNode} from 'react';
import {Navigation} from '../nav';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import useInitalizeApp from './useIntializeApp';

type Props = {
  children: ReactNode;
};

const AppContent = () => {
  const [isIntializing, initialRoute] = useInitalizeApp();

  if (isIntializing) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Navigation initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default AppContent;
