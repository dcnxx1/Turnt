import {FlashList, ListRenderItem} from '@shopify/flash-list';
import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {RootState} from '../../../redux/store';
import withSyncMediaController from '../../MediaController/withSyncMediaController';
import VideoPlayer from '../../Video/VideoPlayer';
import useVideoList from '../hooks/useVideoList';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function PlaylistVideoManager({data}: Props) {
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewablityConfigCallbackPairs] = useVideoList();
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

  const renderItem: ListRenderItem<ITurn> = ({
    item: {turn_id, source, type, cover},
  }) => {
    return (
      <VideoSyncMediaController
        cover={cover}
        type={type}
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
      disableIntervalMomentum
      snapToInterval={Dimensions.get('screen').height}
      viewabilityConfigCallbackPairs={viewablityConfigCallbackPairs.current}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
