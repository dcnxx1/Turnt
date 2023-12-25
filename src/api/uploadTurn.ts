import {Genre, FileType, ITurn} from '../models/turn';
import {uploadTurnToS3} from '../s3';
import {API} from './api';

export interface IUploadTurn {
  source: string;
  genre: Genre;
  artist_id: string;
  cover: string;
  title: string;
  impressionStartAt: number;
  duration: number;
  type: FileType;
}

export async function uploadTurn(
  turnUpload: IUploadTurn,
): Promise<ITurn | undefined> {
  try {
    const keys = await uploadTurnToS3(
      turnUpload.artist_id,
      turnUpload.source,
      turnUpload.title,
      turnUpload.cover,
    );
    if (keys?.cover && keys.turn) {
      let body: IUploadTurn = {
        artist_id: turnUpload.artist_id,
        cover: keys.cover,
        source: keys.turn,
        genre: turnUpload.genre,
        impressionStartAt: turnUpload.impressionStartAt,
        type: turnUpload.type,
        title: turnUpload.title,
        duration: turnUpload.duration,
      };
      const result = await API.post(`content`, {
        ...body,
      });
      return result.data;
    }
  } catch (err) {
    throw new Error('Error while uploading turn ' + err);
  }
}
