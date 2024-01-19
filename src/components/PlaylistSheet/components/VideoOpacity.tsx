import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    SharedValue,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    SHEET_FULL_SCREEN_MODE,
    SHEET_HIDDEN_MODE,
    SHEET_PARTIAL_MODE,
} from '../PlaylistSheet';
import { APPEAR_THRESHOLD } from './PlaylistSheetHandle';

type Props = {
  animatedPosition: SharedValue<number>;
  children: ReactNode;
};

export default function VideoOpacity({animatedPosition, children}: Props) {
  const opacityInterpolate = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [
            SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE ,
            SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE - APPEAR_THRESHOLD
        ],
        [0, 1],
      ),
    };
  });

  return (
    <Animated.View style={[Style.container, opacityInterpolate]}>
      {children}
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
