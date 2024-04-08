import {useCallback, useMemo} from 'react';
import MediaControllerView from './components/MediaControllerView';
import {bottomSheetConfig} from './configs';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSharedValue} from 'react-native-reanimated';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setIsImpression} from '../../redux/videoListSlice';
import {MediaImpressionButton} from './components/MediaControllerButtons';

type MediaControllerProps = {
  tabHeight: number;
  firstSnapPoint: string | number;
  collapseAnimationEnabled: boolean;
  showImpressionButton: boolean;
};
export const MAX_SNAP_POINT = Dimensions.get('screen').height * 0.3;

export default function MediaController({
  tabHeight,
  firstSnapPoint = '5%',
  collapseAnimationEnabled,
  showImpressionButton,
}: MediaControllerProps) {
  const snapPoints = useMemo(
    () => [firstSnapPoint ?? '5%', MAX_SNAP_POINT],
    [firstSnapPoint],
  );
  const isImpression = useSelector(
    (state: RootState) => state.homeSlice.isImpression,
  );

  const dispatch = useDispatch();

  const animatedPosition = useSharedValue(0);
  const toggleImpression = useCallback(() => {
    dispatch(setIsImpression());
  }, [isImpression, dispatch]);

  const impressionButton = useCallback(() => {
    return (
      <MediaImpressionButton
        isImpression={isImpression}
        onPress={toggleImpression}
      />
    );
  }, [toggleImpression]);

  return (
    <BottomSheet
      handleComponent={showImpressionButton ? impressionButton : undefined}
      containerStyle={Style.container}
      detached
      animatedPosition={animatedPosition}
      {...bottomSheetConfig}
      bottomInset={tabHeight ?? 0}
      snapPoints={snapPoints}>
      <MediaControllerView
        collapseAnimationEnabled={collapseAnimationEnabled}
        animatedPosition={animatedPosition}
      />
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {},
});
