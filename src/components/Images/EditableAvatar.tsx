import {useCallback} from 'react';
import Avatar from './Avatar';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Avatar as RNAvatar} from 'react-native-paper';
import {askPermission, selectLibraryImageWithCropper} from '../../helpers';

const Image = RNAvatar.Image;

export interface EditableAvatarProps {
  size?: number;
  source: string | undefined;
  setAvatarPath: (source: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function EditableAvatar({
  size,
  source,
  setAvatarPath,
  style,
}: EditableAvatarProps) {
  const handleOnAvatarChange = useCallback(async () => {
    try {
      const permissionResponse = await askPermission(
        'ios.permission.PHOTO_LIBRARY',
      );

      if (permissionResponse === 'granted') {
        const imageSource = await selectLibraryImageWithCropper();
        if (imageSource) {
          setAvatarPath(imageSource);
        }
      }
    } catch (err) {
      console.log('ERR GET LOCAL_AVATAR_PATH =>>', err);
    }
  }, [source]);

  return (
    <Pressable style={[Style.container, style]} onPress={handleOnAvatarChange}>
      <Avatar source={source} size={size} />
      <Image
        style={Style.plusIconImage}
        size={size ? size * 0.2 : 25}
        source={require('../../assets/icons/plus.png')}
      />
    </Pressable>
  );
}

const Style = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: 'white',
    alignSelf: 'center',
  },
  plusIconImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
