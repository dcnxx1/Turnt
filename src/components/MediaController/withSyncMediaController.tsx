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

import {COVER_KEY, TURN_KEY} from '../../s3';
import {useSeek, useVideoStore} from '../../store';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import VideoPausedOverlay from '../Screen/VideoPausedOverlay';
import {VideoPlayerProps} from '../Video/VideoPlayer';
import {setPosition} from '../../redux/playlistSheetSlice';
import useActiveSlice from '../../redux/useActiveSlice';

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
    impressionSource,
    impressionStartAt,
    cover,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    videoId: ITurn['turn_id'];
    impressionSource: ITurn['impressionSource'];
    impressionStartAt: ITurn['impressionStartAt'];
    id: 'playlistVideoSlice' | 'homeVideoSlice';
    type: ITurn['type'];
    cover: ITurn['cover'];
  }) => {
    const ref = useRef<Video>(null);
    const activeVideoId = useSelector(
      (state: RootState) => state[id].activeVideo,
    );
    const isPlaying = useSelector((state: RootState) => state[id].isPlaying);
    const isVideoOnScreen = videoId === activeVideoId.video_id;
    useEffect(() => {
      isVideoOnScreen && console.log({isVideoOnScreen});
    }, [isVideoOnScreen]);

    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const dispatch = useDispatch();

    useEffect(() => {
      if (ref.current) {
        isVideoOnScreen && ref.current.seek(seekTo);
      }
    }, [seekTo, ref, isVideoOnScreen]);

    useEffect(() => {
      setProgress(0);
      setSeekTo(0);
    }, []);

    const onProgress = async ({currentTime}: OnProgressData) => {
      if (isSeeking) return;
      setProgress(currentTime);
      await TrackPlayer.seekTo(currentTime);
    };
    isVideoOnScreen && console.log({isVideoOnScreen, videoId});
    useTrackPlayerEvents(TrackPlayerEvents, ev => {
      if (ev.type === Event.RemoteSeek) {
        ref.current?.seek(ev.position);
        setProgress(ev.position);
      }
    });

    const onEnd = () => {
      const progress = useVideoStore.getState().progress;
    };

    return (
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
          onProgress={onProgress}
          paused={videoId === activeVideoId.video_id ? isPlaying : true}
          source={useCDN(TURN_KEY + source)}
          style={{
            height: type !== 'Audio' ? Dimensions.get('screen').height : 0,
            width: '100%',
          }}
        />
      </View>
    );
  };
}
