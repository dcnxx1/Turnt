import {useEffect, useRef, useState} from 'react';
import Video, {OnProgressData} from 'react-native-video';
import {VideoPlayerProps} from '../Video/VideoPlayer';
import {useSeek, useVideoStore} from '../../store';
import {View} from 'react-native';
import {useCDN} from '../../api/api';
import {TURN_KEY} from '../../s3';
import usePlaybackSourceStore, { Source } from '../../store/usePlaybackSourceStore';

export default function withSyncMediaController(
  VideoPlayer: React.ForwardRefExoticComponent<
    VideoPlayerProps & React.RefAttributes<Video>
  >,
) {
  return ({
    source,
    isVideoOnScreen,
    id,
  }: Omit<VideoPlayerProps, 'onProgress' | 'paused'> & {
    isVideoOnScreen: boolean;
    id: Source,
  }) => {
    const ref = useRef<Video>(null);
    const {seekTo, setSeekTo, isSeeking} = useSeek();
    const setProgress = useVideoStore(state => state.setProgress);
    const isPlaying = useVideoStore(state => state.isPlaying);
    const setIsPlaying = useVideoStore(state => state.setIsPlaying);
    const playbackSource = usePlaybackSourceStore(state => state.playbackSource)
    useEffect(() => {
      if (ref.current) {
        ref.current.seek(seekTo);
      }
    }, [seekTo, ref]);

    useEffect(() => {
      if (isVideoOnScreen && !isPlaying) {
        setIsPlaying(true);
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
        paused={playbackSource === id ? isVideoOnScreen ? !isPlaying : true : true}
      />
    );
  };
}
