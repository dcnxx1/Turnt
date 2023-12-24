import {S3} from 'aws-sdk';
import {getFileExtension} from './helpers';
import RNFS from 'react-native-fs';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

export const TURN_KEY = 'uploads/turns/';
export const COVER_KEY = 'uploads/covers/';
export const PF_USER_KEY = 'users/pf';
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
    const extension = getFileExtension(filePath);
    const key = `${PF_USER_KEY}/${lowerCaseUsername}.${extension}`;

    await bucket
      .putObject({
        Bucket: 'turnerapp',
        Body: blob,
        Key: key,
        ContentType: `image/${extension}`,
      })
      .promise();
    return key;
  } catch (err) {
    console.log('Err occured while trying to upload picture :>>', err);
  }
}

export function generateUUID(length: number) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid = [];
  for (let i = 0; i < length; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}

export async function uploadCoverToS3(
  turn_title: string,
  filePath: string,
  lastPartOfUserId: string,
  turn_id: string,
) {
  try {
    const extension = getFileExtension(filePath);
    const base64image = await RNFS.readFile(filePath, 'base64');
    const fetchImage = await fetch(
      `data:image/${extension};base64,${base64image}`,
    );
    const coverId = generateUUID(4);
    const blob = await fetchImage.blob();
    const S3Key = `${turn_title.toLowerCase()}${lastPartOfUserId}-${turn_id}-${coverId}.${extension}`;
    // return fs;
    const body: PutObjectRequest = {
      Bucket: BUCKET,
      Body: blob,
      Key: `${COVER_KEY}${S3Key}`,
    };
    const resultObject = await bucket.putObject(body).promise();
    if (!resultObject.$response.error) {
      return S3Key;
    }
  } catch (err) {
    console.log('Err while uploading cover to s3 ->>', err);
  }
}

async function uploadVideoToS3(
  lastPartOfUserId: string,
  filePath: string,
  turnId: string,
  user_id: string,
  title: string,
) {
  try {
    const fileData = await fetch(filePath);
    const blob = await fileData.blob();

    const extension = getFileExtension(filePath);

    const S3Key = `${title.toLocaleLowerCase()}-${lastPartOfUserId}-${turnId}.${extension}`;

    const body: PutObjectRequest = {
      Key: `${TURN_KEY}${S3Key}`,
      Body: blob,
      Bucket: BUCKET,
    };
    const uploadTurn = await bucket.putObject(body).promise();

    if (!uploadTurn.$response.error) {
      return S3Key;
    }
  } catch (err) {
    console.log('err occured while trying to upload video to s3 :>>', err);
  }
}

export async function uploadTurnToS3(
  user_id: string,
  filePath: string,
  title: string,
  coverPath: string,
): Promise<
  | {
      turn?: string;
      cover?: string;
    }
  | undefined
> {
  try {
    const parts = user_id.split('-');
    const lastPartOfUserId = parts[parts.length - 1];
    const turnId = generateUUID(4);
    title = title.trim().replace(/ /g, '_');
    const coverKey = await uploadCoverToS3(
      title,
      coverPath,
      lastPartOfUserId,
      turnId,
    );
    const turnKey = await uploadVideoToS3(
      lastPartOfUserId,
      filePath,
      user_id,
      title,
      turnId,
    );

    const [keyTurn, keyCover] = await Promise.all([turnKey, coverKey]);

    return {
      turn: keyTurn,
      cover: keyCover,
    };
  } catch (err) {
    console.log('err occured while trying to upload turn to  s3 ->>', err);
  }
}