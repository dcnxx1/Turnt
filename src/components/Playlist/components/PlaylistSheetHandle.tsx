import {memo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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

export const APPEAR_THRESHOLD = 50;
type Props = {
  animatedPosition: SharedValue<number>;
};
const HANDLE_HEIGHT = Dimensions.get('screen').height * 0.08;

function PlaylistSheetHandle({animatedPosition}: Props) {
  const arrowDownOpacity = useAnimatedStyle(() => {
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
  const miniPlayerOpacity = useAnimatedStyle(() => {
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
        style={[Style.arrow, arrowDownOpacity]}
        source={require('../../../assets/icons/arrow.png')}
      />
      <Animated.View style={[Style.miniPlayerContainer, miniPlayerOpacity]}>
        <MiniPlayer />
      </Animated.View>
    </Animated.View>
  );
}

export default memo(PlaylistSheetHandle);

const Style = StyleSheet.create({
  container: {
    height: HANDLE_HEIGHT,
    position: 'absolute',
    width: '100%',
    top: 0,
    justifyContent: 'flex-end',
  },
  arrow: {
    transform: [{rotate: '90deg'}],
    width: 45,
    height: 45,
    resizeMode: 'contain',
    paddingLeft: 25,
  },
  miniPlayerContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
