import {NavigationContainer} from '@react-navigation/native';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Home, Welcome, Profile, Editor} from '../screens';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

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
    <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <HomeStack.Screen options={screenOptions} component={Home} name="Home" />
      <HomeStack.Screen
        options={screenOptions}
        component={Profile}
        name="Profile"
      />
    </HomeStack.Navigator>
  );
}

function WelcomeStackNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen component={Welcome} name="Welcome" />
    </WelcomeStack.Navigator>
  );
}

function EditorStackNavigator() {
  return (
    <EditorStack.Navigator initialRouteName="Editor">
      <EditorStack.Screen component={Editor} name="Editor" />
    </EditorStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen
          name="WelcomeScreen"
          component={WelcomeStackNavigator}
        />
        <RootStack.Screen
          options={screenOptions}
          name="HomeScreen"
          component={HomeStackNavigator}
        />
        <RootStack.Screen
          name="EditorScreen"
          component={EditorStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
