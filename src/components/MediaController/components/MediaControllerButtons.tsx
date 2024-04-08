import {Image, StyleSheet, View} from 'react-native';
import {Text, Button, Icon, IconButton} from 'react-native-paper';
import theme from '../../../theme';

export function MediaAddToPlaylistButton({
  onPress,
  isInMyPlaylist,
}: ButtonProps & {isInMyPlaylist: boolean}) {
  return (
    <IconButton
      onPress={onPress}
      icon={
        isInMyPlaylist
          ? require('../../../assets/icons/trash.png')
          : require('../../../assets/icons/add.png')
      }
    />
  );
}

export function MediaRepeatButton() {
  return (
    <IconButton icon={require('../../../assets/icons/editor_reload.png')} />
  );
}

export function MediaImpressionButton({
  isImpression,
  onPress,
}: ButtonProps & {isImpression: boolean}) {
  return (
    <View style={Style.impressionButtonContainer}>
      <IconButton
        style={Style.impressionButton}
        onPress={onPress}
        size={35}
        icon={
          isImpression
            ? require('../../../assets/icons/note-short.png')
            : require('../../../assets/icons/note-long.png')
        }
      />
    </View>
  );
}

type ButtonProps = {
  onPress: () => void;
};

export function PlayNextButton({onPress}: ButtonProps) {
  return (
    <Button onPress={onPress}>
      <Image
        style={Style.nextButton}
        source={require('../../../assets/icons/arrow.png')}
      />
    </Button>
  );
}

export function TogglePlayPauseButton({
  onPress,
  isPlaying,
}: ButtonProps & {isPlaying: boolean}) {
  return (
    <Button onPress={onPress}>
      <Image
        style={Style.playPauseButton}
        source={
          isPlaying
            ? require('../../../assets/icons/pause.png')
            : require('../../../assets/icons/play.png')
        }
      />
    </Button>
  );
}

export function PlayPreviousButton({onPress}: ButtonProps) {
  return (
    <Button  onPress={onPress}>
      <Image
        style={Style.previousButton}
        source={require('../../../assets/icons/arrow.png')}
      />
    </Button>
  );
}
const Style = StyleSheet.create({
  text: {
    color: 'white',
  },
  impressionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  impressionButton: {
    backgroundColor: theme.color.turner,
    padding: 2,
  },
  impressionButtonImg: {
    borderColor: 'white',
    resizeMode: 'contain',
  },
  previousButton: {
    width: 35,
    height: 35,
    transform: [{rotate: '-90deg'}],
  },
  nextButton: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  playPauseButton: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
