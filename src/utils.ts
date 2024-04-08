import TrackPlayer, {Track} from 'react-native-track-player';
import {useVideoStore} from './store';
import {trackPlayerCapabilities, TURN_IMPRESSION_TIME} from './constants';
import {COVER_KEY, TURN_KEY, useCDN} from './api/api';
import {ITurn} from './models/turn';
import {IMPRESSION_CLIP_KEY} from './s3';

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

export function turnToTrackMapper(turn: ITurn, isImpression: boolean): Track {
  console.log({duration: isImpression ? TURN_IMPRESSION_TIME : turn.duration});
  return {
    artwork: useCDN(`${COVER_KEY}${turn.cover}`),
    duration: isImpression ? TURN_IMPRESSION_TIME : turn.duration,
    artist: turn.user ? turn.user.alias : 'Artiest',
    url: isImpression
      ? useCDN(IMPRESSION_CLIP_KEY + turn.impressionSource)
      : useCDN(TURN_KEY + turn.source),
    title: turn.title,
  };
}
