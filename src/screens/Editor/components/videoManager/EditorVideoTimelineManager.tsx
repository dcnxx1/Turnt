import {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Video, {OnProgressData} from 'react-native-video';
import VideoPlayer from '../../../../components/Video/VideoPlayer';
import {TURN_IMPRESSION_TIME} from '../../../../constants';
import {secondsToDisplayTime} from '../../../../helpers';
import theme from '../../../../theme';
import VideoPlayerButtonController from './VideoPlayerButtonController';
import useGenerateThumbnails, {
  NUMBER_OF_THUMBNAILS_TO_EXTRACT,
} from '../../hooks/useGenerateThumbnails';
import {Flex} from '../../../../components';

type Props = {
  source: string;
  impressionStartAt: number;
};

export default function EditorVideoManager({source, impressionStartAt}: Props) {
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<Video>(null);

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
          <VideoPlayer
            ref={videoRef}
            handleProgress={onProgress}
            playInBackground={false}
            playWhenInactive={false}
            style={Style.video}
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
              },
              {
                type: 'Replay',
                onPress: onReset,
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
    height: Dimensions.get('screen').height * .8,
    borderWidth: 2,
    borderColor: theme.color.turner,
  },
  impressionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impressionText: {
    color: theme.color.white,
    fontSize: 16,
  },
  buttonsContainer: {
    paddingVertical: 15,
 
    justifyContent: 'space-evenly',
  },
});
