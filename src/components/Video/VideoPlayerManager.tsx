import {useEffect, useRef} from 'react';
import Video, {OnProgressData} from 'react-native-video';
import {FileType, ITurn} from '../../models/turn';
import {useTurnContext} from '../../shared/context/TurnContext';
import {useActiveTurn, useSeek, useVideoStore} from '../../store';
import VideoPlayer from './VideoPlayer';
import {useCDN} from '../../api/api';
import {COVER_KEY, TURN_KEY} from '../../s3';
import {StyleSheet} from 'react-native';
import ImageBlurBackground from '../Images/ImageBlurBackground';

type Props = {
  videoId: ITurn['turn_id'];
  onEnd: () => void;
  source: string;
  fileType: FileType;
  videoCover: string;
};

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
      {fileType === 'Audio' && isVideoOnScreen && (
        <ImageBlurBackground
          style={Style.video}
          source={useCDN(COVER_KEY + videoCover)}
        />
      )}
      <VideoPlayer
        style={
          isVideoOnScreen
            ? fileType === 'Audio'
              ? {height: 0, width: 0}
              : Style.video
            : Style.video
        }
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
  thumbnailStyle: {},
});
