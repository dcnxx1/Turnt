import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {OnLoadData} from 'react-native-video';
import {ITurn} from '../../models/turn';
import {useActiveTurnStore} from '../../store';
import {Source} from '../../store/usePlaybackSourceStore';
import useVideoListManagerDispatcherStore from '../../store/useVideoListManagerDispatcherStore';
import {turnToTrackMapper} from '../../utils';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';
import {useDispatch} from 'react-redux';

import {useVideoListContext} from '../../shared/context/VideoListManagerProvider';

type VideoListManagerProps = {
  data: ITurn[];
};

export default function VideoListManager({data}: VideoListManagerProps) {
  const {setNewActiveVideo} = useVideoListContext();

  const ref = useRef<FlashList<ITurn>>(null);
  const {index, setNewIndex, incrementIndex} = useVideoListContext();

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
        setNewActiveVideo(item);
      }
      if (index !== null) {
        setNewIndex(index);
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
