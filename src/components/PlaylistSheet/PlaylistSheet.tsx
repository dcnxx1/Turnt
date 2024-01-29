import BottomSheet from '@gorhom/bottom-sheet';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {queryKey} from '../../api/api';
import theme from '../../theme';
import PlaylistVideoManager from '../List/VideoListManagers/PlaylistVideoManager';
import {MINIPLAYER_HEIGHT} from './components/Miniplayer';
import SheetHandle from './components/PlaylistSheetHandle';
import {animatedConfig} from './config';
import usePlaylistSheet from './hooks/usePlaylistSheet';

import MediaController from '../MediaController/MediaController';

type Props = {
  animatedPosition: SharedValue<number>;
};

export const SHEET_PARTIAL_MODE = Dimensions.get('screen').height * 0.07;
export const FIRST_SNAP_POINT_MEDIACONTROLLER = Dimensions.get('screen').height * 0.13
export const SHEET_FULL_SCREEN_MODE = 0;
export const SHEET_HIDDEN_MODE = Dimensions.get('screen').height;

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
      handleComponent={PlaylistSheetHandle}
      enableOverDrag={false}
      style={Style.bottomSheet}
      animatedPosition={animatedPosition}
      onChange={onChangeBottomSheetPosition}
      snapPoints={snapPoints}>
      <PlaylistVideoManager data={data.data ?? []} />
      <MediaController
        collapseAnimationEnabled={true}
        tabHeight={1}
        firstSnapPoint={FIRST_SNAP_POINT_MEDIACONTROLLER}
      />
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  bottomSheet: {
    borderRadius: 0,
    backgroundColor: theme.color.turnerDark,
  },
});
