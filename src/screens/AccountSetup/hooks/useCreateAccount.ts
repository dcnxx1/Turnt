import {useMutation, useQuery} from '@tanstack/react-query';
import {queryKey} from '../../../api/api';
import {createAccount} from '../../../api/createAccount';

export default function useCreateAccount() {
  const {mutate: createAccountMutation} = useMutation({
    mutationFn: createAccount
  });
  return createAccountMutation;
}
