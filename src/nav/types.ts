import { ParamListBase } from "@react-navigation/native";

export enum NavScreenNames {
  HomeScreen = 'HomeScreen',
  EditorScreen = 'EditorScreen',
  ProfileScreen = 'ProfileScreen',
  OnBoardScreen = 'OnBoardScreen',
  AuthScreen = 'AuthScreen',
  AccountSetupScreen = 'AccountSetupScreen',
  FileSelectScreen = 'FileSelectScreen',
}
export type NavNameTypes =
  | 'HomeScreen'
  | 'EditorScreen'
  | 'ProfileScreen'
  | 'OnBoardScreen'
  | 'AuthScreen'
  | 'AccountSetupScreen'
  | 'FileSelectScreen';

  export type RootNavs = 'SetupStack' | 'EditorStack' | 'HomeStack' | 'AuthStack'

export enum RootNavNames {
  SetupStack = 'SetupStack',
  EditorStack = 'EditorStack',
  HomeStack = 'HomeStack',
  AuthStack = 'AuthStack',
}
