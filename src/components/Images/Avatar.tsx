import {StyleSheet, View} from 'react-native';
import {Avatar as RNAvatar, Text} from 'react-native-paper';
import default_cover_blue from '../../assets/covers/cover_blue_default.png';
import {getDirectoryPathOrCreate} from '../../helpers';
import RNFS from 'react-native-fs';
import {useState} from 'react';
type Props = {
  size?: number;
  source?: string;
  editable?: boolean;
};

export default function Avatar({size = 100, source}: Props) {
  const [fallbackImagePath, setFallbackImagePath] = useState<string>();
  const resizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  async function fallbackImage() {
    try {
      const avatarDir = await getDirectoryPathOrCreate('avatar');
      if (avatarDir) {
        const avatarDirContent = await RNFS.readDir(avatarDir);
        if (avatarDirContent.length) {
          const avatarPath = avatarDirContent[0].path;
          setFallbackImagePath(avatarPath);
        }
      }
    } catch (err) {
      console.log('ERR GET FALLBACKAVATAR :>>', err);
    }
  }

  return (
    <RNAvatar.Image
      size={size}
      source={
        !source
          ? !!fallbackImagePath
            ? fallbackImagePath
            : default_cover_blue
          : {uri: source}
      }
      style={[Style.image, resizeStyle]}
    />
  );
}

export function AvatarWithUsername(
  props: Props & {username: string; fontSize?: number; spacing?: number},
) {
  return (
    <View
      style={[
        Style.container,
        {
          gap: props.spacing ? props.spacing : 0,
        },
      ]}>
      <Avatar {...props} />

      <Text style={{fontSize: props.fontSize}}>{props.username}</Text>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 50 / 2,
  },
});
