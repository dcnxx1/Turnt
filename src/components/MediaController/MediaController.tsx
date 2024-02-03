import {useMemo} from 'react';
import MediaControllerView from './MediaControllerView';
import {bottomSheetConfig} from './configs';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSharedValue} from 'react-native-reanimated';
import {Dimensions, StyleSheet} from 'react-native';

type MediaControllerProps = {
  tabHeight: number;
  firstSnapPoint: string | number;
  collapseAnimationEnabled: boolean;
};
export const MAX_SNAP_POINT = Dimensions.get('screen').height * 0.3;

export default function MediaController({
  tabHeight,
  firstSnapPoint = '5%',
  collapseAnimationEnabled,
}: MediaControllerProps) {
  const snapPoints = useMemo(
    () => [firstSnapPoint ?? '5%', MAX_SNAP_POINT],
    [firstSnapPoint],
  );
  const animatedPosition = useSharedValue(0);

  return (
    <BottomSheet
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
