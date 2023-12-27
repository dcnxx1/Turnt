import TrackPlayer from 'react-native-track-player';
import {useVideoStore} from './store';
import {trackPlayerCapabilities} from './constants';

export const restoreTrackPlayerCapabilities = async () => {
  await TrackPlayer.updateOptions({
    capabilities: trackPlayerCapabilities,
  });
};
export const stopPlaybackTrackPlayerCapabilities = async () => {
  await TrackPlayer.updateOptions({
    capabilities: [],
  });
  useVideoStore.setState({isPlaying: false});
};
