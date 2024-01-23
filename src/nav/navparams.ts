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
  HomeScreen: undefined;
};

export type HomeParams = {
  HomeScreen: undefined;
  Home: undefined;
  ProfileScreen: undefined;
  EditorStack: undefined;
};

export type EditorParams = {
  EditorStack: undefined;
  FileSelectScreen: undefined;
  EditorScreen: {
    filePath: string;
    duration: number | null;
    fileType: FileType;
    mime: string;
    defaultCoverColor: VideoCoverColor;
  };
  HomeStack: undefined;
};
