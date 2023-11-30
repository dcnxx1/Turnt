import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from 'react-native-paper/react-navigation';
import {Editor, Home, Profile, Welcome} from '../screens';
import {NavNames, RootNavNames} from './types';

const HomeStack = createMaterialBottomTabNavigator();
const RootStack = createStackNavigator();
const WelcomeStack = createStackNavigator();
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

function WelcomeStackNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen component={Welcome} name={NavNames.Welcome} />
    </WelcomeStack.Navigator>
  );
}

function EditorStackNavigator() {
  return (
    <EditorStack.Navigator initialRouteName={NavNames.Editor}>
      <EditorStack.Screen
        options={{detachPreviousScreen: true}}
        component={Editor}
        name={NavNames.Editor}
      />
    </EditorStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={RootNavNames.WelcomeScreen}>
        <RootStack.Screen
          name={RootNavNames.WelcomeScreen}
          component={WelcomeStackNavigator}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
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
