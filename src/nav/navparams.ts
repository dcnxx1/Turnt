import {FileType} from '../models/turn';
import {Role} from '../models/user';

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
};

export type EditorParams = {
  EditorStack: undefined;
  FileSelectScreen: undefined;
  EditorScreen: {
    filePath: string;
    duration: number | null ;
    fileType: FileType;
    mime: string,
  };
};
