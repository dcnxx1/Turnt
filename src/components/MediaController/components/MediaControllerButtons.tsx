import {Image, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
export function MediaImpressionButton() {
  return (
    <Button onPress={() => undefined}>
      <Image source={{uri: 'https://unsplash.it/200/200'}} />
    </Button>
  );
}

type ButtonProps = {
  onPress: () => void;
};

export function PlayNextButton({onPress}: ButtonProps) {
  return (
    <Button onPress={onPress}>
      <Text style={Style.text}>Next</Text>
    </Button>
  );
}

export function TogglePlayPauseButton({onPress}: ButtonProps) {
  return (
    <Button onPress={onPress}>
      <Text style={Style.text}>PlayPause</Text>
    </Button>
  );
}

export function PlayPreviousButton({onPress}: ButtonProps) {
  return (
    <Button style={{borderWidth: 2, borderColor: 'red'}} onPress={onPress}>
      <Text style={Style.text}>Previous</Text>
    </Button>
  );
}
const Style = StyleSheet.create({
  text: {
    color: 'white',
  },
});
