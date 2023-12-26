import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Button =
  | 'Pause'
  | 'Play'
  | 'Next'
  | 'Skip'
  | 'Forward'
  | 'Previous'
  | 'Replay';

type ButtonProps = {
  type: Button;
  size?: number;
  onPress: () => void;
};

type Props = {
  useButtons: ButtonProps[];
  style?: StyleProp<ViewStyle>;
};

function renderButtonIcon(button: Button, size = 40) {
  const sizeStyle: Pick<ImageStyle, 'width' | 'height' | 'resizeMode'> = {
    width: size,
    height: size,
    resizeMode: 'contain',
  };

  switch (button) {
    case 'Next':
      return (
        <Image
          style={[Style.next, sizeStyle]}
          source={require('../../../../assets/icons/arrow.png')}
        />
      );
    case 'Play':
      return (
        <Image
          style={[sizeStyle]}
          source={require('../../../../assets/icons/play.png')}
        />
      );
    case 'Pause':
      return (
        <Image
          style={[sizeStyle]}
          source={require('../../../../assets/icons/pause.png')}
        />
      );
    case 'Previous':
      return (
        <Image
          style={[Style.previous, sizeStyle]}
          source={require('../../../../assets/icons/arrow.png')}
        />
      );
    case 'Replay':
      return (
        <Image
          style={sizeStyle}
          source={require('../../../../assets/icons/editor_reload.png')}
        />
      );
  }
}

export default function VideoPlayerButtonController({
  useButtons,
  style,
}: Props) {
  return (
    <View style={[Style.container, style]}>
      {useButtons.map(({type, onPress, size}) => (
        <Pressable key={type} onPress={onPress}>
          {renderButtonIcon(type, size)}
        </Pressable>
      ))}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  previous: {
    transform: [{rotate: '90deg'}],
  },
  next: {
    transform: [{rotate: '180deg'}],
  },
});
