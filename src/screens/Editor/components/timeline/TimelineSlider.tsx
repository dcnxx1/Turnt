import {SliderProps} from '@miblanchard/react-native-slider';
import MediaControllerSlider from '../../../../components/MediaController/components/MediaControllerSlider';
import {TURN_IMPRESSION_TIME} from '../../../../constants';
import SliderHandle from './HandleSlider';
import {TimelineDimensions} from './Timeline';
import {Dimensions} from 'react-native';

const sliderStyle: Partial<SliderProps> = {
  containerStyle: {
    position: 'absolute',
    zIndex: 1,
    bottom: '0%',
    width: '100%',
    height: '100%',
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
  thumbStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
};

type Props = {
  maximumValue: number;
  videoProgress: number;
  setVideoTime: (time: number) => void;
  timelineDimensions: TimelineDimensions;
};
const screenWidth = Dimensions.get('screen').width;
export default function TimelineSlider({
  maximumValue,
  videoProgress,
  setVideoTime,
  timelineDimensions: {width, height},
}: Props) {
  const sliderStyleConfig: typeof sliderStyle = {
    ...sliderStyle,

    thumbTouchSize: {
      width: screenWidth - maximumValue,
      height: height,
    },
    renderThumbComponent: () => (
      <SliderHandle
        width={(screenWidth / maximumValue) * TURN_IMPRESSION_TIME}
      />
    ),
  };

  return (
    <MediaControllerSlider
      style={sliderStyleConfig}
      setVideoProgress={setVideoTime}
      maximumValue={maximumValue - TURN_IMPRESSION_TIME}
      videoProgress={videoProgress}
    />
  );
}
