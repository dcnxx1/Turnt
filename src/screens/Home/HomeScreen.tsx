import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFeed} from '../../api/collection';
import {SkeletonScreen} from '../../components';
import VideoList from '../../components/List/VideoList';
import {useEffect} from 'react';
import {queryKey} from '../../api/api';
import VideoListContext from '../../shared/context/VideoListContext';
import {RootState} from '../../redux/store';

export type TestData = {
  source: string;
  id: number;
};

function HomeScreen(): JSX.Element {
  const queryClient = useQueryClient();
  const {data: turns} = useQuery({
    queryKey: [queryKey.feed],
    queryFn: () => getFeed(),
    initialData: queryClient.getQueryData(['feed']),
  });

  const index = useSelector((state: RootState) => state['homeSlice'].index);
  const playlistIndex = useSelector(
    (state: RootState) => state.playlistSlice.index,
  );

  useEffect(() => {
    console.log('index :>>', {index, playlistIndex});
  }, [index, playlistIndex]);

  const content = turns ? (
    <VideoListContext id="homeSlice" defaultValue={turns[0]}>
      <VideoList data={turns} id="homeSlice" />
    </VideoListContext>
  ) : null;

  return <SkeletonScreen contentStyle={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
