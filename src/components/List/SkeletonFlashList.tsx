import {
  ContentStyle,
  FlashList,
  ListRenderItem,
  ViewToken,
} from '@shopify/flash-list';
import {forwardRef} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfig,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
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
  enableSnap?: boolean;
  snapToInterval?: number | undefined;
  snapToAlignment?: 'start' | 'center' | 'end' | undefined;
  bounces?: boolean;
  data?: readonly T[];
  hasSafeAreaInsets?: boolean;
  decelerationRate?: number | 'fast' | 'normal' | undefined;
  showScroll?: boolean;
  FULL_SCREEN?: boolean;
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
      bounces = false,
      decelerationRate,
      snapToAlignment,
      viewabilityConfig,
      data,
      snapToInterval = screenHeight,
      showScroll = false,
      hasSafeAreaInsets,
      extraData,
    }: SkeletonFlashListProps<any>,
    ref,
  ) => {
    const padding = useSafeAreaInsets();
    return (
      <FlashList
        ref={ref}
        data={data}
        onViewableItemsChanged={onViewableItemsChanged}
        showsHorizontalScrollIndicator={showScroll}
        keyExtractor={keyExtractor}
        estimatedListSize={estimatedListSize}
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
