import {useQueryClient} from '@tanstack/react-query';
import {ReactElement, useCallback} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {QueryKey} from '../../api/api';
import theme from '../../theme';
import RNanimted, {FadeIn} from 'react-native-reanimated';

type Props<T> = {
  data: T[] | undefined;
  isError: boolean;
  queryKeyToRefetch: QueryKey;
  isFetching?: boolean;
  style?: StyleProp<ViewStyle>;
  message: string;

  errorMessage?: string;
  isRefetching: boolean;
  ctaMessage: string;
  onEmptyPressAction?: () => void;
  fallbackIconSize?: number;
  children: ReactElement;
};

/**
 * Used for components that recieve data from network.
 *
 * This component renders a fallback message when there's an error or when the data is empty
 */

export default function FallbackMessage<T>({
  style,
  fallbackIconSize = 75,
  children,
  errorMessage,
  isFetching,
  ctaMessage,
  isRefetching,
  onEmptyPressAction,
  message,
  queryKeyToRefetch,
  isError,
  data,
}: Partial<Props<T>>) {
  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = useCallback(() => {
    Animated.timing(animatedButtonScale, {
      toValue: 1.03,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [animatedButtonScale]);

  const onPressOut = useCallback(() => {
    Animated.timing(animatedButtonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start();
  }, [animatedButtonScale]);

  if (isError) {
    const queryClient = useQueryClient();
    const onRefetchAction = async () => {
      await queryClient.refetchQueries({queryKey: [queryKeyToRefetch]});
    };
    return (
      <RNanimted.View
        entering={FadeIn.damping(100)}
        exiting={FadeIn.damping(100)}
        style={[Style.container, style]}>
        <View style={Style.header}>
          <Icon
            size={fallbackIconSize}
            source={require('../../assets/icons/broken-smartphone.png')}
          />
          <Text style={Style.textStyle}>Oops..</Text>
        </View>
        <View style={Style.body}>
          <Text style={[Style.textStyle, Style.bodyText]}>
            {errorMessage ? errorMessage : 'Er is een server fout opgetreden.'}
          </Text>
        </View>
        <Animated.View style={Style.footer}>
          <Pressable
            disabled={isRefetching}
            onPressOut={onPressOut}
            onPressIn={onPressIn}
            onPress={onRefetchAction}>
            <Animated.View
              style={[
                Style.retryButton,
                {transform: [{scale: animatedButtonScale}]},
              ]}>
              {isRefetching ? (
                <Icon
                  size={25}
                  source={require('../../assets/icons/fast-forward.png')}
                />
              ) : (
                <Text style={Style.bodyText}>Opnieuw Proberen</Text>
              )}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </RNanimted.View>
    );
  }

  if (!data || !data.length) {
    return (
      <View style={[Style.container, style]}>
        <View style={Style.header}>
          <Text style={Style.textStyle}>{message}</Text>
        </View>
        <View style={Style.body}>
          <Pressable
            onPress={onEmptyPressAction}
            onPressOut={onPressOut}
            onPressIn={onPressIn}>
            <Animated.View
              style={[
                Style.retryButton,
                {transform: [{scale: animatedButtonScale}]},
              ]}>
              <Text style={Style.textStyle}>{ctaMessage}</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    );
  }

  return children;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    gap: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textStyle: {
    fontSize: 24,
    color: theme.color.white,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 18,
    color: theme.color.white,
  },
  footer: {
    alignItems: 'center',
  },
  retryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.turner,
    borderRadius: 10,
    padding: 10,
  },
});
