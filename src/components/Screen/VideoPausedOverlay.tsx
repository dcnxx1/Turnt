import {ReactElement} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Icon} from 'react-native-paper';
import RNAnimated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useActiveTurnStore} from '../../store';
import theme from '../../theme';

type Props = {
  children: ReactElement;
  paused: boolean;
  onPress: () => void;
};
const AnimatedLinear = RNAnimated.createAnimatedComponent(LinearGradient);
export default function VideoPausedOverlay({children, paused, onPress}: Props) {
  const animatedBackgroundOpacity = useAnimatedStyle(() => {
    return {
      opacity: paused
        ? withSpring(0.7, {
            duration: 250,
            overshootClamping: true,
            stiffness: 100,
          })
        : withSpring(0, {
            duration: 250,
            overshootClamping: true,
            stiffness: 100,
          }),
    };
  }, [paused]);

  const animatedIconBackgroundOpacity = useAnimatedStyle(() => {
    return {
      opacity: paused ? withSpring(1) : withSpring(0),
    };
  }, [paused]);

  const animatedScaleButtonContainer = useAnimatedStyle(() => {
    return {
      transform: [{scale: paused ? withSpring(1) : withSpring(0.2)}],
    };
  }, [paused]);

  return (
    <RNAnimated.View style={Style.container}>
      <Pressable onPress={onPress}>
        {children}
        <RNAnimated.View
          style={[Style.interactionContainer, animatedIconBackgroundOpacity]}>
          <RNAnimated.View style={[animatedScaleButtonContainer]}>
            <Icon
              size={100}
              source={require('../../assets/icons/pause_button_subtract_bg.png')}
            />
          </RNAnimated.View>
        </RNAnimated.View>
        <AnimatedLinear
          colors={[theme.color.turner, theme.color.turnerPurple]}
          style={[Style.linearGradient, animatedBackgroundOpacity]}
        />
      </Pressable>
    </RNAnimated.View>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 15,
    position: 'absolute',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactionContainer: {
    position: 'absolute',
    zIndex: 22,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    color: 'white',
  },
});
