import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import useVideoList from './hooks/useVideoList';
import TrackPlayer from 'react-native-track-player';
import {TURN_IMPRESSION_TIME} from '../../constants';
import {turnToTrackMapper} from '../../utils';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({data}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state.homeSlice);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewabilityConfigCallbackPairs] = useVideoList();
  const isImpression = useSelector(
    (state: RootState) => state.homeSlice.isImpression,
  );

  useEffect(() => {
    async function updateTrackPlayer() {
      try {
        await TrackPlayer.updateNowPlayingMetadata(
          turnToTrackMapper(data[index], isImpression),
        );
        await TrackPlayer.load(turnToTrackMapper(data[index], isImpression));
      } catch (err) {
        throw new Error('ERR SET TRACKPLAYER SYNC IMPRESSION TIME');
      }
    }
    updateTrackPlayer();
  }, [isImpression, isActive, index]);

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
    item: {turn_id, source, type, cover, impressionSource},
  }) => {
    return (
      <VideoSyncMediaController
        impressionSource={impressionSource}
        cover={cover}
        type={type}
        id={'homeSlice'}
        videoId={turn_id}
        source={source}
      />
    );
  };

  return (
    <FlashList
      extraData={data}
      bounces={false}
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
