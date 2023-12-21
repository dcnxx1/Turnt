import {Alert} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNPermission, {Permission} from 'react-native-permissions';
import RNFS, {CachesDirectoryPath} from 'react-native-fs';
import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';

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
const thumbnails = '/thumbnails';

export const getThumbnailDirectoryPathOrCreate = async (): Promise<
  string | undefined
> => {
  try {
    const cacheDirPath = await RNFS.readDir(CachesDirectoryPath);
    const cacheDir = cacheDirPath[0].path;
    const doesThumbnailDirExist = await RNFS.exists(cacheDir + thumbnails);
    console.log('does thumbnailDirEixst:>>', doesThumbnailDirExist);
    if (!doesThumbnailDirExist) {
      return new Promise<string>((resolve, reject) => {
        RNFS.mkdir(cacheDir + thumbnails).then(() =>
          RNFS.exists(cacheDir + thumbnails).then(res => {
            res ? resolve(cacheDir + thumbnails) : reject(undefined);
          }),
        );
      });
    }
    return cacheDir + thumbnails;
  } catch (err) {
    console.log('ERR CREATE THUMBNAIL DIR', err);
  }
};

const NUMBER_OF_THUMBNAILS_TO_EXTRACT = 13;

/**
 *
 * @param filePath string
 * @param duration number - duration of video
 * @param numberOfThumbnails number
 * @returns `-i ${filePath} -hide_banner -r 1/24 ${outputDir}/thumbnail-%02d.jpg`
 */
