import TrackPlayer, { Track } from 'react-native-track-player';
import {useVideoStore} from './store';
import {trackPlayerCapabilities} from './constants';
import {COVER_KEY, TURN_KEY, useCDN} from './api/api';
import { ITurn } from './models/turn';

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

export function turnToTrackMapper(turn: ITurn): Track {
  return {
    artwork: useCDN(`${COVER_KEY}${turn.cover}`),
    duration: turn.duration,
    artist: turn.user ? turn.user.alias : 'Artiest',
    url: useCDN(TURN_KEY + turn.source),
    title: turn.title,
  };
}
