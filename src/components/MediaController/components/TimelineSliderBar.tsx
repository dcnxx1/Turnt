import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {secondsToDisplayTime} from '../../../helpers';
import {useSeek, useVideoStore} from '../../../store';
import Flex from '../../Misc/Flex';
import MediaControllerSlider from './MediaControllerSlider';
import {ITurn} from '../../../models/turn';

type Props = {
  turnDuration: ITurn['duration'];
};

export default function TimelineSliderBar({turnDuration}: Props) {
  const {progress} = useVideoStore();
  const {setSeekTo} = useSeek();
  const {setProgress} = useVideoStore();

  const seekVideoTo = (value: number) => {
    setProgress(value);
    setSeekTo(value);
  };

  return (
    <>
      <Flex style={Style.videoProgress}>
        <Text style={Style.text}>{secondsToDisplayTime(progress)}</Text>
      </Flex>
      <Flex flex={4}>
        <MediaControllerSlider
          maximumValue={turnDuration}
          seekVideoTo={seekVideoTo}
          progress={progress}
        />
      </Flex>
      <Flex style={Style.videoProgress}>
        <Text style={{color: 'white'}}>
          {secondsToDisplayTime(turnDuration)}
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
