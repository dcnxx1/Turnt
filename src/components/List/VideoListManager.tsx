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

type CollectionTurnProps = {
  data: ITurn[];
  id: Source;
  index: number;
};

type VideoListManagerContext = {
  activeVideoOnScreen: ITurn;
};

const VideoListContext = createContext<VideoListManagerContext>(
  {} as VideoListManagerContext,
);

export const useVideoListContext = () => {
  const context = useContext(VideoListContext);
  if (!context) {
    throw new Error(
      "useVideoListContext needs to be used within it's provider",
    );
  }
  return context;
};

export default function VideoListManager({
  data,
  id,
  index,
}: CollectionTurnProps) {
  const {setActiveTurn} = useActiveTurnStore();
  const [activeVideoOnScreen, setActiveVideoOnScreen] = useState(data[0]);
  const ref = useRef<FlashList<ITurn>>(null);

  const {increment, setIndex} = useVideoListManagerDispatcherStore();

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
    return (
      <VideoPlayerManager
        id={id}
        onLoad={onLoad}
        source={item.source}
        videoId={item.turn_id}
        onEnd={increment}
      />
    );
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
        setActiveVideoOnScreen(currentActiveTurn);
        setActiveTurn(currentActiveTurn);
      }
      if (index !== null) {
        setIndex(index);
        console.log("index :>>", index ,{"with id :>>": id})
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  return (
    <VideoListContext.Provider value={{activeVideoOnScreen}}>
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
    </VideoListContext.Provider>
  );
}
