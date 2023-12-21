import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';
import {useEffect, useState} from 'react';
import {getThumbnailDirectoryPathOrCreate} from '../../../helpers';
import RNFS from 'react-native-fs';

const NUMBER_OF_THUMBNAILS_TO_EXTRACT = 13;
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

export default function useGenerateThumbnails(
  filePath: string,
  numberOfThumbnailsToExtract = NUMBER_OF_THUMBNAILS_TO_EXTRACT,
): [string[], boolean] {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generateThumbnails = async () => {
    console.log('use generate thumbnails called');
    try {
      const thumbnailDir = await getThumbnailDirectoryPathOrCreate();
      const extractAtNFrame = await extractEveryNFrame(filePath);

      if (thumbnailDir?.length) {
        console.log("insdide thumbnailDirLength :>>")
        const string = `-i ${filePath} -hide_banner -vf "select=not(mod(n\\,${extractAtNFrame})),setpts=N/FRAME_RATE/TB" -vframes 13 ${thumbnailDir}/thumbnail-%02d.bmp`;
        const session = await FFmpegKit.execute(string);
        const returnC = await session.getReturnCode();
        if (returnC.getValue() === FFMPEG_SUCCESS_RETURN_CODE) {
          console.log('return code is 0!');
          const thumbnailDirContent = await RNFS.readDir(thumbnailDir);
          setThumbnails([...thumbnailDirContent.map(({path}) => path)]);
        }
      } else {
        console.log('thumbnail dir does not exist!');
      }
    } catch (err) {
      throw new Error(err as any);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function generate() {
      await generateThumbnails();
    }
    generate();
  }, []);

  return [thumbnails, isLoading];
}
