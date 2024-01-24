import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useCDN} from '../../api/api';
import {COVER_KEY} from '../../s3';
import {Text} from 'react-native-paper';
import {secondsToDisplayTime} from '../../helpers';
import {ITurn} from '../../models/turn';
import {useActiveTurnStore} from '../../store';
import {useEffect} from 'react';
import theme from '../../theme';

type Props = {
  duration: number;
  onPress: (turn_id: string, index: number) => void;
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

  return (
    <Pressable
      onPress={() => onPress(id, index)}
      style={[
        Style.container,
        {
          borderColor: activeTurn.turn_id === id ? 'red' : 'green',
        },
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

    backgroundColor: theme.color.turner,
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
