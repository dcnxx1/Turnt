import {Alert} from 'react-native';
import ImageCropPicker, {
  Video as CropVideo,
  Image as CropImage,
} from 'react-native-image-crop-picker';
import RNPermission, {Permission} from 'react-native-permissions';
import RNFS, {CachesDirectoryPath} from 'react-native-fs';
import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';
import {FileType} from './models/turn';

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

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
  } catch (err) {
    console.log('ERR GET Username ->', err);
  }
}

export function getFileExtension(uri: string) {
  const uriParts = uri.split('.');
  return uriParts[uriParts.length - 1];
}

export function secondsToDisplayTime(currentPositionSeconds: number): string {
  var minutes = Math.floor(currentPositionSeconds / 60);
  var seconds = Math.floor(currentPositionSeconds % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function secondsToHMS(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function millisToSeconds(milliseconds: number) {
  return milliseconds / 1000;
}

export function secondsToMillis(seconds: number) {
  return seconds * 1000;
}

type MediaFileType = 'video' | 'photo' | 'any';

type MediaType<T> = T extends {fileType: 'Video'} ? CropVideo : CropVideo;

export async function getMediaFile(
  fileType: MediaFileType,
  multiple = false,
  useCrop = false,
): Promise<CropImage | CropVideo> {
  try {
    if (fileType == 'photo') {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        multiple: multiple,
        cropping: useCrop,
      });
      return image;
    }
    const video = await ImageCropPicker.openPicker({
      mediaType: 'video',
      multiple: multiple,
      compressVideoPreset: 'HighestQuality',
    });

    return video;
  } catch (err) {
    throw new Error('ERR GET_FILE_FROM_SYSTEM ' + err);
  }
}

export const getDirectoryPath = async (directory: string) => {
  try {
    const cacheDirPath = await RNFS.readDir(CachesDirectoryPath);
    const cacheDir = cacheDirPath[0].path;
    return cacheDir + '/' + directory;
  } catch (err) {
    console.log('ERR GET DIR PATH', err);
  }
};

export const getDirectoryPathOrCreate = async (
  directory: string,
): Promise<string | undefined> => {
  if (!directory) {
    return;
  }
  try {
    const cacheDirPath = await RNFS.readDir(CachesDirectoryPath);
    const cacheDir = cacheDirPath[0].path;
    const directoryExists = await RNFS.exists(cacheDir + '/' + directory);

    if (!directoryExists) {
      return new Promise<string>((resolve, reject) => {
        RNFS.mkdir(cacheDir + '/' + directory).then(() =>
          RNFS.exists(cacheDir + '/' + directory).then(dirExists => {
            dirExists ? resolve(cacheDir + '/' + directory) : reject();
          }),
        );
      });
    }
    return cacheDir + '/' + directory;
  } catch (err) {
    console.log('ERR CREATE THUMBNAIL DIR', err);
  }
};

export const deleteThumbnailContent = async () => {
  try {
    const thumbnailDir = await getDirectoryPath('thumbnails');
    if (thumbnailDir) {
      const thumbnailDirContent = await RNFS.readDir(thumbnailDir);
      thumbnailDirContent.forEach(({path}) => {
        RNFS.unlink(path);
      });
    }
    return
  } catch (err) {}
};
