import {useEffect, useRef} from 'react';
import Video, {OnProgressData} from 'react-native-video';
import {useCDN} from '../../api/api';
import {TURN_KEY} from '../../s3';
import {useVideoListContext} from '../../shared/context/VideoListManagerProvider';
import {useSeek, useVideoStore} from '../../store';
import {VideoPlayerProps} from '../Video/VideoPlayer';

export default function withSyncMediaController(
  VideoPlayer: React.ForwardRefExoticComponent<
    VideoPlayerProps & React.RefAttributes<Video>
  >,
) {
  return ({
    source,
    isVideoOnScreen,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    isVideoOnScreen: boolean;
  }) => {
    const ref = useRef<Video>(null);
    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const {isPlaying, setPlaying} = useVideoListContext();

    useEffect(() => {
      if (ref.current) {
        ref.current.seek(seekTo);
      }
    }, [seekTo, ref]);

    useEffect(() => {
      if (isVideoOnScreen && !isPlaying) {
        setPlaying(true);
      }
      setProgress(0);
      setSeekTo(0);
    }, [isVideoOnScreen]);

    const onProgress = ({currentTime}: OnProgressData) => {
      if (isSeeking) return;
      setProgress(currentTime);
    };

    return (
      <VideoPlayer
        onProgress={onProgress}
        source={useCDN(TURN_KEY + source)}
        ref={ref}
        paused={isVideoOnScreen ? !isPlaying : true}
      />
    );
  };
}
