import {useEffect, useState} from 'react';
import {
  setIntialRoute as initialRouteSetter,
  getLocalUserProfile,
  setupTrackPlayer,
} from './boot';

export default function useInitalizeApp(): [boolean, string] {
  const [isInitializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');
  
  async function initialize() {
    getLocalUserProfile();
    setInitialRoute(initialRouteSetter());
    await setupTrackPlayer();

    try {
    } catch (err) {
      setInitializing(false);
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
