import {ComponentType, ReactElement, ReactNode, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Flex from '../Misc/Flex';
import SectionScreen, {ScreenSectionProps} from '../Misc/SectionScreen';
import {
  Dialog,
  PaperProvider,
  Portal,
  Provider,
  Text,
} from 'react-native-paper';

import {theme} from '../../constants';

interface SkeletonScreenProps {
  content: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  header?: ReactElement;
  footer?: ReactElement;
  headerStyle?: ScreenSectionProps['style'];
  footerStyle?: ScreenSectionProps['style'];
  hasSafeAreaInsets?: boolean;
  scrollEnabled?: boolean;
}

function SkeletonScreen({
  header,
  content,
  contentStyle,
  footer,
  footerStyle,
  scrollEnabled = false,
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
      <View style={[contentStyle, , Style.container]}>{content}</View>
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
  dialogActionText: {
    color: theme.color.white,
  },
  dialogContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default SkeletonScreen;
