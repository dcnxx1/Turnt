import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {ITurn} from '../../../models/turn';

type Props = {
  title: ITurn['title'];
};

export default function MediaControllerArtistSong({title}: Props) {
  return (
    <>
      <Text style={Style.text}>{title}</Text>
    </>
  );
}

const Style = StyleSheet.create({
  text: {
    color: 'white',
  },
});
