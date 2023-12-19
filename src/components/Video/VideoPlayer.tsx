import Video, {OnProgressData, VideoProperties} from 'react-native-video';
import {useVideoProgress, useSeek} from '../../store/';
import {Dimensions} from 'react-native';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';

type VideoPlayerProps = {
  source: string;
  paused: boolean;
  onEnd: () => void;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const UPDATE_INTERVAL_MS = 1000;

export default function VideoPlayer({
  source,
  paused = false,
  onEnd,
}: VideoPlayerProps) {
  const {setProgress} = useVideoProgress();
  const {seekTo, setSeekTo} = useSeek();
  const videoRef = useRef<Video | null>(null);

  useEffect(() => {
    if (!paused) {
      /*
      if user scrolled to new video, 
      set video time to 0 because 
      without this useEffect, if the user has sought, 
      the new video will play where the user 
      has dragged the seeker value
      */
      setSeekTo(0);
    }
  }, [paused]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(seekTo);
    }
    return () => {
      videoRef.current = null;
    };
  }, [seekTo]);

  const handleVideoProgress = ({currentTime}: OnProgressData) => {
    setProgress(currentTime);
  };

  return (
    <Video
      ref={videoRef}
      source={{uri: source}}
      resizeMode={'cover'}
      onEnd={onEnd}
      ignoreSilentSwitch={'ignore'}
      onProgress={handleVideoProgress}
      playInBackground
      progressUpdateInterval={UPDATE_INTERVAL_MS}
      pictureInPicture={false}
      playWhenInactive
      paused={paused}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}
    />
  );
}
