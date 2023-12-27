import TrackPlayer, {Event, RemoteSeekEvent} from 'react-native-track-player';
import {useSeek, useVideoStore} from './src/store';

const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    useVideoStore.setState({isPlaying: true});
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    useVideoStore.setState({isPlaying: false});
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, (event: RemoteSeekEvent) => {
    const {position} = event;
    console.log('To position :>>', position);
    useSeek.setState({seekTo: position});
  });
};

export default PlaybackService;
