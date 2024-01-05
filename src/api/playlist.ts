import {ITurn} from '../models/turn';
import {API} from './api';

export async function getPlaylistWithUserId(
  user_id: string,
): Promise<ITurn[] | undefined> {
  try {
    const playlistData = await API.get(`profile/playlist/${user_id}`);
    return playlistData.data;
  } catch (err) {
    console.log('ERR GET PLAYLIST :>>', err);
  }
}
