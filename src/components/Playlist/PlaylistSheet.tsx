import BottomSheet from '@gorhom/bottom-sheet';
import {useQueryClient} from '@tanstack/react-query';
import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ITurn} from '../../models/turn';
import VideoListManager from '../List/VideoListManager';
import usePlaylistSheetStore from '../../store/usePlaylistSheetStore';
import useVideoListManagerDispatcherStore from '../../store/useVideoListManagerDispatcherStore';

type Props = {
  tabHeight: number;
};

export default function PlaylistSheet({tabHeight}: Props) {
  const queryClient = useQueryClient();
  const snapPoints = useMemo(() => ['10%', '95%'], []);
  const playlistData: ITurn[] | undefined = queryClient.getQueryData(['playlist']);
  const isCollapsed = usePlaylistSheetStore(state => state.isCollapsed);
  const playlistIndex = useVideoListManagerDispatcherStore(state => state.playlistIndex)
  return (
    <BottomSheet
      index={isCollapsed ? 0 : 1}
      bottomInset={tabHeight}
      handleStyle={{
        backgroundColor: '#00000000'
      }}
      snapPoints={snapPoints}>
      <View style={Style.container}>
        <VideoListManager index={playlistIndex} id={'Playlist'} data={playlistData ?? []} />
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
