import {useLayout} from '@react-native-community/hooks';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useRef, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {ITurn} from '../../models/turn';
import _ from 'lodash';
import SkeletonFlashList from '../List/SkeletonFlashList';
import PlaylistItem from './PlaylistItem';
import {setPosition} from '../../redux/playlistSheetSlice';
import {setIndex} from '../../redux/videoListSlice';
import theme from '../../theme';
import {useQueryClient} from '@tanstack/react-query';
import {queryKey} from '../../api/api';

type Props = {
  data: ITurn[];
  onRefresh: () => void;
};

type SongList = {
  turn_id: string;
};
const ESTIMATED_SONG_ITEM_SIZE = 200;

export default function SavedSongList({data, onRefresh}: Props) {
  const [isRefreshing, setRefreshing] = useState(false);
  const ref = useRef<FlashList<SongList>>(null);
  const flashListLayout = useLayout();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const playlistObs = queryClient.getQueryState(['playlist']);
  const onPullToRefresh = async () => {
    try {
      setRefreshing(true);
      queryClient.invalidateQueries({queryKey: ['playlist']});
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  const onPressPlaylistItem = (turn_id: string, index: number) => {
    queryClient.setQueryData([queryKey.playlistSheet], data);
    dispatch(setPosition('FullScreen'));
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
      onRefresh={onRefresh}
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
