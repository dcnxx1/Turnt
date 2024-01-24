import {useQuery, useQueryClient} from '@tanstack/react-query';
import {queryKey} from '../../api/api';
import getMyUploadsByUserId from '../../api/myUploads';
import {getPlaylistByUserId} from '../../api/playlist';
import useLocalProfile from '../../store/useLocalProfile';
import {getFeed} from '../../api/collection';

export type QueryResult<T> = {
  data: T[] | undefined;
  error: Error | null;
};
const FIVE_MINUTES = 1000 * 60 * 5;

export function useFeedQuery() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [queryKey.feed],
    queryFn: getFeed,
    staleTime: FIVE_MINUTES,
    initialData: queryClient.getQueryData([queryKey.feed]),
  });
}

export function useMyPlaylistQuery() {
  const queryClient = useQueryClient();
  const me = useLocalProfile();
  return useQuery({
    queryKey: [queryKey.playlist],
    queryFn: async () => await getPlaylistByUserId(me.user?.user_id ?? ''),
    staleTime: FIVE_MINUTES,
    initialData: queryClient.getQueryData([queryKey.playlist]),
  });
}

export function useMyUploadsQuery() {
  const queryClient = useQueryClient();
  const me = useLocalProfile();
  return useQuery({
    queryKey: [queryKey.myUploads],
    queryFn: async () => await getMyUploadsByUserId(me.user?.user_id ?? ''),
    staleTime: FIVE_MINUTES,
    initialData: queryClient.getQueryData([queryKey.myUploads]),
  });
}
