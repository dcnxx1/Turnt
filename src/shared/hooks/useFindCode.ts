import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import validateCode from '../../api/auth';
import {queryKey} from '../../api/api';

export default function useFindCode(code: string) {
 return useQuery({
    queryKey: [queryKey.validate, {code}],
    queryFn: () => validateCode(code),
    enabled: false,
  });
}
