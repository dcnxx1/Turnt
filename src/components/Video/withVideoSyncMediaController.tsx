import {ComponentType, useRef} from 'react';
import {useActiveTrack, useProgress} from 'react-native-track-player';
import Video, {VideoProperties} from 'react-native-video';
import {useVideoStore} from '../../store/useVideoStore';

export default function withVideoSyncMediaController(
  VideoPlayer: ComponentType<VideoProperties>,
) {
  return () => {
    const {setProgress} = useVideoStore();
  };
}
