import {memo} from 'react';
import { StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  SHEET_FULL_SCREEN_MODE,
  SHEET_HIDDEN_MODE,
  SHEET_PARTIAL_MODE,
} from '../PlaylistSheet';
import MiniPlayer from './Miniplayer';
import {HEIGHT_BOTTOM_TAB} from '../../Tabbar/BottomTab';

export const APPEAR_THRESHOLD = 50;
type Props = {
  animatedPosition: SharedValue<number>;
};

function PlaylistSheetHandle({animatedPosition}: Props) {
  const handleAnimation = useAnimatedStyle(() => {
    const interpolator = (begin: number, end: number) =>
      interpolate(
        animatedPosition.value,
        [SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE, SHEET_FULL_SCREEN_MODE],
        [end, begin],
        Extrapolation.CLAMP,
      );
    return {
      opacity: interpolator(1, 0),
    };
  });
  const partialAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [
          SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE,
          SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE - APPEAR_THRESHOLD,
        ],
        [1, 0],
        Extrapolation.EXTEND,
      ),
    };
  });

  return (
    <Animated.View style={[Style.container]}>
      <Animated.Image
        style={[Style.arrow, handleAnimation]}
        source={require('../../../assets/icons/arrow.png')}
      />
      <Animated.View style={[Style.miniPlayerContainer, partialAnimation]}>
        <MiniPlayer />
      </Animated.View>
    </Animated.View>
  );
}

export default memo(PlaylistSheetHandle);

const Style = StyleSheet.create({
  container: {
    height: HEIGHT_BOTTOM_TAB,
    position: 'absolute',
    width: '100%',
    top: 0,
    justifyContent: 'flex-end',
  },
  arrow: {
    transform: [{rotate: '90deg'}],
    width: 25,
    height: 25,
    resizeMode: 'cover',
    paddingLeft: 25,
  },
  miniPlayerContainer: {
    width: '100%',

    height: '100%',
    position: 'absolute',
  },
});
