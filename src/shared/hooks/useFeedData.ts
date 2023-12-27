import {useQueryClient} from '@tanstack/react-query';
import {getFeed} from '../../api/collection';
import {useEffect} from 'react';

const queryClient = useQueryClient();

export default function useFeedData() {
  async function prefetchFeedData() {
    await queryClient.prefetchQuery({queryKey: ['feed'], queryFn: getFeed});
  }
  useEffect(() => {
    prefetchFeedData();
  }, []);
}
