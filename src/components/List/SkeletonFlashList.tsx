import {
  ContentStyle,
  FlashList,
  FlashListProps,
  ListRenderItem,
  ViewToken,
} from '@shopify/flash-list';
import {useCallback} from 'react';

export interface SkeletonFlashListProps extends Partial<FlashListProps<any>> {
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
  data?: readonly any[] | null | undefined;
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
  data,
  snapToInterval,
  style,
}: SkeletonFlashListProps) {
  return (
    <FlashList
      style={style}
      {...config}
      {...onViewableItemsChanged}
      {...keyExtractor}
      estimatedListSize={estimatedListSize}
      {...data}
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
