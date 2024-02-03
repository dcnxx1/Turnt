import {FileType, ITurn} from '../models/turn';
import {Role} from '../models/user';
import {VideoCoverColor} from '../screens/Editor/utils';

export type AccountSetupParams = {
  OnBoardScreen: undefined;
  AuthScreen: undefined;
  AccountSetupScreen: {
    code: string;
    role: Role;
  };
};

export type HomeParams = {
  HomeScreen: undefined;
  Home: undefined;
  ProfileScreen: undefined;
  EditorStack: undefined;
};

export type RootParams = {
  SetupStack: undefined;
  EditorStack: undefined;
  HomeStack: undefined;
  AuthStack: undefined;
};

export type EditorParams = {
  FileSelectScreen: {
    activeSlice: 'playlistSlice' | 'homeSlice';
  };
  EditorScreen: {
    filePath: string;
    duration: number | null;
    fileType: FileType;
    mime: string;
    defaultCoverColor: VideoCoverColor;
  };

  HomeScreen: undefined;
};
