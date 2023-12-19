import {ComponentType, useRef} from 'react';
import {useActiveTrack, useProgress} from 'react-native-track-player';
import Video, {VideoProperties} from 'react-native-video';
import {useVideoProgress} from '../../store/useVideoProgress';

export default function withVideoSyncMediaController(
  VideoPlayer: ComponentType<VideoProperties>,
) {
  return () => {
    const {setProgress} = useVideoProgress();
  };
}
