import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {useLayout} from '@react-native-community/hooks';
export interface ScreenSectionProps {
  style?: StyleProp<ViewStyle>;

  left?: ReactNode;
  right: ReactNode;
  middle?: ReactNode;
}

export default function SectionScreen({
  style,
  left,
  right,
  middle,
}: ScreenSectionProps): JSX.Element {
  const leftColumnLayout = useLayout();
  const rightColumnLayout = useLayout();
  const columnWidth = Math.max(leftColumnLayout.width, rightColumnLayout.width);

  return (
    <View style={[style, Style.container]}>
      <View onLayout={leftColumnLayout.onLayout} style={[Style.left, {minWidth: columnWidth}]}>
        {left ?? <View />}
      </View>
      <View style={[Style.middle]}>
        {middle}
      </View>
      <View
        onLayout={rightColumnLayout.onLayout}
        style={[[Style.right, {minWidth: columnWidth}]]}>
        {right ?? <View />}
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  left: {
    flex: 0,
  },
  right: {
    flex: 0,
  },
  middle: {
    flex: 2,
    alignItems: 'center',
  },
});
