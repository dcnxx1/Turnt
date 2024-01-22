import {
  ContentStyle,
  FlashList,
  ListRenderItem,
  FlashListProps,
  ViewToken,
} from '@shopify/flash-list';
import {forwardRef} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  View,
  ViewabilityConfig,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export type SkeletonFlashListProps<T> = {
  onViewableItemsChanged?: (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => void;
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  estimatedItemSize: number;
  estimatedListSize: {
    width: number;
    height: number;
  };
  contentContainerStyle?: ContentStyle | undefined;
  ListFooterComponent?: FlashListProps<T>['ListFooterComponent'];
  enableSnap?: boolean;
  onEndReached?: () => void | undefined | null;
  snapToInterval?: number | undefined;
  snapToAlignment?: 'start' | 'center' | 'end' | undefined;
  bounces?: boolean;
  data?: readonly T[];
  onRefresh?: () => void;
  refreshing?: boolean;
  hasSafeAreaInsets?: boolean;
  decelerationRate?: number | 'fast' | 'normal' | undefined;
  showScroll?: boolean;
  onLayout?: (ev: LayoutChangeEvent) => void;
  viewabilityConfig?: ViewabilityConfig | null | undefined;
  extraData?: T;
};

export default forwardRef<FlashList<any>, SkeletonFlashListProps<any>>(
  (
    {
      onViewableItemsChanged,
      renderItem,
      keyExtractor,
      estimatedItemSize = screenWidth,
      estimatedListSize = {
        width: screenHeight,
        height: screenHeight,
      },
      contentContainerStyle,
      enableSnap,
      onEndReached,
      ListFooterComponent,
      onLayout,
      bounces = false,
      decelerationRate,
      snapToAlignment = undefined,
      viewabilityConfig,
      refreshing,
      data,
      snapToInterval = undefined,
      showScroll = false,
      hasSafeAreaInsets,
      extraData,
      onRefresh,
    }: SkeletonFlashListProps<any>,
    ref,
  ) => {
    const padding = useSafeAreaInsets();
    return (
      <FlashList
        onLayout={onLayout}
        ref={ref}
        data={data}
        onEndReached={onEndReached}
        onViewableItemsChanged={onViewableItemsChanged}
        showsHorizontalScrollIndicator={showScroll}
        
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        estimatedListSize={estimatedListSize}
        ListFooterComponent={ListFooterComponent}
        decelerationRate={decelerationRate}
        viewabilityConfig={viewabilityConfig}
        extraData={extraData}
        estimatedItemSize={estimatedItemSize}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: hasSafeAreaInsets ? padding.top : 0,
        }}
        snapToAlignment={snapToAlignment}
        snapToInterval={snapToInterval}
        bounces={bounces}
      />
    );
  },
);
