import {ITurn} from '../models/turn';
import {API} from './api';
import {getPlaylistWithUserId} from './playlist';

export default async function getMyUploadsByUserId(
  user_id: string,
): Promise<ITurn[] | undefined> {
  try {
    const myUploads = (await API.get(`profile/myUploads/${user_id}`)).data;

    return myUploads;
  } catch (err) {
    console.log('ERR GET MYUPLOADS :>>', err);
  }
}
