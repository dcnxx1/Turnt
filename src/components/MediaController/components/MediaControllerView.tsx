import BottomSheet from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Flex from '../../Misc/Flex';
import {blurViewConfig, bottomSheetConfig} from '../configs';
import TimelineSliderBar from './TimelineSliderBar';
import MediaControllerArtistSong from './MediaControllerArtistSong';
import {Text} from 'react-native-paper';
import {
  PlayNextButton,
  PlayPreviousButton,
  TogglePlayPauseButton,
} from './MediaControllerButtons';
import {useVideoStore} from '../../../store';

type MediaControllerView = {
  tabHeight: number;
};

export default function MediaControllerView({tabHeight}: MediaControllerView) {
  const snapPoints = useMemo(() => ['4%', '35%'], []);
  const {isPlaying, setIsPlaying} = useVideoStore();

  const onPressPrevious = () => {};

  const onPressTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onPressNext = () => {};

  return (
    <BottomSheet
      bottomInset={tabHeight}
      {...bottomSheetConfig}
      containerStyle={Style.container}
      snapPoints={snapPoints}>
      <BlurView style={Style.blurView} {...blurViewConfig}>
        <View style={Style.content}>
          <View style={Style.mediaController}>
            <MediaControllerArtistSong />
          </View>
          <Flex style={Style.timelineSideBarContainer}>
            <TimelineSliderBar />
          </Flex>
          <Flex style={Style.buttonContainer}>
            <PlayPreviousButton onPress={onPressPrevious} />
            <TogglePlayPauseButton onPress={onPressTogglePlayPause} />
            <PlayNextButton onPress={onPressNext} />
          </Flex>
        </View>
      </BlurView>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    //
  },
  blurView: {
    width: '100%',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  timelineSideBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaController: {
    justifyContent: 'flex-start',
    paddingTop: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
