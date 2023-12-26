import {forwardRef} from 'react';
import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import ImageBlurBackground from '../Images/ImageBlurBackground';
import {FileType} from '../../models/turn';
import {useCDN} from '../../api/api';
import {COVER_KEY} from '../../s3';

type VideoPlayerProps = {
  source: string;
  paused: boolean | undefined;
  onEnd?: () => void;
  handleProgress?: (data: OnProgressData) => void;
  style?: StyleProp<ViewStyle>;
  playInBackground?: boolean;
  playWhenInactive?: boolean;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const UPDATE_INTERVAL_MS = 1000;

export default forwardRef<Video, VideoPlayerProps>(
  (
    {
      source,
      paused,
      onEnd,
      handleProgress,
      style,
      playInBackground = true,
      playWhenInactive = true,
    }: VideoPlayerProps,

    ref,
  ) => {
    return (
      <Video
        currentTime={-1}
        ref={ref}
        source={{uri: source}}
        resizeMode={'cover'}
        onEnd={onEnd}
        ignoreSilentSwitch={'ignore'}
        onProgress={handleProgress}
        playInBackground={playInBackground}
        progressUpdateInterval={UPDATE_INTERVAL_MS}
        pictureInPicture={false}
        playWhenInactive={playWhenInactive}
        paused={paused}
        style={style ? style : Style.videoStyle}
      />
    );
  },
);

const Style = StyleSheet.create({
  videoStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
