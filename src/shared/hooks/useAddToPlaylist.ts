import {useMutation} from '@tanstack/react-query';
import addToFavourites from '../../api/addToFavourites';

export default function useAddToPlaylist() {
  const {mutate: addToPlaylistMutation} = useMutation({
    mutationKey: ['playlist'],
    mutationFn: addToFavourites,
  });
  return addToPlaylistMutation;
}
