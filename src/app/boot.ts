import {useQuery, useQueryClient} from '@tanstack/react-query';
import TrackPlayer, {Track} from 'react-native-track-player';
import {getFeed} from '../api/collection';
import {trackPlayerCapabilities} from '../constants';
import {Role} from '../models/user';
import {RootNavNames} from '../nav/types';
import storage from '../shared/localStorage';
import useLocalProfile from '../store/useLocalProfile';
import {ITurn} from '../models/turn';
import {COVER_KEY, TURN_KEY, useCDN} from '../api/api';
export type UserStorage = {
  user_id: string;
  username: string;
  role: Role;
};
export async function setupTrackPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: trackPlayerCapabilities,
    });
  } catch (err) {
    throw new Error('ERR SETUP TRACK PLAYER ' + err);
  }
}

export async function addTrackPlayerTracks(tracks: Track[]) {
  try {
    await TrackPlayer.add(tracks);
  } catch (err) {
    throw new Error('ERR LOAD TRACKS :>> ' + err);
  }
}

export function setLocalUserProfile(user: UserStorage) {
  const _user = JSON.stringify(user);
  storage.set('user', _user);
  const savedUser = getLocalUserProfile();
  useLocalProfile.setState({user: savedUser});
}

export function getLocalUserProfile() {
  const user = storage.getString('user');
  if (user) {
    const parsedUser: UserStorage = JSON.parse(user);
    useLocalProfile.setState({user: parsedUser});
    console.log({parsedUser});
    return parsedUser;
  }
}

export function removeLocalUserProfile() {
  storage.delete('user');
  useLocalProfile.setState({user: undefined});
}

export function setIntialRoute():
  | RootNavNames.SetupStack
  | RootNavNames.HomeStack {
  const user = useLocalProfile.getState().user;

  if (user?.user_id) {
    return RootNavNames.HomeStack;
  }
  return RootNavNames.SetupStack;
}

export function turnArrayToTracksMapper(turns: ITurn[]): Track[] {
  return turns.map(turn => {
    return {
      artwork: useCDN(`${COVER_KEY}${turn.cover}`),
      duration: turn.duration,
      artist: turn.user ? turn.user.alias : 'Artiest',
      url: useCDN(TURN_KEY + turn.source),
      title: turn.title,
    };
  });
}
