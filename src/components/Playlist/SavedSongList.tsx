import {useLayout} from '@react-native-community/hooks';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {ITurn} from '../../models/turn';
import _ from 'lodash';
import SkeletonFlashList from '../List/SkeletonFlashList';
import PlaylistItem from './PlaylistItem';
import {setPosition} from '../../redux/playlistSheetSlice';

type Props = {
  data: ITurn[];
};

type SongList = {
  turn_id: string;
};
const ESTIMATED_SONG_ITEM_SIZE = 200;

export default function SavedSongList({data}: Props) {
  const ref = useRef<FlashList<SongList>>(null);
  const flashListLayout = useLayout();
  const dispatch = useDispatch();

  const onPressPlaylistItem = (turn_id: string, index: number) => {
    console.log('onPressPLaylistItem ');
    dispatch(setPosition('FullScreen'));
  }

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
      bounces
      estimatedItemSize={ESTIMATED_SONG_ITEM_SIZE}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: ESTIMATED_SONG_ITEM_SIZE,
      }}
      onLayout={flashListLayout.onLayout}
      ref={ref}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data}
      extraData={data}
    />
  );
}
