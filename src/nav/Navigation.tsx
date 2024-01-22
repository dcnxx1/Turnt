import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {PaperProvider} from 'react-native-paper';
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
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import useLocalProfile from '../store/useLocalProfile';
import {AccountSetupParams, EditorParams, HomeParams} from './navparams';
import {NavScreenNames, RootNavNames} from './types';

const MaterialHomeStack = createMaterialBottomTabNavigator<HomeParams>();
const HomeStack = createBottomTabNavigator<HomeParams>();
const RootStack = createStackNavigator();
const SetupStack = createStackNavigator<AccountSetupParams>();
const EditorStack = createStackNavigator<EditorParams>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function HomeStackNavigator() {
  return (
    <MaterialHomeStack.Navigator
      tabBar={(props: any) => <Tabbar {...props} />}
      screenOptions={
        {
          // headerShown: false,
        }
      }
      initialRouteName={NavScreenNames.HomeScreen}>
      <MaterialHomeStack.Screen
        component={Home}
        name={NavScreenNames.HomeScreen}
      />
      <MaterialHomeStack.Screen
        component={Profile}
        name={NavScreenNames.ProfileScreen}
      />
    </MaterialHomeStack.Navigator>
  );
}

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

type Props = {
  initialRoute: string;
};

export default function Navigation({initialRoute}: Props) {
  const me = useLocalProfile();

  return (
    <PaperProvider>
      <RootStack.Navigator
        screenOptions={screenOptions}
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
