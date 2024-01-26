import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useCallback, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {setPosition} from '../../redux/playlistSheetSlice';
import {RootState} from '../../redux/store';
import {increment, setActiveSlice} from '../../redux/videoListSlice';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import useVideoList from './hooks/useVideoList';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({data}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state.homeSlice);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewabilityConfigCallbackPairs] = useVideoList();
  const dispatch = useDispatch();
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

  const renderItem: ListRenderItem<ITurn> = ({
    item: {turn_id, source, type, cover},
  }) => {
    return (
      <VideoSyncMediaController
        cover={cover}
        type={type}
        id={'homeSlice'}
        videoId={turn_id}
        source={source}
      />
    );
  };

  const onScrollBeginDrag = useCallback(() => {
    if (isActive) return;
    dispatch(setActiveSlice('homeSlice'));
    dispatch(setPosition('Hidden'));
    dispatch(increment());
  }, [dispatch, isActive, index]);

  return (
    <FlashList
      extraData={data}
      bounces={false}
      onScrollBeginDrag={onScrollBeginDrag}
      data={data}
      ref={flashListRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      disableIntervalMomentum
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
