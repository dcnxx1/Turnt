import TrackPlayer, {Event, RemoteSeekEvent} from 'react-native-track-player';
import store from './src/redux/store';
import {decrement, increment, setIsPlaying} from './src/redux/videoListSlice';
import {useSeek, useVideoStore} from './src/store';

const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    store.dispatch(setIsPlaying(true));
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    store.dispatch(setIsPlaying(false));
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    store.dispatch(increment());
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    store.dispatch(decrement());
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, (event: RemoteSeekEvent) => {
    const {position} = event;
    useSeek.setState({seekTo: ~~position});
  });
};

export default PlaybackService;
