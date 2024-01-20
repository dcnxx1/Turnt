import {ITurn} from '../models/turn';
import {API} from './api';
import {getPlaylistWithUserId} from './playlist';

export default async function getMyUploadsByUserId(
  user_id: string,
): Promise<ITurn[] | undefined> {
  try {
    const {data} = await API.get(`profile/myUploads/${user_id}`);
    return data;
  } catch (err) {
    console.log('ERR GET MYUPLOADS :>>', err);
  }
}
