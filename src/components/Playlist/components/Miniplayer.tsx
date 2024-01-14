import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCDN } from '../../../api/api';
import { RootState } from '../../../redux/store';
import { increment, togglePlaying } from '../../../redux/videoListSlice';
import { COVER_KEY } from '../../../s3';
import { useActiveTurnStore, useVideoStore } from '../../../store';



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
    <View style={[Style.container]}>
      <Image
        source={{uri: useCDN(COVER_KEY + activeTurn.cover)}}
        style={Style.coverImage}
      />
      
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  coverImage: {
    width: 80,
    height: '100%',
  },
  metaContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  metaItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: 'yellow',
    height: '100%',
  },
  buttonIcon: {
    width: 25,
    height: 25,
  },
});
