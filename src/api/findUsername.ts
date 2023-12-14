import {API} from './api';

export default async function findUsername(
  username: string,
): Promise<boolean | undefined> {
  try {
    const response = await API.get(`setup/find/${username}`);
    return response.data;
  } catch (err) {
    console.log('ERR GET username ->>', err);
  }
}
