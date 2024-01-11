import BottomSheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ITurn} from '../../models/turn';
import usePlaylistSheet from './hooks/usePlaylistSheet';
import VideoList from '../List/VideoList';
import VideoListContext from '../../shared/context/VideoListContext';

type Props = {
  tabHeight: number;
};

export default function PlaylistSheet({tabHeight}: Props) {
  const queryClient = useQueryClient();
  const snapPoints = useMemo(() => ['10%', '95%'], []);
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();
  const navigation = useNavigation();
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
      <View style={Style.container}>
        {/* {
          playlistData ? <VideoListContext defaultValue={playlistData ? playlistData[0] : null}>
          <VideoList id="playlist" data={playlistData ?? []} />
        </VideoListContext> : null
        } */}
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
