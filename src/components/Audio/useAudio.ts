import {useCallback, useEffect} from 'react';
import {
  Event,
  Progress,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const Events: Event[] = [Event.RemoteSeek];

export default function useAudio() {
  const progress = useProgress();
  const playbackState = usePlaybackState();

  useTrackPlayerEvents(Events, event => {
    if (event.type === Event.RemoteSeek) {
      const {position} = event;
    }
  });
  

  const onEnd = () => {};

}
