import {Role} from '../models/user';
import {API} from './api';

export type Profile = {
  avatar: string;
  user_id: string;
  alias: string;
};

export async function getProfile(
  user_id: string,
): Promise<Profile | undefined> {
  try {
    const profile = await API.get<Profile>(`profile/${user_id}`);
    console.log('returning ->>', profile.data);
    return profile.data;
  } catch (err) {
    console.log('Err occured while trying to fetch profile ->>', err);
  }
}
