import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Flex from './Flex';
import {ReactNode} from 'react';

export type ScreenSectionProps = {
  sectionLeft?: ReactNode;
  sectionMiddle?: ReactNode;
  sectionRight?: ReactNode;
  style?: StyleProp<ViewStyle>;
} & ViewStyle;

export default function ScreenSection({
  sectionLeft,
  sectionMiddle,
  sectionRight,
  style,
  ...styleProp
}: ScreenSectionProps): JSX.Element {
  return (
    <View {...styleProp} style={[style, Style.container]}>
      <Flex style={[Style.flex, Style.headerLeft]}>{sectionLeft}</Flex>
      <Flex style={[Style.flex, Style.headerMiddle]}>{sectionMiddle}</Flex>
      <Flex style={[Style.flex, Style.headerRight]}>{sectionRight}</Flex>
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
