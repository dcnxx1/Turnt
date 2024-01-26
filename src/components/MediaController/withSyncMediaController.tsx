import {useEffect, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Video, {OnProgressData} from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {useCDN} from '../../api/api';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import {
  increment,
  setIsPlaying,
  togglePlaying,
} from '../../redux/videoListSlice';
import {COVER_KEY, TURN_KEY} from '../../s3';
import {useSeek, useVideoStore} from '../../store';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import VideoPausedOverlay from '../Screen/VideoPausedOverlay';
import {VideoPlayerProps} from '../Video/VideoPlayer';

const TrackPlayerEvents: Event[] = [Event.RemoteSeek];

export default function withSyncMediaController(
  VideoPlayer: React.ForwardRefExoticComponent<
    VideoPlayerProps & React.RefAttributes<Video>
  >,
) {
  return ({
    source,
    videoId,
    id,
    type,
    cover,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    videoId: ITurn['turn_id'];
    id: 'playlistSlice' | 'homeSlice';
    type: ITurn['type'];
    cover: ITurn['cover'];
  }) => {
    const ref = useRef<Video>(null);
    const activeTurn = useSelector((state: RootState) => state[id].activeTurn);
    const isVideoOnScreen = activeTurn.turn_id === videoId;
    const isPlaying = useSelector((state: RootState) => state[id].isPlaying);
    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const dispatch = useDispatch();

    useEffect(() => {
      if (ref.current) {
        ref.current.seek(seekTo);
      }
    }, [seekTo, ref]);

    useEffect(() => {
      if (isVideoOnScreen && !isPlaying) {
        dispatch(setIsPlaying(true));
      }
      setProgress(0);
      setSeekTo(0);
    }, [isVideoOnScreen]);

    const onProgress = async ({currentTime}: OnProgressData) => {
      if (isSeeking) return;
      setProgress(currentTime);
      await TrackPlayer.seekTo(currentTime);
    };

    useTrackPlayerEvents(TrackPlayerEvents, ev => {
      if (ev.type === Event.RemoteSeek) {
        ref.current?.seek(ev.position);
        setProgress(ev.position);
      }
    });

    const onPressScreen = () => {
      dispatch(togglePlaying());
    };

    const onEnd = () => {
      const progress = useVideoStore.getState().progress;
      if (progress >= activeTurn.duration) {
        dispatch(increment());
      }
    };

    return (
      <VideoPausedOverlay
        paused={activeTurn.turn_id === videoId && !isPlaying}
        onPress={onPressScreen}>
        <View
          style={{
            position: 'relative',
          }}>
          {type === 'Audio' ? (
            <ImageBlurBackground
              source={{uri: useCDN(COVER_KEY + cover)}}
              style={{
                position: 'absolute',
                height: Dimensions.get('screen').height,
              }}
            />
          ) : null}
          <VideoPlayer
            ref={ref}
            onEnd={activeTurn.turn_id === videoId ? onEnd : undefined}
            onProgress={activeTurn.turn_id === videoId ? onProgress : undefined}
            source={useCDN(TURN_KEY + source)}
            paused={activeTurn.turn_id === videoId ? !isPlaying : true}
            style={{
              height: type !== 'Audio' ? Dimensions.get('screen').height : 0,
              width: '100%',
            }}
          />
        </View>
      </VideoPausedOverlay>
    );
  };
}
