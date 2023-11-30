import {
  ContentStyle,
  FlashList,
  FlashListProps,
  ListRenderItem,
  ViewToken,
} from '@shopify/flash-list';

interface SkeletonFlashListProps extends Partial<FlashListProps<any>> {
  onViewableItemsChanged?: (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => void;
  renderItem: ListRenderItem<any> | null | undefined;
  keyExtractor: ((item: any, index: number) => string) | undefined;
  estimatedItemSize: number | undefined;
  estimatedListSize:
    | {
        width: number;
        height: number;
      }
    | undefined;

  contentContainerStyle?: ContentStyle | undefined;
  enableSnap?: boolean;
  snapToInterval?: number | undefined;
  snapToAlignment?: 'start' | 'center' | 'end' | undefined;
  bounces?: boolean;
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
  snapToAlignment,
  snapToInterval,
}: SkeletonFlashListProps) {
  return (
    <FlashList
      {...config}
      {...onViewableItemsChanged}
      {...keyExtractor}
      {...estimatedListSize}
      estimatedItemSize={estimatedItemSize}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
      snapToAlignment={snapToAlignment}
      snapToInterval={snapToInterval}
      bounces
    />
  );
}

export default SkeletonFlashList;
