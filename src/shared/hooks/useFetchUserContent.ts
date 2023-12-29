import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getFeed} from '../../api/collection';

export function useFetchContent() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({queryKey: ['feed'], queryFn: getFeed});
}

export function useFetchUserDetails(user_id: string) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({queryKey: ['profile']});
}


