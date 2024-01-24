import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {ITurn} from '../../models/turn';
import {useVideoStore} from '../../store';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import {setPosition} from '../../redux/playlistSheetSlice';

export type AudioPlayerProps = {
  id: ITurn['turn_id'];
  source: {uri: string};
  onProgress: (progress: number) => void;
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

const AudioPlayer = forwardRef(
  ({source, paused, onProgress}: AudioPlayerProps, ref) => {
    const [progress, setProgress] = useState(0);
    const playbackState = usePlaybackState();
    const {duration, position} = useProgress(1000);

    useEffect(() => {
      async function handlePaused() {
        try {
          if (paused) {
            await TrackPlayer.stop();
          } else {
            await TrackPlayer.play();
          }
        } catch (err) {
          console.log('ERR WHILE SET HANDLE PAUSED :>', err);
        }
      }
      handlePaused();
    }, [paused]);

    const seek = useCallback(async (seekTo: number) => {
      await TrackPlayer.seekTo(seekTo);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        seek;
      },
      [seek],
    );

    useTrackPlayerEvents(events, ev => {
      if (ev.type === Event.PlaybackProgressUpdated) {
        setProgress(ev.position);
        onProgress(ev.position);
      }
    });
    useEffect(() => {
      onProgress(position);
    }, [position]);
    return <ImageBlurBackground source={source} style={Style.imageContainer} />;
  },
);

export default AudioPlayer;

const Style = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height,
    width: '100%',
    borderWidth: 2,
    borderColor: 'orange',
  },
});
