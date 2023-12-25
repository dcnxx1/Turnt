import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import Tabbar from '../components/Tabbar/Tabbar';
import {
  Editor,
  FileSelectScreen,
  Home,
  OnBoardScreen,
  Profile,
} from '../screens';
import AccountSetupScreen from '../screens/AccountSetup/AccountSetupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import useLocalUserProfile from '../shared/hooks/useLocalUserProfile';
import {AccountSetupParams, EditorParams, HomeParams} from './navparams';
import {NavScreenNames, RootNavNames} from './types';
import { useRef } from 'react';

const HomeStack = createBottomTabNavigator<HomeParams>();
const RootStack = createStackNavigator();
const SetupStack = createStackNavigator<AccountSetupParams>();
const EditorStack = createStackNavigator<EditorParams>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      detachInactiveScreens={false}
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={NavScreenNames.HomeScreen}>
      <HomeStack.Screen component={Home} name={NavScreenNames.HomeScreen} />
      <HomeStack.Screen
        component={Profile}
        name={NavScreenNames.ProfileScreen}
      />
    </HomeStack.Navigator>
  );
}

function SetupScreenStackNavigator() {
  return (
    <SetupStack.Navigator
      initialRouteName={NavScreenNames.AuthScreen}
      screenOptions={screenOptions}>
      <SetupStack.Screen
        component={OnBoardScreen}
        name={NavScreenNames.OnBoardScreen}
      />
      <SetupStack.Screen
        name={NavScreenNames.AuthScreen}
        component={AuthScreen}
      />
      <SetupStack.Screen
        name={NavScreenNames.AccountSetupScreen}
        component={AccountSetupScreen}
      />
    </SetupStack.Navigator>
  );
}

function EditorStackNavigator() {
  return (
    <EditorStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={RootNavNames.EditorStack}>
      <EditorStack.Screen
        component={FileSelectScreen}
        name={NavScreenNames.FileSelectScreen}
      />
      <EditorStack.Screen
        component={Editor}
        name={NavScreenNames.EditorScreen}
      />
    </EditorStack.Navigator>
  );
}

export default function Navigation() {
  const me = useLocalUserProfile();

  const onStateChange = (state: {key: string; name: string}) => {
 
  };


const AppContent = () => {
  const routeNameRef = useRef<string>()
}



  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={RootNavNames.SetupStack}>
        {me.profile ? (
          <RootStack.Screen
            name={RootNavNames.HomeStack}
            component={HomeStackNavigator}
          />
        ) : (
          <RootStack.Screen
            name={RootNavNames.SetupStack}
            component={SetupScreenStackNavigator}
          />
        )}

        <RootStack.Screen
          name={RootNavNames.EditorStack}
          component={EditorStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
