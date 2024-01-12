import BottomSheet from '@gorhom/bottom-sheet';
import {useQueryClient} from '@tanstack/react-query';
import {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ITurn} from '../../models/turn';
import VideoListContext from '../../shared/context/VideoListContext';
import VideoList from '../List/VideoList';
import {HEIGHT_BOTTOM_TAB} from '../Tabbar/BottomTab';
import usePlaylistSheet from './hooks/usePlaylistSheet';

type Props = {
  tabHeight: number;
  animatedPosition: SharedValue<number>;
};

export default function PlaylistSheet({tabHeight, animatedPosition}: Props) {
  const queryClient = useQueryClient();
  const {bottom} = useSafeAreaInsets();
  const snapPoints = useMemo(() => [HEIGHT_BOTTOM_TAB + bottom, '100%'], [bottom]);
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();
  const playlistData: ITurn[] | undefined = queryClient.getQueryData([
    'playlist',
  ]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      handleComponent={() => (
        <View
          style={{
            height: Dimensions.get('screen').height * 0.1,
            borderWidth: 5,
            borderColor: 'blue',
            position: 'absolute',
            width: '100%',
          }}></View>
      )}
      enableOverDrag={false}
      animatedPosition={animatedPosition}
      onChange={onChangeBottomSheetPosition}
      handleStyle={{
        backgroundColor: '#00000000',
      }}
      snapPoints={snapPoints}>
      <View style={Style.container}>
        {playlistData ? (
          <VideoListContext
            id={'playlistSlice'}
            defaultValue={playlistData ? playlistData[0] : ({} as ITurn)}>
            <VideoList
              animateScrollToIndex={false}
              id={'playlistSlice'}
              data={playlistData ?? []}
            />
          </VideoListContext>
        ) : null}
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'yellow',
    height: '100%',
  },
});
