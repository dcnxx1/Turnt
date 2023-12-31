import {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {useCDN} from '../../api/api';
import {ITurn} from '../../models/turn';
import {TURN_KEY} from '../../s3';
import {useActiveTurnStore, useSeek, useVideoStore} from '../../store';
import VideoPlayer from './VideoPlayer';

type Props = {
  videoId: ITurn['turn_id'];
  onEnd: () => void;
  source: string;
  onLoad: (data: OnLoadData) => void;
};

export default function VideoPlayerManager({
  videoId,
  source,
  onEnd,
  onLoad,
}: Props) {
  const {
    activeTurn: {turn_id, duration},
  } = useActiveTurnStore();
  const {isPlaying, setIsPlaying} = useVideoStore();
  const {setProgress} = useVideoStore();
  const ref = useRef<Video>(null);
  const isVideoOnScreen = turn_id === videoId;
  const {seekTo, setSeekTo, isSeeking} = useSeek();

  useEffect(() => {
    if (ref.current) {
      ref.current.seek(seekTo);
    }
  }, [seekTo]);

  useEffect(() => {
    if (isVideoOnScreen && !isPlaying) {
      setIsPlaying(true);
    }
    setProgress(0);
    setSeekTo(0);
  }, [isVideoOnScreen]);

  const onProgress = ({currentTime}: OnProgressData) => {
    if (isSeeking) return;
    if (isVideoOnScreen && currentTime >= duration) {
      onEnd();
    }
    isVideoOnScreen && setProgress(currentTime);
  };

  const onReadyForDisplay = () => {};

  return (
    <VideoPlayer
      onReadyForDisplay={onReadyForDisplay}
      onLoad={onLoad}
      ref={ref}
      onProgress={onProgress}
      source={useCDN(TURN_KEY + source)}
      paused={isVideoOnScreen ? !isPlaying : true}
    />
  );
}

const Style = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
