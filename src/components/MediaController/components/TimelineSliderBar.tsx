import {Dimensions, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import RNAnimated, {SharedValue} from 'react-native-reanimated';
import {secondsToDisplayTime} from '../../../helpers';
import {ITurn} from '../../../models/turn';
import {useSeek, useVideoStore} from '../../../store';
import Flex from '../../Misc/Flex';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import MediaControllerSlider from '../MediaControllerSlider';
type Props = {
  videoDuration: ITurn['duration'];
  title: ITurn['title'];
  animatedPosition: SharedValue<number>;
};

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function TimelineSliderBar({
  videoDuration: turnDuration,
  title,
  animatedPosition,
}: Props) {
  const {setSeekTo} = useSeek();
  const {progress, setProgress} = useVideoStore();
  
  const seekVideoTo = (value: number) => {
    setProgress(~~value);
    setSeekTo(~~value);
  };

  return (
    <>
      <Flex style={Style.videoProgress}>
        <RNAnimated.Text style={Style.text}>
          {secondsToDisplayTime(progress)}
        </RNAnimated.Text>
      </Flex>
      <Flex flex={4}>
        <MediaControllerSlider
          maximumValue={turnDuration}
          setVideoProgress={seekVideoTo}
          videoProgress={progress}
        />
      </Flex>
      <Flex style={Style.videoProgress}>
        <Text style={{color: 'white'}}>
          { secondsToDisplayTime(turnDuration)}
        </Text>
      </Flex>
    </>
  );
}

const Style = StyleSheet.create({
  videoProgress: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
