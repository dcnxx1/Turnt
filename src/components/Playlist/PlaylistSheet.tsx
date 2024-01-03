import BottomSheet from '@gorhom/bottom-sheet';
import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ITurn} from '../../models/turn';
import VideoListManager from '../List/VideoListManager';
import {Text} from 'react-native-paper';

type Props = {
  tabHeight: number;
};

export default function PlaylistSheet({tabHeight}: Props) {
  const queryClient = useQueryClient();
  const snapPoints = useMemo(() => ['10%', '95%'], []);
  const playlistData: ITurn[] | undefined = queryClient.getQueryData(['feed']);

  return (
    <BottomSheet index={1} bottomInset={tabHeight} snapPoints={snapPoints}>
      <View style={Style.container}>
        {playlistData ? (
          <VideoListManager source={'Playlist'} data={playlistData} />
        ) : (
          <Text>Loading...</Text>
        )}
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
