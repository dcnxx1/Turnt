import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';

type FlexProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number;
};

function Flex({children, style, flex, ...styleProp}: FlexProps): JSX.Element {
  return (
    <View
      {...styleProp}
      style={[Style.container, style, {flex: flex ? flex : 1}]}>
      {children}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Flex;
