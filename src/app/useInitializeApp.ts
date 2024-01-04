import {useEffect, useState} from 'react';
import {
  getInitialRoute,
  getLocalUserProfile,
  setupTrackPlayer,
  addTrackPlayerTracks,
  prefetchProfile,
  usePrefetchUserContent,
} from './boot';
import {useQueryClient} from '@tanstack/react-query';
import {getFeed} from '../api/collection';
import {ITurn} from '../models/turn';
import {useActiveTurnStore} from '../store';

export default function useInitalizeApp(): [boolean, string] {
  const [isInitializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');
  const {setActiveTurn} = useActiveTurnStore();
  const queryClient = useQueryClient();
  usePrefetchUserContent();
  
  async function initialize() {
    try {
      getLocalUserProfile();
      setInitialRoute(getInitialRoute());
      await setupTrackPlayer();
      await prefetchProfile();
      const userFeed: ITurn[] | undefined = queryClient.getQueryData(['feed']);
      if (userFeed) {
        setActiveTurn(userFeed[0]);
        addTrackPlayerTracks(userFeed);
      }
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
