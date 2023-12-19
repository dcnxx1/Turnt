import {BottomSheetProps} from '@gorhom/bottom-sheet';
import {BlurViewProps} from '@react-native-community/blur';
import theme from '../../theme';
import {SliderProps} from '@miblanchard/react-native-slider';
import {Dimensions} from 'react-native';

export const bottomSheetConfig: Partial<BottomSheetProps> = {
  enablePanDownToClose: false,
  enableOverDrag: false,
  handleStyle: {
    backgroundColor: theme.color.transparent,
  },
  backgroundStyle: {backgroundColor: '#00000000'},
  handleIndicatorStyle: {
    display: 'none',
  },
  containerStyle: {},
};

export const blurViewConfig: Partial<BlurViewProps> = {
  blurRadius: 2,
  blurAmount: 15,
  blurType: 'dark',
};

export const sliderConfig: Partial<SliderProps> = {
  trackClickable: false,
  animateTransitions: true,
  animationType: 'timing',
  trackStyle: {
    height: 10,
    borderRadius: 15,
  },
  minimumTrackStyle: {
    backgroundColor: theme.color.turner,
    borderRadius: 3,
    overflow: 'hidden',
  },
  maximumTrackStyle: {backgroundColor: theme.color.white, overflow: 'hidden'},
  thumbStyle: {width: '0%'},
  thumbTouchSize: {
    width: Dimensions.get('screen').width,
    height: 15,
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
