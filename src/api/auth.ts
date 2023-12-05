import {Role} from '../models/user';
import {API} from './api';

export default async function findCode(code: string): Promise<
  | {
      code: string;
      role: Role;
    }
  | undefined
> {
  try {
    const codeIdentity = await API.post('/auth/validate', {
      code,
    });
    return codeIdentity.data;
  } catch (err) {
    console.log('ERR POST CODE ', err);
  }
}
