import {useLayout} from '@react-native-community/hooks';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useQueryClient} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {QueryKey} from '../../api/api';
import {ITurn} from '../../models/turn';

import theme from '../../theme';
import SkeletonFlashList from '../List/SkeletonFlashList';
import PlaylistItem from './SavedSongListItem';
import {setNewPosition, setPosition} from '../../redux/playlistSheetSlice';
import {initializeSlice} from '../../redux/listSlices/videoManagementSlice';

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

  const onPressPlaylistItem = (
    index: number,
    turn_id: string,
    duration: number,
  ) => {
    dispatch(
      initializeSlice({
        initializeSlice: 'playlistVideoSlice',
        isActive: true,
        isPlaying: true,
        listIndex: index,
        activeVideo: {
          video_id: turn_id,
          duration: duration,
        },
      }),
    );

    dispatch(setPosition('FullScreen'));
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
