import {ListRenderItem} from '@shopify/flash-list';
import {useEffect, useRef} from 'react';
import {Dimensions, ViewToken, ViewabilityConfig} from 'react-native';
import {TURN_KEY, useCDN} from '../../api/api';
import {ITurn} from '../../models/turn';
import {useVideoListContext} from '../../shared/context/VideoListContext';
import VideoPlayer from '../Video/VideoPlayer';
import SkeletonFlashList from './SkeletonFlashList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {increment} from '../../redux/videoListSlice';

type Props = {
  data: ITurn[];
  id: 'playlistSlice' | 'homeSlice';
};

type ComponentProp = {
  source: string;
  id: string;
  selectorId: 'playlistSlice' | 'homeSlice';
};

const MiddleComponent = ({source, id, selectorId}: ComponentProp) => {
  const onProgress = () => {};
  const {activeTurn} = useVideoListContext();
  const dispatch = useDispatch();
  const shouldPlay = activeTurn.turn_id === id
  const isPlaying = useSelector(
    (state: RootState) => state[selectorId].isPlaying,
  );

  return (
    <VideoPlayer
      onEnd={() => dispatch(increment())}
      source={useCDN(TURN_KEY + source)}
      paused={shouldPlay ? !isPlaying: true}
      onProgress={onProgress}
    />
  );
};

export default function VideoList({data, id}: Props) {
  const {setActiveTurn} = useVideoListContext();
  const state = useSelector((state: RootState) => state[id]);
  const dispatch = useDispatch();
  const renderItem: ListRenderItem<ITurn> = ({
    item: {turn_id, source},
    index,
  }) => {
    return <MiddleComponent selectorId={id} source={source} id={turn_id} />;
  };

  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
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
        dispatch(increment());
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  return (
    <SkeletonFlashList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      viewabilityConfig={viewConfigRef}
      onViewableItemsChanged={onViewableItemsChanged}
      decelerationRate={'fast'}
      data={data}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
