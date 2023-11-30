import {ReactNode} from 'react';
import Flex from '../Misc/Flex';
import {LinearGradient} from 'react-native-linear-gradient';
import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {capitalizeFirstLetter} from '../../helpers';
import ScreenHeader, {ScreenHeaderProps} from '../Header/ScreenHeader';

interface SkeletonScreenProps {
  useInsetsPadding?: boolean;
  withHeader?: boolean;
  gradient?: (string | number)[];
  content: ReactNode;
  applyPaddingTo?: PaddingAreas;
  header?: ReactNode;
  withSafeAreaView?: boolean;
  style?: StyleProp<ViewStyle>;
  headerProps?: ScreenHeaderProps;
}
type PaddingAreas = 'top' | 'bottom' | 'left' | 'right';

function SkeletonScreen({
  withHeader,
  gradient = [],
  content,
  style,
  withSafeAreaView = true,
  applyPaddingTo,
  headerProps,
}: SkeletonScreenProps) {
  const padding =
    applyPaddingTo && !withSafeAreaView ? useSafeAreaInsets() : undefined;

  const applyPadding = {
    [`padding${applyPaddingTo ? capitalizeFirstLetter(applyPaddingTo) : null}`]:
      applyPaddingTo ? padding?.[applyPaddingTo] : null,
  };
  if (withHeader && headerProps) {
    const hasDefinedProps = Object.values(headerProps).some(
      prop => prop !== undefined,
    );

    if (!hasDefinedProps) {
      throw new Error(
        "At least one property in 'headerProps' must be defined when 'withHeader' is true.",
      );
    }
  }

  return (
    <>
      {gradient.length >= 2 ? (
        <LinearGradient style={[Style.containers, style]} colors={gradient}>
          {withSafeAreaView ? (
            <SafeAreaView style={Style.containers}>
              {withHeader && <ScreenHeader {...headerProps} />}
              <Flex style={style}>{content}</Flex>
            </SafeAreaView>
          ) : (
            <Flex style={[style, applyPadding]}>
              {withHeader && <ScreenHeader {...headerProps} />}
              <Flex style={style}>{content}</Flex>
            </Flex>
          )}
        </LinearGradient>
      ) : withSafeAreaView ? (
        <SafeAreaView style={[style, Style.containers]}>
          {withHeader && <ScreenHeader {...headerProps} />}
          <Flex style={style}>{content}</Flex>
        </SafeAreaView>
      ) : (
        <Flex style={[style, applyPadding]}>
          {withHeader && <ScreenHeader {...headerProps} />}
          <Flex style={style}>{content}</Flex>
        </Flex>
      )}
    </>
  );
}

const Style = StyleSheet.create({
  containers: {
    flex: 1,
    height: Dimensions.get('screen').height,

    width: '100%',
  },
});

export default SkeletonScreen;
