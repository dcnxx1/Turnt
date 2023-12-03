import {API} from './api';

export default async function validateCode(code: string) {
  try {
    return await API.get('/auth/validate', {
      params: {
        code,
      },
    });
  } catch (err) {
    console.log('ERR POST CODE ', err);
  }
}
