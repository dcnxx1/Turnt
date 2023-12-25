import {useEffect, useRef} from 'react';
import Video, {OnProgressData} from 'react-native-video';
import {ITurn} from '../../models/turn';
import {useTurnContext} from '../../shared/context/TurnContext';
import {useActiveTurn, useSeek, useVideoStore} from '../../store';
import VideoPlayer from './VideoPlayer';
import {useCDN} from '../../api/api';
import {TURN_KEY} from '../../s3';

type Props = {
  videoId: ITurn['turn_id'];
  onEnd: () => void;
  source: string;
};

export default function VideoPlayerManager({
  videoId,
  source,
  onEnd,
}: Props) {
  const {activeTurn} = useActiveTurn()
  const {isPlaying, setIsPlaying} = useVideoStore();
  const setProgress = useVideoStore(state => state.setProgress);
  const ref = useRef<Video>(null);
  const isVideoOnScreen = activeTurn.turn_id === videoId;
  const {seekTo, setSeekTo} = useSeek();

  const onProgress = ({currentTime}: OnProgressData) => {
    setProgress(currentTime);
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
    <VideoPlayer
      onEnd={onEnd}
      ref={ref}
      handleProgress={onProgress}
      source={useCDN(TURN_KEY + source)}
      paused={isVideoOnScreen ? !isPlaying : true}
    />
  );
}
