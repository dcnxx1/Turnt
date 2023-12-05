import {S3} from 'aws-sdk';
import RNFS from 'react-native-fs';

export const TURN_IMPRESSION_TIME_LIMIT = 30;
export const TURN_KEY = 'uploads/turns/';
export const COVER_KEY = 'uploads/covers/';
export const PF_USER_KEY = 'users/pf/';
export const BUCKET = 'turnerapp';

const bucket = new S3({
  params: {Bucket: BUCKET},
  region: 'eu-central-1',
  credentials: {
    secretAccessKey: 'R3H4h3Llm0ZmGKRVmfTRrQh0tsAKZbL/k8fGFzNv',
    accessKeyId: 'AKIA5XSHZ2WTTOS6K5S5',
  },
});

export async function uploadProfilePic(
    filePath: string,
    username: string,
  ): Promise<string | undefined> {
    try {
      const fileData = await fetch(filePath);
      const blob = await fileData.blob();
      const lowerCaseUsername = username.toLowerCase();
      const key = `${PF_USER_KEY}/${lowerCaseUsername}.jpg`;
  
      await bucket
        .putObject({
          Bucket: 'turnerapp',
          Body: blob,
          Key: key,
          ContentType: 'image/jpg',
        })
        .promise();
      return key;
    } catch (err) {
      console.log('Err occured while trying to upload picture :>>', err);
    }
  }
  