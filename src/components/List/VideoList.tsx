import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useEffect, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import useVideoList from './hooks/useVideoList';
import TrackPlayer from 'react-native-track-player';
import {turnArrayToTracksMapper} from '../../app/boot';
import {useCDN} from '../../api/api';
import {COVER_KEY} from '../../s3';

type Props = {
  data: ITurn[];
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({data}: Props) {
  const {listIndex, isActive} = useSelector(
    (state: RootState) => state.homeVideoSlice,
  );
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const [keyExtractor, viewabiltyConfig, onViewableItemsChanged] =
    useVideoList();

  // useEffect(() => {
  //   async function updateImpressionTracks() {
  //     if (false) {
  //       await TrackPlayer.updateNowPlayingMetadata({
  //         artist: data[listIndex].user.alias,
  //         duration: 30,
  //         title: data[listIndex].title,
  //         artwork: useCDN(COVER_KEY + data[listIndex].cover),
  //       });
  //     } else {
  //       await TrackPlayer.updateNowPlayingMetadata({
  //         artist: data[listIndex].user.alias,
  //         duration: data[listIndex].duration,
  //         title: data[listIndex].title,

  //         artwork: useCDN(COVER_KEY + data[listIndex].cover),
  //       });
  //     }
  //   }
  //   updateImpressionTracks();
  // }, [false, data]);

  useEffect(() => {
    console.log('ISACTIVE MF :>', isActive);
  }, [isActive]);
  useEffect(() => {
    if (!isActive) return;

    if (flashListRef.current) {
      flashListRef.current.scrollToIndex({
        animated: true,
        index: listIndex,
      });
    }
  }, [flashListRef, listIndex, data, isActive]);

  const renderItem: ListRenderItem<ITurn> = ({
    item: {turn_id, source, type, cover, impressionStartAt, impressionSource},
  }) => {
    return (
      <VideoSyncMediaController
        impressionSource={impressionSource}
        impressionStartAt={impressionStartAt}
        cover={cover}
        type={type}
        id={'homeVideoSlice'}
        videoId={turn_id}
        source={source}
      />
    );
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <FlashList
        extraData={{...[data]}}
        bounces={false}
        data={data}
        ref={flashListRef}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        snapToAlignment="start"
        disableIntervalMomentum
        snapToInterval={Dimensions.get('screen').height}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabiltyConfig.current}
        decelerationRate={'fast'}
        estimatedItemSize={Dimensions.get('screen').height}
        estimatedListSize={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
      />
    </View>
  );
}
