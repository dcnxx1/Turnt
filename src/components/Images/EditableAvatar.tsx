import {useCallback, useEffect} from 'react';
import Avatar from './Avatar';
import {Pressable, StyleSheet} from 'react-native';
import {Avatar as RNAvatar} from 'react-native-paper';
import {askPermission, selectLibraryImageWithCropper} from '../../helpers';

const Image = RNAvatar.Image;

interface EditableAvatarProps {
  size?: number;
  source?: string;
  handleOnAvatarChange: (source: string) => void;
}

export default function EditableAvatar({
  size,
  source,
  handleOnAvatarChange,
}: EditableAvatarProps) {
  const askMediaPermission = useCallback(async () => {
    const permissionResponse = await askPermission(
      'ios.permission.PHOTO_LIBRARY',
    );
    if (permissionResponse === 'granted') {
      const imageSource = await selectLibraryImageWithCropper();
      if (imageSource) {
        handleOnAvatarChange(imageSource);
      }
    }
  }, [source]);

  return (
    <Pressable style={Style.container} onPress={askMediaPermission}>
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
