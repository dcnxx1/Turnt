import {useQuery, useQueryClient} from '@tanstack/react-query';
import {queryKey} from '../../api/api';
import getMyUploadsByUserId from '../../api/myUploads';
import {getPlaylistByUserId} from '../../api/playlist';
import useLocalProfile from '../../store/useLocalProfile';
import {getFeed} from '../../api/collection';
import {getProfile} from '../../api/profile';

export type QueryResult<T> = {
  data: T[] | undefined;
  error: Error | null;
};
const FIVE_MINUTES = 1000 * 60 * 5;
const TEN_SECONDS = 1000 * 10;
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

export function useMyRemoteProfile() {
  const queryClient = useQueryClient();
  const me = useLocalProfile();
  return useQuery({
    queryKey: [queryKey.profile],
    queryFn: async () => await getProfile(me.user?.user_id ?? ''),
    initialData: queryClient.getQueryData([queryKey.profile]),
    staleTime: FIVE_MINUTES,
    gcTime: Infinity,
  });
}
