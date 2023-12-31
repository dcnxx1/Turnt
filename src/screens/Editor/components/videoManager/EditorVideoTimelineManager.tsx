import {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Video, {OnProgressData} from 'react-native-video';
import {Flex} from '../../../../components';
import VideoPlayer from '../../../../components/Video/VideoPlayer';
import {TURN_IMPRESSION_TIME} from '../../../../constants';
import {secondsToDisplayTime} from '../../../../helpers';
import {FileType, ITurn} from '../../../../models/turn';
import theme from '../../../../theme';
import {VideoCoverColor, requiredImages} from '../../utils';
import VideoPlayerButtonController from './VideoPlayerButtonController';
import ImageBlurBackground from '../../../../components/Images/ImageBlurBackground';

type Props = {
  source: string;
  impressionStartAt: number;
  cover: ITurn['cover'];
  fileType: FileType;
  defaultCover: VideoCoverColor;
};

export default function EditorVideoManager({
  source,
  impressionStartAt,
  fileType,
  defaultCover,
  cover,
}: Props) {
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<Video>(null);
  const videoCover = cover.length ? {uri: cover} : requiredImages[defaultCover];
  const togglePlayPause = () => {
    setPaused(!paused);
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(impressionStartAt);
    }
  }, [impressionStartAt]);

  const onProgress = ({currentTime}: OnProgressData) => {
    if (~~currentTime >= ~~impressionStartAt + TURN_IMPRESSION_TIME) {
      if (videoRef.current) {
        videoRef.current.seek(impressionStartAt);
      }
    }
  };

  const onReset = () => {
    if (videoRef.current) {
      videoRef.current.seek(impressionStartAt);
    }
  };

  return (
    <>
      <View style={Style.videoContainer}>
        <Pressable onPress={togglePlayPause}>
          {fileType === 'Audio' && (
            <ImageBlurBackground style={Style.video} source={videoCover} />
          )}
          <VideoPlayer
            ref={videoRef}
            onProgress={onProgress}
            playInBackground={false}
            playWhenInactive={false}
            style={fileType === 'Audio' ? {height: 0, width: 0} : Style.video}
            paused={paused}
            source={source}
          />
        </Pressable>
      </View>
      <View style={Style.impressionButtonContainer}>
        <Flex>
          <Text style={Style.impressionText}>
            {secondsToDisplayTime(impressionStartAt)} -{' '}
            {secondsToDisplayTime(impressionStartAt + 30)}
          </Text>
        </Flex>
        <Flex flex={2}>
          <VideoPlayerButtonController
            style={Style.buttonsContainer}
            useButtons={[
              {
                type: paused ? 'Play' : 'Pause',
                onPress: togglePlayPause,
                size: 25,
              },
              {
                type: 'Replay',
                onPress: onReset,
                size: 25,
              },
            ]}
          />
        </Flex>
      </View>
    </>
  );
}

const Style = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.8,
    borderWidth: 2,
    borderColor: theme.color.turner,
  },
  impressionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  impressionText: {
    color: theme.color.white,
    fontSize: 16,
  },
  buttonsContainer: {
    justifyContent: 'space-evenly',
  },
});
