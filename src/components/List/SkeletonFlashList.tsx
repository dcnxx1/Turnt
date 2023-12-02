import {
  ContentStyle,
  FlashList,
  FlashListProps,
  ListRenderItem,
  ViewToken,
} from '@shopify/flash-list';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  data?: readonly any[] | null | undefined;
  hasSafeAreaInsets?: boolean;
  decelerationRate: number | 'fast' | 'normal' | undefined;
  showScroll?: boolean;
} & FlashListProps<T>;

function SkeletonFlashList<T>({
  onViewableItemsChanged,
  renderItem,
  keyExtractor,
  estimatedItemSize,
  estimatedListSize,
  contentContainerStyle,
  enableSnap,
  bounces = false,
  decelerationRate,
  snapToAlignment,
  data,
  snapToInterval,
  showScroll = false,
  hasSafeAreaInsets,
}: SkeletonFlashListProps<T>) {
  const padding = useSafeAreaInsets();

  return (
    <FlashList
      data={data}
      onViewableItemsChanged={onViewableItemsChanged}
      showsHorizontalScrollIndicator={showScroll}
      keyExtractor={keyExtractor}
      estimatedListSize={estimatedListSize}
      decelerationRate={decelerationRate}
      estimatedItemSize={estimatedItemSize}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: hasSafeAreaInsets ? padding.top : 0,
      }}
      snapToAlignment={snapToAlignment}
      snapToInterval={snapToInterval}
      bounces
    />
  );
}

export default SkeletonFlashList;
