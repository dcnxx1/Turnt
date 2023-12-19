import Video, {OnProgressData} from 'react-native-video';
import {TestData} from '../../screens/Home/HomeScreen';
import {useTurnContext} from '../../shared/context/TurnContext';
import {useSeek, useVideoStore} from '../../store';
import VideoPlayer from './VideoPlayer';
import {useEffect, useRef, useState} from 'react';

type Props = {
  videoId: TestData['id'];
  onEnd: () => void;
  source: string;
};

export default function VideoPlayerManager({videoId, source, onEnd}: Props) {
  const {activeTurn} = useTurnContext();
  const {isPlaying, setIsPlaying} = useVideoStore();
  const setProgress = useVideoStore(state => state.setProgress);
  const ref = useRef<Video>(null);
  const isVideoOnScreen = activeTurn.id === videoId;
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
    if (!isPlaying) {
      setIsPlaying(true);
    }
    setSeekTo(0);
  }, [activeTurn]);

  return (
    <VideoPlayer
      onEnd={onEnd}
      ref={ref}
      handleProgress={onProgress}
      source={source}
      paused={isVideoOnScreen ? !isPlaying : true}
    />
  );
}
