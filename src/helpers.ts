import ImageCropPicker from 'react-native-image-crop-picker';
import RNPermission, {Permission} from 'react-native-permissions';

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function selectLibraryImageWithCropper(): Promise<
  string | undefined
> {
  try {
    const originalImage = await ImageCropPicker.openPicker({
      cropping: true,
      writeTempFile: false,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    });

    return originalImage.path;
  } catch (err) {
    console.log('ERR GET IMAGE ->', err);
  }
}

export async function askPermission(askPermissionFor: Permission) {
  try {
    return await RNPermission.request(askPermissionFor);
  } catch (err) {
    console.log('ERR PERMISSION REQ ->', err);
  }
}


export async function usernameExists(username: string) {
  try {
    
  } catch(err) {
    console.log("ERR GET Username ->", err)
  }
}

export function getFileExtension(uri: string) {
  const uriParts = uri.split(".");
  return uriParts[uriParts.length - 1];
}