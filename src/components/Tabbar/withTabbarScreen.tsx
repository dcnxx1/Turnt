import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ComponentType} from 'react';
import {StyleSheet, View} from 'react-native';

export default function withTabbarScreen(Screen: React.FunctionComponent<any>) {
  return function (props: Record<string, unknown>) {
    const tabHeight = useBottomTabBarHeight();

    return (
      <View style={[Style.container, {marginBottom: tabHeight}]}>
        <Screen {...props} />
      </View>
    );
  };
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
