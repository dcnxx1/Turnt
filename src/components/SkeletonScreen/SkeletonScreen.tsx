import {ComponentType, ReactElement, ReactNode} from 'react';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Flex from '../Misc/Flex';
import SectionScreen, {ScreenSectionProps} from '../Misc/SectionScreen';

interface SkeletonScreenProps {
  content: ReactNode;
  styleContent?: StyleProp<ViewStyle>;
  header?: ReactElement;
  footer?: ReactElement;
  headerStyle?: ScreenSectionProps['style'];
  footerStyle?: ScreenSectionProps['style'];
  hasSafeAreaInsets?: boolean;
}

function SkeletonScreen({
  header,
  content,
  styleContent,
  footer,
  footerStyle,
  hasSafeAreaInsets,
  headerStyle,
}: SkeletonScreenProps) {
  const padding = useSafeAreaInsets();

  const optionalPadding = {
    paddingTop: hasSafeAreaInsets ? padding.top : 0,
    paddingBottom: hasSafeAreaInsets ? padding.bottom : 0,
  };
  return (
    <Flex style={[optionalPadding]}>
      {header && <SectionScreen style={headerStyle} children={header} />}
      <View style={[styleContent, Style.container]}>{content}</View>
      {footer && <SectionScreen style={footerStyle} children={footer} />}
    </Flex>
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
  Component: ComponentType<SkeletonScreenProps>,
) => {
  return ({...props}: SkeletonScreenProps) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Component {...props} />
      </SafeAreaView>
    );
  };
};

const Style = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
});

export default SkeletonScreen;
