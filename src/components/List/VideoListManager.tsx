import { FlashList, ListRenderItem, ViewToken } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ViewabilityConfig } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { OnLoadData } from 'react-native-video';
import { ITurn } from '../../models/turn';
import { turnToTrackMapper } from '../../utils';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';

import VideoListManagerProvider from '../../shared/context/VideoListManagerProvider';
import { useActiveTurnStore } from '../../store';

type VideoListManagerProps = {
  data: ITurn[];
  index: number;
  setIndex: (index: number) => void;
};

export default function VideoListManager({
  data,
  index,
  setIndex,
}: VideoListManagerProps) {
  const {setActiveTurn: setActiverrTurn} = useActiveTurnStore();

  const ref = useRef<FlashList<ITurn>>(null);

  const [activeTurn, setActiveTurn] = useState<ITurn>();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToIndex({
        animated: true,
        index,
      });
    }
  }, [index, ref]);

  const onLoad = (videoData: OnLoadData) => {};

  const renderItem: ListRenderItem<ITurn> = ({item, index}) => {
    return <VideoPlayerManager source={item.source} videoId={item.turn_id} />;
  };

  const keyExtractor = ({turn_id, title}: ITurn) => {
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
        TrackPlayer.load(turnToTrackMapper(currentActiveTurn));

        setActiveTurn(currentActiveTurn);
        setActiverrTurn(currentActiveTurn);
      }
      if (index !== null) {
        setIndex(index);
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  return (

      <SkeletonFlashList
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
}
