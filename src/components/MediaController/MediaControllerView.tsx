import BottomSheet from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';
import {blurViewConfig, bottomSheetConfig} from './configs';
type MediaControllerView = {};

export default function MediaControllerView({}: MediaControllerView) {
  const snapPoints = ['15%', '35%'];

  return (
    <BottomSheet
      {...bottomSheetConfig}
      backgroundStyle={{}}
      containerStyle={Style.container}
      snapPoints={snapPoints}>
      <BlurView {...blurViewConfig}></BlurView>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {},
  blurView: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
