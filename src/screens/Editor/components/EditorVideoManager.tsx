import {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import VideoPlayer from '../../../components/Video/VideoPlayer';
import {TURN_IMPRESSION_TIME} from '../../../constants';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  source: string;
  impressionStartAt: number;
};

export default function EditorVideoManager({source, impressionStartAt}: Props) {
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<Video>(null);
  const [progress, setProgress] = useState(0);

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
        videoRef.current.seek(impressionStartAt, 100);
      }
    }
  };

  return (
    <>
      <Pressable onPress={togglePlayPause}>
        <VideoPlayer
          handleProgress={onProgress}
          playInBackground={false}
          playWhenInactive={false}
          style={Style.videoContainer}
          paused={paused}
          source={source}
          ref={videoRef}
        />
      </Pressable>
      <View>
        <Text style={{color: 'white'}}>yo</Text>
      </View>
    </>
  );
}

const Style = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '100%',
  },
});
