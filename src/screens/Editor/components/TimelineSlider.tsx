import {SliderProps} from '@miblanchard/react-native-slider';
import MediaControllerSlider from '../../../components/MediaController/components/MediaControllerSlider';
import Handle from '../../../assets/Handle';
import {Dimensions} from 'react-native';
import {TURN_IMPRESSION_TIME} from '../../../constants';

const style: Partial<SliderProps> = {
  containerStyle: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
  },
  trackClickable: false,
  trackStyle: {
    backgroundColor: 'transparent',
  },
  maximumTrackStyle: {
    backgroundColor: 'transparent',
  },
  minimumTrackStyle: {
    backgroundColor: 'transparent',
  },
};

type Props = {
  maximumValue: number;
  videoProgress: number;
  setVideoTime: (time: number) => void;
};
const screenWidth = Dimensions.get('screen').width;
export default function TimelineSlider({
  maximumValue,
  videoProgress,
  setVideoTime,
}: Props) {
  const styleConfig: typeof style = {
    ...style,
    thumbTouchSize: {
      width: screenWidth - maximumValue,
      height: 51, // 51 is the average height of  <Timeline />
    },
    renderThumbComponent: () => (
      <Handle width={(screenWidth / maximumValue) * TURN_IMPRESSION_TIME} />
    ),
  };

  return (
    <MediaControllerSlider
      style={styleConfig}
      setVideoProgress={setVideoTime}
      maximumValue={maximumValue - TURN_IMPRESSION_TIME}
      videoProgress={videoProgress}
    />
  );
}
