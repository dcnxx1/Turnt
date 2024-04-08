import {ITurn} from '../models/turn';
import {API} from './api';
import {logger} from 'react-native-logs';

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',

  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};
const log = logger.createLogger(defaultConfig);

export async function getPlaylistByUserId(
  user_id: string,
): Promise<ITurn[] | undefined> {
  try {
    const playlistData = await API.get(`profile/playlist/${user_id}`);

    return playlistData.data;
  } catch (err) {
    log.error('ERR GET PLAYLIST :>>', err);
  }
}
