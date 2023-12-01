import {ReactNode} from 'react';
import Flex from '../Misc/Flex';
import {LinearGradient} from 'react-native-linear-gradient';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalizeFirstLetter} from '../../helpers';
import ScreenSection, {ScreenSectionProps} from '../Misc/ScreenSection';

interface SkeletonScreenProps {
  useInsetsPadding?: boolean;
  withHeader?: boolean;
  gradient?: (string | number)[];
  content: ReactNode;
  applyPaddingTo?: PaddingAreas;
  header?: ReactNode;
  withSafeAreaView?: boolean;
  style?: StyleProp<ViewStyle>;
  sectionProps?: ScreenSectionProps;
  withFooter?: boolean;
}
type PaddingAreas = 'top' | 'bottom' | 'left' | 'right';

function SkeletonScreen({
  withHeader,
  gradient = [],
  content,
  style,
  withSafeAreaView = false,
  applyPaddingTo,
  sectionProps,
  withFooter,
}: SkeletonScreenProps) {
  const padding = useSafeAreaInsets();

  const paddingBlock = withSafeAreaView
    ? {
        paddingTop: padding.top,
        paddingBottom: padding.bottom,
      }
    : null;

  return (
    <>
      {gradient.length >= 1 && (
        <LinearGradient
          style={[Style.container, paddingBlock]}
          colors={gradient}>
          {withHeader && <ScreenSection  />}
          <View style={style}>{content}</View>
          {withFooter && <ScreenSection {...sectionProps} />}
        </LinearGradient>
      )}
    </>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: '100%',
  },
});

export default SkeletonScreen;
