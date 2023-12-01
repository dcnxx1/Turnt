import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';

type FlexProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & ViewStyle

function Flex({children, style, ...styleProp}: FlexProps): JSX.Element {
  return <View {...styleProp} style={[Style.container, style]}>{children}</View>;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

export default Flex;
