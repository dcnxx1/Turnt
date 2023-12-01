import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Flex from './Flex';
import {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface ScreenSectionProps {
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}

export default function SectionScreen({
  style,
  children,
}: ScreenSectionProps): JSX.Element {
  const {bottom} = useSafeAreaInsets();

  return <View style={[style, Style.container]}>{children}</View>;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
});
