import {StyleSheet} from 'react-native';
import {Avatar as RNAvatar} from 'react-native-paper';
import default_cover_blue from '../../assets/covers/cover_blue_default.png';

type Props = {
  size?: number;
  source?: string;
  editable?: boolean;
};

export default function Avatar({size = 100, source}: Props) {
  const resizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <RNAvatar.Image
      size={size}
      source={!source ? default_cover_blue : {uri: source}}
      style={[Style.image, resizeStyle]}
    />
  );
}

const Style = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    borderRadius: 50 / 2,
  },
});
