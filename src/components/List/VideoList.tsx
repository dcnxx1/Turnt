import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useCallback, useEffect, useRef} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import SkeletonFlashList from './SkeletonFlashList';
import useVideoList from './hooks/useVideoList';

type Props = {
  data: ITurn[];
  id: 'playlistSlice' | 'homeSlice';
  animateScrollToIndex?: boolean;
  onEndReached?: () => void;
};

const VIDEO_BECAME_ACTIVE_AT_PERCENT = 95;
const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({
  data,
  id,
  animateScrollToIndex = true,
}: Props) {
  const [onViewableItemsChanged, keyExtractor] = useVideoList();
  const ref = useRef<FlashList<ITurn>>(null);
  const index = useSelector((state: RootState) => state[id].index);

  useEffect(() => {
    if (ref.current) {
      if (index > data.length - 1) {
        ref.current.scrollToIndex({
          animated: animateScrollToIndex,
          index: 0,
        });
        return;
      }
      ref.current.scrollToIndex({
        animated: animateScrollToIndex,
        index: index,
      });
    }
  }, [ref, index, data]);

  const renderItem: ListRenderItem<ITurn> = ({item: {turn_id, source}}) => {
    return (
      <VideoSyncMediaController id={id} videoId={turn_id} source={source} />
    );
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: VIDEO_BECAME_ACTIVE_AT_PERCENT,
  }).current;

  return (
    <SkeletonFlashList
      data={data}
      extraData={data}
      ref={ref}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      viewabilityConfig={viewConfigRef}
      onViewableItemsChanged={onViewableItemsChanged}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}