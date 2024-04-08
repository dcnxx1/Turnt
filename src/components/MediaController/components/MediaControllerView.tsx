import {BlurView} from '@react-native-community/blur';
import {useQueryClient} from '@tanstack/react-query';
import {debounce} from 'lodash';
import {useCallback, useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNAnimated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import addToFavourites, {
  deleteFromFavourites,
} from '../../../api/addToFavourites';
import {RootState} from '../../../redux/store';
import {
  decrement,
  increment,
  togglePlaying,
} from '../../../redux/videoListSlice';
import {useActiveTurnStore} from '../../../store';
import useLocalProfile from '../../../store/useLocalProfile';
import Flex from '../../Misc/Flex';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from '../../PlaylistSheet/PlaylistSheet';
import {blurViewConfig} from '../configs';
import {MAX_SNAP_POINT} from '../MediaController';
import MediaControllerArtistSong from './MediaControllerArtistSong';
import {
  MediaAddToPlaylistButton,
  MediaRepeatButton,
  PlayNextButton,
  PlayPreviousButton,
  TogglePlayPauseButton,
} from './MediaControllerButtons';
import TimelineSliderBar from './TimelineSliderBar';
import {
  useMyPlaylistQuery,
  useMyUploadsQuery,
} from '../../../shared/hooks/useQueryData';
import {showAddToPlaylistToast} from '../../Toast/BaseToast';
import {useCDN, COVER_KEY} from '../../../api/api';
import {TURN_KEY} from '../../../s3';
import useActiveSlice from '../../../redux/useActiveSlice';
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
  const [activeSlice] = useActiveSlice();
  const me = useLocalProfile();
  const playlist = useMyPlaylistQuery();
  const homeSlice = useSelector((state: RootState) => state.homeSlice);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const myUploads = useMyUploadsQuery();
  const onPressTogglePlayPause = () => {
    dispatch(togglePlaying());
  };
  // TODO: Check whether to use debounce or throttle..
  const onPressNext = debounce(() => {
    dispatch(increment());
  }, 50);

  const onPressPrevious = debounce(() => {
    dispatch(decrement());
  }, 50);

  const isInMyPlaylist = useMemo(() => {
    return (
      playlist.data?.some(turn => turn.turn_id === activeTurn.turn_id) ?? false
    );
  }, [activeTurn, playlist]);

  const addOrDeleteFromPlaylist = useCallback(async () => {
    if (isInMyPlaylist) {
      const response = await deleteFromFavourites({
        turn_id: activeTurn.turn_id,
        user_id: me.user?.user_id ?? '',
      });
      showAddToPlaylistToast({
        text: `${response.title} is verwijderd`,
        icon: useCDN(COVER_KEY + response.cover),
      });
    } else {
      const response = await addToFavourites({
        turn_id: activeTurn.turn_id,
        user_id: me.user?.user_id ?? '',
      });
      showAddToPlaylistToast({
        text: `${response.title} is toegevoegd`,
        icon: useCDN(COVER_KEY + response.cover),
      });
    }

    queryClient.invalidateQueries({queryKey: ['playlist']});
  }, [activeTurn, me.user?.user_id, isInMyPlaylist, myUploads.data]);

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

  const videoDuration = useMemo(() => {
    return homeSlice.isActive
      ? homeSlice.isImpression
        ? 30
        : activeTurn.duration
      : activeTurn.duration;
  }, [homeSlice.isActive, homeSlice.isImpression, activeTurn.turn_id]);

  return (
    <BlurView style={Style.blurView} {...blurViewConfig}>
      <View style={Style.content}>
        <View style={Style.mediaController}>
          <MediaRepeatButton />
          <View style={Style.mediaControllerArtistSongContainer}>
            <MediaControllerArtistSong title={activeTurn.title} />
          </View>
          <MediaAddToPlaylistButton
            isInMyPlaylist={isInMyPlaylist}
            onPress={addOrDeleteFromPlaylist}
          />
        </View>

        <RNAnimated.View
          style={[
            collapseAnimationEnabled && interpolateCollapseAnimation,
            Style.animationCollapseContainer,
          ]}>
          <Flex style={Style.timelineSideBarContainer}>
            <TimelineSliderBar
              animatedPosition={animatedPosition}
              title={activeTurn && activeTurn.title}
              videoDuration={videoDuration}
            />
          </Flex>
          <Flex style={Style.buttonContainer}>
            <PlayPreviousButton onPress={onPressPrevious} />
            <TogglePlayPauseButton
              isPlaying={activeSlice.isPlaying}
              onPress={onPressTogglePlayPause}
            />
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
  mediaControllerArtistSongContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  mediaController: {
    justifyContent: 'center',
    paddingTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
