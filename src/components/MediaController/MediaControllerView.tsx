import {BlurView} from '@react-native-community/blur';
import {debounce} from 'lodash';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNAnimated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

import {useActiveTurnStore} from '../../store';
import Flex from '../Misc/Flex';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from '../PlaylistSheet/PlaylistSheet';
import {MAX_SNAP_POINT} from './MediaController';
import MediaControllerArtistSong from './MediaControllerArtistSong';
import {
  PlayNextButton,
  PlayPreviousButton,
  TogglePlayPauseButton,
} from './MediaControllerButtons';
import TimelineSliderBar from './TimelineSliderBar';
import {blurViewConfig} from './configs';
import {
  decrementListIndex,
  incrementListIndex,
  toggleVideoIsPlaying,
} from '../../redux/listSlices/videoManagementSlice';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
type Props = {
  animatedPosition: SharedValue<number>;
  collapseAnimationEnabled?: boolean;
};

export default function MediaControllerView({
  animatedPosition,
  collapseAnimationEnabled,
}: Props) {
  const {activeTurn} = useActiveTurnStore();
  const dispatch = useDispatch();

  const onPressTogglePlayPause = () => {
    dispatch(toggleVideoIsPlaying());
  };

  // TODO: Check whether to use debounce or throttle..
  const onPressNext = debounce(() => {
    dispatch(incrementListIndex());
  }, 50);

  const onPressPrevious = debounce(() => {
    dispatch(decrementListIndex());
  }, 50);

  const interpolateCollapseAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,

        [
          SCREEN_HEIGHT - FIRST_SNAP_POINT_MEDIACONTROLLER,
          SCREEN_HEIGHT - MAX_SNAP_POINT,
        ],
        [0, 1],
      ),
    };
  }, []);

  return (
    <BlurView style={Style.blurView} {...blurViewConfig}>
      <View style={Style.content}>
        <View style={Style.mediaController}>
          <MediaControllerArtistSong artist={'someone'} title={String('')} />
        </View>
        <RNAnimated.View
          style={[
            collapseAnimationEnabled && interpolateCollapseAnimation,
            Style.animationCollapseContainer,
          ]}>
          <Flex style={Style.timelineSideBarContainer}>
            <TimelineSliderBar
              animatedPosition={animatedPosition}
              title={''}
              videoDuration={activeTurn && activeTurn.duration}
            />
          </Flex>
          <Flex style={Style.buttonContainer}>
            <PlayPreviousButton onPress={onPressPrevious} />
            <TogglePlayPauseButton onPress={onPressTogglePlayPause} />
            <PlayNextButton onPress={onPressNext} />
          </Flex>
        </RNAnimated.View>
      </View>
    </BlurView>
  );
}

const Style = StyleSheet.create({
  blurView: {
    width: '100%',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  animationCollapseContainer: {
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