import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  TabNavigationState,
  ParamListBase,
  NavigationHelpers,
} from '@react-navigation/native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import Flex from '../Misc/Flex';
import {Button, Text} from 'react-native-paper';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import theme from '../../theme';

type BottomTabProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
  onLayout: (event: LayoutChangeEvent) => void;
};

export default function BottomTab({
  state,
  descriptors,
  navigation,
  insets,
  onLayout,
}: BottomTabProps) {
  const {bottom} = useSafeAreaInsets();

  return (
    <View
      onLayout={onLayout}
      style={[Style.container, {paddingBottom: bottom}]}>
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
          <Flex key={route.key}>
            <Button onPress={onPress}>
              <Text style={Style.text}>{route.name}</Text>
            </Button>
          </Flex>
        );
      })}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    height: '10%',
    maxHeight: '10%',
    flexDirection: 'row',
    backgroundColor: theme.color.turnerDark,
  },
  text: {
    color: theme.color.white,
  },
});
