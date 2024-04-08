import {API} from './api';

type PlaylistProps = {
  user_id: string;
  turn_id: string;
};

export default async function addToFavourites({
  user_id,
  turn_id,
}: PlaylistProps): Promise<{
  title: string;
  turn_id: string;
  cover: string;
}> {
  try {
    const response = await API.put('profile', {
      user_id,
      turn_id,
    });
    return response.data;
  } catch (err) {
    throw new Error('Error occured while trying to add to favorites');
  }
}
// Route: profile/from_playlist @Delete
export async function deleteFromFavourites({
  user_id,
  turn_id,
}: PlaylistProps): Promise<{
  turn_id: string;
  title: string;
  cover: string;
}> {
  try {
    const response = await API.delete('profile/from_playlist', {
      data: {
        user_id,
        turn_id,
      },
    });
    console.log('response from deletion:>>', response.data);
    return response.data;
  } catch (err) {
    throw new Error('Error occured while trying to delete from favorites');
  }
}
