import BottomSheet from '@gorhom/bottom-sheet';
import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ITurn} from '../../models/turn';
import VideoListContext from '../../shared/context/VideoListContext';
import theme from '../../theme';
import VideoList from '../List/VideoList';
import {HEIGHT_BOTTOM_TAB} from '../Tabbar/BottomTab';
import SheetHandle from './components/PlaylistSheetHandle';
import usePlaylistSheet from './hooks/usePlaylistSheet';

type Props = {
  animatedPosition: SharedValue<number>;
};

export const SHEET_PARTIAL_MODE =
  Dimensions.get('screen').height * 0.08 + HEIGHT_BOTTOM_TAB;

export const SHEET_FULL_SCREEN_MODE = 0;
export const SHEET_HIDDEN_MODE = Dimensions.get('screen').height;

const queryClient = useQueryClient();

export default function PlaylistSheet({animatedPosition}: Props) {
  const snapPoints = useMemo(() => [SHEET_PARTIAL_MODE, SHEET_HIDDEN_MODE], []);
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();
  const playlistData: ITurn[] | undefined = queryClient.getQueryData([
    'playlist',
  ]);

  const PlaylistSheetHandle = useCallback(() => {
    return <SheetHandle animatedPosition={animatedPosition} />;
  }, [animatedPosition]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      handleComponent={PlaylistSheetHandle}
      enableOverDrag={false}
      style={Style.bottomSheet}
      animatedPosition={animatedPosition}
      onChange={onChangeBottomSheetPosition}
      snapPoints={snapPoints}>
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
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  bottomSheet: {
    borderRadius: 0,
    backgroundColor: theme.color.turnerDark,
  },
});
