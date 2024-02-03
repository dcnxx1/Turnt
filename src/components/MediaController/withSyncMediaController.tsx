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

    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const dispatch = useDispatch();

    useEffect(() => {
      if (ref.current) {
        ref.current.seek(seekTo);
      }
    }, [seekTo, ref]);

    useEffect(() => {
      setProgress(0);
      setSeekTo(0);
    }, []);

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
          paused={true}
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
