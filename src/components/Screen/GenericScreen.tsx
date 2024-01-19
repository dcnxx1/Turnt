import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Flex from '../Misc/Flex';
import {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SectionScreen, {ScreenSectionProps} from '../Misc/SectionScreen';

type GenericScreenProps = {
  content: ReactNode;
  withHeader?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  style: StyleProp<ViewStyle>;
  left?: ScreenSectionProps['left'];
  right?: ScreenSectionProps['right'];
  middle?: ScreenSectionProps['middle'];
  headerStyle?: StyleProp<ViewStyle>;
  safeAreaInsets?: boolean;
  backgroundColor?: string | (string | number)[];
  withPaddingBottom?: boolean;
  withPaddingTop?: boolean;
};
export default function GenericScreen({
  content,
  contentStyle,
  withHeader,
  style,
  left,
  right,
  middle,
  headerStyle,
  backgroundColor,
  safeAreaInsets = false,
  scrollable,
  withPaddingBottom = true,
  withPaddingTop = true,
}: GenericScreenProps) {
  const Container = scrollable ? ScrollView : View;
  const {top, bottom} = useSafeAreaInsets();
  const hasSafeAreaInsets = safeAreaInsets
    ? {
        paddingTop: withPaddingTop ? top : 0,
        paddingBottom: withPaddingBottom ? bottom : 0,
      }
    : null;
  const headerEnabled = !!left || !!right || !!middle;

  return (
    <View style={[Style.view, style]}>
      <Container
        contentContainerStyle={[
          hasSafeAreaInsets,
          scrollable ? [Style.contentContainerStyle, contentStyle] : null,
        ]}
        style={[
          !scrollable ? [contentStyle, Style.view, hasSafeAreaInsets] : null,
        ]}>
        {headerEnabled && (
          <SectionScreen
            style={headerStyle}
            left={left}
            middle={middle}
            right={right}
          />
        )}
        {content}
      </Container>
    </View>
  );
}

const Style = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  view: {
    flex: 1,
  },
});
