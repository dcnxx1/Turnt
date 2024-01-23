import {useEffect} from 'react';
import {Dimensions, FlatList, ViewToken} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import SkeletonFlashList from './SkeletonFlashList';
import useVideoList from './hooks/useVideoList';
import {FlashList, ListRenderItem} from '@shopify/flash-list';

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

  const [
    onViewableItemsChanged,
    keyExtractor,
    flashlistRef,
    viewConfigRef,
    viewabilityConfigCallbackPairs,
  ] = useVideoList();

  useEffect(() => {
    if (isActive) {
      if (flashlistRef.current) {
        flashlistRef.current.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    }
  }, [flashlistRef, index, data, isActive]);

  return (
    <FlatList
      extraData={data}
      data={data}
      initialNumToRender={10}
      // ref={flashlistRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      snapToInterval={Dimensions.get('screen').height}
      // viewabilityConfig={viewConfigRef}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      // onViewableItemsChanged={onViewableItemsChanged}
      decelerationRate={'fast'}
      // estimatedItemSize={Dimensions.get('screen').height}
      // estimatedListSize={{
      //   width: Dimensions.get('screen').width,
      //   height: Dimensions.get('screen').height,
      // }}
    />
  );
}
