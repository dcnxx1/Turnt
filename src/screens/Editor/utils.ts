import {isCancel} from 'axios';
import {Alert, LayoutChangeEvent} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import ImageCropPicker, {Video} from 'react-native-image-crop-picker';
import {TimelineDimensions} from './components/timeline/Timeline';
import {useCallback, useState} from 'react';
import {Blue, Brown, Red, Purple, Pink, Green, Orange} from '../Editor/covers';

const defaultThumbnailsArray = [Blue, Brown, Red, Purple, Pink, Green, Orange];

function errorAlertWithCallback<T>(cb: () => T | void) {
  Alert.alert('Oeps', 'Er is iets mis gegaan', [
    {
      style: 'cancel',
      text: 'Annuleren',
    },
    {
      style: 'default',
      isPreferred: true,
      text: 'Opnieuw proberen',
      onPress: () => {
        cb();
        return;
      },
    },
  ]);
}

export async function getMp3File(): Promise<
  DocumentPickerResponse | undefined
> {
  const audioMimeTypes = DocumentPicker.types.audio;

  try {
    const mp3File = await DocumentPicker.pickSingle({
      type: [audioMimeTypes],
      mode: 'import',
      allowMultiSelection: false,
    });
    if (mp3File) {
      return mp3File;
    }
  } catch (err) {
    if (!isCancel(err)) {
      errorAlertWithCallback(getMp3File);
    }
  }
}

export async function getVideoFile(): Promise<Video | undefined> {
  try {
    const videoFile = await ImageCropPicker.openPicker({
      mediaType: 'video',
      loadingLabelText: 'Ophalen...',
      multiple: false,
      compressVideoPreset: 'HighestQuality',
    });
    return videoFile;
  } catch (err: any) {
    const message: string = err.message;
    if (!message.includes('User')) {
      errorAlertWithCallback(getVideoFile);
    }
  }
}

export type VideoCoverColor =
  | 'Blue'
  | 'Brown'
  | 'Green'
  | 'Orange'
  | 'Pink'
  | 'Purple'
  | 'Red';

export const requiredImages = {
  Blue: require('../../assets/covers/cover_blue_default.png'),
  Brown: require('../../assets/covers/cover_brown_default.png'),
  Green: require('../../assets/covers/cover_green_default.png'),
  Orange: require('../../assets/covers/cover_orange_default.png'),
  Pink: require('../../assets/covers/cover_pink_default.png'),
  Purple: require('../../assets/covers/cover_purple_default.png'),
  Red: require('../../assets/covers/cover_red_default.png'),
};

const imageCoverColors = {
  Blue: 'Blue',
  Brown: 'Brown',
  Green: 'Green',
  Orange: 'Orange',
  Pink: 'Pink',
  Purple: 'Purple',
  Red: 'Red',
};

export const coverThumbnailSource = (coverPath: string) => {
  return {path: {uri: coverPath}};
};

export const defaultColoredCoverThumbnailSource = (
  coverColor: VideoCoverColor,
) => {
  return {path: requiredImages[coverColor]};
};

export const generateThumbnailsFromDefault = (path: {uri: string} | any) =>
  Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).map(index => {
    return path;
  });

export const chooseDefaultCoverImage = (): VideoCoverColor => {
  const randomNumber = chooseRandomNumber(
    1,
    Object.keys(imageCoverColors).length,
  );

  const keys = Object.values(imageCoverColors);
  const color = keys[randomNumber - 1];
  return color as VideoCoverColor;
};

export const useComponentSize = (): [
  TimelineDimensions,
  (e: LayoutChangeEvent) => void,
] => {
  const [size, setSize] = useState<TimelineDimensions>({
    height: 0,
    width: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

const chooseRandomNumber = (min: number, max: number) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both min and max must be numbers');
  }

  // Ensure that min is less than or equal to max
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  // Calculate and return a random number in the specified range
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
