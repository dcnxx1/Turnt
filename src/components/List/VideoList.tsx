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

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({
  data,
  id,
  animateScrollToIndex = true,
}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state[id]);
  const [onViewableItemsChanged, keyExtractor, flashlistRef, viewConfigRef] =
    useVideoList();

  useEffect(() => {
    if (isActive) {
      if (flashlistRef.current) {
        if (index > data.length - 1) {
          flashlistRef.current.scrollToIndex({
            animated: animateScrollToIndex,
            index: 0,
          });
          return
        }
        flashlistRef.current.scrollToIndex({
          animated: animateScrollToIndex,
          index: index,
        });
      }
    }
  }, [flashlistRef, index, data, isActive]);

  const renderItem: ListRenderItem<ITurn> = ({item: {turn_id, source}}) => {
    return (
      <VideoSyncMediaController id={id} videoId={turn_id} source={source} />
    );
  };

  return (
    <SkeletonFlashList
      data={data}
      extraData={data}
      ref={flashlistRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      snapToInterval={Dimensions.get('screen').height}
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
