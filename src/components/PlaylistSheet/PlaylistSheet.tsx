import BottomSheet from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {queryKey} from '../../api/api';
import {ITurn} from '../../models/turn';
import VideoListContext from '../../shared/context/VideoListContext';
import theme from '../../theme';
import VideoList from '../List/VideoList';
import SheetHandle from './components/PlaylistSheetHandle';
import usePlaylistSheet from './hooks/usePlaylistSheet';
import {MINIPLAYER_HEIGHT} from './components/Miniplayer';
import {animatedConfig} from './config';

type Props = {
  animatedPosition: SharedValue<number>;
};

export const SHEET_PARTIAL_MODE = Dimensions.get('screen').height * 0.07;

export const SHEET_FULL_SCREEN_MODE = 0;
export const SHEET_HIDDEN_MODE = Dimensions.get('screen').height;

export default function PlaylistSheet({animatedPosition}: Props) {
  const snapPoints = useMemo(
    () => [SHEET_PARTIAL_MODE + MINIPLAYER_HEIGHT, SHEET_HIDDEN_MODE],
    [],
  );
  const [ref, onChangeBottomSheetPosition] = usePlaylistSheet();

  const {data} = useQuery<ITurn[]>({
    queryKey: [queryKey.playlistSheet],
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
      {data && (
        <VideoList
          animateScrollToIndex={false}
          id={'playlistSlice'}
          data={data}
        />
      )}
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  bottomSheet: {
    borderRadius: 0,
    backgroundColor: theme.color.turnerDark,
  },
});
