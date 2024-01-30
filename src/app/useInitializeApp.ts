import {useQueryClient} from '@tanstack/react-query';
import {DependencyList, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {queryKey} from '../api/api';
import {getFeed} from '../api/collection';
import {getPlaylistByUserId} from '../api/playlist';
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
import {setActiveTurn, setActiveVideo} from '../redux/videoListSlice';

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
        await queryClient.prefetchQuery({
          queryKey: [queryKey.profile],
          queryFn: () => getProfile(me.user_id),
        });
        await queryClient.prefetchQuery({
          queryKey: [queryKey.playlist],
          queryFn: () => getPlaylistByUserId(me.user_id),
        });

        await queryClient.prefetchQuery({
          queryKey: [queryKey.myUploads],
          queryFn: () => getMyUploadsByUserId(me.user_id),
        });
        await queryClient.prefetchQuery({
          queryKey: [queryKey.playlistSheet],
          queryFn: () => getPlaylistByUserId(me.user_id),
        });
        const feed = await queryClient.fetchQuery({
          queryKey: [queryKey.feed],
          queryFn: getFeed,
        });

        if (feed) {
          const firstActiveTurn = feed[0];
          useActiveTurnStore.getState().setActiveTurn(firstActiveTurn);

          dispatch(
            setActiveVideo({
              turn_id: firstActiveTurn.turn_id,
              duration: firstActiveTurn.duration,
            }),
          );
          addTrackPlayerTracks(feed);
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
