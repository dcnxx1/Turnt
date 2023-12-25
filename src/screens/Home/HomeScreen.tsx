import {StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import VideoListManager from '../../components/List/VideoListManager';
import TurnContextProvider from '../../shared/context/TurnContext';
import {useQuery} from '@tanstack/react-query';
import {getFeed} from '../../api/collection';
import {Text} from 'react-native-paper';

export type TestData = {
  source: string;
  id: number;
};

function HomeScreen(): JSX.Element {
  const {data: turns} = useQuery({
    queryKey: ['feed'],
    queryFn: () => getFeed(),
  });
  
  const content = turns ? (
    <TurnContextProvider>
      <VideoListManager data={turns} />
    </TurnContextProvider>
  ) : (
    <Text>Loading...</Text>
  );

  return <SkeletonScreen styleContent={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
