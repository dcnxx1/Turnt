import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useEffect, useReducer, useRef, useState} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import {OnLoadData} from 'react-native-video';
import {ITurn} from '../../models/turn';
import {useActiveTurnStore} from '../../store';
import useVideoListManagerDispatcherStore from '../../store/useVideoListManagerDispatcherStore';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';
import TrackPlayer from 'react-native-track-player';
import {turnToTrackMapper} from '../../utils';
import {Source} from '../../store/usePlaybackSourceStore';


type CollectionTurnProps = {
  data: ITurn[];
  source: Source;
};

export default function VideoListManager({data, source}: CollectionTurnProps) {
  const {setActiveTurn} = useActiveTurnStore();
  const [activeVideoOnScreen, setActiveVideoOnScreen] = useState(data[0]);

  const {increment, setIndex} = useVideoListManagerDispatcherStore();
  const index = useVideoListManagerDispatcherStore(state =>
    source === 'Home' ? state.index : state.playlistIndex,
  );

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

  const onViewableItemsChanged = async (info: {
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
        await TrackPlayer.load(turnToTrackMapper(currentActiveTurn));
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

  return (
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
}
