import {NavigationContainer} from '@react-navigation/native';

import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Editor, Home, OnBoardScreen, Profile} from '../screens';
import AccountSetupScreen from '../screens/AccountSetup/AccountSetupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import {AccountSetupParams} from './navparams';
import {NavNames, RootNavNames} from './types';

const HomeStack = createMaterialBottomTabNavigator();
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
      screenOptions={screenOptions}
      initialRouteName={NavNames.Home}>
      <HomeStack.Screen
        options={screenOptions}
        component={Home}
        name={NavNames.Home}
      />
      <HomeStack.Screen
        options={screenOptions}
        component={Profile}
        name={NavNames.Profile}
      />
    </HomeStack.Navigator>
  );
}

function SetupScreenStackNavigator() {
  return (
    <SetupStack.Navigator
      initialRouteName={NavNames.AccountSetupScreen}
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
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={RootNavNames.SetupScreen}>
        <RootStack.Screen
          name={RootNavNames.SetupScreen}
          component={SetupScreenStackNavigator}
        />
        <RootStack.Screen
          name={RootNavNames.HomeScreen}
          component={HomeStackNavigator}
        />
        <RootStack.Screen
          name={RootNavNames.EditoScreen}
          component={EditorStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
