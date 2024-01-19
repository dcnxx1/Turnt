import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, View} from 'react-native';
import {queryKey} from '../../api/api';
import {getFeed} from '../../api/collection';
import {SkeletonScreen} from '../../components';
import VideoList from '../../components/List/VideoList';
import VideoListContext from '../../shared/context/VideoListContext';
import {Suspense} from 'react';
import {Text} from 'react-native-paper';
import GenericScreen from '../../components/Screen/GenericScreen';

export type TestData = {
  source: string;
  id: number;
};

const queryClient = useQueryClient();

function HomeScreen(): JSX.Element {
  const {data: turns} = useQuery({
    queryKey: [queryKey.feed],
    queryFn: () => getFeed(),
    initialData: queryClient.getQueryData(['feed']),
  });

  const content = turns ? (
    <VideoListContext id={'homeSlice'} defaultValue={turns[0]}>
      <VideoList id={'homeSlice'} data={turns} />
    </VideoListContext>
  ) : null;

  return (
    <GenericScreen
      style={Style.container}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
