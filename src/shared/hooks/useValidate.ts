import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import validateCode from '../../api/auth';
import {queryKey} from '../../api/api';

export default function useValidate(code: string) {
  return useQuery({
    queryKey: [queryKey.validate],
    queryFn: async () => validateCode(code),
  });
}
