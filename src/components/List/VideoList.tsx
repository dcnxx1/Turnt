import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useEffect, useMemo, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import useVideoList from './hooks/useVideoList';

type Props = {
  data: ITurn[];
};
const renderItem: ListRenderItem<ITurn> = ({item: {turn_id, source}}) => {
  return (
    <VideoSyncMediaController
      id={'homeSlice'}
      videoId={turn_id}
      source={source}
    />
  );
};
const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({data}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state.homeSlice);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [
    onViewableItemsChanged,
    keyExtractor,
    viewConfigRef,
    viewabilityConfigCallbackPairs,
  ] = useVideoList();

  useEffect(() => {
    if (isActive) {
      if (flashListRef.current) {
        flashListRef.current.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    }
  }, [flashListRef, index, data, isActive]);

  return (
    <FlashList
      extraData={data}
      data={data}
      ref={flashListRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      snapToInterval={Dimensions.get('screen').height}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
