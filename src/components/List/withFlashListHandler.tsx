import {FlashList, FlashListProps} from '@shopify/flash-list';
import SkeletonFlashList, {SkeletonFlashListProps} from './SkeletonFlashList';
import {ReactNode, useCallback} from 'react';

export default function withFlashListHandler<P>(SkeletonFlashlist: React.ComponentType<P>) {
  return (
    data: [],
    estimatedItemSize: number,
    estimatedListSize: SkeletonFlashListProps['estimatedListSize'],
    renderItem: SkeletonFlashListProps['renderItem'],
  ) => {
    const keyExtractor = (item: any, index: number) => {
      return String(index);
    };

    return (
      <SkeletonFlashList
        renderItem={renderItem}
        data={data}
        estimatedItemSize={estimatedItemSize}
        estimatedListSize={estimatedListSize}
        keyExtractor={keyExtractor}
      />
    );
  };
}
