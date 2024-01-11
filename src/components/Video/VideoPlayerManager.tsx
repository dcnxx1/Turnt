import {Pressable, StyleSheet} from 'react-native';
import {ITurn} from '../../models/turn';
import {useVideoListContext} from '../../shared/context/VideoListManagerProvider';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from './VideoPlayer';

type Props = {
  videoId: ITurn['turn_id'];
  source: string;
};

const VideoSyncController = withSyncMediaController(VideoPlayer);

export default function VideoPlayerManager({videoId, source}: Props) {
  const {
    activeVideo,
    isPlaying,
    setPlaying,
  } = useVideoListContext();

  const isVideoOnScreen = activeVideo &&  activeVideo.turn_id === videoId;

  const onPressVideoScreen = () => {
    setPlaying(!isPlaying);
  };

  return (
    <Pressable onPress={onPressVideoScreen}>
      <VideoSyncController isVideoOnScreen={isVideoOnScreen} source={source} />
    </Pressable>
  );
}

const Style = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
