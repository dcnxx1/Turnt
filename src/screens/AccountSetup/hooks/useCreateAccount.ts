import {useMutation} from '@tanstack/react-query';
import {createAccount} from '../../../api/createAccount';

export default function useCreateAccount() {
  const {mutate: createAccountMutation} = useMutation({
    mutationFn: createAccount,
  });
  return createAccountMutation;
}
