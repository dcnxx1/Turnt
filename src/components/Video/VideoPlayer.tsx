import {forwardRef} from 'react';
import {Dimensions} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';

type VideoPlayerProps = {
  source: string;
  paused: boolean | undefined;
  onEnd?: () => void;
  handleProgress?: (data: OnProgressData) => void;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const UPDATE_INTERVAL_MS = 1000;

export default forwardRef<Video, VideoPlayerProps>(
  ({source, paused, onEnd, handleProgress}: VideoPlayerProps, ref) => {
    return (
      <Video
        ref={ref}
        source={{uri: source}}
        resizeMode={'cover'}
        onEnd={onEnd}
        ignoreSilentSwitch={'ignore'}
        onProgress={handleProgress}
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
  },
);
