import BottomSheet from '@gorhom/bottom-sheet';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ITurn} from '../../models/turn';
import usePlaylistSheet from './hooks/usePlaylistSheet';
import VideoListManagerProvider from '../../shared/context/VideoListManagerProvider';
import VideoListManager from '../List/VideoListManager';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type Props = {
  tabHeight: number;
};

export default function PlaylistSheet({tabHeight}: Props) {
  const queryClient = useQueryClient();
  const snapPoints = useMemo(() => ['10%', '86%'], []);
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();
  const index = useSelector((state: RootState) => state.playlistSlice.index);

  const playlistData: ITurn[] | undefined = queryClient.getQueryData([
    'playlist',
  ]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      onChange={onChangeBottomSheetPosition}
      animateOnMount={true}
      bottomInset={tabHeight}
      handleStyle={{
        backgroundColor: '#00000000',
      }}
      snapPoints={snapPoints}>
      <View style={Style.container}></View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
