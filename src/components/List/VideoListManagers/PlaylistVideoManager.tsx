import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ITurn} from '../../../models/turn';
import SkeletonFlashList from '../SkeletonFlashList';
import useVideoList from '../hooks/useVideoList';
import React, {useEffect} from 'react';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import withSyncMediaController from '../../MediaController/withSyncMediaController';
import VideoPlayer from '../../Video/VideoPlayer';
import {Dimensions} from 'react-native';
import {useRef} from 'react';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function PlaylistVideoManager({data}: Props) {
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [onViewableItemsChanged, keyExtractor, viewConfigRef] = useVideoList();
  const {index, isActive} = useSelector(
    (state: RootState) => state.playlistSlice,
  );

  useEffect(() => {
    if (flashListRef.current) {
      if (index > data.length - 1) {
        flashListRef.current.scrollToIndex({
          animated: false,
          index: 0,
        });
        return;
      }
      flashListRef.current.scrollToIndex({
        animated: false,
        index: index,
      });
    }
  }, [index, isActive, data]);

  const renderItem: ListRenderItem<ITurn> = ({item: {turn_id, source}}) => {
    return (
      <VideoSyncMediaController
        id={'playlistSlice'}
        videoId={turn_id}
        source={source}
      />
    );
  };

  return (
    <FlashList
      data={data}
      ref={flashListRef}
      renderItem={renderItem}
      initialScrollIndex={0}
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