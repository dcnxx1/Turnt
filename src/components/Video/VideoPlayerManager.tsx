import {Pressable, StyleSheet} from 'react-native';
import {OnLoadData} from 'react-native-video';
import {ITurn} from '../../models/turn';
import {useVideoStore} from '../../store';
import {Source} from '../../store/usePlaybackSourceStore';
import {useVideoListContext} from '../List/VideoListManager';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from './VideoPlayer';

type Props = {
  videoId: ITurn['turn_id'];
  onEnd: () => void;
  source: string;
  onLoad: (data: OnLoadData) => void;
  id: Source;
};

const VideoSyncController = withSyncMediaController(VideoPlayer);

export default function VideoPlayerManager({
  videoId,
  source,
  onEnd,
  onLoad,
  id,
}: Props) {
  const {
    activeVideoOnScreen: {turn_id},
  } = useVideoListContext();

  const {isPlaying, setIsPlaying} = useVideoStore();

  const isVideoOnScreen = turn_id === videoId;

  return (
    <Pressable onPress={() => setIsPlaying(!isPlaying)}>
      <VideoSyncController
        id={id}
        isVideoOnScreen={isVideoOnScreen}
        source={source}
      />
    </Pressable>
  );
}

const Style = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
