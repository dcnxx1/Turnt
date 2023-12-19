import BottomSheet from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../../Misc/Flex';
import {blurViewConfig, bottomSheetConfig} from '../configs';
import MediaControllerSlider from './MediaControllerSlider';
import TimelineSliderBar from './TimelineSliderBar';

type MediaControllerView = {};

export default function MediaControllerView({}: MediaControllerView) {
  const snapPoints = useMemo(() => ['15%', '35%'], []);

  return (
    <BottomSheet
      {...bottomSheetConfig}
      containerStyle={Style.container}
      snapPoints={snapPoints}>
      <BlurView style={Style.blurView} {...blurViewConfig}>
        <Flex style={Style.content}>
          <TimelineSliderBar />
        </Flex>
      </BlurView>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
  },
  blurView: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
