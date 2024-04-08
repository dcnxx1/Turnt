import { API } from './api';

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
    return profile.data;
  } catch (err) {
    console.log('Err occured while trying to fetch profile ->>', err);
  }
}
