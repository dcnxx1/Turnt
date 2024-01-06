import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {getFeed} from '../../api/collection';
import {SkeletonScreen} from '../../components';
import VideoListManager from '../../components/List/VideoListManager';
import useVideoListManagerDispatcherStore from '../../store/useVideoListManagerDispatcherStore';
export type TestData = {
  source: string;
  id: number;
};

function HomeScreen(): JSX.Element {
  const queryClient = useQueryClient();
  const {data: turns} = useQuery({
    queryKey: ['feed'],
    queryFn: () => getFeed(),
    initialData: queryClient.getQueryData(['feed']),
  });
  const index = useVideoListManagerDispatcherStore(state => state.index);
  const content = (
    <VideoListManager index={index} id={'Home'} data={turns ?? []} />
  );

  return <SkeletonScreen contentStyle={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
