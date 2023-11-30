import {ReactNode} from 'react';
import Flex from '../Misc/Flex';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export interface ScreenHeaderProps {
  headerLeft?: ReactNode;
  headerMiddle?: ReactNode;
  headerRight?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function ScreenHeader({
  headerLeft,
  headerMiddle,
  headerRight,
  style,
}: ScreenHeaderProps) {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[style, Style.container]}>
      <Flex style={[Style.flex, Style.headerLeft]}>{headerLeft}</Flex>
      <Flex style={[Style.flex, Style.headerMiddle]}>{headerMiddle}</Flex>
      <Flex style={[Style.flex, Style.headerRight]}>{headerRight}</Flex>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  headerLeft: {
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  headerMiddle: {
    alignItems: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
    paddingRight: 5,
  },
});

export default ScreenHeader;
