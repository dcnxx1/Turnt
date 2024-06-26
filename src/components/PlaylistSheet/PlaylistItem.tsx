import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useCDN} from '../../api/api';
import {secondsToDisplayTime} from '../../helpers';
import {ITurn} from '../../models/turn';
import {COVER_KEY} from '../../s3';
import {useActiveTurnStore} from '../../store';
import theme from '../../theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type Props = {
  duration: number;
  onPress: (
    index: number,
    turn_id: ITurn['turn_id'],
    duration: ITurn['duration'],
  ) => void;
  cover: string;
  id: ITurn['turn_id'];
  title: string;
  index: number;
};
export default function PlaylistItem({
  duration,
  onPress,
  cover,
  id,
  index,
  title,
}: Props) {
  const activeTurn = useActiveTurnStore(state => state.activeTurn);
  const isPlaylistSliceActive = useSelector(
    (state: RootState) => state.playlistSlice.isActive,
  );
  return (
    <Pressable
      onPress={() => onPress(index, id, duration)}
      style={[
        Style.container,
        // {
        //   borderColor:
        //     isPlaylistSliceActive && activeTurn.turn_id === id
        //       ? 'red'
        //       : theme.color.turnerPurple,
        // },
      ]}>
      <Image style={Style.cover} source={{uri: useCDN(COVER_KEY + cover)}} />
      <View style={Style.itemContainer}>
        <Text>{title}</Text>
      </View>
      <View style={Style.itemContainer}>
        <Text>{secondsToDisplayTime(duration)}</Text>
      </View>
    </Pressable>
  );
}

const Style = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
  },
  cover: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
