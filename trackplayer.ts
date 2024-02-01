import TrackPlayer, {Event, RemoteSeekEvent} from 'react-native-track-player';
import store from './src/redux/store';
import {decrement, increment, setIsPlaying} from './src/redux/videoListSlice';
import {useSeek, useVideoStore} from './src/store';

const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log(Event.RemotePlay);
 
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log(Event.RemotePause);


  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log(Event.RemoteNext);

 
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log(Event.RemotePrevious);


  });
  TrackPlayer.addEventListener(
    Event.RemoteSeek,
    async (event: RemoteSeekEvent) => {
      console.log(Event.RemoteSeek);

      const {position} = event;

      useVideoStore.setState({progress: position});
      useSeek.setState({seekTo: position});
    },
  );
  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log(Event.RemoteStop);
 
  });
};

export default PlaybackService;
