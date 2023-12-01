import {ComponentType, ReactElement, ReactNode} from 'react';
import Flex from '../Misc/Flex';
import {LinearGradient} from 'react-native-linear-gradient';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalizeFirstLetter} from '../../helpers';
import SectionScreen, {ScreenSectionProps} from '../Misc/SectionScreen';

interface SkeletonScreenProps {
  useInsetsPadding?: boolean;
  content: ReactNode;
  applyPaddingTo?: PaddingAreas;
  withSafeAreaView?: boolean;
  style?: StyleProp<ViewStyle>;

  header?: ReactElement;
  footer?: ReactElement;
  headerStyle?: ScreenSectionProps['style'];
  footerStyle?: ScreenSectionProps['style'];
}
type PaddingAreas = 'top' | 'bottom' | 'left' | 'right';

function SkeletonScreen({
  header,
  content,
  style,
  withSafeAreaView = false,
  applyPaddingTo,
  footer,
  footerStyle,
  headerStyle,
}: SkeletonScreenProps) {
  return (
    <>
      <View style={[style, Style.container]}>{content}</View>
    </>
  );
}

interface LinearGradientProps {
  gradient: (string | number)[];
}

export const withLinearGradient = (
  Component: ComponentType<SkeletonScreenProps>,
) => {
  return ({gradient, ...props}: SkeletonScreenProps & LinearGradientProps) => {
    return (
      <LinearGradient style={Style.container} colors={gradient}>
        <Component {...props} />
      </LinearGradient>
    );
  };
};

export const withSafeAreaView = (
  Component: ComponentType<SkeletonScreenProps>
) => {
  return ({...props} : SkeletonScreenProps) => {
    return <SafeAreaView style={{flex: 1}}>
      <Component {...props} />
    </SafeAreaView>
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
});

export default SkeletonScreen;
