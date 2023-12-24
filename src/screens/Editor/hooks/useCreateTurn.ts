import {useMutation} from '@tanstack/react-query';
import {uploadTurnToS3} from '../../../s3';
import {uploadTurn} from '../../../api/uploadTurn';

export default function useCreateTurn() {
  const {mutate: createTurnMutation} = useMutation({
    mutationKey: ['createTurn'],
    mutationFn: uploadTurn,
  });
  return createTurnMutation;
}
