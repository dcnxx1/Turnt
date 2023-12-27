import {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import {useCDN} from '../../api/api';
import {FileType, ITurn} from '../../models/turn';
import {COVER_KEY, TURN_KEY} from '../../s3';
import {useActiveTurn, useSeek, useVideoStore} from '../../store';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import VideoPlayer from './VideoPlayer';

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
  const {activeTurn} = useActiveTurn();
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
    <>
      {
        activeTurn.type === 'Audio' ? <ImageBlurBackground
        source={{uri: useCDN(COVER_KEY + videoCover)}}
        style={Style.fileHidden}
      /> : null
      }
      <VideoPlayer
        style={activeTurn.type === 'Audio' ? Style.fileHidden : Style.video}
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
  fileHidden: {
    display: 'none',
  },
  imageBlurBackground: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  imageBlurBackgroundHidden: {},
});
