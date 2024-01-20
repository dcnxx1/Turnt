import {useIsFetching, useQuery, useQueryClient} from '@tanstack/react-query';
import {queryKey} from '../../api/api';
import getMyUploadsByUserId from '../../api/myUploads';
import useLocalProfile from '../../store/useLocalProfile';
import {ITurn} from '../../models/turn';

export type QueryResult<T> = {
  data: T[] | undefined;
  error: Error | null;
};
const FIVE_MINUTES = 1000 * 60 * 5;

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
