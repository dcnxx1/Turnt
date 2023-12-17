import {NavigationContainer} from '@react-navigation/native';

import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Editor, Home, OnBoardScreen, Profile} from '../screens';
import AccountSetupScreen from '../screens/AccountSetup/AccountSetupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import {AccountSetupParams, HomeParams} from './navparams';
import {NavNames, RootNavNames} from './types';
import useLocalUserProfile from '../shared/hooks/useLocalUserProfile';
import theme from '../theme';

const HomeStack = createMaterialBottomTabNavigator<HomeParams>();
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
      barStyle={{
        height: '10%',
        backgroundColor: theme.color.turnerDark,
      }}
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
