import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';

export interface ScreenSectionProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  leftAction?: () => void;
  leftComponent?: ReactNode;
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
