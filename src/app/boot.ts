import {useQuery, useQueryClient} from '@tanstack/react-query';
import TrackPlayer, {Track} from 'react-native-track-player';
import {getFeed} from '../api/collection';
import {trackPlayerCapabilities} from '../constants';
import {Role} from '../models/user';
import {RootNavNames} from '../nav/types';
import storage from '../shared/localStorage';
import useLocalProfile from '../store/useLocalProfile';
import {ITurn} from '../models/turn';
import {COVER_KEY, TURN_KEY, queryKey, useCDN} from '../api/api';
import {getProfile} from '../api/profile';
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

export async function addTrackPlayerTracks(turns: ITurn[]) {
  const _tracks = turnArrayToTracksMapper(turns);
  try {
    await TrackPlayer.add(_tracks);
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

export function getInitialRoute():
  | RootNavNames.SetupStack
  | RootNavNames.HomeStack {
  const user = useLocalProfile.getState().user;

  if (user?.user_id) {
    return RootNavNames.HomeStack;
  }
  return RootNavNames.SetupStack;
}

export function getUserId() {
  const user = useLocalProfile.getState().user;
  if (user?.user_id) {
    return user.user_id;
  }
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

export async function prefetchProfile() {
  const queryClient = useQueryClient();
  const user_id = getUserId();
  queryClient.prefetchQuery({
    queryKey: [queryKey.profile],
    queryFn: () => (user_id ? getProfile(user_id) : undefined),
  });
}

export async function prefetchPlaylist() {
  const queryClient = useQueryClient();
  const playlist = queryClient.prefetchQuery({queryKey: [queryKey.playlist]});
}

export function usePrefetchUserContent() {
  const queryClient = useQueryClient();
  const me = getLocalUserProfile();

  queryClient.prefetchQuery({queryKey: [queryKey.feed], queryFn: getFeed});
  queryClient.prefetchQuery({
    queryKey: [queryKey.profile],
    queryFn: () => (me?.user_id ? getProfile(me?.user_id) : undefined),
  });
}
