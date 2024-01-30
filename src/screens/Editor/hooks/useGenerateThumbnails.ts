import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';
import {useCallback, useEffect, useState} from 'react';

import RNFS from 'react-native-fs';
import {getDirectoryPathOrCreate} from '../../../helpers';
import {FileType} from '../../../models/turn';
import {
  VideoCoverColor,
  coverThumbnailSource,
  defaultColoredCoverThumbnailSource,
  generateThumbnailsFromDefault,
} from '../utils';

export const NUMBER_OF_THUMBNAILS_TO_EXTRACT = 13;
const FFMPEG_SUCCESS_RETURN_CODE = 0;

async function getVideoFramesCount(
  filePath: string,
): Promise<number | undefined> {
  const commandFrameRate = `-v error -loglevel quiet -hide_banner -select_streams v:0 -count_packets \
    -show_entries stream=nb_read_packets -of csv=p=0 ${filePath}`;
  try {
    const session = await FFprobeKit.execute(commandFrameRate);
    const numberOfFrames = await session.getAllLogsAsString();
    return Number(numberOfFrames);
  } catch (err) {
    console.log('ERR GET FRAMERATE :>>', err);
  }
}
async function extractEveryNFrame(
  filePath: string,
  numberOfThumbnailsToExtract = 13,
) {
  try {
    const videoFramesCount: number = (await getVideoFramesCount(filePath)) ?? 0;
    const extractAtN = Number(
      (videoFramesCount / numberOfThumbnailsToExtract).toFixed(0),
    );
    return extractAtN;
  } catch (err) {}
}

type GenerateThumbnails = {
  thumbnails: string[];
  isLoading: boolean;
};
const generateFramesCommand = (
  filePath: string,
  thumbnailDir: string,
  extractAtNFrame: number,
) =>
  `-i ${filePath} -hide_banner -vf "select=not(mod(n\\,${extractAtNFrame})),setpts=N/FRAME_RATE/TB" -vframes 13 ${thumbnailDir}/thumbnail-%02d.jpg`;

const sortThumbnailsByCreationTime = (
  thumbnailDirContent: RNFS.ReadDirItem[],
) => {
  return [...thumbnailDirContent].sort((a, b) => {
    // Use a default value for undefined 'ctime'
    const ctimeA = a.ctime !== undefined ? a.ctime.getTime() : 0;
    const ctimeB = b.ctime !== undefined ? b.ctime.getTime() : 0;

    return ctimeA - ctimeB;
  });
};
const ffprobe = (filePath: string, command: string) => {
  return `-i ${filePath} ${command}`;
};

const audioMetadataCommand = (audioPath: string) =>
  `-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`;
export const moveFileTo = async (
  filePath: string,
  destFilePath: string,
): Promise<string | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      RNFS.moveFile(filePath, destFilePath).then(() => {
        RNFS.exists(destFilePath).then(exists => {
          exists
            ? RNFS.readFile(destFilePath).then(res => resolve(res))
            : reject(undefined);
        });
      });
    });
  } catch (err) {
    console.log('ERR MOVE FILE TO NEW LOCATION :>>', err);
  }
};

export async function getAudioDuration(audioPath: string) {
  try {
    const audioMetadata = audioMetadataCommand(audioPath);
    const session = await FFprobeKit.execute(audioMetadata);
    return await session.getAllLogsAsString();
  } catch (err) {
    console.log('ERR WHIL GET AUDIO DURATION :>>', err);
  }
}

export default function useGenerateThumbnails(
  filePath: string,
  numberOfThumbnailsToExtract = NUMBER_OF_THUMBNAILS_TO_EXTRACT,
  fileType: FileType,
  defaultCoverColor: VideoCoverColor,
  coverImage: string,
): [string[] | any[], boolean] {
  const [thumbnails, setThumbnails] = useState<string[] | any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generateDefaultThumbnails = () => {
    const defaultedCoverImages =
      defaultColoredCoverThumbnailSource(defaultCoverColor);
    const defaultCovers = generateThumbnailsFromDefault(defaultedCoverImages);
    setThumbnails(defaultCovers);
  };
  const generateCoverThumbnails = () => {
    const coverImageFormatSource = coverThumbnailSource(coverImage);
    const arrayCoverImage = generateThumbnailsFromDefault(
      coverImageFormatSource,
    );
    setThumbnails(arrayCoverImage);
  };
  const generateVideoThumbnails = useCallback(async () => {
    try {
      if (thumbnails.length) {
        return;
      }
      const thumbnailDir = await getDirectoryPathOrCreate('thumbnails');
      const extractAtNFrame = await extractEveryNFrame(filePath);

      if (thumbnailDir?.length && extractAtNFrame) {
        const command = generateFramesCommand(
          filePath,
          thumbnailDir,
          extractAtNFrame,
        );
        const session = await FFmpegKit.execute(command);
        const sessionReturnCode = await session.getReturnCode();
        const returnCode: number = sessionReturnCode.getValue();

        if (returnCode === FFMPEG_SUCCESS_RETURN_CODE) {
          const thumbnailDirContent = await RNFS.readDir(thumbnailDir);
          const thumbnailsByCreationTime =
            sortThumbnailsByCreationTime(thumbnailDirContent);
          thumbnailsByCreationTime.shift();

          setThumbnails([
            ...thumbnailsByCreationTime.map(({path}) => {
              return {
                path: {uri: path},
              };
            }),
          ]);
        } else {
          generateDefaultThumbnails();
        }
      }
    } catch (err) {
      throw new Error('ERR CREATE THUMBNAILS :> ' + err);
    } finally {
      setIsLoading(false);
    }
  }, [filePath, isLoading, thumbnails, generateFramesCommand]);

  useEffect(() => {
    async function generate() {
      try {
        if (fileType === 'Audio') {
          if (!coverImage.length) {
            generateDefaultThumbnails();
            return;
          }
          generateCoverThumbnails();
          return;
        }
  
        await generateVideoThumbnails();
      } catch (err) {
        console.log(
          'src.screens.Editor.hooks.useGenerateThumbnails.useEffect.generate :>',
          err,
        );
      }
    }
    generate();
  }, [coverImage]);

  return [thumbnails, isLoading];
}
