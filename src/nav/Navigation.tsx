import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import Tabbar from '../components/Tabbar/Tabbar';
import {Editor, Home, OnBoardScreen, Profile} from '../screens';
import AccountSetupScreen from '../screens/AccountSetup/AccountSetupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import useLocalUserProfile from '../shared/hooks/useLocalUserProfile';
import {AccountSetupParams, HomeParams} from './navparams';
import {NavNames, RootNavNames} from './types';

const HomeStack = createBottomTabNavigator<HomeParams>();
const RootStack = createStackNavigator();
const SetupStack = createStackNavigator<AccountSetupParams>();
const EditorStack = createStackNavigator();

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
      initialRouteName={NavNames.Home}>
      <HomeStack.Screen component={Home} name={NavNames.Home} />
      <HomeStack.Screen component={Profile} name={NavNames.Profile} />
    </HomeStack.Navigator>
  );
}

function SetupScreenStackNavigator() {
  return (
    <SetupStack.Navigator
      initialRouteName={NavNames.AuthScreen}
      screenOptions={screenOptions}>
      <SetupStack.Screen
        component={OnBoardScreen}
        name={NavNames.OnBoardScreen}
      />
      <SetupStack.Screen name={NavNames.AuthScreen} component={AuthScreen} />
      <SetupStack.Screen
        name={NavNames.AccountSetupScreen}
        component={AccountSetupScreen}
      />
    </SetupStack.Navigator>
  );
}

function EditorStackNavigator() {
  return (
    <EditorStack.Navigator initialRouteName={NavNames.Editor}>
      <EditorStack.Screen component={Editor} name={NavNames.Editor} />
    </EditorStack.Navigator>
  );
}

export default function Navigation() {
  const me = useLocalUserProfile();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={RootNavNames.SetupScreen}>
        {me.profile ? (
          <RootStack.Screen
            name={RootNavNames.HomeScreen}
            component={HomeStackNavigator}
          />
        ) : (
          <RootStack.Screen
            name={RootNavNames.SetupScreen}
            component={SetupScreenStackNavigator}
          />
        )}

        <RootStack.Screen
          name={RootNavNames.EditorScreen}
          component={EditorStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
