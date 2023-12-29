import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import {FileType, ITurn} from '../../models/turn';
import {useTurnContext} from '../../shared/context/TurnContext';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';
import useVideoListIndexDispatch from '../../store/useVideoListIndexDispatch';
import {useActiveTurnStore} from '../../store';

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

  const renderItem: ListRenderItem<ITurn> = ({item}) => {
    return (
      <VideoPlayerManager
        fileType={item.type as FileType}
        videoCover={item.cover}
        source={item.source}
        videoId={item.turn_id}
        onEnd={increment}
      />
    );
  };

  useEffect(() => {
    setActiveTurn(data[0]);
  }, []);

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
      extraData={[...data]}
      ref={ref}
      decelerationRate={'fast'}
      data={data}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
      bounces={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );

  return <SkeletonScreen content={content} />;
}
