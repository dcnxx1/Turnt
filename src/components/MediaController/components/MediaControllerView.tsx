import BottomSheet from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useActiveTurnStore, useVideoStore} from '../../../store';
import useVideoListIndexDispatch from '../../../store/useVideoListIndexDispatch';
import Flex from '../../Misc/Flex';
import {blurViewConfig, bottomSheetConfig} from '../configs';
import MediaControllerArtistSong from './MediaControllerArtistSong';
import {
  PlayNextButton,
  PlayPreviousButton,
  TogglePlayPauseButton,
} from './MediaControllerButtons';
import TimelineSliderBar from './TimelineSliderBar';

type MediaControllerView = {
  tabHeight: number;
};

export default function MediaControllerView({tabHeight}: MediaControllerView) {
  const snapPoints = useMemo(() => ['4%', '35%'], []);
  const {isPlaying, setIsPlaying} = useVideoStore();
  const {increment, decrement} = useVideoListIndexDispatch();
  const {activeTurn} = useActiveTurnStore();

  const onPressTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onPressNext = useCallback(() => {
    increment();
  }, []);
  const onPressPrevious = useCallback(() => {
    decrement();
  }, []);

  return (
    <BottomSheet
      {...bottomSheetConfig}
      bottomInset={tabHeight}
      containerStyle={Style.container}
      snapPoints={snapPoints}>
      <BlurView style={Style.blurView} {...blurViewConfig}>
        <View style={Style.content}>
          <View style={Style.mediaController}>
            <MediaControllerArtistSong
              artist={'someone'}
              title={activeTurn.title}
            />
          </View>
          <Flex style={Style.timelineSideBarContainer}>
            <TimelineSliderBar videoDuration={activeTurn.duration} />
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
