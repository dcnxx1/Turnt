import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';

interface FlexProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Flex({children, style}: FlexProps): JSX.Element {
  return <View style={[Style.container, style]}>{children}</View>;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Flex;
