import BottomSheet from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import _, { debounce } from 'lodash';
import {useActiveTurnStore} from '../../../store';
import Flex from '../../Misc/Flex';
import {blurViewConfig, bottomSheetConfig} from '../configs';
import MediaControllerArtistSong from './MediaControllerArtistSong';
import {
  PlayNextButton,
  PlayPreviousButton,
  TogglePlayPauseButton,
} from './MediaControllerButtons';
import TimelineSliderBar from './TimelineSliderBar';
import {throttle} from 'lodash';
import {
  decrement,
  increment,
  setActiveSlice,
  togglePlaying,
} from '../../../redux/videoListSlice';

type MediaControllerView = {
  tabHeight: number;
};

export default function MediaControllerView({tabHeight}: MediaControllerView) {
  const snapPoints = useMemo(() => ['3%', '35%'], []);
  const {activeTurn} = useActiveTurnStore();
  const dispatch = useDispatch();

  const onPressTogglePlayPause = () => {
    dispatch(togglePlaying());
  };
  // TODO: Check whether to use debounce or throttle..
  const onPressNext = debounce(
    useCallback(() => {
      dispatch(increment());
    }, [dispatch]),
    50,
  );

  const onPressPrevious = debounce(
    useCallback(() => {
      dispatch(decrement());
    }, [dispatch]),
    50,
  );

  return activeTurn ? (
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
              title={activeTurn && activeTurn.title}
            />
          </View>
          <Flex style={Style.timelineSideBarContainer}>
            <TimelineSliderBar
              title={activeTurn && activeTurn.title}
              videoDuration={activeTurn && activeTurn.duration}
            />
          </Flex>
          <Flex style={Style.buttonContainer}>
            <PlayPreviousButton onPress={onPressPrevious} />
            <TogglePlayPauseButton onPress={onPressTogglePlayPause} />
            <PlayNextButton onPress={onPressNext} />
          </Flex>
        </View>
      </BlurView>
    </BottomSheet>
  ) : null;
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
