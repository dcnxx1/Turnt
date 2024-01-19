import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {Dimensions, Image, LayoutChangeEvent, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavNameTypes, NavScreenNames} from '../../nav/types';
import theme from '../../theme';
import Flex from '../Misc/Flex';
import {
  SHEET_FULL_SCREEN_MODE,
  SHEET_HIDDEN_MODE,
  SHEET_PARTIAL_MODE,
} from '../PlaylistSheet/PlaylistSheet';
import {MINIPLAYER_HEIGHT} from '../PlaylistSheet/components/Miniplayer';
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

  const animateBorderTopColor = useAnimatedStyle(() => {
    return {
      borderTopColor: interpolateColor(
        animatedPosition.value,
        [
          SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE - MINIPLAYER_HEIGHT,
          SHEET_FULL_SCREEN_MODE,
        ],
        ['#333', theme.color.turnerDark],
      ),
    };
  });

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [SHEET_HIDDEN_MODE - SHEET_PARTIAL_MODE, SHEET_FULL_SCREEN_MODE],
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
        translateY,
        {paddingBottom: bottom},
        animateBorderTopColor,
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
    flexDirection: 'row',
    backgroundColor: theme.color.turnerDark,
    borderTopWidth: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  button: {
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
