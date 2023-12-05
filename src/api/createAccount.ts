import {AccountSetupScreenFormData} from '../screens/AccountSetup/AccountSetupScreenForm';
import {API} from './api';
import {uploadProfilePic} from '../s3';
import {Role} from '../models/user';
export async function createAccount(
  props: AccountSetupScreenFormData,
  role: Role,
  code: string,
) {
  try {
    const key = await uploadProfilePic(props.profilePicPath, props.username);
    if (key) {
      return await API.post('/setup', {
        profilePicS3Key: key,
        username: props.username,
        role,
        code,
        dob: props.dateOfBirth.toLocaleDateString(),
        location: props.location
      });
    }
  } catch (err) {
    console.log('ERR CREATE ACCOUNT :>>', err);
  }
}
