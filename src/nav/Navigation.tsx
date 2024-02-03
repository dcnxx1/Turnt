import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {PaperProvider} from 'react-native-paper';
import Tabbar from '../components/Tabbar/Tabbar';
import {
  Editor,
  FileSelectScreen,
  HomeScreen,
  OnBoardScreen,
  ProfileScreen,
} from '../screens';
import AccountSetupScreen from '../screens/AccountSetup/AccountSetupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import useLocalProfile from '../store/useLocalProfile';
import {AccountSetupParams, EditorParams, HomeParams} from './navparams';
import {NavScreenNames, RootNavNames} from './types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from '@react-native-community/hooks';
import {useLayoutEffect} from 'react';

const HomeStack = createBottomTabNavigator<HomeParams>();
const RootStack = createStackNavigator();
const SetupStack = createStackNavigator<AccountSetupParams>();
const EditorStack = createNativeStackNavigator<EditorParams>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

function SetupScreenStackNavigator() {
  return (
    <SetupStack.Navigator
      initialRouteName={NavScreenNames.OnBoardScreen}
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
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={NavScreenNames.FileSelectScreen}>
      <EditorStack.Screen
        options={{}}
        component={FileSelectScreen}
        name={NavScreenNames.FileSelectScreen}
      />
      <EditorStack.Screen
        options={{}}
        component={Editor}
        name={NavScreenNames.EditorScreen}
      />
    </EditorStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      detachInactiveScreens={false}
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={NavScreenNames.HomeScreen}>
      <HomeStack.Screen
        options={{}}
        component={HomeScreen}
        name={NavScreenNames.HomeScreen}
      />
      <HomeStack.Screen
        component={ProfileScreen}
        name={NavScreenNames.ProfileScreen}
      />
    </HomeStack.Navigator>
  );
}

type Props = {
  initialRoute: string;
};

export default function Navigation({initialRoute}: Props) {
  const me = useLocalProfile();

  return (
    <PaperProvider>
      <RootStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
        }}
        initialRouteName={initialRoute}>
        {me.user?.user_id ? (
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
    </PaperProvider>
  );
}
