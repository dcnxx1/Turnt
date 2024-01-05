import {useQueryClient} from '@tanstack/react-query';
import {DependencyList, useEffect, useState} from 'react';
import {ITurn} from '../models/turn';
import {useActiveTurnStore} from '../store';
import {
  addTrackPlayerTracks,
  getInitialRoute,
  getLocalUserProfile,
  setupTrackPlayer,
} from './boot';
import {getProfile} from '../api/profile';
import {getFeed} from '../api/collection';
import {queryKey} from '../api/api';
import {RootNavNames, RootNavs} from '../nav/types';
import {getPlaylistWithUserId} from '../api/playlist';

export default function useInitalizeApp(): [boolean, string | undefined] {
  const [isInitializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState<RootNavs>();
  const queryClient = useQueryClient();

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
        const fetchFeed = await getFeed();
        const cachedFeed: ITurn[] | undefined = queryClient.setQueryData(
          [queryKey.feed],
          fetchFeed,
        );
        if (cachedFeed) {
          console.log('user feed exists :>>', cachedFeed.length);
          useActiveTurnStore.getState().setActiveTurn(cachedFeed[0]);
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
