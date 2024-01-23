import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, View} from 'react-native';
import {queryKey} from '../../api/api';
import {getFeed} from '../../api/collection';
import VideoList from '../../components/List/VideoList';
import GenericScreen from '../../components/Screen/GenericScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect} from 'react';
import TestList from '../../components/List/TestList';

export type TestData = {
  source: string;
  id: number;
};

const queryClient = useQueryClient();
const FIVE_MINUTES = 1000 * 60 * 5;

function HomeScreen(): JSX.Element {
  const {data: turns} = useQuery({
    queryKey: [queryKey.feed],
    queryFn: getFeed,
    initialData: queryClient.getQueryData([queryKey.feed]),
    staleTime: FIVE_MINUTES,
  });

  const content = turns && <VideoList data={turns} />;
  return <GenericScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
