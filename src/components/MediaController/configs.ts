import {BottomSheetProps} from '@gorhom/bottom-sheet';
import {BlurViewProps} from '@react-native-community/blur';
import theme from '../../theme';

export const bottomSheetConfig: Partial<BottomSheetProps> = {
  backgroundStyle: {
    backgroundColor: theme.color.transparent,
  },
  enablePanDownToClose: false,
  enableOverDrag: false,
  handleStyle: {
    backgroundColor: theme.color.transparent,
  },

  containerStyle: {},
};

export const blurViewConfig: Partial<BlurViewProps> = {
  blurRadius: 2,
  blurAmount: 15,
  blurType: 'dark',
};
