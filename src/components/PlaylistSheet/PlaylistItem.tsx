import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useCDN} from '../../api/api';
import {COVER_KEY} from '../../s3';
import {Text} from 'react-native-paper';
import {secondsToDisplayTime} from '../../helpers';
import {ITurn} from '../../models/turn';

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
  return (
    <Pressable onPress={() => onPress(id, index)} style={Style.container}>
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
  },
  cover: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemContainer: {
    borderRightWidth: 2,
    borderRightColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
