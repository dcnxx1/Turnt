import {useCallback} from 'react';
import Avatar from './Avatar';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Image as RNImage,
  ViewStyle,
} from 'react-native';
import {Avatar as RNAvatar} from 'react-native-paper';
import {askPermission, selectLibraryImageWithCropper} from '../../helpers';
import {openSettings} from 'react-native-permissions';
import {VideoCoverColor} from '../../screens/Editor/utils';
import * as covers from '../../assets/covers';
const Image = RNAvatar.Image;

export interface EditableImageProps {
  size?: number;
  source: string;
  setSource: (source: string) => void;
  style?: StyleProp<ViewStyle>;
  isAvatar: boolean;
  defaultCover: VideoCoverColor;
}

export default function EditableImage({
  size = 100,
  source,
  setSource,
  style,
  isAvatar,
  defaultCover,
}: EditableImageProps) {
  const handleOnAvatarChange = useCallback(async () => {
    try {
      const permissionResponse = await askPermission(
        'ios.permission.PHOTO_LIBRARY',
      );

      if (permissionResponse === 'granted') {
        const imageSource = await selectLibraryImageWithCropper();
        if (imageSource) {
          setSource(imageSource);
        }
      } else if (permissionResponse === 'denied' || 'blocked') {
        await openSettings();
      }
    } catch (err) {
      console.log('ERR GET LOCAL_AVATAR_PATH =>>', err);
    }
  }, [source]);

  const imageSize = {
    width: size ? size : 25,
    height: size ? size : 25,
  };

  return (
    <Pressable style={[Style.container, style]} onPress={handleOnAvatarChange}>
      {isAvatar ? (
        <>
          <Avatar source={source} size={size} />
          <Image
            style={Style.plusIconImage}
            size={size ? size * 0.2 : 25}
            source={require('../../assets/icons/plus.png')}
          />
        </>
      ) : (
        <RNImage
          style={imageSize}
          source={source.length ? {uri: source} : covers[defaultCover]}
        />
      )}
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
