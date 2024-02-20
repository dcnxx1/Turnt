import {FlashList, ListRenderItem} from '@shopify/flash-list';
import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {RootState} from '../../../redux/store';
import withSyncMediaController from '../../MediaController/withSyncMediaController';
import VideoPlayer from '../../Video/VideoPlayer';
import useVideoList from '../hooks/useVideoList';
import {useActiveTurnStore} from '../../../store';
import {setActiveVideo} from '../../../redux/listSlices/videoManagementSlice';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function PlaylistVideoManager({data}: Props) {
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewabilityConfig, onViewableItemsChanged] =
    useVideoList();
  const setActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  const dispatch = useDispatch();
  const {listIndex, isActive} = useSelector(
    (state: RootState) => state.playlistVideoSlice,
  );

  useEffect(() => {
    console.log("llistInde:>", listIndex, isActive)
    if (!isActive) return;
    if (flashListRef.current) {
      if (listIndex > data.length - 1) {
        flashListRef.current.scrollToIndex({
          animated: false,
          index: 0,
        });
        return;
      }
      flashListRef.current.scrollToIndex({
        animated: false,
        index: listIndex,
      });
    }
  }, [listIndex, data, isActive]);

  useEffect(() => {
    if (!isActive) return;
    setActiveTurn(data[listIndex]);
    dispatch(
      setActiveVideo({
        video_id: data[listIndex].turn_id,
        duration: data[listIndex].duration,
      }),
    );
  }, [data, isActive]);

  const renderItem: ListRenderItem<ITurn> = ({
    item: {turn_id, source, type, cover, impressionStartAt, impressionSource},
  }) => {
    return (
      <VideoSyncMediaController
        impressionSource={impressionSource}
        impressionStartAt={impressionStartAt}
        cover={cover}
        type={type}
        id={'playlistVideoSlice'}
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
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      bounces={false}
      onViewableItemsChanged={onViewableItemsChanged}
      snapToInterval={Dimensions.get('screen').height}
      viewabilityConfig={viewabilityConfig.current}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
