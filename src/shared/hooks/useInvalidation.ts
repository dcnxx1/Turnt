import {QueryClient, useQueryClient} from '@tanstack/react-query';

export function useInvalidatePlaylist() {
  const {invalidateQueries} = useQueryClient();
  return invalidateQueries({queryKey: ['playlist']});
}
