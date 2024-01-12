import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {Dimensions, Image, LayoutChangeEvent, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavNameTypes, NavScreenNames} from '../../nav/types';
import theme from '../../theme';
import Flex from '../Misc/Flex';
type BottomTabProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
  onLayout: (event: LayoutChangeEvent) => void;
  animatedPosition: SharedValue<number>;
};

const switchKeys = (routeName: NavNameTypes, isFocused: boolean) => {
  switch (routeName) {
    case NavScreenNames.HomeScreen:
      return (
        <Image
          source={
            isFocused
              ? require('../../assets/icons/turnt.png')
              : require('../../assets/icons/turnt_white.png')
          }
          style={Style.icon}
        />
      );
    case NavScreenNames.ProfileScreen:
      return (
        <Image
          style={Style.icon}
          source={
            isFocused
              ? require('../../assets/icons/profile_white.png')
              : require('../../assets/icons/profile.png')
          }
        />
      );
  }
};

export const HEIGHT_BOTTOM_TAB = Dimensions.get('screen').height * 0.1;

export default function BottomTab({
  state,
  descriptors,
  navigation,
  insets,
  onLayout,
  animatedPosition,
}: BottomTabProps) {
  const {bottom} = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        animatedPosition.value,
        [844, 0],
        [HEIGHT_BOTTOM_TAB, 0],
        Extrapolation.CLAMP,
      ),
      paddingBottom: interpolate(animatedPosition.value, [844, 0], [bottom, 0]),
    };
  });

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        Style.bottomTabContainer,
        {paddingBottom: bottom},
        animatedStyle,
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <Flex style={Style.buttonContainer} key={route.key}>
            <Button style={Style.button} onPress={onPress}>
              {switchKeys(route.name as NavNameTypes, isFocused)}
            </Button>
          </Flex>
        );
      })}
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  bottomTabContainer: {
    height: HEIGHT_BOTTOM_TAB,

    flexDirection: 'row',
    backgroundColor: theme.color.turnerDark,
    // position: 'absolute',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '60%',
  },
  text: {
    color: theme.color.white,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
