import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfig,
} from 'react-native';
import {OnLoadData} from 'react-native-video';
import {ITurn} from '../../models/turn';
import {useActiveTurnStore, useSeek, useVideoStore} from '../../store';
import useVideoListIndexDispatch from '../../store/useVideoListIndexDispatch';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';

type CollectionTurnProps = {
  data: ITurn[];
};

export default function VideoListManager({data}: CollectionTurnProps) {
  const {setActiveTurn} = useActiveTurnStore();
  const {index, increment, setIndex} = useVideoListIndexDispatch();
  const ref = useRef<FlashList<ITurn>>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToIndex({
        animated: true,
        index,
      });
    }
  }, [index, ref]);

  const onLoad = (videoData: OnLoadData) => {};

  const renderItem: ListRenderItem<ITurn> = ({item}) => {
    return (
      <VideoPlayerManager
        onLoad={onLoad}
        source={item.source}
        videoId={item.turn_id}
        onEnd={increment}
      />
    );
  };

  const keyExtractor = ({turn_id}: ITurn) => {
    return String(turn_id);
  };

  const onViewableItemsChanged = (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => {
    if (
      info.viewableItems.length &&
      info.viewableItems[0].index !== undefined
    ) {
      const {item, index} = info.viewableItems[0];
      if (item !== null) {
        const currentActiveTurn = item as ITurn;
        setActiveTurn(currentActiveTurn);
      }
      if (index !== null) {
        setIndex(index);
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  const content = (
    <SkeletonFlashList
      extraData={data}
      ref={ref}
      decelerationRate={'fast'}
      data={data}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef}
      bounces={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );

  return <SkeletonScreen content={content} />;
}
