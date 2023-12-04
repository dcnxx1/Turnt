import {Role} from '../models/user';

export type AccountSetupParams = {
  OnBoardScreen: undefined;
  AuthScreen: undefined;
  AccountSetupScreen: {
    code: string;
    role: Role;
  };
};
