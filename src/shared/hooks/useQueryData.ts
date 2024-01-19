import {useIsFetching, useQueryClient} from '@tanstack/react-query';

export type QueryResult<T> = {
  data: T[] | undefined;
  error: Error | null;
};

export default function useQueryData<T>(queryKey: string): QueryResult<T> {
  const queryClient = useQueryClient();
  const data: T[] | undefined = queryClient.getQueryData([queryKey]) ?? [];
  const queryState = queryClient.getQueryState([queryKey]);

  const error = queryState?.error as Error | null;

  return {
    data,

    error,
  };
}
