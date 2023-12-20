import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

export interface ScreenSectionProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SectionScreen({
  style,
  children,
}: ScreenSectionProps): JSX.Element {
  return <View style={[style, Style.container]}>{children}</View>;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
  },
});
