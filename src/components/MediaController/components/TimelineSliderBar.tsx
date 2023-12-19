import {StyleSheet, View} from 'react-native';
import Flex from '../../Misc/Flex';
import MediaControllerSlider from './MediaControllerSlider';
import MediaControllerVideoProgress from './MediaControllerVideoProgress';
import {useVideoProgress, useActiveTurn} from '../../../store';

export default function TimelineSliderBar() {
  const {progress} = useVideoProgress();
  const {activeTurn} = useActiveTurn();

  const onSlidingComplete = () => {};

  return (
    <Flex style={Style.container}>
      <View>
        <MediaControllerVideoProgress progress={progress} />
      </View>
      <Flex>
        <MediaControllerSlider
          onSlidingComplete={onSlidingComplete}
          progress={progress}
        />
      </Flex>
      <View></View>
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'yellow',
    flexDirection: 'row',
  },
});
