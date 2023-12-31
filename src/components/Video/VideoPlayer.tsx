import {forwardRef} from 'react';
import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';

export type VideoPlayerProps = {
  source: string;
  paused: boolean | undefined;
  style?: StyleProp<ViewStyle>;
  playInBackground?: boolean;
  playWhenInactive?: boolean;

  onEnd?: () => void;
  onProgress: (data: OnProgressData) => void;
  onReadyForDisplay: () => void;
  onLoad: (data: OnLoadData) => void;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const UPDATE_INTERVAL_MS = 1000;

export default forwardRef<Video, VideoPlayerProps>(
  (
    {
      source,
      paused,
      onLoad,
      onEnd,
      onProgress,
      onReadyForDisplay,
      style,
      playInBackground = true,
      playWhenInactive = true,
    }: VideoPlayerProps,

    ref,
  ) => {
    return (
      <Video
        ref={ref}
        source={{uri: source}}
        resizeMode={'cover'}
        onEnd={onEnd}
        ignoreSilentSwitch={'ignore'}
        onLoad={onLoad}
        onReadyForDisplay={onReadyForDisplay}
        onProgress={onProgress}
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
