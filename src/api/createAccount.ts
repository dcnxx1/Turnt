import {API} from './api';
import {uploadProfilePic} from '../s3';
import {Role} from '../models/user';
import {TCreateAccountFields} from '../screens/AccountSetup/AccountSetupForm';

type CreateAccountRequest = {
  fieldValues: TCreateAccountFields;
  role: Role;
  code: string;
};

export async function createAccount({
  fieldValues,
  role,
  code,
}: CreateAccountRequest): Promise<
  | {
      username: string;
      user_id: string;
      role: Role;
    }
  | undefined
> {
  const dateToLocaleDateString =
    fieldValues.birthday.toLocaleDateString('en-GB');

  try {
    const key = await uploadProfilePic(
      fieldValues.avatar,
      fieldValues.username,
    );
    if (key) {
      const createdUserResponse = await API.post('/setup', {
        avatar: key,
        username: fieldValues.username,
        role,
        code,
        birthday: JSON.stringify(dateToLocaleDateString),
      });
      return createdUserResponse.data;
    }
  } catch (err) {
    console.log('ERR CREATE ACCOUNT :>>', err);
  }
}
