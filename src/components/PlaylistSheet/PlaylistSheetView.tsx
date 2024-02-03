import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  useMyPlaylistQuery,
  useMyUploadsQuery,
} from '../../shared/hooks/useQueryData';

import MediaController from '../MediaController/MediaController';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from './PlaylistSheet';
import {useEffect} from 'react';
import {FlashList, ViewToken} from '@shopify/flash-list';
import {Dimensions, Text, View} from 'react-native';
import {setActiveVideo, setIndex} from '../../redux/videoListSlice';

type Props = {};
const data = [
  {
    id: 1,
    text: 'hoi',
  },
  {
    id: 2,
    text: 'hoi',
  },
  {
    id: 3,
    text: 'hoi',
  },
  {
    id: 4,
    text: 'hoi',
  },
  {
    id: 5,
    text: 'hoi',
  },
  {
    id: 6,
    text: 'hoi',
  },
];
export default function PlaylistSheetView({}: Props) {
  const playlistSheetSlice = useSelector(
    (state: RootState) => state.playlistSheetSlice,
  );

  const playlist = useMyPlaylistQuery();
  const myUploads = useMyUploadsQuery();
  // const data = playlistSheetSlice.data === 'playlist' ? playlist : myUploads;
  const dispatch = useDispatch();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length && viewableItems[0].index !== undefined) {
      const {item, index} = viewableItems[0];

      item !== null &&
        dispatch(
          setActiveVideo({
            turn_id: item.title,
            duration: item.duration,
          }),
        );
      if (index !== null) {
        dispatch(setIndex(index));
      }
    }
  };

  return (
    <>
      <FlashList
        data={playlist.data ?? []}
        estimatedItemSize={Dimensions.get('screen').height}
        estimatedListSize={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 40,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        automaticallyAdjustContentInsets={false}
        automaticallyAdjustsScrollIndicatorInsets={false}
        automaticallyAdjustKeyboardInsets={false}
        disableScrollViewPanResponder
        scrollToOverflowEnabled
        onScroll={() => console.log('Scrolling inside PlaylistView')}
        keyExtractor={item => String(item.turn_id)}
        renderItem={item => (
          <View
            style={{
              height: Dimensions.get('screen').height,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
            }}>
            <Text>{item.item.title}</Text>
          </View>
        )}
      />
      <MediaController
        collapseAnimationEnabled
        tabHeight={1}
        firstSnapPoint={FIRST_SNAP_POINT_MEDIACONTROLLER}
      />
    </>
  );
}
