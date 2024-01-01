import {useEffect, useState} from 'react';
import {
  setIntialRoute as initialRouteSetter,
  getLocalUserProfile,
  setupTrackPlayer,
  addTrackPlayerTracks,
} from './boot';
import {useQueryClient} from '@tanstack/react-query';
import {getFeed} from '../api/collection';
import {ITurn} from '../models/turn';
import {useActiveTurnStore} from '../store';

export default function useInitalizeApp(): [boolean, string] {
  const [isInitializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');
  const queryClient = useQueryClient();
  const {setActiveTurn} = useActiveTurnStore();
  queryClient.prefetchQuery({queryKey: ['feed'], queryFn: getFeed});

  async function initialize() {
    try {
      getLocalUserProfile();
      setInitialRoute(initialRouteSetter());
      await setupTrackPlayer();
      const cachedData: ITurn[] | undefined = queryClient.getQueryData([
        'feed',
      ]);
      if (cachedData) {
        setActiveTurn(cachedData[0]);
        addTrackPlayerTracks(cachedData);
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
