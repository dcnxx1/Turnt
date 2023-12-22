import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';
import {useCallback, useEffect, useState} from 'react';
import {getThumbnailDirectoryPathOrCreate} from '../../../helpers';
import RNFS from 'react-native-fs';

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
  `-i ${filePath} -hide_banner -vf "select=not(mod(n\\,${extractAtNFrame})),setpts=N/FRAME_RATE/TB" -vframes 13 ${thumbnailDir}/thumbnail-%02d.bmp`;

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

export default function useGenerateThumbnails(
  filePath: string,
  numberOfThumbnailsToExtract = NUMBER_OF_THUMBNAILS_TO_EXTRACT,
): [string[], boolean] {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generateThumbnails = useCallback(async () => {
    try {
      if (thumbnails.length) {
        return;
      }
      const thumbnailDir = await getThumbnailDirectoryPathOrCreate();
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
          setThumbnails([...thumbnailsByCreationTime.map(({path}) => path)]);
        }
      }
    } catch (err) {
      throw new Error('ERR CREATE THUMBNAILS :> ' + err);
    } finally {
      setIsLoading(false);
    }
  }, [filePath, isLoading, thumbnails]);

  useEffect(() => {
    async function generate() {
      await generateThumbnails();
    }
    generate();
  }, []);

  return [thumbnails, isLoading];
}
