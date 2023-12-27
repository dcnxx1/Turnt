import {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import {useCDN} from '../../api/api';
import {FileType, ITurn} from '../../models/turn';
import {TURN_KEY} from '../../s3';
import {useActiveTurnStore, useSeek, useVideoStore} from '../../store';
import VideoPlayer from './VideoPlayer';
import TrackPlayer from 'react-native-track-player';

type Props = {
  videoId: ITurn['turn_id'];
  onEnd: () => void;
  source: string;
  fileType: FileType;
  videoCover: string;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function VideoPlayerManager({
  videoId,
  source,
  fileType,
  onEnd,
  videoCover,
}: Props) {
  const {activeTurn} = useActiveTurnStore();
  const {isPlaying, setIsPlaying} = useVideoStore();
  const setProgress = useVideoStore(state => state.setProgress);
  const ref = useRef<Video>(null);
  const isVideoOnScreen = activeTurn.turn_id === videoId;
  const {seekTo, setSeekTo} = useSeek();

  const onProgress = ({currentTime}: OnProgressData) => {
    setProgress(currentTime);
    TrackPlayer.seekTo(currentTime);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.seek(seekTo);
    }
  }, [seekTo]);

  useEffect(() => {
    if (isVideoOnScreen && !isPlaying) {
      setIsPlaying(true);
    }
    setSeekTo(0);
  }, [isVideoOnScreen]);

  return (
    <>
      <VideoPlayer
        onEnd={onEnd}
        ref={ref}
        handleProgress={onProgress}
        source={useCDN(TURN_KEY + source)}
        paused={isVideoOnScreen ? !isPlaying : true}
      />
    </>
  );
}

const Style = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
