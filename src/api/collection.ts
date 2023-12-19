import {ITurn} from '../models/turn';
import {API} from './api';

export async function getCollection(): Promise<ITurn[] | undefined> {
  try {
    const turns = await API.get('content');
    return turns.data;
  } catch (err) {
    console.log('Err occured while trying to fetch content ->>', err);
  }
}
