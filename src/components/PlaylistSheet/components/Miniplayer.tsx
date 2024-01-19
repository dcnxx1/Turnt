import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useCDN} from '../../../api/api';
import {secondsToDisplayTime} from '../../../helpers';
import {RootState} from '../../../redux/store';
import {increment, togglePlaying} from '../../../redux/videoListSlice';
import {COVER_KEY} from '../../../s3';
import VideoPlayerButtonController from '../../../screens/Editor/components/videoManager/VideoPlayerButtonController';
import {useActiveTurnStore, useVideoStore} from '../../../store';
import theme from '../../../theme';

export const MINIPLAYER_HEIGHT = Dimensions.get('screen').height * 0.07;

export default function MiniPlayer() {
  const {activeTurn} = useActiveTurnStore();
  const {progress} = useVideoStore();
  const isPlaying = useSelector(
    (state: RootState) => state.playlistSlice.isPlaying,
  );
  const dispatch = useDispatch();
  const onPressForward = () => {
    dispatch(increment());
  };

  const onPressPlayPauseToggle = () => {
    dispatch(togglePlaying());
  };

  return (
    <View style={Style.container}>
      <Image
        source={{uri: useCDN(COVER_KEY + activeTurn.cover)}}
        style={Style.coverImage}
      />
      <View style={[Style.metaItem, Style.metaTextContainer]}>
        <Text>Artist Name!</Text>
        <Text>{activeTurn.title}</Text>
      </View>
      <View style={[Style.metaItem, Style.metaProgress]}>
        <Text>{secondsToDisplayTime(progress)}</Text>
      </View>
      <View style={[Style.metaItem, Style.metaProgress]}>
        <VideoPlayerButtonController
          style={Style.metaButtons}
          useButtons={[
            {
              type: isPlaying ? 'Pause' : 'Play',
              onPress: onPressPlayPauseToggle,
              size: 25,
            },
            {
              type: 'Forward',
              onPress: onPressForward,
              size: 25,
            },
          ]}
        />
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
    backgroundColor: theme.color.turnerDark,
    flexDirection: 'row',
  },
  coverImage: {
    width: '15%',
    height: '100%',
    resizeMode: 'contain',
    // aspectRatio: 1,
  },
  metaContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  metaItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  metaTextContainer: {
    borderColor: 'coral',
    justifyContent: 'space-evenly',
  },
  metaProgress: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  metaButtons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
