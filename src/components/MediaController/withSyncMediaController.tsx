import { useEffect, useRef } from 'react';
import TrackPlayer from 'react-native-track-player';
import Video, { OnProgressData } from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { useCDN } from '../../api/api';
import { ITurn } from '../../models/turn';
import { RootState } from '../../redux/store';
import { setIsPlaying } from '../../redux/videoListSlice';
import { TURN_KEY } from '../../s3';
import { useVideoListContext } from '../../shared/context/VideoListContext';
import { useSeek, useVideoStore } from '../../store';
import { VideoPlayerProps } from '../Video/VideoPlayer';

export default function withSyncMediaController(
  VideoPlayer: React.ForwardRefExoticComponent<
    VideoPlayerProps & React.RefAttributes<Video>
  >,
) {
  return ({
    source,
    videoId,
    id,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    videoId: ITurn['turn_id'];
    id: 'playlistSlice' | 'homeSlice';
  }) => {
    const ref = useRef<Video>(null);
    const {activeTurn} = useVideoListContext();
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

    const onProgress = ({currentTime}: OnProgressData) => {
      if (isSeeking) return;
      setProgress(currentTime);
      TrackPlayer.seekTo(~~currentTime);
    };

    return (
      <VideoPlayer
        ref={ref}
        onEnd={() => console.log('on end reached')}
        onProgress={onProgress}
        source={useCDN(TURN_KEY + source)}
        paused={isVideoOnScreen ? !isPlaying : true}
      />
    );
  };
}
