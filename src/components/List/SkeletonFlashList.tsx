import {
  ContentStyle,
  FlashList,
  FlashListProps,
  ListRenderItem,
  ViewToken,
} from '@shopify/flash-list';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface SkeletonFlashListProps extends Partial<FlashListProps<any>> {
  onViewableItemsChanged?: (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => void;
  renderItem: ListRenderItem<any>;
  keyExtractor: ((item: any, index: number) => string) | undefined;
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
}

const config: Partial<FlashListProps<any>> = {};

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
  style,
  showScroll = false,
  hasSafeAreaInsets,
}: SkeletonFlashListProps) {
  const padding = useSafeAreaInsets();

  return (
    <FlashList
      {...config}
      style={style}
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
        paddingBottom: hasSafeAreaInsets ? padding.bottom : 0,
      }}
      snapToAlignment={snapToAlignment}
      snapToInterval={snapToInterval}
      bounces
    />
  );
}

export default SkeletonFlashList;
