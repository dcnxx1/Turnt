import {useLayout} from '@react-native-community/hooks';
import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useRef, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {ITurn} from '../../models/turn';
import _ from 'lodash';
import SkeletonFlashList from '../List/SkeletonFlashList';
import PlaylistItem from './PlaylistItem';
import {setPosition} from '../../redux/playlistSheetSlice';
import {
  setActiveSlice,
  setActiveTurn,
  setIndex,
  setIsPlaying,
} from '../../redux/videoListSlice';
import theme from '../../theme';
import {useQueryClient} from '@tanstack/react-query';
import {QueryKey, queryKey} from '../../api/api';

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
      onViewableItemsChanged={(info: {viewableItems: ViewToken[]}) => {
        if (info.viewableItems[0] && info.viewableItems[0].index !== null) {
          console.log(
            'This the information for savedSOngList :>>',
            info.viewableItems[0].item,
          );
        }
      }}
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
