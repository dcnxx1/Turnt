import {Children, ComponentType, ReactElement, ReactNode} from 'react';
import Flex from '../Misc/Flex';
import {LinearGradient} from 'react-native-linear-gradient';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalizeFirstLetter} from '../../helpers';
import SectionScreen, {ScreenSectionProps} from '../Misc/SectionScreen';

interface SkeletonScreenProps {
  content: ReactNode;
  style?: StyleProp<ViewStyle>;
  header?: ReactElement;
  footer?: ReactElement;
  headerStyle?: ScreenSectionProps['style'];
  footerStyle?: ScreenSectionProps['style'];
  hasSafeAreaInsets?: boolean;
}

function SkeletonScreen({
  header,
  content,
  style,
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
    <>
      {header && <SectionScreen style={headerStyle} children={header} />}
      <View style={[style, Style.container, optionalPadding]}>{content}</View>
      {footer && <SectionScreen style={footerStyle} children={footer} />}
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
    flex: 1,
    height: Dimensions.get('screen').height,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
});

export default SkeletonScreen;
