import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export default function MediaControllerArtistSong() {
  return (
    <>
      <Text style={Style.text}>Artist Name</Text>
      <Text style={Style.text}>Artist Song</Text>
    </>
  );
}

const Style = StyleSheet.create({
  text: {
    color: 'white',
  },
});
