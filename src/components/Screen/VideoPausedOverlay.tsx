import {ReactElement} from 'react';
import {View, Animated, Pressable, Dimensions} from 'react-native';
import RNAnimated, {
  processColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import theme from '../../theme';
import {Avatar, Icon} from 'react-native-paper';

type Props = {
  children: ReactElement;
  paused: boolean;
  onPress: () => void;
};
export default function VideoPausedOverlay({children, paused, onPress}: Props) {
  const animatedOpacity = useSharedValue(0);
  const animatedBackgroundOpacity = useAnimatedStyle(() => {
    return {
      opacity: paused
        ? withSpring(0.5, {
            duration: 250,
            overshootClamping: false,
            stiffness: 100,
          })
        : withSpring(1, {
            duration: 250,
            overshootClamping: false,
            stiffness: 100,
          }),
    };
  }, [paused]);

  const animatedIconBackgroundOpacity = useAnimatedStyle(() => {
    return {
      opacity: paused ? withSpring(1) : withSpring(0),
    };
  }, [paused]);

  const animatedBorder = useAnimatedStyle(() => {
    return {
      padding: paused ? withSpring(20) : withSpring(0),
    };
  }, [paused]);

  return (
    <RNAnimated.View
      style={[
        animatedBackgroundOpacity,
        {backgroundColor: 'black', position: 'relative'},
      ]}>
      <Pressable onPress={onPress}>
        {children}

        <RNAnimated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 25,
              justifyContent: 'center',
              alignItems: 'center',
            },
            animatedIconBackgroundOpacity,
          ]}>
          <RNAnimated.View
            style={[
              {
                borderRadius: (55 * 2) / 2,

                backgroundColor: theme.color.turner,
              },
              animatedBorder,
            ]}>
            <Icon size={55} source={require('../../assets/icons/pause.png')} />
          </RNAnimated.View>
        </RNAnimated.View>
      </Pressable>
    </RNAnimated.View>
  );
}
