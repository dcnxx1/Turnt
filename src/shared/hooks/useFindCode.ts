import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import findCode from '../../api/auth';
import {queryKey} from '../../api/api';

export default function useFindCode(code: string) {
  return useQuery({
    queryKey: [queryKey.validate, {code}],
    queryFn: () => findCode(code),
    enabled: false,
  });
}
