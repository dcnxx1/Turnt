import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export type QueryResult<T> = {
  data: T[];
  error: Error | null | undefined;
};

export default function useQueryData<T>(queryKey: string): QueryResult<T> {
  const queryClient = useQueryClient();
  const data: T[] | undefined = queryClient.getQueryData([queryKey]) ?? [] ;
  const queryState = queryClient.getQueryState([queryKey]);
 
  const error = queryState?.error;

  return {
    data,
    
    error,
  };
}
