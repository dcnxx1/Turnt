import {useLayout} from '@react-native-community/hooks';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useQueryClient} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {QueryKey, queryKey} from '../../api/api';
import {ITurn} from '../../models/turn';
import {setPosition} from '../../redux/playlistSheetSlice';
import {setActiveSlice, setIndex} from '../../redux/videoListSlice';
import theme from '../../theme';
import SkeletonFlashList from '../List/SkeletonFlashList';
import PlaylistItem from './PlaylistItem';

type Props = {
  data: ITurn[];
  queryKeyRefresh: QueryKey;
};

type SongList = {
  turn_id: string;
};
const ESTIMATED_SONG_ITEM_SIZE = 200;

/**
 *
 * @param queryKey for refreshing
 */

export default function SavedSongList({data, queryKeyRefresh}: Props) {
  const [isRefreshing, setRefreshing] = useState(false);
  const ref = useRef<FlashList<SongList>>(null);
  const flashListLayout = useLayout();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    try {
      setRefreshing(true);
      queryClient.invalidateQueries({
        queryKey: [queryKeyRefresh],
        stale: true,
      });
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  const onPressPlaylistItem = (turn_id: string, index: number) => {
    dispatch(setPosition('FullScreen'));
    dispatch(setActiveSlice('playlistSlice'));
    queryClient.setQueryData([queryKey.playlistSheet], data);
    dispatch(setIndex(index));
  };

  const renderItem: ListRenderItem<ITurn> = ({item, index}) => {
    return (
      <PlaylistItem
        index={index}
        cover={item.cover}
        onPress={onPressPlaylistItem}
        title={item.title}
        id={item.turn_id}
        duration={item.duration}
      />
    );
  };

  const keyExtractor = (item: SongList) => {
    return item.turn_id;
  };

  return (
    <SkeletonFlashList
      contentContainerStyle={{
        backgroundColor: theme.color.turnerPurpleDark,
      }}
      bounces
      onRefresh={onPullToRefresh}
      refreshing={isRefreshing}
      estimatedItemSize={ESTIMATED_SONG_ITEM_SIZE}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: ESTIMATED_SONG_ITEM_SIZE,
      }}
      decelerationRate={undefined}
      onLayout={flashListLayout.onLayout}
      ref={ref}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data}
      extraData={data}
    />
  );
}
