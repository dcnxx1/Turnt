import BottomSheet from '@gorhom/bottom-sheet';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {queryKey} from '../../api/api';
import {RootState} from '../../redux/store';
import theme from '../../theme';
import VideoList from '../List/VideoList';
import {MINIPLAYER_HEIGHT} from './components/Miniplayer';
import SheetHandle from './components/PlaylistSheetHandle';
import {animatedConfig} from './config';
import usePlaylistSheet from './hooks/usePlaylistSheet';
import TestList from '../List/TestList';
import PlaylistVideoManager from '../List/VideoListManagers/PlaylistVideoManager';

type Props = {
  animatedPosition: SharedValue<number>;
};

const datar = [
  {
    artist_id: '48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    cover: 'isotopes1b09c24ec42e-RNQj-PFo5.jpg',
    duration: 160,

    source: 'rnqj-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e.mp4',
    title: 'Isotopes',
    turn_id: 'rnqj-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    type: 'Video',
  },
  {
    artist_id: '48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    cover: 'bludline1b09c24ec42e-S25n-EPqB.jpg',
    duration: 271,
    genre: 'Rap',
    source: 's25n-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e.mp4',
    title: 'Bludline ',
    turn_id: 's25n-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    type: 'Video',
  },
  {
    artist_id: '48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    cover: 'artyerrr1b09c24ec42e-sBeD-quM8.jpg',
    duration: 224,
    genre: 'Rap',
    source: 'sbed-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e.mp4',
    title: ' Artyerrr',
    turn_id: 'sbed-1b09c24ec42e-48f8527e-43b5-4d92-b40f-1b09c24ec42e',
    type: 'Video',
  },
];

export const SHEET_PARTIAL_MODE = Dimensions.get('screen').height * 0.07;

export const SHEET_FULL_SCREEN_MODE = 0;
export const SHEET_HIDDEN_MODE = Dimensions.get('screen').height;
const FIVE_MINUTES = 1000 * 60 * 5;
export default function PlaylistSheet({animatedPosition}: Props) {
  const snapPoints = useMemo(
    () => [SHEET_PARTIAL_MODE + MINIPLAYER_HEIGHT, SHEET_HIDDEN_MODE],
    [],
  );
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();
  const queryClient = useQueryClient();

  const data = useQuery({
    queryKey: [queryKey.playlistSheet],
    initialData: queryClient.getQueryData([queryKey.playlistSheet]),
  });

  const PlaylistSheetHandle = useCallback(() => {
    return <SheetHandle animatedPosition={animatedPosition} />;
  }, [animatedPosition]);
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      animationConfigs={animatedConfig}
      handleComponent={() => (
        <SheetHandle animatedPosition={animatedPosition} />
      )}
      enableOverDrag={false}
      style={Style.bottomSheet}
      animatedPosition={animatedPosition}
      onChange={onChangeBottomSheetPosition}
      snapPoints={snapPoints}>
      <PlaylistVideoManager data={data.data ?? []} />
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  bottomSheet: {
    borderRadius: 0,
    backgroundColor: theme.color.turnerDark,
  },
});
