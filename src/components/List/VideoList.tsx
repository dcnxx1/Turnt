import {FlashList, ListRenderItem} from '@shopify/flash-list';

import {memo, useCallback, useEffect, useRef} from 'react';
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

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

function VideoList({data}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state.homeSlice);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewabilityConfigCallbackPairs] = useVideoList();

  useEffect(() => {
    if (!isActive) return;

    if (flashListRef.current) {
      flashListRef.current.scrollToIndex({
        index: index,
      });
    }
  }, [flashListRef, index, data, isActive]);

  const renderItem: ListRenderItem<ITurn> = useCallback(
    ({item: {turn_id, source, type, cover}}) => {
      return (
        <VideoSyncMediaController
          cover={cover}
          type={type}
          id={'homeSlice'}
          videoId={turn_id}
          source={source}
        />
      );
    },
    [data],
  );

  useEffect(() => {
    console.log({index});
  }, [index]);

  return (
    <FlashList
      bounces={false}
      data={data}
      horizontal={false}
      ref={flashListRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialScrollIndex={0}
      removeClippedSubviews
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      onScrollToTop={() => console.log('scrolling to top :>>')}
      onScroll={() => console.log('Scrolllllling........')}
      scrollsToTop={false}
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

export default memo(VideoList);
