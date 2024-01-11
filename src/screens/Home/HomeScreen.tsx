import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, Text, View} from 'react-native';
import {getFeed} from '../../api/collection';
import {SkeletonScreen} from '../../components';
import VideoListManager from '../../components/List/VideoListManager';
import VideoListManagerProvider from '../../shared/context/VideoListManagerProvider';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setHomeIndex} from '../../redux/videoListManagerSlices/homeSlice';

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
  const index = useSelector((state: RootState) => state.homeSlice.index);
  const dispatch = useDispatch();
  
  const setNewIndex = (index: number) => {
    dispatch(setHomeIndex(index));
  };

  const content = (
    <View>
      
    </View>
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
