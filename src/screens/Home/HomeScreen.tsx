import {
  FlashList,
  ListRenderItem,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Dimensions, View, ViewToken, ViewabilityConfig} from 'react-native';
import {Text} from 'react-native-paper';
import Video from 'react-native-video';

function HomeScreen(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}>
      <Text>Yo</Text>
    </View>
  );
}

export default HomeScreen;
