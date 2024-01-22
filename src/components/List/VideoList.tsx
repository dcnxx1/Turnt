import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import {useSelector} from 'react-redux';
import {ITurn} from '../../models/turn';
import {RootState} from '../../redux/store';
import withSyncMediaController from '../MediaController/withSyncMediaController';
import VideoPlayer from '../Video/VideoPlayer';
import SkeletonFlashList from './SkeletonFlashList';
import useVideoList from './hooks/useVideoList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

type Props = {
  data: ITurn[];
  id: 'playlistSlice' | 'homeSlice';
  animateScrollToIndex?: boolean;
  onEndReached?: () => void;
};

const VideoSyncMediaController = withSyncMediaController(VideoPlayer);

export default function VideoList({
  data,
  id,
  animateScrollToIndex = true,
}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state[id]);
  const [isFocused, setIsFocused] = useState(true);
  const navigation = useNavigation();
  const [onViewableItemsChanged, keyExtractor, flashlistRef, viewConfigRef] =
    useVideoList();

  useEffect(() => {
    if (isActive) {
      if (flashlistRef.current) {
        if (index > data.length - 1) {
          flashlistRef.current.scrollToIndex({
            animated: animateScrollToIndex,
            index: 0,
          });
          return;
        }
        flashlistRef.current.scrollToIndex({
          animated: animateScrollToIndex,
          index: index,
        });
      }
    }
  }, [flashlistRef, index, data, isActive]);

  const renderItem: ListRenderItem<ITurn> = ({item: {turn_id, source}}) => {
    return (
      <VideoSyncMediaController id={id} videoId={turn_id} source={source} />
    );
  };

  useEffect(() => {
    const blurSub = navigation.addListener('blur', () => {
      console.log('blur called', id);
      setIsFocused(false);
    });
    const focusSub = navigation.addListener('focus', () => {
      console.log('focus called', id);

      setIsFocused(true);
    });
    return () => {
      navigation.removeListener('blur', blurSub);
      navigation.removeListener('focus', focusSub);
    };
  }, [navigation]);

  return (
    <SkeletonFlashList
      data={data}
      extraData={data}
      ref={flashlistRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      snapToInterval={Dimensions.get('screen').height}
      viewabilityConfig={viewConfigRef}
      onViewableItemsChanged={isFocused ? onViewableItemsChanged : undefined}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
