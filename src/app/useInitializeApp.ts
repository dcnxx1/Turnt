import {useQueryClient} from '@tanstack/react-query';
import {DependencyList, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {queryKey} from '../api/api';
import {getFeed} from '../api/collection';
import {getPlaylistWithUserId} from '../api/playlist';
import {getProfile} from '../api/profile';
import {ITurn} from '../models/turn';
import {RootNavs} from '../nav/types';
import {useActiveTurnStore} from '../store';
import {
  addTrackPlayerTracks,
  getLocalUserProfile,
  setupTrackPlayer,
} from './boot';
import getMyUploadsByUserId from '../api/myUploads';
import {setActiveTurn} from '../redux/videoListSlice';

export default function useInitalizeApp(): [boolean, string | undefined] {
  const queryClient = useQueryClient();
  const [isInitializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState<RootNavs>();

  const dispatch = useDispatch();
  async function initialize() {
    try {
      const me = getLocalUserProfile();
      if (me) {
        await setupTrackPlayer();
        queryClient.prefetchQuery({
          queryKey: [queryKey.profile],
          queryFn: () => getProfile(me.user_id),
        });
        queryClient.prefetchQuery({
          queryKey: [queryKey.playlist],
          queryFn: () => getPlaylistWithUserId(me.user_id),
        });

        queryClient.prefetchQuery({
          queryKey: [queryKey.myUploads],
          queryFn: () => getMyUploadsByUserId(me.user_id),
        });
        queryClient.prefetchQuery({
          queryKey: [queryKey.playlistSheet],
          queryFn: () => getPlaylistWithUserId(me.user_id),
        });
        const fetchFeed = await getFeed();
        const cachedFeed: ITurn[] | undefined = queryClient.setQueryData(
          [queryKey.feed],
          fetchFeed,
        );
        if (cachedFeed) {
          const firstActiveTurn = cachedFeed[0];
          useActiveTurnStore.getState().setActiveTurn(firstActiveTurn);
          dispatch(setActiveTurn(firstActiveTurn));
          addTrackPlayerTracks(cachedFeed);
        }
        setInitialRoute('HomeStack');
        return;
      }
      setInitialRoute('SetupStack');
    } catch (err) {
      console.log('ERR initializing app :>>', err);
    } finally {
      setInitializing(false);
    }
  }

  useEffect(() => {
    async function initializeApp() {
      await initialize();
    }
    initializeApp();
  }, []);
  return [isInitializing, initialRoute];
}

export function useInitialize(promise: () => unknown, deps?: DependencyList) {
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function initialize() {
      try {
        promise();
      } catch (e) {
        setError(e);
      }
    }
    initialize();
  }, deps ?? []);

  if (error) {
    throw error;
  }
}
