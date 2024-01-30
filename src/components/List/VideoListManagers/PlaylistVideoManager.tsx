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
import {setActiveVideo} from '../../../redux/videoListSlice';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function PlaylistVideoManager({data}: Props) {
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewablityConfigCallbackPairs] = useVideoList();
  const setActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  const dispatch = useDispatch();
  const {index, isActive} = useSelector(
    (state: RootState) => state.playlistSlice,
  );

  useEffect(() => {
    if (!isActive) return;
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
  }, [index, data]);

  useEffect(() => {
    if(!isActive) return
    setActiveTurn(data[index]);
    dispatch(
      setActiveVideo({
        turn_id: data[index].turn_id,
        duration: data[index].duration,
      }),
    );
  }, [data, isActive]);

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
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      bounces={false}
      
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
