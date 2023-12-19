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
import {useActiveTurn, useVideoStore} from '../../../store';
import useDispatchVideoTurn from '../../../store/useDispatchVideoTurn';

type MediaControllerView = {
  tabHeight: number;
};

export default function MediaControllerView({tabHeight}: MediaControllerView) {
  const snapPoints = useMemo(() => ['4%', '35%'], []);
  const {isPlaying, setIsPlaying} = useVideoStore();
  const {dispatch} = useDispatchVideoTurn();
  const {activeTurn} = useActiveTurn();

  const onPressTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onPressPrevious = () => {
    dispatch('PLAY_PREVIOUS');
  };
  const onPressNext = () => {
    dispatch('PLAY_NEXT');
  };

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
            <TimelineSliderBar turnDuration={activeTurn.duration} />
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
