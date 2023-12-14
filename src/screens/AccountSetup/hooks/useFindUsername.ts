import {useQuery} from '@tanstack/react-query';
import {queryKey} from '../../../api/api';
import findUsername from '../../../api/findUsername';

export default function useFindUsername(username: string) {
  return useQuery({
    queryKey: [queryKey.findUsername, {username}],
    queryFn: () => findUsername(username),
    enabled: false,
  });
}
