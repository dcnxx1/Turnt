import {API} from './api';
import {uploadProfilePic} from '../s3';
import {Role} from '../models/user';
import {ValidationSchema} from '../screens/AccountSetup/AccountSetupForm';

type CreateAccountRequest = {
  fieldValues: ValidationSchema;
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
  try {
    const key = await uploadProfilePic(
      fieldValues.avatar,
      fieldValues.username,
    );
    if (key) {
      return await API.post('/setup', {
        avatar: key,
        username: fieldValues.username,
        role,
        code,
        dob: fieldValues.birthday.toLocaleDateString(),
      });
    }
  } catch (err) {
    console.log('ERR CREATE ACCOUNT :>>', err);
  }
}
