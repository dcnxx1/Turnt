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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  SHEET_FULL_SCREEN_MODE,
  SHEET_HIDDEN_MODE,
  SHEET_PARTIAL_MODE,
} from '../Playlist/PlaylistSheet';
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
const SCREEN_HEIGHT = Dimensions.get('screen').height;
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
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE - HEIGHT_BOTTOM_TAB, SHEET_FULL_SCREEN_MODE],
            [0, HEIGHT_BOTTOM_TAB],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        Style.bottomTabContainer,
        animatedStyle,
        {paddingBottom: bottom},
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
            <TouchableWithoutFeedback style={Style.button} onPress={onPress}>
              {switchKeys(route.name as NavNameTypes, isFocused)}
            </TouchableWithoutFeedback>
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
  },
  buttonContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'yellow',
    width: '100%',
  },
  button: {
    borderWidth: 2,
    borderColor: 'red',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.color.white,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
