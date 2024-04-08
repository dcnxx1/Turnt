import {useCallback, useEffect, useMemo, useRef} from 'react';
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
  setActiveSlice,
  setActiveVideo,
  setIsPlaying,
  togglePlaying,
} from '../../redux/videoListSlice';
import {COVER_KEY, IMPRESSION_CLIP_KEY, TURN_KEY} from '../../s3';
import {useSeek, useVideoStore} from '../../store';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import VideoPausedOverlay from '../Screen/VideoPausedOverlay';
import {VideoPlayerProps} from '../Video/VideoPlayer';
import {setPosition} from '../../redux/playlistSheetSlice';
import {TURN_IMPRESSION_TIME} from '../../constants';
import theme from '../../theme';

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
    impressionSource,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    videoId: ITurn['turn_id'];
    id: 'playlistSlice' | 'homeSlice';
    type: ITurn['type'];
    cover: ITurn['cover'];
    impressionSource: ITurn['impressionSource'];
  }) => {
    const ref = useRef<Video>(null);

    const {activeVideoId, duration} = useSelector(
      (state: RootState) => state[id],
    );
    const isVideoOnScreen = activeVideoId === videoId;
    const isPlaying = useSelector((state: RootState) => state[id].isPlaying);
    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const dispatch = useDispatch();
    const homeSlice = useSelector((state: RootState) => state.homeSlice);

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

    const onPressVideoPausedOverlay = () => {
      if (id === 'homeSlice') {
        if (homeSlice.isActive === false) {
          dispatch(setActiveSlice('homeSlice'));
          dispatch(setPosition('Hidden'));
          dispatch(
            setActiveVideo({
              turn_id: activeVideoId,
              duration,
            }),
          );
          dispatch(togglePlaying());
        }
      }
      dispatch(togglePlaying());
    };

    const onEnd = useCallback(() => {
      const progress = useVideoStore.getState().progress;
      if (homeSlice.isActive && homeSlice.isImpression) {
        if (progress + 1 >= TURN_IMPRESSION_TIME) {
          dispatch(increment());
        }
      }
      if (progress >= duration) {
        dispatch(increment());
      }
    }, [homeSlice.isImpression, homeSlice.isActive, dispatch]);

    const playFromSource = useMemo(() => {
      return homeSlice.isActive
        ? homeSlice.isImpression
          ? useCDN(IMPRESSION_CLIP_KEY + impressionSource)
          : useCDN(TURN_KEY + source)
        : useCDN(TURN_KEY + source);
    }, [activeVideoId, videoId, homeSlice.isImpression, homeSlice.isActive]);

    return (
      <VideoPausedOverlay
        paused={activeVideoId === videoId && !isPlaying}
        onPress={onPressVideoPausedOverlay}>
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
            onEnd={activeVideoId === videoId ? onEnd : undefined}
            onProgress={activeVideoId === videoId ? onProgress : undefined}
            source={playFromSource}
            paused={activeVideoId === videoId ? !isPlaying : true}
            style={{
              height: type !== 'Audio' ? Dimensions.get('screen').height : 0,
              width: '100%',
              backgroundColor: theme.color.turnerDark,
            }}
          />
        </View>
      </VideoPausedOverlay>
    );
  };
}
