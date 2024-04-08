import {useMutation} from '@tanstack/react-query';

import {uploadTurn} from '../../../api/uploadTurn';

export default function useCreateTurn() {
  const {mutate: createTurnMutation} = useMutation({
    mutationKey: ['createTurn'],
    mutationFn: uploadTurn,
  });
  return createTurnMutation;
}
