import { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import TrackPlayer, {
  Event,
  Progress,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import ImageBlurBackground from '../Images/ImageBlurBackground';

export type AudioPlayerProps = {
  source: {uri: string};
  onProgress?: (progress: Progress) => void;
  onEnd: () => void;
  paused: boolean;
};

type AudioPlayerEvents = {
  seek: (seekTo: number) => Promise<void>;
};

const events: Event[] = [
  Event.RemoteSeek,
  Event.PlaybackProgressUpdated,
  Event.PlaybackError,
];

const AudioPlayer = ({source, paused, onProgress, onEnd}: AudioPlayerProps) => {
  const playbackState = usePlaybackState();
  const progress = useProgress(1000);

  useEffect(() => {
    
    async function handlePaused() {
      try {
        if (paused) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      } catch (err) {
        console.log('ERR WHILE SET HANDLE PAUSED :>', err);
      }
    }
    handlePaused();
  }, [paused]);

  useEffect(() => {
    console.log(progress.position, progress.duration);
    if (progress.position > progress.duration) {
      onEnd();
      return;
    }
    if (onProgress) {
      onProgress(progress);
    }
  }, [progress]);

  const seek = useCallback(async (position: number) => {
    await TrackPlayer.seekTo(position);
  }, []);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.RemoteSeek) {
      seek(event.position);
    }
  });
  return <ImageBlurBackground source={source} style={Style.imageContainer} />;
};

export default AudioPlayer;

const Style = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height,
    width: '100%',
  },
});
