import {Role} from '../models/user';
import {API} from './api';

export default async function validateCode(code: string): Promise<
  | {
      code: string;
      role: Role;
    }
  | undefined
> {
  try {
    return await API.post('/auth/validate', {
      code,
    });
  } catch (err) {
    console.log('ERR POST CODE ', err);
  }
}
