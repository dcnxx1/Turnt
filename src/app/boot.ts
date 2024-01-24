import TrackPlayer, {Track} from 'react-native-track-player';
import {API, COVER_KEY, TURN_KEY, queryKey, useCDN} from '../api/api';
import {trackPlayerCapabilities} from '../constants';
import {ITurn} from '../models/turn';
import {Role} from '../models/user';
import {RootNavNames} from '../nav/types';
import storage from '../shared/localStorage';
import useLocalProfile from '../store/useLocalProfile';
import {Profile, getProfile} from '../api/profile';
import {AxiosResponse} from 'axios';
import {useQueryClient} from '@tanstack/react-query';
import {getFeed} from '../api/collection';
export type UserStorage = {
  user_id: string;
  username: string;
  role: Role;
};
const PROGRESS_UPDATE_INTERAL_TRACK_PLAYER = 1000;

export async function setupTrackPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: trackPlayerCapabilities,
      progressUpdateEventInterval: PROGRESS_UPDATE_INTERAL_TRACK_PLAYER,
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
export async function getInitialRoute() {
  const user_id = getUserId();
  if (user_id) {
    RootNavNames.HomeStack;
  }
  return RootNavNames.SetupStack;
}

export function usePrefetchProfile(user_id: string) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [queryKey.profile],
    queryFn: () => getProfile(user_id),
  });
}

export async function usePrefetchFeed() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [queryKey.feed],
    queryFn: getFeed,
  });
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

export async function getRemoteUserProfile(
  user_id: string,
): Promise<Profile | undefined> {
  const profileFetch: AxiosResponse<Profile> = await API.get(
    'profile:' + user_id,
  );
  const profile = profileFetch.data;
  if (profile.user_id) {
    return profile;
  }
}
